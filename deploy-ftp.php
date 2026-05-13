<?php
/**
 * FTP Deployment Script
 * Run locally: php deploy-ftp.php
 * Uploads files to Hostinger via FTP
 */

// ── FTP Configuration ─────────────────────────────────────────────
$ftp_host = '82.112.239.120';
$ftp_user = 'u463999436_linen-bee-50990.hostingsite.com';
$ftp_pass = 'Abaya@9911323!'; // Change this!
$ftp_port = 21;
$remote_dir = '/public_html';

// Local directories to deploy (API is excluded - managed separately on Hostinger)
$deploy_dirs = [
    'dist' => '/dist'
];

$files_to_deploy = [
    'package.json',
    'vite.config.js',
    'tailwind.config.js',
    'postcss.config.js',
    'eslint.config.js',
    'deploy.php',
    'deploy-ftp.php',
    '.htaccess',
    'index.html'
];

echo "🚀 Starting FTP Deployment...\n";
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n";

// ── Connect to FTP ────────────────────────────────────────────────
$ftp_conn = @ftp_connect($ftp_host, $ftp_port, 10);
if (!$ftp_conn) {
    echo "❌ Failed to connect to FTP server\n";
    exit(1);
}

// ── Login ──────────────────────────────────────────────────────────
if (!@ftp_login($ftp_conn, $ftp_user, $ftp_pass)) {
    echo "❌ FTP login failed. Check credentials!\n";
    ftp_close($ftp_conn);
    exit(1);
}

echo "✅ Connected to FTP\n";
ftp_pasv($ftp_conn, true); // Enable passive mode

$uploaded = 0;
$skipped = 0;
$failed = 0;

// ── Upload individual files ────────────────────────────────────────
foreach ($files_to_deploy as $file) {
    if (!file_exists($file)) {
        echo "⊘ Skipped: $file (not found)\n";
        $skipped++;
        continue;
    }

    $remote_file = $remote_dir . '/' . $file;

    if (@ftp_put($ftp_conn, $remote_file, $file, FTP_BINARY)) {
        echo "✅ Uploaded: $file\n";
        $uploaded++;
    } else {
        echo "❌ Failed: $file\n";
        $failed++;
    }
}

// ── Upload directories recursively ─────────────────────────────────
foreach ($deploy_dirs as $local_dir => $remote_subdir) {
    if (!is_dir($local_dir)) {
        echo "⊘ Skipped: $local_dir/ (directory not found)\n";
        continue;
    }

    echo "\n📁 Uploading directory: $local_dir/\n";
    uploadDirectory($ftp_conn, $local_dir, $remote_dir . $remote_subdir, $uploaded, $failed);
}

// ── Summary ────────────────────────────────────────────────────────
echo "\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n";
echo "📊 Deployment Summary:\n";
echo "   ✅ Uploaded: $uploaded\n";
echo "   ❌ Failed: $failed\n";
echo "   ⊘ Skipped: $skipped\n";

if ($failed === 0) {
    echo "\n🎉 Deployment completed successfully!\n";
    echo "🌐 Site: https://linen-bee-509910.hostingersite.com\n";
} else {
    echo "\n⚠️  Deployment completed with errors\n";
}

ftp_close($ftp_conn);

// ── Helper function to upload directories recursively ────────────────
function uploadDirectory($ftp_conn, $local_path, $remote_path, &$uploaded, &$failed) {
    // Create remote directory if it doesn't exist
    @ftp_mkdir($ftp_conn, $remote_path);

    $files = scandir($local_path);

    foreach ($files as $file) {
        if ($file === '.' || $file === '..') continue;

        // Skip node_modules and git
        if ($file === 'node_modules' || $file === '.git' || $file === '.github') {
            continue;
        }

        $local_file = $local_path . '/' . $file;
        $remote_file = $remote_path . '/' . $file;

        if (is_dir($local_file)) {
            uploadDirectory($ftp_conn, $local_file, $remote_file, $uploaded, $failed);
        } else {
            if (@ftp_put($ftp_conn, $remote_file, $local_file, FTP_BINARY)) {
                echo "   ✅ $local_file\n";
                $uploaded++;
            } else {
                echo "   ❌ $local_file\n";
                $failed++;
            }
        }
    }
}
?>
