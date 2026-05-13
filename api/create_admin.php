<?php
/**
 * Admin User Creator - Simple username/password only
 * Access via: https://domain.com/api/create_admin.php?secret=admin_setup_key_2024
 */

require_once 'config.php';
header('Content-Type: application/json');

$secret = $_GET['secret'] ?? '';
if (empty($secret) || $secret !== 'admin_setup_key_2024') {
    http_response_code(403);
    die(json_encode(['error' => 'Unauthorized. Use ?secret=admin_setup_key_2024']));
}

try {
    $pdo = getDbConnection();

    // Create users table with optional email
    $pdo->exec("CREATE TABLE IF NOT EXISTS users (
        id       INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(100) NOT NULL UNIQUE,
        email    VARCHAR(255),
        password VARCHAR(255) NOT NULL,
        role     VARCHAR(20)  NOT NULL DEFAULT 'customer',
        created_at TIMESTAMP  DEFAULT CURRENT_TIMESTAMP,
        INDEX idx_username (username)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4");

    $admin_username = 'admin';
    $admin_password = 'Admin@12345';
    $admin_email = 'ossamaghaffar888@gmail.com';

    // Hash password
    $hashed_password = password_hash($admin_password, PASSWORD_BCRYPT);

    // Delete existing admin
    $pdo->prepare("DELETE FROM users WHERE username = ?")->execute([$admin_username]);

    // Create new admin
    $stmt = $pdo->prepare("INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)");
    $stmt->execute([$admin_username, $admin_email, $hashed_password, 'admin']);

    echo json_encode([
        'success' => true,
        'message' => '✅ Admin created successfully',
        'username' => $admin_username,
        'password' => $admin_password,
        'login_url' => 'https://linen-bee-509910.hostingersite.com/login'
    ]);

} catch (\Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}
?>

