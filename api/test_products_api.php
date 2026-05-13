<?php
/**
 * Test Products API - Verifies products are being returned correctly
 * Access via: https://linen-bee-509910.hostingersite.com/api/test_products_api.php
 */

require_once 'config.php';
header('Content-Type: application/json');

try {
    $pdo = getDbConnection();

    $response = [
        'status' => 'success',
        'environment' => $isProduction ? 'PRODUCTION (Hostinger)' : 'LOCAL',
        'timestamp' => date('Y-m-d H:i:s'),
    ];

    // 1. Check if cf_products table exists and has data
    $stmt = $pdo->query("SELECT COUNT(*) as count FROM cf_products");
    $totalProducts = (int)$stmt->fetch(PDO::FETCH_ASSOC)['count'];

    $response['cf_products_total'] = $totalProducts;

    // 2. Get sample products with all fields
    $stmt = $pdo->query("SELECT * FROM cf_products LIMIT 3");
    $sampleProducts = $stmt->fetchAll(PDO::FETCH_ASSOC);

    $response['sample_products_raw'] = $sampleProducts;

    // 3. Simulate the API response format
    $protocol  = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') ? 'https' : 'http';
    $host      = $_SERVER['HTTP_HOST'] ?? 'localhost';
    $root      = rtrim(dirname(dirname($_SERVER['SCRIPT_NAME'] ?? '/api/')), '/');
    $imageBase = $protocol . '://' . $host . $root . '/';

    $response['computed_image_base_url'] = $imageBase;

    // 4. Transform products to API format
    $apiFormattedProducts = [];
    foreach ($sampleProducts as $r) {
        $price     = (float)$r['price'];
        $oldPrice  = $r['old_price'] ? (float)$r['old_price'] : $price;
        $discount  = ($oldPrice > $price) ? round((($oldPrice - $price) / $oldPrice) * 100) : 0;

        $img = $r['image'] ?? '';
        if ($img && !str_starts_with($img, 'http')) {
            $img = $imageBase . ltrim($img, '/');
        }

        $apiFormattedProducts[] = [
            'id'                => (int)$r['id'],
            'title'             => $r['name'],
            'price'             => $price,
            'retail_price'      => $oldPrice,
            'discount_pct'      => $discount,
            'image_url'         => $img,
            'category'          => $r['category'],
            'is_trending'       => (bool)$r['featured'],
            'stock_status'      => ((int)$r['stock'] > 0) ? 'in_stock' : 'out_of_stock',
        ];
    }

    $response['sample_products_api_format'] = $apiFormattedProducts;

    // 5. Check categories in database
    $stmt = $pdo->query("SELECT DISTINCT category FROM cf_products");
    $dbCategories = $stmt->fetchAll(PDO::FETCH_COLUMN);
    $response['categories_in_database'] = $dbCategories;

    // 6. Verify image data
    $stmt = $pdo->query("SELECT id, name, image, image IS NOT NULL AND image != '' as has_image FROM cf_products");
    $imageStatus = $stmt->fetchAll(PDO::FETCH_ASSOC);
    $response['product_image_status'] = $imageStatus;

    echo json_encode($response, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);

} catch (\Throwable $e) {
    http_response_code(500);
    echo json_encode([
        'status' => 'error',
        'error' => $e->getMessage(),
        'environment' => $isProduction ? 'PRODUCTION' : 'LOCAL'
    ]);
}
?>
