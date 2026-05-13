<?php
/**
 * Setup Admin - Use api/config.php for database connection
 * Visit: https://domain.com/setup_admin.php?key=setup123
 */

if (($_GET['key'] ?? '') !== 'setup123') {
    die('Unauthorized');
}

require_once 'api/config.php';
header('Content-Type: application/json');

try {
    $pdo = getDbConnection();

    // Create users table
    $pdo->exec("CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(100) NOT NULL UNIQUE,
        email VARCHAR(255),
        password VARCHAR(255) NOT NULL,
        role VARCHAR(20) DEFAULT 'customer',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        INDEX idx_username (username)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4");

    // Delete existing admin
    $pdo->prepare("DELETE FROM users WHERE username = ?")->execute(['admin']);

    // Create admin user
    $admin_pass = password_hash('Admin@12345', PASSWORD_BCRYPT);
    $stmt = $pdo->prepare("INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)");
    $stmt->execute(['admin', 'ossamaghaffar888@gmail.com', $admin_pass, 'admin']);

    echo json_encode([
        'success' => true,
        'message' => '✅ Admin created successfully',
        'username' => 'admin',
        'password' => 'Admin@12345',
        'login_url' => 'https://linen-bee-509910.hostingersite.com/login'
    ], JSON_PRETTY_PRINT);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()], JSON_PRETTY_PRINT);
}
?>
