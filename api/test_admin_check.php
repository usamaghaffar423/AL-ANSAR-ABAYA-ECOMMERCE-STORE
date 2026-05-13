<?php
/**
 * Check if admin user exists in database
 * Diagnostic endpoint for troubleshooting login issues
 */

require_once 'config.php';
header('Content-Type: application/json');

try {
    $pdo = getDbConnection();

    // Check if users table exists
    $tables = $pdo->query("SHOW TABLES LIKE 'users'")->fetchAll();
    $users_table_exists = count($tables) > 0;

    echo json_encode([
        'environment' => $isProduction ? 'PRODUCTION' : 'LOCAL',
        'database_connected' => true,
        'users_table_exists' => $users_table_exists
    ]);

    if ($users_table_exists) {
        // Check if admin user exists
        $stmt = $pdo->prepare("SELECT id, username, email, role FROM users WHERE username = ?");
        $stmt->execute(['admin']);
        $admin = $stmt->fetch();

        // Get all users
        $all_users = $pdo->query("SELECT id, username, email, role FROM users")->fetchAll();

        echo json_encode([
            'environment' => $isProduction ? 'PRODUCTION' : 'LOCAL',
            'database_connected' => true,
            'users_table_exists' => $users_table_exists,
            'admin_user_exists' => $admin ? true : false,
            'admin_user' => $admin ?: 'NOT FOUND',
            'total_users' => count($all_users),
            'all_users' => $all_users
        ]);
    }

} catch (\Exception $e) {
    http_response_code(500);
    echo json_encode([
        'error' => $e->getMessage(),
        'hint' => 'Database connection or query failed'
    ]);
}
?>
