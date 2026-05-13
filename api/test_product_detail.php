<?php
/**
 * Test Product Detail Endpoint
 * Verifies product detail data is correct for a specific ID
 */

require_once 'config.php';
header('Content-Type: application/json');

try {
    $pdo = getDbConnection();

    // Get first product ID
    $stmt = $pdo->query("SELECT id FROM cf_products LIMIT 1");
    $first = $stmt->fetch();
    $test_id = $first ? $first['id'] : 1;

    echo json_encode([
        'status' => 'Testing Product Detail',
        'test_product_id' => $test_id,
        'environment' => $isProduction ? 'PRODUCTION' : 'LOCAL',
    ]);

    echo "\n\n=== TESTING get_products.php?id={$test_id} ===\n\n";

    // Test get_products.php with ID
    $stmt = $pdo->prepare("SELECT * FROM cf_products WHERE id = ? AND active = 1");
    $stmt->execute([$test_id]);
    $product = $stmt->fetch();

    if ($product) {
        echo json_encode([
            'product_found' => true,
            'product_data' => [
                'id' => $product['id'],
                'title' => $product['name'],
                'category' => $product['category'],
                'price' => $product['price'],
                'image_url' => $product['image'],
                'stock_status' => $product['stock'] > 0 ? 'in_stock' : 'out_of_stock'
            ]
        ]);
    } else {
        echo json_encode(['product_found' => false, 'message' => 'Product not found']);
    }

    echo "\n\n=== TESTING get_product_images.php?product_id={$test_id} ===\n\n";

    // Test get_product_images.php
    $stmt = $pdo->prepare("SELECT * FROM product_images WHERE product_id = ?");
    $stmt->execute([$test_id]);
    $images = $stmt->fetchAll();

    echo json_encode([
        'images_found' => count($images),
        'images' => $images ?: [],
        'fallback_to_product_image' => $product ? true : false
    ]);

} catch (\Exception $e) {
    http_response_code(500);
    echo json_encode([
        'error' => $e->getMessage()
    ]);
}
?>
