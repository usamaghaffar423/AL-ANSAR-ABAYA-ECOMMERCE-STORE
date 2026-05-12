<?php
/**
 * GET Brands API
 * Returns all brands from the database.
 */

require_once 'config.php';

try {
    $pdo = getDbConnection();

    $stmt = $pdo->query("SELECT * FROM brands ORDER BY name ASC");
    $brands = $stmt->fetchAll();

    header('Content-Type: application/json');
    echo json_encode($brands);

} catch (\PDOException $e) {
    http_response_code(500);
    header('Content-Type: application/json');
    echo json_encode(['error' => 'Database error', 'message' => $e->getMessage()]);
}
?>
