<?php
/**
 * Initialize Category System
 * Creates hierarchical categories table and product_categories junction table
 * Run once to set up the new category structure
 */

require_once 'config.php';
header('Content-Type: application/json');

try {
    $pdo = getDbConnection();

    // ── Create categories table ────────────────────────────────────────────
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

    // ── Create product_categories junction table ────────────────────────────
    $pdo->exec("CREATE TABLE IF NOT EXISTS product_categories (
        product_id   INT NOT NULL,
        category_id  INT NOT NULL,
        PRIMARY KEY (product_id, category_id),
        FOREIGN KEY (product_id) REFERENCES cf_products(id) ON DELETE CASCADE,
        FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4");

    // ── Seed the new Al Ansar Abaya category structure ─────────────────────
    // Check if categories already exist
    $existing = $pdo->query("SELECT COUNT(*) FROM categories")->fetchColumn();

    if ($existing == 0) {
        // Main category: Simple Abayas
        $pdo->prepare("INSERT INTO categories (name, slug, parent_id, level, sort_order) VALUES (?, ?, ?, ?, ?)")
            ->execute(['Simple Abayas', 'simple-abayas', null, 0, 1]);
        $simple_id = (int)$pdo->lastInsertId();

        $pdo->prepare("INSERT INTO categories (name, slug, parent_id, level, sort_order) VALUES (?, ?, ?, ?, ?)")
            ->execute(['Open Abayas', 'open-abayas', $simple_id, 1, 1]);
        $pdo->prepare("INSERT INTO categories (name, slug, parent_id, level, sort_order) VALUES (?, ?, ?, ?, ?)")
            ->execute(['Maxi Simple Galla', 'maxi-simple-galla', $simple_id, 1, 2]);
        $pdo->prepare("INSERT INTO categories (name, slug, parent_id, level, sort_order) VALUES (?, ?, ?, ?, ?)")
            ->execute(['Maxi Cut Galla', 'maxi-cut-galla', $simple_id, 1, 3]);

        // Main category: Embroidered/Party Abayas
        $pdo->prepare("INSERT INTO categories (name, slug, parent_id, level, sort_order) VALUES (?, ?, ?, ?, ?)")
            ->execute(['Embroidered/Party Abayas', 'embroidered-party-abayas', null, 0, 2]);
        $party_id = (int)$pdo->lastInsertId();

        $pdo->prepare("INSERT INTO categories (name, slug, parent_id, level, sort_order) VALUES (?, ?, ?, ?, ?)")
            ->execute(['Straight open abayas', 'straight-open-abayas', $party_id, 1, 1]);
        $pdo->prepare("INSERT INTO categories (name, slug, parent_id, level, sort_order) VALUES (?, ?, ?, ?, ?)")
            ->execute(['Zoom fabric abayas', 'zoom-fabric-abayas', $party_id, 1, 2]);
        $pdo->prepare("INSERT INTO categories (name, slug, parent_id, level, sort_order) VALUES (?, ?, ?, ?, ?)")
            ->execute(['Nida Fabrics Abayas', 'nida-fabrics-abayas', $party_id, 1, 3]);

        // Main category: Handmade
        $pdo->prepare("INSERT INTO categories (name, slug, parent_id, level, sort_order) VALUES (?, ?, ?, ?, ?)")
            ->execute(['Handmade', 'handmade', null, 0, 3]);

        // Main category: Butterfly
        $pdo->prepare("INSERT INTO categories (name, slug, parent_id, level, sort_order) VALUES (?, ?, ?, ?, ?)")
            ->execute(['Butterfly', 'butterfly', null, 0, 4]);

        // Main category: Double Shirt Abayas
        $pdo->prepare("INSERT INTO categories (name, slug, parent_id, level, sort_order) VALUES (?, ?, ?, ?, ?)")
            ->execute(['Double Shirt Abayas', 'double-shirt-abayas', null, 0, 5]);

        echo json_encode(['success' => true, 'message' => 'Category structure initialized successfully']);
    } else {
        echo json_encode(['success' => true, 'message' => 'Categories already exist']);
    }

} catch (\Throwable $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Setup failed: ' . $e->getMessage()]);
}
?>
