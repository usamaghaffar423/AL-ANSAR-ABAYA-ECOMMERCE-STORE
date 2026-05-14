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
    error_log('get_categories error: ' . $e->getMessage());
    http_response_code(500);
    echo json_encode(['error' => 'Failed to load categories.']);
}
?>
