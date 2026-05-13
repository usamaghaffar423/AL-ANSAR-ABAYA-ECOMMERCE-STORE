<?php
/**
 * Hostinger Database Test & Data Verification
 * Fetch all data and show relationships to verify DB is working
 */

require_once 'config.php';

header('Content-Type: application/json');

try {
    $pdo = getDbConnection();

    $response = [
        'status' => 'success',
        'message' => '✅ Hostinger Database Connection Working!',
        'timestamp' => date('Y-m-d H:i:s'),
        'environment' => $isProduction ? 'PRODUCTION (Hostinger)' : 'LOCAL',
        'database' => DB_NAME,
        'host' => DB_HOST,
        'tables' => [],
        'data' => []
    ];

    // Get all tables
    $tables = $pdo->query("SHOW TABLES")->fetchAll(PDO::FETCH_COLUMN);

    foreach ($tables as $table) {
        // Count rows
        $countStmt = $pdo->query("SELECT COUNT(*) as count FROM `$table`");
        $count = $countStmt->fetch(PDO::FETCH_ASSOC)['count'];

        $response['tables'][] = [
            'name' => $table,
            'rows' => (int)$count
        ];

        // Fetch sample data (limit 5 rows)
        $dataStmt = $pdo->query("SELECT * FROM `$table` LIMIT 5");
        $data = $dataStmt->fetchAll(PDO::FETCH_ASSOC);

        $response['data'][$table] = [
            'total_rows' => (int)$count,
            'sample_data' => $data
        ];
    }

    // Test specific critical data
    $response['verification'] = [
        'products' => (int)$pdo->query("SELECT COUNT(*) as c FROM products")->fetch(PDO::FETCH_ASSOC)['c'],
        'categories' => (int)$pdo->query("SELECT COUNT(*) as c FROM categories")->fetch(PDO::FETCH_ASSOC)['c'],
        'brands' => (int)$pdo->query("SELECT COUNT(*) as c FROM brands")->fetch(PDO::FETCH_ASSOC)['c'],
        'users' => (int)$pdo->query("SELECT COUNT(*) as c FROM users")->fetch(PDO::FETCH_ASSOC)['c'],
        'orders' => (int)$pdo->query("SELECT COUNT(*) as c FROM orders")->fetch(PDO::FETCH_ASSOC)['c'],
    ];

    echo json_encode($response, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);

} catch (\PDOException $e) {
    http_response_code(500);
    echo json_encode([
        'status' => 'error',
        'error' => $e->getMessage(),
        'environment' => $isProduction ? 'PRODUCTION' : 'LOCAL'
    ]);
}
?>
