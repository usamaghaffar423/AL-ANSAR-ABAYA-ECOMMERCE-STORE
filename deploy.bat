@echo off
REM FTP Deployment Script for Windows
REM Run this file to deploy to Hostinger via FTP

echo.
echo ========================================
echo     🚀 FTP Deployment to Hostinger
echo ========================================
echo.

REM Check if PHP is available
where php >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ PHP is not installed or not in PATH
    pause
    exit /b 1
)

REM Run the PHP deployment script
php deploy-ftp.php

echo.
pause
