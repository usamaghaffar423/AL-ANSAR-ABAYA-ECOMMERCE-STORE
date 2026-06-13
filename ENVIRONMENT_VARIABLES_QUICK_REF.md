# ⚡ Environment Variables Quick Reference

**Domain:** alansarabaya.com  
**Frontend:** Vercel  
**Backend:** Hostinger  

---

## 🎯 VERCEL ENVIRONMENT VARIABLES

**Location:** vercel.com → Project Settings → Environment Variables

### Variable 1: API URL
```
Name:  VITE_API_URL
Value: https://alansarabaya.com/api
Environments: ✓ Production ✓ Preview ✓ Development
```

### Variable 2: Image URL
```
Name:  VITE_IMAGE_URL
Value: https://alansarabaya.com/
Environments: ✓ Production ✓ Preview ✓ Development
```

✅ **That's all Vercel needs!**

---

## 🔐 HOSTINGER ENVIRONMENT VARIABLES

**Location:** hpanel.hostinger.com → Advanced → Environment Variables

### Variable 1: Database Host
```
Name:  DB_HOST
Value: localhost
Environments: ✓ Production
```

### Variable 2: Database User
```
Name:  DB_USER
Value: u463999436_alansarabaya
Environments: ✓ Production
```

### Variable 3: Database Password
```
Name:  DB_PASS
Value: Abaya@9911323!
Environments: ✓ Production
```

### Variable 4: Database Name
```
Name:  DB_NAME
Value: u463999436_alansarabaya
Environments: ✓ Production
```

✅ **These 4 variables tell your API how to connect to the database**

---

## 📊 Variables by Location

```
┌─────────────────────────────────────────────────────────┐
│                    VERCEL FRONTEND                       │
├─────────────────────────────────────────────────────────┤
│ VITE_API_URL = https://alansarabaya.com/api            │
│ VITE_IMAGE_URL = https://alansarabaya.com/             │
│                                                          │
│ (Tells frontend WHERE to find the API)                 │
└─────────────────────────────────────────────────────────┘
                           ↓ API calls
┌─────────────────────────────────────────────────────────┐
│                   HOSTINGER BACKEND                      │
├─────────────────────────────────────────────────────────┤
│ DB_HOST = localhost                                     │
│ DB_USER = u463999436_alansarabaya                      │
│ DB_PASS = Abaya@9911323!                               │
│ DB_NAME = u463999436_alansarabaya                      │
│                                                          │
│ (Tells API HOW to connect to database)                 │
└─────────────────────────────────────────────────────────┘
                           ↓ SQL queries
┌─────────────────────────────────────────────────────────┐
│                  HOSTINGER DATABASE                      │
├─────────────────────────────────────────────────────────┤
│ Database: u463999436_alansarabaya                       │
│ User: u463999436_alansarabaya                          │
│ Tables: products, categories, orders, users, etc.      │
└─────────────────────────────────────────────────────────┘
```

---

## ✅ Setup Order

**Step 1:** Add to Vercel (2 variables)
- VITE_API_URL
- VITE_IMAGE_URL

**Step 2:** Add to Hostinger (4 variables)
- DB_HOST
- DB_USER
- DB_PASS
- DB_NAME

**Step 3:** Upload backend files to Hostinger `/public_html/api/`

**Step 4:** Test API endpoints

**Step 5:** Deploy frontend to Vercel

---

## 🔍 How Code Uses These Variables

### In Frontend (Vercel):

**File:** `src/config.js`
```javascript
const prodApiUrl = import.meta.env.VITE_API_URL 
  || 'https://alansarabaya.com/api';

export const API_BASE_URL = import.meta.env.PROD 
  ? prodApiUrl 
  : devApiUrl;
```

When you call: `fetch(API_BASE_URL + '/get_products.php')`

It becomes: `fetch('https://alansarabaya.com/api/get_products.php')`

### In Backend (Hostinger):

**File:** `api/config.php`
```php
define('DB_HOST', getenv('DB_HOST') ?: 'localhost');
define('DB_USER', getenv('DB_USER') ?: 'root');
define('DB_PASS', getenv('DB_PASS') ?: '');
define('DB_NAME', getenv('DB_NAME') ?: 'test');
```

When you query: `SELECT * FROM products WHERE id = 1`

It uses: Database credentials from environment variables

---

## 🎯 Copy-Paste Reference

### For Vercel Console:

```
VITE_API_URL=https://alansarabaya.com/api
VITE_IMAGE_URL=https://alansarabaya.com/
```

### For Hostinger Console:

```
DB_HOST=localhost
DB_USER=u463999436_alansarabaya
DB_PASS=Abaya@9911323!
DB_NAME=u463999436_alansarabaya
```

---

## 🚀 Deployment Flow

```
1. Set Vercel env vars
   ↓
2. Deploy frontend to Vercel
   ↓
3. Set Hostinger env vars
   ↓
4. Upload backend files to Hostinger
   ↓
5. Test API endpoints
   ↓
6. Frontend calls API via VITE_API_URL
   ↓
7. API connects to DB via DB_* variables
   ↓
8. Data flows back to frontend
   ↓
9. ✅ Store is LIVE!
```

---

## ⚠️ Important Notes

1. **Vercel variables are for frontend** - They get embedded in your JavaScript during build
2. **Hostinger variables are for backend** - They stay on the server, never exposed to frontend
3. **Database password should NEVER be in frontend code** - That's why we use env vars!
4. **Never commit credentials to git** - Use `.gitignore` (already configured)

---

## 📋 Checklist

- [ ] VITE_API_URL added to Vercel
- [ ] VITE_IMAGE_URL added to Vercel
- [ ] DB_HOST added to Hostinger
- [ ] DB_USER added to Hostinger
- [ ] DB_PASS added to Hostinger
- [ ] DB_NAME added to Hostinger
- [ ] Backend files uploaded to Hostinger
- [ ] Tested API endpoints
- [ ] Frontend deployed to Vercel
- [ ] Domain propagated (24-48h)

---

**Status:** ✅ Ready to Configure  
**Time to Deploy:** 30-45 minutes (excluding DNS propagation)

🚀 Follow the detailed guides: VERCEL_SETUP_QUICK.md + HOSTINGER_FINAL_SETUP.md
