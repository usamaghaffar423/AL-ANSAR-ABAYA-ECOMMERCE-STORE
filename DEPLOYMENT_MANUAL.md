# 🚀 Manual Deployment Guide — Al Ansar Abaya

## Step 1: Set Environment Variables in Hostinger

Before uploading files, configure database credentials in Hostinger:

1. **Login to Hostinger Control Panel** → Advanced → Environment Variables
2. **Add these 4 variables:**
   ```
   DB_HOST = (Remote MySQL host from Hostinger)
   DB_USER = u463999436_alansarabaya
   DB_PASS = Abaya@9911323!
   DB_NAME = u463999436_alansarabaya
   ```
3. **Save & Apply**

> ⚠️ **NEVER** put credentials in code files. Always use environment variables in production.

---

## Step 2: Upload Files to `public_html/`

Delete everything currently in `public_html/` then upload:

### **Upload 1: React App (dist/)**
- **Source:** `dist/` folder (entire compiled app)
- **Destination:** `/public_html/` 
- **Contents:**
  ```
  ✅ assets/        (compiled JS, CSS, images)
  ✅ videos/        (background videos)
  ✅ index.html     (entry point)
  ✅ robots.txt
  ✅ .htaccess
  ✅ vite.svg
  ```

### **Upload 2: Backend API (api/)**
- **Source:** `api/` folder
- **Destination:** `/public_html/api/`
- **EXCLUDE these files:**
  ```
  ❌ test_*.php (all test files)
  ❌ setup_*.php (all setup scripts)
  ❌ db_test.php
  ```
- **DO UPLOAD:**
  ```
  ✅ config.php (safe — no credentials in code)
  ✅ get_products.php
  ✅ get_categories.php
  ✅ get_product_images.php
  ✅ get_product_variants.php
  ✅ get_user_orders.php
  ✅ login.php
  ✅ logout.php
  ✅ register.php
  ✅ place_order.php
  ✅ delete_order.php
  ✅ admin_products.php
  ✅ admin_product_images.php
  ✅ admin_upload_image.php
  ✅ create_admin.php
  ✅ check_db.php
  ✅ get_schema.php
  ✅ migrations/
  ✅ .htaccess
  ```

### **Upload 3: Root Files**
- `.htaccess` (routing & security)
- `robots.txt` (SEO)

---

## Step 3: Verify Deployment

After uploading:

1. **Test API:** https://alansarabayah.com/api/check_db.php
2. **Check Categories:** https://alansarabayah.com/api/get_categories.php
3. **Test Home Page:** https://alansarabayah.com/

---

## Step 4: After Manual Deployment

Once verified, **all future updates** will use **automated SSH deployment**:
- Push code to GitHub `main` branch
- GitHub Actions automatically builds & deploys
- Only clean production files sync to Hostinger
- No manual uploads needed

---

## File Structure After Deployment

```
public_html/
├── api/
│   ├── config.php (env vars from Hostinger)
│   ├── get_products.php
│   ├── get_categories.php
│   ├── login.php
│   └── ...other endpoints
├── dist/
│   ├── assets/
│   ├── videos/
│   ├── index.html
│   └── robots.txt
├── .htaccess
└── robots.txt
```

✅ **Clean, secure, production-ready!**
