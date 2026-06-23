<?php
/**
 * GET Categories — returns hierarchical category structure from database.
 * Returns: [{id, name, slug, parent_id, children?: [...]}]
 * Optional query param: ?flat=1 to get flat list, ?parent_id=N for subcategories only
 */

require_once 'config.php';
header('Content-Type: application/json');

try {
    $pdo = getDbConnection();

    // Auto-initialize category tables if they don't exist
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

    $pdo->exec("CREATE TABLE IF NOT EXISTS product_categories (
        product_id   INT NOT NULL,
        category_id  INT NOT NULL,
        PRIMARY KEY (product_id, category_id),
        FOREIGN KEY (product_id) REFERENCES cf_products(id) ON DELETE CASCADE,
        FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4");

    // Check if categories are empty, if so, seed them
    $count = $pdo->query("SELECT COUNT(*) FROM categories")->fetchColumn();
    if ($count == 0) {
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

    $flat = isset($_GET['flat']) && $_GET['flat'] == '1';
    $parent_filter = isset($_GET['parent_id']) ? (int)$_GET['parent_id'] : null;

    // Get all categories
    $sql = "SELECT id, name, slug, parent_id, sort_order FROM categories WHERE active = 1";
    if ($parent_filter !== null) {
        $sql .= " AND parent_id " . ($parent_filter === 0 ? "IS NULL" : "= " . $parent_filter);
    }
    $sql .= " ORDER BY sort_order ASC, name ASC";

    $stmt = $pdo->query($sql);
    $all_cats = $stmt->fetchAll(\PDO::FETCH_ASSOC);

    if ($flat) {
        echo json_encode($all_cats);
    } else {
        // Build hierarchical structure
        $indexed = [];
        $roots = [];

        foreach ($all_cats as $cat) {
            $cat['id'] = (int)$cat['id'];
            $cat['parent_id'] = $cat['parent_id'] ? (int)$cat['parent_id'] : null;
            $cat['children'] = [];
            $indexed[$cat['id']] = $cat;
            if (!$cat['parent_id']) {
                $roots[] = &$indexed[$cat['id']];
            }
        }

        foreach ($all_cats as $cat) {
            if ($cat['parent_id']) {
                $indexed[$cat['parent_id']]['children'][] = &$indexed[$cat['id']];
            }
        }

        echo json_encode($roots);
    }

} catch (\Throwable $e) {
    error_log('get_categories error: ' . $e->getMessage() . ' | File: ' . $e->getFile() . ' | Line: ' . $e->getLine());
    http_response_code(500);
    echo json_encode([
        'error' => 'Failed to load categories.',
        'message' => $e->getMessage(),
        'file' => basename($e->getFile()),
        'line' => $e->getLine()
    ]);
}
?>
