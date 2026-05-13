<?php
// Webhook receiver for GitHub auto-deployment
$secret = getenv('GITHUB_WEBHOOK_SECRET') ?: 'abaya9911';

// Verify GitHub signature
$signature = $_SERVER['HTTP_X_HUB_SIGNATURE_256'] ?? '';
$payload = file_get_contents('php://input');
$hash = 'sha256=' . hash_hmac('sha256', $payload, $secret);

if (!hash_equals($hash, $signature)) {
    http_response_code(401);
    die('Unauthorized');
}

$data = json_decode($payload, true);
if ($data['ref'] === 'refs/heads/main') {
    chdir('/home/u463999436/domains/alansarabayah.com/public_html');
    shell_exec('git pull origin main 2>&1');
    echo 'Deployed successfully';
}
?>
