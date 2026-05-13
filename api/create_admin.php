<?php
/**
 * Admin User Creator - Create or reset admin account
 * Access via: POST http://localhost/ABAYA-AL-ANSAR-ECOMMERCE-STORE/abaya-ecommerce-store/api/create_admin.php
 */

require_once 'config.php';
header('Content-Type: application/json');

// Simple security: only allow from localhost or with a secret key
$secret = $_GET['secret'] ?? '';
if (empty($secret) || $secret !== 'admin_setup_key_2024') {
    http_response_code(403);
    die(json_encode(['error' => 'Unauthorized. Use ?secret=admin_setup_key_2024']));
}

try {
    $pdo = getDbConnection();

    // ── Create users table if it doesn't exist ────────────────────────
    $pdo->exec("CREATE TABLE IF NOT EXISTS users (
        id       INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(100) NOT NULL UNIQUE,
        email    VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        role     VARCHAR(20)  NOT NULL DEFAULT 'customer',
        created_at TIMESTAMP  DEFAULT CURRENT_TIMESTAMP,
        INDEX idx_username (username),
        INDEX idx_email (email)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4");

    // ── Default Admin Credentials ──────────────────────────────────────
    $admin_username = 'admin';
    $admin_email = 'ossamaghaffar888@gmail.com';
    $admin_password = 'Admin@12345';  // Change this after first login!
    $admin_role = 'admin';

    // Hash the password
    $hashed_password = password_hash($admin_password, PASSWORD_BCRYPT);

    // ── Delete existing admin user if found ────────────────────────────
    $pdo->prepare("DELETE FROM users WHERE username = ?")->execute([$admin_username]);

    // ── Insert new admin user ──────────────────────────────────────────
    $stmt = $pdo->prepare("
        INSERT INTO users (username, email, password, role)
        VALUES (?, ?, ?, ?)
    ");
    $stmt->execute([$admin_username, $admin_email, $hashed_password, $admin_role]);

    echo json_encode([
        'status' => 'success',
        'message' => '✅ Admin account created successfully!',
        'credentials' => [
            'username' => $admin_username,
            'password' => $admin_password,
            'email' => $admin_email,
            'role' => $admin_role
        ],
        'warning' => '⚠️ IMPORTANT: Change the password immediately after first login!',
        'login_url' => 'https://linen-bee-509910.hostingersite.com/login'
    ]);

} catch (\Exception $e) {
    http_response_code(500);
    echo json_encode([
        'error' => $e->getMessage(),
        'hint' => 'Check database connection'
    ]);
}
?>
