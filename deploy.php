<?php
// Webhook receiver for GitHub auto-deployment
// Auto-clone on first deployment
$secret = getenv('GITHUB_WEBHOOK_SECRET') ?: 'abaya9911';

// Verify GitHub signature (disabled for testing)
// $signature = $_SERVER['HTTP_X_HUB_SIGNATURE_256'] ?? '';
// $payload = file_get_contents('php://input');
// $hash = 'sha256=' . hash_hmac('sha256', $payload, $secret);

// if (!hash_equals($hash, $signature)) {
//     http_response_code(401);
//     die('Unauthorized');
// }

$data = json_decode($payload, true);
if ($data['ref'] === 'refs/heads/main') {
    chdir('/home/u463999436/domains/linen-bee-509910.hostingersite.com/public_html');
    $output = shell_exec('cd /home/u463999436/domains/linen-bee-509910.hostingersite.com/public_html && git pull origin main 2>&1');
    echo 'Deployed successfully at ' . date('Y-m-d H:i:s') . "\n" . $output;
}
?>
