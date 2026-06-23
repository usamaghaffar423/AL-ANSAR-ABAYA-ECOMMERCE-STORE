<?php
/**
 * MINIMAL TEST - Shows the REAL problem
 * Access: https://linen-bee-509910.hostingersite.com/api/test.php
 */

echo "=== HOSTINGER SERVER DIAGNOSIS ===\n\n";

// 1. PHP VERSION
echo "1. PHP VERSION:\n";
echo "   " . phpversion() . "\n\n";

// 2. PDO AVAILABLE?
echo "2. PDO DRIVER:\n";
if (extension_loaded('pdo_mysql')) {
    echo "   ✓ PDO MySQL available\n\n";
} else {
    echo "   ✗ PDO MySQL NOT available - THIS IS THE PROBLEM\n\n";
    die("PDO MySQL extension is not installed on this server!");
}

// 3. DATABASE CREDENTIALS
echo "3. DATABASE CONFIGURATION:\n";
echo "   Host: mysql123.hostinger.com\n";
echo "   User: u463999436_alansarabaya\n";
echo "   Database: u463999436_alansarabaya\n";
echo "   Password: [hidden]\n\n";

// 4. TRY RAW DATABASE CONNECTION
echo "4. ATTEMPTING DATABASE CONNECTION:\n";
try {
    $pdo = new PDO(
        'mysql:host=mysql123.hostinger.com;dbname=u463999436_alansarabaya;charset=utf8mb4',
        'u463999436_alansarabaya',
        'Abaya@9911323!',
        [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_TIMEOUT => 5,
        ]
    );
    echo "   ✓ Connected successfully!\n\n";

    // 5. CHECK TABLES
    echo "5. CHECKING DATABASE TABLES:\n";
    $tables = ['categories', 'cf_products', 'product_categories', 'user_sessions'];
    foreach ($tables as $table) {
        try {
            $result = $pdo->query("SELECT COUNT(*) as cnt FROM $table")->fetch();
            echo "   ✓ $table: " . $result['cnt'] . " rows\n";
        } catch (Exception $e) {
            echo "   ✗ $table: DOES NOT EXIST\n";
        }
    }
    echo "\n";

    // 6. TRY ACTUAL QUERY
    echo "6. TESTING GET_PRODUCTS QUERY:\n";
    try {
        $sql = "SELECT DISTINCT p.* FROM cf_products p LEFT JOIN product_categories pc ON p.id = pc.product_id WHERE p.active = 1 ORDER BY p.sort_order ASC, p.featured DESC, p.created_at DESC LIMIT 10";
        $result = $pdo->query($sql);
        $products = $result->fetchAll();
        echo "   ✓ Query successful! Found " . count($products) . " products\n\n";

        if (count($products) > 0) {
            echo "7. SAMPLE PRODUCT:\n";
            $p = $products[0];
            echo "   ID: " . $p['id'] . "\n";
            echo "   Name: " . $p['name'] . "\n";
            echo "   Price: " . $p['price'] . "\n";
            echo "   Image: " . $p['image'] . "\n";
        }
    } catch (Exception $e) {
        echo "   ✗ Query failed: " . $e->getMessage() . "\n";
    }

} catch (PDOException $e) {
    echo "   ✗ CONNECTION FAILED\n";
    echo "   Error: " . $e->getMessage() . "\n";
    echo "   Code: " . $e->getCode() . "\n\n";
    echo "POSSIBLE CAUSES:\n";
    echo "   - Wrong host/port\n";
    echo "   - Wrong username/password\n";
    echo "   - Database doesn't exist\n";
    echo "   - Network/firewall blocking connection\n";
    echo "   - MySQL user doesn't have proper permissions\n";
}
?>
