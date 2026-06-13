# 🚀 Production Deployment Guide - Al Ansar Abaya Store

**Live Domain:** `https://alansarabaya.pk`  
**Backend:** Hostinger  
**Frontend:** Vercel  
**Status:** Ready for deployment

---

## 📋 Pre-Deployment Checklist

- [x] Sitemap generator created (`api/generate_sitemap.php`)
- [x] Frontend config updated (`src/config.js`)
- [x] Vercel configuration updated (`vercel.json`)
- [x] CORS origins updated (`api/config.php`)
- [x] robots.txt configured
- [x] Environment variables documented (`.env.example`)
- [ ] Domain DNS configured
- [ ] Hostinger environment variables set
- [ ] Sitemap generated on live server
- [ ] Google Search Console submission
- [ ] SSL certificate verified

---

## 🔧 PHASE 1: Backend Setup on Hostinger

### Step 1: Upload Backend Files via FTP/SFTP

**Connection Details:**
```
Host: ftp.hostinger.com (or SFTP if available)
Username: u463999436 (or your Hostinger username)
Password: (your Hostinger FTP password)
Port: 21 (FTP) or 22 (SFTP)
```

**Upload These Files:**
```
api/
  ├── config.php ← CRITICAL: Has production detection logic
  ├── generate_sitemap.php ← NEW: Generates XML sitemap
  ├── .env.example ← Reference only (don't upload)
  ├── get_products.php
  ├── get_categories.php
  ├── get_collections.php
  ├── get_brands.php
  ├── get_product_variants.php
  ├── get_product_images.php
  ├── login.php
  ├── register.php
  ├── logout.php
  ├── admin_products.php
  ├── admin_product_images.php
  ├── admin_upload_image.php
  ├── place_order.php
  ├── get_user_orders.php
  ├── get_orders.php
  ├── update_order_status.php
  └── delete_order.php

public/
  ├── robots.txt ← UPDATED
  ├── .htaccess ← Already configured
  └── sitemap.xml ← Will be generated

⚠️ DO NOT UPLOAD:
  - node_modules/ (not needed on server)
  - src/ (only needed for building)
  - dist/ (frontend build, goes to Vercel)
  - .env.php (never commit credentials!)
```

### Step 2: Set Environment Variables on Hostinger

**Hostinger Control Panel → Advanced → Environment Variables**

Add these variables (values from your Hostinger database setup):

```
DB_HOST = mysql123.hostinger.com
DB_USER = u463999436_alansarabaya
DB_PASS = (your database password)
DB_NAME = u463999436_alansarabaya
```

✅ Now `api/config.php` will auto-detect production and load credentials from env

### Step 3: Verify Database Connection

Test with this URL (replace domain):
```
https://alansarabaya.pk/api/get_schema.php
```

Should return JSON with database table structure. If you see credentials in response, you're still in development mode.

### Step 4: Generate Initial Sitemap

**Option A:** Browser call
```
https://alansarabaya.pk/api/generate_sitemap.php
```

**Option B:** Manual via Hostinger terminal
```bash
php api/generate_sitemap.php
```

This creates `/public/sitemap.xml` with all products and categories.

---

## 🌐 PHASE 2: Frontend Setup on Vercel

### Step 1: Connect GitHub Repository

1. Go to **vercel.com** → Sign in
2. Click **"New Project"**
3. Select your GitHub repository
4. Vercel will auto-detect Vite configuration

### Step 2: Set Environment Variables in Vercel

**Project Settings → Environment Variables**

Add:
```
VITE_API_URL = https://alansarabaya.pk/api
VITE_IMAGE_URL = https://alansarabaya.pk/
```

### Step 3: Configure Custom Domain

**Project Settings → Domains**

1. Add custom domain: `alansarabaya.pk`
2. Also add: `www.alansarabaya.pk`
3. Vercel provides nameservers → Update your domain registrar

### Step 4: Deploy

Push to GitHub (or deploy manually):
```bash
npm run build
# Vercel auto-deploys on push
```

Vercel builds and deploys to: `https://alansarabaya.pk`

---

## 🌍 PHASE 3: Domain & DNS Configuration

### At Your Domain Registrar (e.g., GoDaddy, Namecheap):

**For Hostinger Backend (API):**
```
Add subdomain: api.alansarabaya.pk
Type: CNAME
Value: [Hostinger provided CNAME]
```

**For Vercel Frontend:**
```
Update main domain nameservers to Vercel's:
Nameserver 1: ns1.vercel-dns.com
Nameserver 2: ns2.vercel-dns.com
Nameserver 3: ns3.vercel-dns.com
Nameserver 4: ns4.vercel-dns.com
```

⏳ **DNS propagation:** 24-48 hours

---

## 🔍 PHASE 4: SEO & Google Indexing

### Step 1: Generate Sitemap on Production

```bash
curl https://alansarabaya.pk/api/generate_sitemap.php
```

Verify sitemap exists at:
```
https://alansarabaya.pk/public/sitemap.xml
```

### Step 2: Google Search Console

1. Go to **Google Search Console** (search.google.com/search-console)
2. Add property: `https://alansarabaya.pk`
3. Verify ownership (DNS or HTML file)
4. Submit sitemap:
   - **Sitemaps** → New Sitemap
   - URL: `https://alansarabaya.pk/public/sitemap.xml`

### Step 3: Request Indexing

- Go to **URL Inspection**
- Request indexing for key pages:
  - Homepage
  - Shop page
  - Top 10 products
  - Contact page

### Step 4: Monitor Indexing

Check **Coverage Report** after 48-72 hours:
- ✅ Indexed pages should increase
- ⚠️ Excluded pages (admin, checkout) should be in exclusion rules

---

## 🧪 Testing Checklist

### Backend API Tests

```bash
# Test CORS from Vercel domain
curl -H "Origin: https://alansarabaya.pk" \
     https://alansarabaya.pk/api/get_products.php

# Test authentication
curl -X POST https://alansarabaya.pk/api/login.php \
     -H "Content-Type: application/json" \
     -d '{"email":"admin@test.com","password":"..."}'

# Test product fetch
curl https://alansarabaya.pk/api/get_products.php
```

### Frontend Tests

- [ ] Homepage loads without CORS errors
- [ ] Products load from API
- [ ] Search functionality works
- [ ] Add to cart works
- [ ] Login/Register works
- [ ] Checkout process completes
- [ ] Admin panel accessible to admins only
- [ ] Images load correctly

### SEO Tests

- [ ] Sitemap accessible at `/public/sitemap.xml`
- [ ] robots.txt blocks `/admin`, `/api`
- [ ] robots.txt allows `/shop`, `/product/*`
- [ ] Page titles/meta tags present
- [ ] No console CORS errors
- [ ] SSL certificate valid (green lock)

---

## 🔐 Security Checklist

- [x] Database credentials in environment variables (not in code)
- [x] `.env.php` in `.gitignore`
- [x] Sensitive files blocked in `.htaccess`
- [x] CORS limited to specific domains
- [x] Auth tokens validated server-side
- [ ] SSL/HTTPS enforced on production
- [ ] Database backups scheduled (Hostinger panel)
- [ ] Admin panel limited to trusted IPs (optional)

---

## 📊 Monitoring & Maintenance

### Weekly Tasks
- [ ] Check Google Search Console for errors
- [ ] Verify API health (test key endpoints)
- [ ] Review error logs (Hostinger > Logs)

### Monthly Tasks
- [ ] Update sitemap generator
- [ ] Check Vercel analytics
- [ ] Review user feedback
- [ ] Backup database

### Quarterly Tasks
- [ ] Security audit
- [ ] Performance optimization
- [ ] Update dependencies

---

## 🚨 Troubleshooting

### Issue: CORS Error on Frontend
**Solution:**
- Check `api/config.php` has your domain in `$allowedOrigins`
- Verify `vercel.json` has correct environment variables
- Test with: `curl -H "Origin: https://yourdomain" https://yourdomain/api/test.php`

### Issue: Sitemap Not Generating
**Solution:**
- Check file permissions on `/public` folder (755)
- Verify database connection works
- Test manually: `https://alansarabaya.pk/api/generate_sitemap.php`
- Check Hostinger error logs

### Issue: Images Not Loading
**Solution:**
- Verify `IMAGE_BASE_URL` in `src/config.js` matches server
- Check image paths in database
- Ensure product images uploaded to `/images/products/` on Hostinger

### Issue: Admin Panel Not Working
**Solution:**
- Verify token validation in `api/config.php`
- Check database has admin user
- Test login endpoint: `POST /api/login.php`

---

## 📚 File Structure Reference

```
Production Server (Hostinger):
├── public_html/
│   ├── api/                    ← PHP backend
│   │   ├── config.php
│   │   ├── generate_sitemap.php
│   │   └── [other API files]
│   ├── public/
│   │   ├── sitemap.xml         ← Auto-generated
│   │   ├── robots.txt
│   │   ├── logo-abaya.png
│   │   └── images/products/
│   └── .htaccess               ← SPA routing + security

Vercel (Frontend):
├── dist/                       ← Built frontend
│   ├── index.html
│   ├── assets/
│   └── [JavaScript bundles]
```

---

## 🎯 Quick Deploy Checklist

```
Pre-Launch:
- [ ] Database backup created
- [ ] Sitemap generated
- [ ] Environment variables set on Hostinger
- [ ] Frontend env variables set on Vercel
- [ ] DNS configured to Vercel nameservers
- [ ] SSL certificate active

Launch:
- [ ] Test API endpoints from browser
- [ ] Test frontend in production mode
- [ ] Verify CORS working
- [ ] Submit sitemap to Google Search Console
- [ ] Monitor error logs

Post-Launch:
- [ ] Monitor Google Search Console indexing
- [ ] Check Core Web Vitals
- [ ] Share live link with stakeholders
- [ ] Update social media with live URL
```

---

## 📞 Support & Resources

- **Hostinger Docs:** https://support.hostinger.com
- **Vercel Docs:** https://vercel.com/docs
- **Google Search Console:** https://search.google.com/search-console

---

**Last Updated:** 2026-06-13  
**Deployment Status:** ✅ Ready
