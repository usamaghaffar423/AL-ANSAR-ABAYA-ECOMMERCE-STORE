# 🚀 Hostinger Final Setup Guide - alansarabaya.com

**Your Database Credentials (from config.php):**
```
DB_HOST = localhost
DB_USER = u463999436_alansarabaya
DB_PASS = Abaya@9911323!
DB_NAME = u463999436_alansarabaya
```

---

## 📋 COMPLETE HOSTINGER SETUP CHECKLIST

- [ ] Step 1: Verify Database Exists
- [ ] Step 2: Set Environment Variables
- [ ] Step 3: Upload Backend Files
- [ ] Step 4: Generate Sitemap
- [ ] Step 5: Test API Endpoints

---

## ✅ STEP 1: Verify Your Database Exists

### Access Hostinger Control Panel:

1. Go to **hpanel.hostinger.com**
2. Login with your Hostinger account
3. Go to **Databases** (left sidebar)

You should see your database:
```
Database Name: u463999436_alansarabaya
Username: u463999436_alansarabaya
Host: localhost (for shared hosting)
```

✅ If you see this, your database already exists and is ready!

**Note:** For shared hosting, Host is almost always `localhost`

---

## 🔐 STEP 2: Set Environment Variables in Hostinger

**⚠️ CRITICAL:** Setting environment variables makes your credentials secure (not hardcoded in PHP files)

### Navigate to Environment Variables:

1. In Hostinger control panel, go to **Advanced** → **Environment Variables**
2. Click **"Add Environment Variable"**

### Add These 4 Variables One By One:

**Variable 1 - DB_HOST:**
```
Name: DB_HOST
Value: localhost
Environments: Production ✓
```
👉 Click **"Add"**

---

**Variable 2 - DB_USER:**
```
Name: DB_USER
Value: u463999436_alansarabaya
Environments: Production ✓
```
👉 Click **"Add"**

---

**Variable 3 - DB_PASS:**
```
Name: DB_PASS
Value: Abaya@9911323!
Environments: Production ✓
```
👉 Click **"Add"**

---

**Variable 4 - DB_NAME:**
```
Name: DB_NAME
Value: u463999436_alansarabaya
Environments: Production ✓
```
👉 Click **"Add"**

---

✅ **All 4 environment variables now set!**

Now `api/config.php` will automatically load these in production ✨

---

## 📤 STEP 3: Upload Backend Files via FTP

### FTP Connection Details:

1. In Hostinger, go to **Advanced** → **SFTP/SSH**
2. You'll see connection details:
   ```
   Host: ftp.hostinger.com (or your server name)
   Username: u463999436 (Hostinger username)
   Port: 21 (FTP) or 22 (SFTP)
   ```

3. Get your FTP password from Hostinger control panel

### Using FileZilla (Free FTP Client):

**Download:** https://filezilla-project.org/

1. Open FileZilla
2. Click **File** → **Site Manager**
3. Click **"New site"**
4. Configure:
   ```
   Protocol: SFTP (if port 22) or FTP (if port 21)
   Host: ftp.hostinger.com
   Username: u463999436
   Password: (your FTP password)
   Port: 22 (SFTP) or 21 (FTP)
   ```
5. Click **"Connect"**

### Upload Backend Files:

**Navigate to:** `/public_html/`

**Create these folders (if not exist):**
```
/public_html/api/
/public_html/public/
/public_html/images/products/
```

**Upload API files to `/public_html/api/`:**
```
✅ config.php
✅ generate_sitemap.php
✅ get_products.php
✅ get_categories.php
✅ get_collections.php
✅ get_brands.php
✅ get_product_variants.php
✅ get_product_images.php
✅ login.php
✅ register.php
✅ logout.php
✅ admin_products.php
✅ admin_product_images.php
✅ admin_upload_image.php
✅ place_order.php
✅ get_user_orders.php
✅ get_orders.php
✅ update_order_status.php
✅ delete_order.php
```

**Upload public files to `/public_html/public/`:**
```
✅ robots.txt
✅ .htaccess
✅ logo-abaya.png
✅ horizental-logo.svg
```

**✅ DO NOT UPLOAD:**
```
❌ node_modules/
❌ src/
❌ dist/
❌ .env.php (never upload with credentials!)
```

---

## 🗺️ STEP 4: Generate Sitemap

### Via Browser (Easiest):

Once files are uploaded, visit:
```
https://alansarabaya.com/api/generate_sitemap.php
```

You'll see:
```json
{
  "success": true,
  "message": "Sitemap generated successfully",
  "products": 15,
  "path": "/public/sitemap.xml",
  "url": "https://alansarabaya.com/public/sitemap.xml",
  "timestamp": "2026-06-13T..."
}
```

✅ Sitemap created! 

Verify it exists:
```
https://alansarabaya.com/public/sitemap.xml
```

---

## 🧪 STEP 5: Test API Endpoints

### Test 1: Get Products
```
https://alansarabaya.com/api/get_products.php
```

**Expected Response:** JSON array of products

### Test 2: Get Categories
```
https://alansarabaya.com/api/get_categories.php
```

**Expected Response:** JSON array of categories

### Test 3: Get Schema (Verify DB Connection)
```
https://alansarabaya.com/api/get_schema.php
```

**Expected Response:** JSON with all database tables and columns

### Test 4: CORS Headers
```bash
curl -H "Origin: https://alansarabaya.com" \
     https://alansarabaya.com/api/get_products.php -i
```

**Expected Response Headers:**
```
Access-Control-Allow-Origin: https://alansarabaya.com
```

---

## 🔧 File Permissions

If you get "Permission Denied" errors, set permissions:

### Via SSH Terminal (Advanced):

```bash
ssh u463999436@hpanel.hostinger.com

# Make directories writable
chmod 755 /home/u463999436/public_html/api
chmod 755 /home/u463999436/public_html/public
chmod 755 /home/u463999436/public_html/images
chmod 755 /home/u463999436/public_html/images/products

# Make sitemap writable
chmod 666 /home/u463999436/public_html/public/sitemap.xml
```

---

## ✅ COMPLETE HOSTINGER SETUP CHECKLIST

- [ ] Database verified (Databases section)
- [ ] 4 environment variables set (DB_HOST, DB_USER, DB_PASS, DB_NAME)
- [ ] API files uploaded to `/public_html/api/`
- [ ] Public files uploaded to `/public_html/public/`
- [ ] Sitemap generated (visited generate_sitemap.php)
- [ ] Sitemap accessible at `/public/sitemap.xml`
- [ ] get_products.php returns JSON
- [ ] get_schema.php returns database structure
- [ ] CORS headers present in responses

---

## 🔐 Security: What NOT to Upload

**NEVER upload these files:**

```
❌ api/.env.php        (has credentials - use env vars instead)
❌ .env                (never commit secrets)
❌ node_modules/       (not needed on server)
❌ src/                (frontend code, not needed)
❌ dist/               (goes to Vercel, not Hostinger)
```

Your credentials are now in **environment variables** (secure) ✅

---

## 📊 Final Architecture

```
Browser → https://alansarabaya.com (Vercel Frontend)
              ↓
          [React App Built]
              ↓
    VITE_API_URL env var loads
              ↓
    API calls to: https://alansarabaya.com/api/
              ↓
          [Hostinger Backend]
              ↓
    DB_HOST, DB_USER, DB_PASS env vars load
              ↓
    Connects to: u463999436_alansarabaya database
              ↓
          [Database]
              ↓
    Returns JSON to Frontend
```

---

## 🆘 Troubleshooting

### Issue: "Database connection failed"
```
Check:
1. Environment variables are set in Hostinger control panel
2. Database name is correct: u463999436_alansarabaya
3. Credentials are correct
4. Database user exists (check Databases section)
```

### Issue: Sitemap generation fails
```
Check:
1. /public/ folder exists and is writable (chmod 755)
2. Database is accessible (test get_schema.php first)
3. Products table has data
```

### Issue: CORS errors from Vercel
```
Check:
1. api/config.php has alansarabaya.com in $allowedOrigins
2. CORS headers are being sent (test with curl)
3. Hostinger .htaccess is configured properly
```

### Issue: "Permission Denied" errors
```
Set permissions:
chmod 755 /home/u463999436/public_html/api
chmod 755 /home/u463999436/public_html/public
chmod 666 /home/u463999436/public_html/public/sitemap.xml
```

---

## 🎯 What Happens After Setup

1. ✅ Frontend (Vercel) calls `https://alansarabaya.com/api/get_products.php`
2. ✅ Hostinger receives request
3. ✅ Loads env variables: DB_HOST, DB_USER, DB_PASS, DB_NAME
4. ✅ Connects to database
5. ✅ Queries `u463999436_alansarabaya` database
6. ✅ Returns JSON to Frontend
7. ✅ Frontend displays products

**Everything connected! 🎉**

---

## 📞 Support

- **Hostinger Control Panel:** https://hpanel.hostinger.com
- **Hostinger Support:** support@hostinger.com
- **FileZilla Download:** https://filezilla-project.org/

---

**Status:** ✅ Ready to Deploy  
**Time Required:** 30 minutes  
**Next Step:** Follow steps 1-5 above

🚀 After completing all steps, your store will be fully live on alansarabaya.com!
