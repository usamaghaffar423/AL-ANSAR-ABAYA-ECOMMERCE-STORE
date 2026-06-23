<?php
/**
 * Debug endpoint - Shows detailed error information
 * Access: https://linen-bee-509910.hostingersite.com/api/debug.php
 */

header('Content-Type: application/json');

$debug = [
    'php_version' => phpversion(),
    'timestamp' => date('Y-m-d H:i:s'),
    'server_name' => $_SERVER['HTTP_HOST'] ?? 'unknown',
];

// Check if config can be loaded
ob_start();
try {
    require_once 'config.php';
    ob_get_clean();

    $debug['config_loaded'] = 'yes';
    $debug['db_host'] = DB_HOST;
    $debug['db_name'] = DB_NAME;
    $debug['db_user'] = DB_USER;
    $debug['compatibility_functions'] = [
        'str_starts_with' => function_exists('str_starts_with'),
        'str_ends_with' => function_exists('str_ends_with'),
        'str_contains' => function_exists('str_contains'),
    ];

    // Try database connection
    try {
        $pdo = getDbConnection();
        $debug['database_connected'] = 'yes';

        // Check tables
        foreach (['categories', 'cf_products', 'product_categories'] as $table) {
            try {
                $count = $pdo->query("SELECT COUNT(*) as cnt FROM $table")->fetch()['cnt'];
                $debug["table_$table"] = "exists with $count rows";
            } catch (Exception $e) {
                $debug["table_$table"] = "error: " . $e->getMessage();
            }
        }

        // Try get_products query
        try {
            $stmt = $pdo->prepare("SELECT COUNT(*) as cnt FROM cf_products WHERE active = 1");
            $stmt->execute();
            $result = $stmt->fetch();
            $debug['active_products'] = $result['cnt'] ?? 0;
        } catch (Exception $e) {
            $debug['products_error'] = $e->getMessage();
        }

    } catch (Exception $e) {
        $debug['database_error'] = $e->getMessage();
        $debug['database_connected'] = 'no';
    }

} catch (Throwable $e) {
    ob_get_clean();
    $debug['config_error'] = $e->getMessage();
    $debug['config_loaded'] = 'no';
}

echo json_encode($debug, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);
?>
