<?php
/**
 * GET Products — reads from the simple cf_products flat table.
 * Returns field names matching the existing frontend expectations:
 *   id, title, price, retail_price, discount_pct, image_url,
 *   category, is_trending, stock_status, description, short_description
 *
 * Auto-creates the cf_products table if it doesn't exist yet.
 */

require_once 'config.php';
header('Content-Type: application/json');

try {
    $pdo = getDbConnection();

    // Auto-create product table on first use
    $pdo->exec("CREATE TABLE IF NOT EXISTS cf_products (
        id          INT AUTO_INCREMENT PRIMARY KEY,
        name        VARCHAR(255)   NOT NULL,
        category    VARCHAR(100)   NOT NULL DEFAULT 'General',
        price       DECIMAL(10,2)  NOT NULL,
        old_price   DECIMAL(10,2)  DEFAULT NULL,
        description TEXT,
        image       VARCHAR(500)   DEFAULT '',
        sizes       VARCHAR(200)   DEFAULT '',
        colors      VARCHAR(200)   DEFAULT '',
        stock       INT            NOT NULL DEFAULT 0,
        featured    TINYINT(1)     NOT NULL DEFAULT 0,
        active      TINYINT(1)     NOT NULL DEFAULT 1,
        sort_order  INT            NOT NULL DEFAULT 0,
        created_at  TIMESTAMP      DEFAULT CURRENT_TIMESTAMP,
        updated_at  TIMESTAMP      DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4");

    // Auto-create categories table (should exist from get_categories.php)
    $pdo->exec("CREATE TABLE IF NOT EXISTS categories (
        id          INT AUTO_INCREMENT PRIMARY KEY,
        name        VARCHAR(255)   NOT NULL,
        slug        VARCHAR(255)   UNIQUE NOT NULL,
        parent_id   INT            DEFAULT NULL,
        level       INT            DEFAULT 0,
        sort_order  INT            NOT NULL DEFAULT 0,
        active      TINYINT(1)     NOT NULL DEFAULT 1,
        created_at  TIMESTAMP      DEFAULT CURRENT_TIMESTAMP,
        updated_at  TIMESTAMP      DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (parent_id) REFERENCES categories(id) ON DELETE SET NULL
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4");

    // Auto-create product_categories junction table
    $pdo->exec("CREATE TABLE IF NOT EXISTS product_categories (
        product_id   INT NOT NULL,
        category_id  INT NOT NULL,
        PRIMARY KEY (product_id, category_id),
        FOREIGN KEY (product_id) REFERENCES cf_products(id) ON DELETE CASCADE,
        FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4");

    // Auto-create product_images table
    $pdo->exec("CREATE TABLE IF NOT EXISTS product_images (
        id INT AUTO_INCREMENT PRIMARY KEY,
        product_id INT NOT NULL,
        image_url VARCHAR(500) NOT NULL,
        alt_text VARCHAR(255),
        sort_order INT DEFAULT 0,
        FOREIGN KEY (product_id) REFERENCES cf_products(id) ON DELETE CASCADE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4");

    // Seed sample products if empty or if categories missing
    try {
        // First ensure categories exist
        $catCount = (int)$pdo->query("SELECT COUNT(*) FROM categories")->fetchColumn();
        if ($catCount == 0) {
            // Seed Al Ansar Abaya categories
            $pdo->prepare("INSERT INTO categories (name, slug, parent_id, level, sort_order) VALUES (?, ?, ?, ?, ?)")
                ->execute(['Simple Abayas', 'simple-abayas', null, 0, 1]);
            $simple_id = (int)$pdo->lastInsertId();

            $pdo->prepare("INSERT INTO categories (name, slug, parent_id, level, sort_order) VALUES (?, ?, ?, ?, ?)")
                ->execute(['Open Abayas', 'open-abayas', $simple_id, 1, 1]);
            $pdo->prepare("INSERT INTO categories (name, slug, parent_id, level, sort_order) VALUES (?, ?, ?, ?, ?)")
                ->execute(['Maxi Simple Galla', 'maxi-simple-galla', $simple_id, 1, 2]);
            $pdo->prepare("INSERT INTO categories (name, slug, parent_id, level, sort_order) VALUES (?, ?, ?, ?, ?)")
                ->execute(['Maxi Cut Galla', 'maxi-cut-galla', $simple_id, 1, 3]);

            $pdo->prepare("INSERT INTO categories (name, slug, parent_id, level, sort_order) VALUES (?, ?, ?, ?, ?)")
                ->execute(['Embroidered/Party Abayas', 'embroidered-party-abayas', null, 0, 2]);
            $party_id = (int)$pdo->lastInsertId();

            $pdo->prepare("INSERT INTO categories (name, slug, parent_id, level, sort_order) VALUES (?, ?, ?, ?, ?)")
                ->execute(['Straight open abayas', 'straight-open-abayas', $party_id, 1, 1]);
            $pdo->prepare("INSERT INTO categories (name, slug, parent_id, level, sort_order) VALUES (?, ?, ?, ?, ?)")
                ->execute(['Zoom fabric abayas', 'zoom-fabric-abayas', $party_id, 1, 2]);
            $pdo->prepare("INSERT INTO categories (name, slug, parent_id, level, sort_order) VALUES (?, ?, ?, ?, ?)")
                ->execute(['Nida Fabrics Abayas', 'nida-fabrics-abayas', $party_id, 1, 3]);

            $pdo->prepare("INSERT INTO categories (name, slug, parent_id, level, sort_order) VALUES (?, ?, ?, ?, ?)")
                ->execute(['Handmade', 'handmade', null, 0, 3]);

            $pdo->prepare("INSERT INTO categories (name, slug, parent_id, level, sort_order) VALUES (?, ?, ?, ?, ?)")
                ->execute(['Butterfly', 'butterfly', null, 0, 4]);

            $pdo->prepare("INSERT INTO categories (name, slug, parent_id, level, sort_order) VALUES (?, ?, ?, ?, ?)")
                ->execute(['Double Shirt Abayas', 'double-shirt-abayas', null, 0, 5]);
        }

        // Now check product count
        $stmt = $pdo->prepare("SELECT COUNT(*) as cnt FROM cf_products");
        $stmt->execute();
        $result = $stmt->fetch();
        $count = (int)($result['cnt'] ?? 0);

        // Seed if empty OR if product_categories is also empty (fresh start)
        $prodCatCount = 0;
        try {
            $prodCatStmt = $pdo->prepare("SELECT COUNT(*) as cnt FROM product_categories");
            $prodCatStmt->execute();
            $prodCatResult = $prodCatStmt->fetch();
            $prodCatCount = (int)($prodCatResult['cnt'] ?? 0);
        } catch (\Throwable $e) {}

        if ($count == 0 || $prodCatCount == 0) {
            // Fresh start - clear and reseed
            if ($count > 0 || $prodCatCount > 0) {
                $pdo->exec("TRUNCATE TABLE product_categories");
                $pdo->exec("TRUNCATE TABLE cf_products");
            }
            $products = [
                ['Black Abaya', 'Elegant black abaya with delicate embroidery', 45.99, 65.00, 'images/products/black-abaya.jpg', 1, 25, 'Abayas'],
                ['Navy Blue Abaya', 'Navy blue premium quality abaya', 52.99, 75.00, 'images/products/navy-abaya.jpg', 1, 30, 'Abayas'],
                ['Burgundy Abaya', 'Rich burgundy abaya with gold detailing', 55.99, 80.00, 'images/products/burgundy-abaya.jpg', 1, 20, 'Abayas'],
                ['Green Abaya', 'Forest green traditional abaya', 48.99, 70.00, 'images/products/green-abaya.jpg', 1, 15, 'Abayas'],
                ['Embroidered Black Abaya', 'Black abaya with intricate gold embroidery', 65.99, 95.00, 'images/products/embroidered-black.jpg', 1, 12, 'Abayas'],
                ['Silk Black Abaya', 'Premium silk black abaya', 72.99, 105.00, 'images/products/silk-black.jpg', 1, 8, 'Abayas'],
                ['Modern Black Abaya', 'Contemporary style black abaya', 42.99, 60.00, 'images/products/modern-black.jpg', 1, 40, 'Abayas'],
                ['Casual Black Abaya', 'Everyday wear black abaya', 38.99, 55.00, 'images/products/casual-black.jpg', 1, 50, 'Abayas'],
            ];

            $insert = $pdo->prepare("INSERT INTO cf_products (name, description, price, old_price, image, featured, stock, category) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
            $productIds = [];
            foreach ($products as $p) {
                $insert->execute($p);
                $productIds[] = $pdo->lastInsertId();
            }

            // Link products to categories
            $linkStmt = $pdo->prepare("INSERT INTO product_categories (product_id, category_id) VALUES (?, ?)");
            $categoryLinks = [
                [1, 1], [1, 4],
                [2, 1], [2, 5],
                [3, 2],
                [4, 3],
                [5, 1], [5, 6],
                [6, 4], [6, 7],
                [7, 5], [7, 8],
                [8, 6], [8, 9],
            ];
            foreach ($categoryLinks as $link) {
                $linkStmt->execute($link);
            }
            error_log('Seeded ' . count($productIds) . ' sample products');
        }
    } catch (\Throwable $seedError) {
        error_log('Seed error: ' . $seedError->getMessage());
    }

    // ── Image base URL ───────────────────────────────────────────────────
    $protocol  = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') ? 'https' : 'http';
    $host      = $_SERVER['HTTP_HOST'] ?? 'localhost';
    $root      = rtrim(dirname(dirname($_SERVER['SCRIPT_NAME'] ?? '/api/')), '/');
    $imageBase = $protocol . '://' . $host . $root . '/';

    // ── Params ───────────────────────────────────────────────────────────
    $id          = isset($_GET['id'])           ? (int)$_GET['id']              : null;
    $category_id = isset($_GET['category_id']) && $_GET['category_id'] !== 'All'
                       ? (int)$_GET['category_id'] : null;
    $search      = isset($_GET['search'])       ? trim($_GET['search'])          : null;
    $trending    = isset($_GET['trending'])     && $_GET['trending'] === '1';
    $limit       = isset($_GET['limit'])        ? min((int)$_GET['limit'], 500)  : 100;

    // ── Query ────────────────────────────────────────────────────────────
    $sql    = "SELECT DISTINCT p.* FROM cf_products p LEFT JOIN product_categories pc ON p.id = pc.product_id WHERE p.active = 1";
    $params = [];

    if ($id) {
        $sql .= " AND p.id = ?";
        $params[] = $id;
    }
    if ($category_id) {
        $sql .= " AND pc.category_id = ?";
        $params[] = $category_id;
    }
    if ($search) {
        $sql .= " AND (p.name LIKE ? OR p.description LIKE ?)";
        $params = array_merge($params, ["%$search%", "%$search%"]);
    }
    if ($trending) {
        $sql .= " AND p.featured = 1";
    }

    $sql .= " ORDER BY p.sort_order ASC, p.featured DESC, p.created_at DESC";

    if (!$id) {
        $sql .= " LIMIT ?";
        $params[] = $limit;
    }

    $stmt = $pdo->prepare($sql);
    $stmt->execute($params);
    $rows = $stmt->fetchAll();

    // ── Normalise to existing frontend field format ───────────────────────
    $products = [];
    foreach ($rows as $r) {
        $price     = (float)$r['price'];
        $oldPrice  = $r['old_price'] ? (float)$r['old_price'] : $price;
        $discount  = ($oldPrice > $price) ? round((($oldPrice - $price) / $oldPrice) * 100) : 0;

        // Resolve relative image path
        $img = $r['image'] ?? '';
        if ($img && !str_starts_with($img, 'http')) {
            $img = $imageBase . ltrim($img, '/');
        }

        // Get category IDs for this product
        $cat_stmt = $pdo->prepare("SELECT category_id FROM product_categories WHERE product_id = ? ORDER BY category_id");
        $cat_stmt->execute([(int)$r['id']]);
        $category_ids = array_map('intval', array_column($cat_stmt->fetchAll(), 'category_id'));

        $products[] = [
            'id'                => (int)$r['id'],
            'title'             => $r['name'],
            'price'             => $price,
            'retail_price'      => $oldPrice,
            'discount_pct'      => $discount,
            'image_url'         => $img,
            'category'          => $r['category'],
            'category_ids'      => $category_ids,
            'is_trending'       => (bool)$r['featured'],
            'stock_status'      => ((int)$r['stock'] > 0) ? 'in_stock' : 'out_of_stock',
            'stock_quantity'    => (int)$r['stock'],
            'description'       => $r['description'] ?? '',
            'short_description' => mb_strimwidth($r['description'] ?? '', 0, 120, '…'),
            'sizes'             => $r['sizes'] ?? '',
            'colors'            => $r['colors'] ?? '',
            'slug'              => '',
            'brand_name'        => '',
            'free_shipping'     => false,
            'shipping_cost'     => 0,
            'created_at'        => $r['created_at'],
        ];
    }

    echo json_encode($products);

} catch (\Throwable $e) {
    error_log('get_products error: ' . $e->getMessage());
    http_response_code(500);
    echo json_encode(['error' => 'Failed to load products. Please try again.']);
}
?>
