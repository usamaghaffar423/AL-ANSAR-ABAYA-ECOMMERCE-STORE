<?php
/**
 * Sitemap Generator for Google Search Console
 *
 * Generates sitemap.xml from products, categories, and static pages
 * Runs on-demand or can be scheduled
 *
 * Usage:
 *   Direct call: GET /api/generate_sitemap.php
 *   Returns: JSON status
 */

require_once 'config.php';

header('Content-Type: application/json');

try {
    $pdo = getDbConnection();

    // Start XML sitemap
    $siteUrl = $isProduction
        ? 'https://alansarabaya.com'
        : 'http://localhost/ABAYA-AL-ANSAR-ECOMMERCE-STORE/abaya-ecommerce-store';

    $xml = '<?xml version="1.0" encoding="UTF-8"?>' . PHP_EOL;
    $xml .= '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' . PHP_EOL;

    // 1. Static pages (highest priority)
    $staticPages = [
        ['/', 1.0, 'weekly'],
        ['/shop', 0.9, 'weekly'],
        ['/contact', 0.7, 'monthly'],
    ];

    foreach ($staticPages as $page) {
        $xml .= buildSitemapUrl($siteUrl . $page[0], $page[1], $page[2], date('c'));
    }

    // 2. Categories
    $stmt = $pdo->query("
        SELECT id, name, updated_at
        FROM categories
        WHERE active = 1
        ORDER BY name
    ");

    while ($category = $stmt->fetch()) {
        $url = $siteUrl . '/shop?category=' . urlencode($category['name']);
        $lastmod = $category['updated_at'] ?? date('c');
        $xml .= buildSitemapUrl($url, 0.8, 'weekly', $lastmod);
    }

    // 3. Products (main content)
    $stmt = $pdo->query("
        SELECT id, name, updated_at
        FROM products
        WHERE active = 1
        ORDER BY id DESC
    ");

    $productCount = 0;
    while ($product = $stmt->fetch()) {
        $url = $siteUrl . '/product/' . $product['id'];
        $lastmod = $product['updated_at'] ?? date('c');
        $priority = $productCount < 50 ? 0.9 : 0.7; // Newer products higher priority
        $xml .= buildSitemapUrl($url, $priority, 'weekly', $lastmod);
        $productCount++;
    }

    // 4. Collections/Brands (if table exists)
    $collections = $pdo->query("
        SELECT name, updated_at FROM collections WHERE active = 1
    ")->fetchAll();

    if (!empty($collections)) {
        foreach ($collections as $collection) {
            $url = $siteUrl . '/shop?collection=' . urlencode($collection['name']);
            $lastmod = $collection['updated_at'] ?? date('c');
            $xml .= buildSitemapUrl($url, 0.75, 'weekly', $lastmod);
        }
    }

    $xml .= '</urlset>';

    // 5. Save sitemap to public folder
    $sitemapPath = __DIR__ . '/../public/sitemap.xml';
    $publicDir = dirname($sitemapPath);

    // Create public directory if it doesn't exist
    if (!is_dir($publicDir)) {
        mkdir($publicDir, 0755, true);
    }

    $written = file_put_contents($sitemapPath, $xml);

    if ($written === false) {
        throw new Exception("Failed to write sitemap.xml to $sitemapPath");
    }

    http_response_code(200);
    echo json_encode([
        'success' => true,
        'message' => "Sitemap generated successfully",
        'products' => $productCount,
        'path' => '/public/sitemap.xml',
        'url' => $siteUrl . '/public/sitemap.xml',
        'timestamp' => date('c')
    ]);

} catch (Exception $e) {
    http_response_code(500);
    error_log('Sitemap generation error: ' . $e->getMessage());
    echo json_encode([
        'success' => false,
        'error' => $e->getMessage()
    ]);
}

/**
 * Build a single sitemap URL entry
 */
function buildSitemapUrl($loc, $priority = 0.5, $changefreq = 'weekly', $lastmod = null) {
    $entry = "  <url>\n";
    $entry .= "    <loc>" . htmlspecialchars($loc) . "</loc>\n";

    if ($lastmod) {
        $entry .= "    <lastmod>" . date('c', strtotime($lastmod)) . "</lastmod>\n";
    }

    if ($changefreq) {
        $entry .= "    <changefreq>" . htmlspecialchars($changefreq) . "</changefreq>\n";
    }

    $entry .= "    <priority>" . number_format($priority, 1) . "</priority>\n";
    $entry .= "  </url>\n";

    return $entry;
}
?>
