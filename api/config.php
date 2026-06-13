<?php
/**
 * Database Configuration & Security Utilities
 *
 * Auto-detects local vs production environment.
 * Local  → XAMPP (localhost, root, no password)
 * Production → credentials loaded from env variables set in Hostinger
 *
 * Version: 1.0.0 - Production stable
 */

// ── Environment Detection ─────────────────────────────────────────────────
$host = $_SERVER['HTTP_HOST'] ?? 'localhost';
$isProduction = !in_array(strtolower(explode(':', $host)[0]), ['localhost', '127.0.0.1', '::1']);

// ── Database Credentials ──────────────────────────────────────────────────

// Try to load from .env file first (Hostinger compatible)
$envFile = __DIR__ . '/.env.php';
if (file_exists($envFile)) {
    include $envFile;
}

if ($isProduction) {
    // Production: Try env variables first, then fall back to config
    define('DB_HOST', getenv('DB_HOST') ?: (defined('PROD_DB_HOST') ? PROD_DB_HOST : 'localhost'));
    define('DB_USER', getenv('DB_USER') ?: (defined('PROD_DB_USER') ? PROD_DB_USER : 'u463999436_alansarabaya'));
    define('DB_PASS', getenv('DB_PASS') ?: (defined('PROD_DB_PASS') ? PROD_DB_PASS : 'Abaya@9911323!'));
    define('DB_NAME', getenv('DB_NAME') ?: (defined('PROD_DB_NAME') ? PROD_DB_NAME : 'u463999436_alansarabaya'));
} else {
    // Local development — XAMPP default credentials
    define('DB_HOST', 'localhost');
    define('DB_USER', 'root');
    define('DB_PASS', '');
    define('DB_NAME', 'u463999436_alansarabaya');
}

// ── CORS ──────────────────────────────────────────────────────────────────
$allowedOrigins = [
    'http://localhost:5173',
    'http://localhost:3000',
    'http://localhost',
    'https://alansarabaya.com',
    'https://www.alansarabaya.com',
    'https://al-ansar-abaya-ecommerce-store.vercel.app',
    'https://abaya-al-ansar.vercel.app',
];

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if (in_array($origin, $allowedOrigins, true)) {
    header("Access-Control-Allow-Origin: $origin");
    header("Vary: Origin");
} elseif (!empty($origin)) {
    http_response_code(403);
    header('Content-Type: application/json');
    die(json_encode(['error' => 'Origin not allowed']));
}

header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Credentials: true");

// ── PDO Connection ────────────────────────────────────────────────────────
function getDbConnection() {
    static $pdo = null;
    if ($pdo !== null) return $pdo;

    try {
        $dsn = "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=utf8mb4";
        $pdo = new PDO($dsn, DB_USER, DB_PASS, [
            PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES   => false,
        ]);
        return $pdo;
    } catch (\PDOException $e) {
        http_response_code(500);
        header('Content-Type: application/json');
        error_log('DB Connection failed: ' . $e->getMessage());
        die(json_encode(['error' => 'Service temporarily unavailable. Please try again later.']));
    }
}

// ── Auth Token Validator ──────────────────────────────────────────────────
function validateAuthToken($pdo, $requiredRole = null) {
    $authHeader = $_SERVER['HTTP_AUTHORIZATION']
               ?? $_SERVER['REDIRECT_HTTP_AUTHORIZATION']
               ?? '';

    if (empty($authHeader) && function_exists('getallheaders')) {
        $all = getallheaders();
        $authHeader = $all['Authorization'] ?? $all['authorization'] ?? '';
    }

    if (empty($authHeader) || !str_starts_with($authHeader, 'Bearer ')) {
        http_response_code(401);
        header('Content-Type: application/json');
        die(json_encode(['error' => 'Authentication required. Please log in.']));
    }

    $token = substr($authHeader, 7);

    if (strlen($token) !== 64 || !ctype_xdigit($token)) {
        http_response_code(401);
        header('Content-Type: application/json');
        die(json_encode(['error' => 'Invalid token format.']));
    }

    $stmt = $pdo->prepare("
        SELECT username, role FROM user_sessions
        WHERE token = ? AND expires_at > NOW()
        LIMIT 1
    ");
    $stmt->execute([$token]);
    $session = $stmt->fetch();

    if (!$session) {
        http_response_code(401);
        header('Content-Type: application/json');
        die(json_encode(['error' => 'Session expired or invalid. Please log in again.']));
    }

    if ($requiredRole !== null && $session['role'] !== $requiredRole) {
        http_response_code(403);
        header('Content-Type: application/json');
        die(json_encode(['error' => 'Access denied. Insufficient permissions.']));
    }

    return $session;
}
?>
