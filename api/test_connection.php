<?php
/**
 * Database Connection Diagnostic
 * Shows detailed connection errors
 */

// Check if we're in production or local
$host = $_SERVER['HTTP_HOST'] ?? 'localhost';
$isProduction = !in_array(strtolower(explode(':', $host)[0]), ['localhost', '127.0.0.1', '::1']);

echo "🔍 Database Connection Diagnostic\n";
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n";
echo "Environment: " . ($isProduction ? "PRODUCTION (Hostinger)" : "LOCAL") . "\n";
echo "Host: " . $host . "\n\n";

// Test connection with detailed error reporting
try {
    if ($isProduction) {
        $db_host = getenv('DB_HOST') ?: '193.203.184.155';
        $db_user = getenv('DB_USER') ?: 'u463999436_alansarabaya';
        $db_pass = getenv('DB_PASS') ?: 'Abaya@9911323!';
        $db_name = getenv('DB_NAME') ?: 'u463999436_alansarabaya';
    } else {
        $db_host = 'localhost';
        $db_user = 'root';
        $db_pass = '';
        $db_name = 'u463999436_alansarabaya';
    }

    echo "📝 Credentials:\n";
    echo "   Host: $db_host\n";
    echo "   User: $db_user\n";
    echo "   Password: " . (strlen($db_pass) > 0 ? "●●●●●●●●●" : "(empty)") . "\n";
    echo "   Database: $db_name\n\n";

    echo "🔗 Attempting connection...\n";

    $dsn = "mysql:host=$db_host;dbname=$db_name;charset=utf8mb4";
    $pdo = new PDO($dsn, $db_user, $db_pass, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    ]);

    echo "✅ Connection successful!\n\n";

    // Check tables
    echo "📊 Database tables:\n";
    $stmt = $pdo->query("SHOW TABLES");
    $tables = $stmt->fetchAll(PDO::FETCH_COLUMN);
    foreach ($tables as $table) {
        $count = $pdo->query("SELECT COUNT(*) as c FROM `$table`")->fetch()['c'];
        echo "   ✓ $table ($count rows)\n";
    }

} catch (\PDOException $e) {
    echo "❌ Connection failed!\n\n";
    echo "Error: " . $e->getMessage() . "\n\n";
    echo "🔧 Troubleshooting:\n";

    $error = $e->getMessage();
    if (strpos($error, 'Unknown database') !== false) {
        echo "   → Database doesn't exist on server\n";
        echo "   → Create database first via Hostinger cPanel\n";
    } elseif (strpos($error, 'Access denied') !== false) {
        echo "   → Wrong username or password\n";
        echo "   → Verify credentials in config.php\n";
    } elseif (strpos($error, 'Connection refused') !== false) {
        echo "   → Can't reach database server\n";
        echo "   → Check host IP and port\n";
    } else {
        echo "   → " . $error . "\n";
    }
}
?>
