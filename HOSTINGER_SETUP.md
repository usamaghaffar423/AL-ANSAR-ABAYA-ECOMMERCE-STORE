# 🏢 Hostinger Setup Instructions

Complete step-by-step guide to configure Hostinger for the Al Ansar Abaya Store backend.

---

## 1️⃣ Create Remote MySQL Database

### Access Hostinger Control Panel

1. Login to **hpanel.hostinger.com**
2. Navigate to **Databases** → **MySQL**
3. Click **"Create Database"**

### Database Details
- **Database Name:** `u463999436_alansarabaya` (or your assigned name)
- **Username:** `u463999436_alansarabaya` (usually auto-generated)
- **Password:** Create a strong password and save it

### Remote Access
1. Go to **Remote MySQL**
2. Click **"Enable Remote MySQL"**
3. Note the **MySQL Host** (usually `mysql123.hostinger.com`)

---

## 2️⃣ Upload Database Schema

### Option A: Using phpMyAdmin

1. In **Databases**, click **"phpMyAdmin"**
2. Select your database
3. Click **"Import"**
4. Upload the database SQL file with tables:
   - `products`
   - `categories`
   - `collections`
   - `brands`
   - `orders`
   - `users`
   - `user_sessions`
   - `product_images`

### Option B: Using Command Line (SSH)

```bash
# Connect to server
ssh u463999436@hpanel.hostinger.com

# Import database
mysql -u u463999436_alansarabaya -p -h mysql123.hostinger.com u463999436_alansarabaya < database.sql
# Enter password when prompted
```

---

## 3️⃣ Set Environment Variables

### Via Hostinger Control Panel

1. Go to **Advanced** → **Environment Variables**
2. Click **"New Environment Variable"**
3. Add these one by one:

| Variable | Value | Example |
|----------|-------|---------|
| `DB_HOST` | Remote MySQL host | `mysql123.hostinger.com` |
| `DB_USER` | Database username | `u463999436_alansarabaya` |
| `DB_PASS` | Database password | `YourSecurePassword123!` |
| `DB_NAME` | Database name | `u463999436_alansarabaya` |

**Save each variable.**

✅ Now `api/config.php` will auto-load these in production!

---

## 4️⃣ Upload Backend Files

### Using FTP/SFTP Client

**1. Connect to Hostinger**
```
Protocol: FTP or SFTP
Host: ftp.hostinger.com
Username: u463999436 (your Hostinger username)
Password: (your FTP password)
Port: 21 (FTP) or 22 (SFTP)
```

**2. Navigate to public_html**
```
/public_html/
```

**3. Create folders (if not exists)**
```
/public_html/api/
/public_html/public/
/public_html/images/products/
```

**4. Upload API files**
```
Upload these files to /public_html/api/:
- config.php
- generate_sitemap.php
- get_products.php
- get_categories.php
- get_collections.php
- get_brands.php
- get_product_variants.php
- get_product_images.php
- login.php
- register.php
- logout.php
- admin_products.php
- admin_product_images.php
- admin_upload_image.php
- place_order.php
- get_user_orders.php
- get_orders.php
- update_order_status.php
- delete_order.php
```

**5. Upload public files**
```
Upload to /public_html/public/:
- robots.txt
- .htaccess (copy from /public)
- logo-abaya.png
- horizental-logo.svg
```

**6. Do NOT upload**
```
❌ node_modules/
❌ dist/
❌ src/
❌ .env.php (never commit credentials!)
❌ package.json / package-lock.json
```

---

## 5️⃣ Configure .htaccess

### File Location: `/public_html/.htaccess`

The file should contain:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /

  # Pass Authorization header through to PHP (Hostinger strips it otherwise)
  RewriteRule ^ - [E=HTTP_AUTHORIZATION:%{HTTP:Authorization}]

  # Don't rewrite actual files, directories, or /api/ calls
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteCond %{REQUEST_FILENAME} !-l
  RewriteCond %{REQUEST_URI} !^/api/
  RewriteRule . /index.html [L]
</IfModule>

# Protect sensitive PHP config files
<FilesMatch "^(config\.php|setup_db\.php|\.env)$">
  Require all denied
</FilesMatch>
```

---

## 6️⃣ Test Backend Connection

### Test 1: API Availability
```bash
curl https://alansarabaya.pk/api/get_products.php
```

**Expected Response:** JSON with products or empty array

### Test 2: Database Connection
```bash
curl https://alansarabaya.pk/api/get_schema.php
```

**Expected Response:** Database schema (table structures)

### Test 3: CORS Headers
```bash
curl -H "Origin: https://abaya-al-ansar.vercel.app" \
     -H "Access-Control-Request-Method: GET" \
     https://alansarabaya.pk/api/get_products.php
```

**Expected Response:** Headers should include `Access-Control-Allow-Origin`

---

## 7️⃣ Generate Sitemap

### Initial Generation
```bash
# Via browser
curl https://alansarabaya.pk/api/generate_sitemap.php

# Or via SSH terminal
ssh u463999436@hpanel.hostinger.com
php public_html/api/generate_sitemap.php
```

**Output:** Creates `/public_html/public/sitemap.xml`

### Auto-Schedule (Optional)
In Hostinger Control Panel:
1. **Cron Jobs** → **New Cron Job**
2. **Interval:** Daily (midnight)
3. **Command:** 
   ```
   php /home/u463999436/public_html/api/generate_sitemap.php
   ```

---

## 8️⃣ Create Admin User (First Time)

### Via SSH Terminal
```bash
ssh u463999436@hpanel.hostinger.com
cd public_html

# Create admin user SQL
cat > create_admin.sql << 'EOF'
INSERT INTO users (username, email, password, role, created_at) VALUES 
(
    'admin',
    'admin@alansarabaya.pk',
    SHA2('YourSecurePassword123!', 256),
    'admin',
    NOW()
);
EOF

# Execute
mysql -u u463999436_alansarabaya -p -h mysql123.hostinger.com u463999436_alansarabaya < create_admin.sql
```

Or use **phpMyAdmin** to manually insert the user.

---

## 9️⃣ File Permissions

### Set Correct Permissions

```bash
ssh u463999436@hpanel.hostinger.com

# Make directories writable for uploads
chmod 755 /home/u463999436/public_html/api
chmod 755 /home/u463999436/public_html/public
chmod 755 /home/u463999436/public_html/images
chmod 755 /home/u463999436/public_html/images/products

# Sitemap must be writable
chmod 666 /home/u463999436/public_html/public/sitemap.xml
```

---

## 🔟 SSL Certificate

### Auto Setup (Usually Done)
1. Go to **Domains** → Your Domain
2. Check **SSL Certificate** status
3. Should show "Active" (auto-renewed)

### Force HTTPS
Add to `.htaccess`:
```apache
<IfModule mod_rewrite.c>
    RewriteEngine On
    RewriteCond %{HTTPS} !=on
    RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
</IfModule>
```

---

## ✅ Verification Checklist

- [ ] Database created and accessible remotely
- [ ] Environment variables set in control panel
- [ ] API files uploaded to `/public_html/api/`
- [ ] Public files uploaded to `/public_html/public/`
- [ ] `.htaccess` configured for SPA routing
- [ ] Sitemap generated at `/public/sitemap.xml`
- [ ] All API endpoints return JSON (no errors)
- [ ] CORS headers present in responses
- [ ] Admin user created in database
- [ ] SSL certificate active (https)

---

## 🆘 Common Issues

### Issue: Environment Variables Not Working

**Solution:**
1. Verify variables are set in **Advanced** → **Environment Variables**
2. Restart PHP (do a full page refresh)
3. Check `api/config.php` is loading `getenv()` values
4. Test with: `curl https://alansarabaya.pk/api/check_db.php`

### Issue: Sitemap Permission Denied

**Solution:**
```bash
# Make sitemap writable
chmod 666 /home/u463999436/public_html/public/sitemap.xml

# Or create with proper permissions
touch /home/u463999436/public_html/public/sitemap.xml
chmod 666 /home/u463999436/public_html/public/sitemap.xml
```

### Issue: CORS Errors from Vercel

**Solution:**
1. Check `api/config.php` has Vercel domain in `$allowedOrigins`
2. Currently has: `https://al-ansar-abaya-ecommerce-store.vercel.app`
3. Add your actual Vercel domain if different

### Issue: 403 Forbidden on API Calls

**Solution:**
1. Check `.htaccess` RewriteCond excludes `/api/`
2. Verify file permissions: `chmod 755 api/`
3. Check Hostinger security rules aren't blocking PHP

---

## 📞 Hostinger Support

- **Email:** support@hostinger.com
- **Live Chat:** In hpanel.hostinger.com
- **Knowledge Base:** https://support.hostinger.com

---

**Last Updated:** 2026-06-13  
**Status:** Ready for Setup ✅
