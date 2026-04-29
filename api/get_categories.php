<?php
/**
 * GET Categories — returns hierarchical category structure.
 * Returns: [{id, name, slug, parent_id?, children?}]
 */

require_once 'config.php';
header('Content-Type: application/json');

try {
    // Hardcoded category hierarchy
    $categories = [
        [
            'id'        => 1,
            'name'      => 'Edenrobe',
            'slug'      => 'edenrobe',
            'parent_id' => null,
            'children'  => [
                [
                    'id'        => 11,
                    'name'      => 'Printed Lawn',
                    'slug'      => 'edenrobe-printed-lawn',
                    'parent_id' => 1,
                ],
                [
                    'id'        => 12,
                    'name'      => 'Premium & Festive Collection',
                    'slug'      => 'edenrobe-premium-festive',
                    'parent_id' => 1,
                ],
            ],
        ],
        [
            'id'        => 2,
            'name'      => 'Fragrance',
            'slug'      => 'fragrance',
            'parent_id' => null,
            'children'  => [
                [
                    'id'        => 21,
                    'name'      => 'Edenrobe',
                    'slug'      => 'fragrance-edenrobe',
                    'parent_id' => 2,
                ],
                [
                    'id'        => 22,
                    'name'      => 'Imported',
                    'slug'      => 'fragrance-imported',
                    'parent_id' => 2,
                ],
            ],
        ],
        [
            'id'        => 3,
            'name'      => 'Imported Bags',
            'slug'      => 'imported-bags',
            'parent_id' => null,
            'children'  => [],
        ],
        [
            'id'        => 4,
            'name'      => 'Watches',
            'slug'      => 'watches',
            'parent_id' => null,
            'children'  => [],
        ],
    ];

    echo json_encode($categories);

} catch (\Throwable $e) {
    error_log('get_categories error: ' . $e->getMessage());
    http_response_code(500);
    echo json_encode(['error' => 'Failed to load categories.']);
}
?>
