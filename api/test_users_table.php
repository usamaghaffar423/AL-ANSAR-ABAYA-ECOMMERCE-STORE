<?php
/**
 * Show all users in database - for debugging
 */

require_once 'config.php';
header('Content-Type: application/json');

try {
    $pdo = getDbConnection();

    // Check if users table exists
    $tables = $pdo->query("SHOW TABLES LIKE 'users'")->fetchAll();
    if (count($tables) === 0) {
        echo json_encode(['error' => 'users table does not exist']);
        exit;
    }

    // Get all users
    $users = $pdo->query("SELECT id, username, email, password, role, created_at FROM users")->fetchAll();

    echo json_encode([
        'total_users' => count($users),
        'users' => array_map(function($user) {
            return [
                'id' => $user['id'],
                'username' => $user['username'],
                'email' => $user['email'],
                'password_hash' => substr($user['password'], 0, 20) . '...' . substr($user['password'], -10),
                'password_length' => strlen($user['password']),
                'role' => $user['role'],
                'created_at' => $user['created_at']
            ];
        }, $users)
    ], JSON_PRETTY_PRINT);

} catch (\Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}
?>
