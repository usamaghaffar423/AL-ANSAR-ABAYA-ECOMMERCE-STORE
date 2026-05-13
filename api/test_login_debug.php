<?php
/**
 * Debug login endpoint - test if login API works
 */

require_once 'config.php';
header('Content-Type: application/json');

try {
    $pdo = getDbConnection();

    // Test data
    $test_username = 'admin';
    $test_password = 'Admin@12345';

    // Check if user exists
    $stmt = $pdo->prepare("SELECT id, username, email, password, role FROM users WHERE username = ? OR email = ?");
    $stmt->execute([$test_username, $test_username]);
    $user = $stmt->fetch();

    $response = [
        'environment' => $isProduction ? 'PRODUCTION' : 'LOCAL',
        'database_connected' => true,
        'test_username' => $test_username,
        'user_found' => $user ? true : false,
    ];

    if ($user) {
        $password_matches = password_verify($test_password, $user['password']);
        $response['user_data'] = [
            'id' => $user['id'],
            'username' => $user['username'],
            'email' => $user['email'],
            'role' => $user['role'],
        ];
        $response['password_matches'] = $password_matches;
        $response['bcrypt_hash'] = $user['password'];
    } else {
        $response['message'] = 'User not found. Run: create_admin.php?secret=admin_setup_key_2024';
    }

    echo json_encode($response, JSON_PRETTY_PRINT);

} catch (\Exception $e) {
    http_response_code(500);
    echo json_encode([
        'error' => $e->getMessage(),
        'hint' => 'Database connection failed'
    ], JSON_PRETTY_PRINT);
}
?>
