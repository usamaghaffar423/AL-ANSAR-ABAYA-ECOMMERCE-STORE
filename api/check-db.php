<?php
/**
 * Database Connection Checker - Shows REAL errors
 * Access: https://linen-bee-509910.hostingersite.com/api/check-db.php
 */

header('Content-Type: application/json');

$debug = [];

// Load .env.php
$debug['step_1'] = 'Loading .env.php...';
if (file_exists(__DIR__ . '/.env.php')) {
    include __DIR__ . '/.env.php';
    $debug['env_loaded'] = 'YES';
    if (defined('PROD_DB_HOST')) {
        $debug['PROD_DB_HOST_from_env'] = PROD_DB_HOST;
    }
} else {
    $debug['env_loaded'] = 'NO - File not found';
}

// Show what will be used
$debug['step_2'] = 'Checking which host will be used...';
$host = $_SERVER['HTTP_HOST'] ?? 'localhost';
$isProduction = !in_array(strtolower(explode(':', $host)[0]), ['localhost', '127.0.0.1', '::1']);
$debug['is_production'] = $isProduction ? 'YES' : 'NO';

if ($isProduction) {
    $db_host = getenv('DB_HOST') ?: (defined('PROD_DB_HOST') ? PROD_DB_HOST : '127.0.0.1');
    $db_user = getenv('DB_USER') ?: (defined('PROD_DB_USER') ? PROD_DB_USER : 'u463999436_alansarabaya');
    $db_pass = getenv('DB_PASS') ?: (defined('PROD_DB_PASS') ? PROD_DB_PASS : 'Abaya@9911323!');
    $db_name = getenv('DB_NAME') ?: (defined('PROD_DB_NAME') ? PROD_DB_NAME : 'u463999436_alansarabaya');
} else {
    $db_host = 'localhost';
    $db_user = 'root';
    $db_pass = '';
    $db_name = 'u463999436_alansarabaya';
}

$debug['step_3'] = 'Configuration being used:';
$debug['DB_HOST'] = $db_host;
$debug['DB_USER'] = $db_user;
$debug['DB_NAME'] = $db_name;
$debug['DB_PASS'] = strlen($db_pass) > 0 ? '[SET]' : '[EMPTY]';

// Try connection
$debug['step_4'] = 'Attempting connection...';
try {
    $dsn = "mysql:host=" . $db_host . ";dbname=" . $db_name . ";charset=utf8mb4";
    $pdo = new PDO($dsn, $db_user, $db_pass, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES => false,
    ]);
    $debug['connection_status'] = '✓ CONNECTED';

    // Test query
    $result = $pdo->query("SELECT COUNT(*) as cnt FROM cf_products")->fetch();
    $debug['products_count'] = $result['cnt'] ?? 'unknown';
    $debug['result'] = 'SUCCESS - Database is working!';

} catch (PDOException $e) {
    $debug['connection_status'] = '✗ FAILED';
    $debug['error_code'] = $e->getCode();
    $debug['error_message'] = $e->getMessage();
    $debug['error_file'] = basename($e->getFile());
    $debug['error_line'] = $e->getLine();

    // Provide specific help
    if (strpos($e->getMessage(), 'Name or service not known') !== false) {
        $debug['diagnosis'] = 'Cannot resolve hostname - HOST IS WRONG';
        $debug['try_instead'] = 'Use 127.0.0.1 or localhost instead of ' . $db_host;
    } elseif (strpos($e->getMessage(), 'Access denied') !== false) {
        $debug['diagnosis'] = 'Username or password is wrong';
        $debug['try_instead'] = 'Check DB_USER and DB_PASS';
    } elseif (strpos($e->getMessage(), 'Unknown database') !== false) {
        $debug['diagnosis'] = 'Database does not exist';
        $debug['try_instead'] = 'Database name might be wrong: ' . $db_name;
    } elseif (strpos($e->getMessage(), 'Connection refused') !== false) {
        $debug['diagnosis'] = 'Cannot connect to MySQL server';
        $debug['try_instead'] = 'MySQL server might be down or wrong port';
    } else {
        $debug['diagnosis'] = 'Unknown database error';
    }
}

echo json_encode($debug, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);
?>
