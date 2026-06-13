# ⚡ Vercel Setup - Quick Guide for alansarabaya.com

**Domain:** `alansarabaya.com`  
**Frontend Hosting:** Vercel  
**Time Required:** 10-15 minutes

---

## 🚀 Step-by-Step Vercel Configuration

### **Step 1: Create Vercel Project**

1. Go to **vercel.com** → Click **"Log In"**
2. Sign in with GitHub account
3. Click **"New Project"**
4. Select your GitHub repository: `abaya-ecommerce-store`
5. Click **"Import"**

Vercel will automatically detect Vite configuration ✅

---

### **Step 2: Set Environment Variables** ⭐ CRITICAL

**This is where API calls will connect to your Hostinger backend**

1. After importing, you'll see **Project Settings** page
2. Click **"Environment Variables"** (left sidebar)
3. Add two variables:

#### Variable 1: API URL
```
Name:  VITE_API_URL
Value: https://alansarabaya.com/api
Environments: Production, Preview, Development
```
👉 Click **"Add"**

#### Variable 2: Image URL
```
Name:  VITE_IMAGE_URL
Value: https://alansarabaya.com/
Environments: Production, Preview, Development
```
👉 Click **"Add"**

✅ **Both environment variables now set**

---

### **Step 3: Add Custom Domain** ⭐ MOST IMPORTANT

**This is where you connect alansarabaya.com to Vercel**

1. Go to **Project Settings** → **Domains** (left sidebar)
2. Click **"Add Domain"**
3. Type: `alansarabaya.com`
4. Click **"Add"**

You'll see this message:
```
Invalid configuration. See the DNS record below.
```

This is NORMAL. Vercel is showing you DNS records to configure.

#### **Copy these DNS Records:**
Vercel shows you:
```
Type: NS (Nameserver)
Nameserver 1: ns1.vercel-dns.com
Nameserver 2: ns2.vercel-dns.com
Nameserver 3: ns3.vercel-dns.com
Nameserver 4: ns4.vercel-dns.com
```

---

### **Step 4: Configure DNS at Domain Registrar**

**Where did you buy alansarabaya.com?** (GoDaddy, Namecheap, etc.)

1. Login to your domain registrar
2. Go to **DNS Settings** or **Nameservers**
3. Replace nameservers with Vercel's:
   ```
   ns1.vercel-dns.com
   ns2.vercel-dns.com
   ns3.vercel-dns.com
   ns4.vercel-dns.com
   ```
4. **Save changes**

⏳ **DNS propagation takes 24-48 hours**

---

### **Step 5: Add www Subdomain**

Back in Vercel **Domains** page:

1. Click **"Add Domain"** again
2. Type: `www.alansarabaya.com`
3. Click **"Add"**

This automatically redirects `www` → main domain ✅

---

### **Step 6: Deploy**

Your frontend is already being built. To manually trigger deployment:

1. Go to **Deployments** tab
2. Latest deployment should show **✓ Ready**
3. Or push to GitHub to trigger automatic deployment

```bash
git push origin main
```

Vercel auto-deploys on every push ✅

---

### **Step 7: Verify Deployment**

After DNS propagates (24-48h):

1. Visit **https://alansarabaya.com**
2. Should see your store homepage
3. Check browser console (F12) for any CORS errors
4. If you see errors, verify:
   - `VITE_API_URL` is set correctly in Vercel
   - Hostinger backend is running and accessible
   - `api/config.php` has `alansarabaya.com` in CORS origins

---

## 📋 Vercel Configuration Checklist

- [ ] Project imported from GitHub
- [ ] `VITE_API_URL` environment variable set to `https://alansarabaya.com/api`
- [ ] `VITE_IMAGE_URL` environment variable set to `https://alansarabaya.com/`
- [ ] Main domain `alansarabaya.com` added
- [ ] Nameservers updated at domain registrar
- [ ] `www.alansarabaya.com` added as alias
- [ ] Build successful (green checkmark)
- [ ] Waiting for DNS propagation (24-48h)

---

## 🔧 If Something Goes Wrong

### Issue: "Invalid configuration" on custom domain
✅ **This is normal** - Just means DNS isn't propagated yet. Configure DNS at your registrar.

### Issue: Page loads but API calls fail (CORS error)
```
Check:
1. VITE_API_URL is set in Vercel env vars
2. Hostinger backend is online
3. api/config.php has alansarabaya.com in $allowedOrigins
```

### Issue: "Page not found" after DNS propagates
```
1. Go to Vercel Deployments
2. Check if build succeeded (should show green ✓)
3. If failed, check build logs for errors
4. Latest build should be from your latest git push
```

---

## 📊 What Vercel Does

```
You push code to GitHub
        ↓
Vercel detects changes
        ↓
Runs: npm install && npm run build
        ↓
Creates optimized dist/ folder
        ↓
Deploys to CDN globally
        ↓
Your site is live at https://alansarabaya.com
```

---

## 🎯 Next Steps

### After DNS Propagates (24-48h):
1. ✅ Visit https://alansarabaya.com
2. ✅ Test all features (products, cart, checkout)
3. ✅ Check Google Search Console (add domain)
4. ✅ Submit sitemap when backend is ready

### Meanwhile - Setup Hostinger Backend:
1. Create MySQL database
2. Set environment variables
3. Upload backend files
4. Test API: https://alansarabaya.com/api/get_products.php

---

## 🌐 Domain Propagation Status

**Check current status:** https://dnschecker.org/

- Enter: `alansarabaya.com`
- All nameservers showing `ns1/ns2/ns3/ns4.vercel-dns.com` = ✅ Ready
- Still showing old nameservers = ⏳ Still propagating

---

## 📞 Support

- **Vercel Docs:** https://vercel.com/docs
- **Domain Issues:** Check your registrar's support
- **DNS Checker:** https://dnschecker.org/

---

**Status:** ⏳ Waiting for DNS propagation  
**Estimated Time to Live:** 24-48 hours after DNS configuration

🚀 Once DNS propagates and Hostinger backend is ready, your store goes live!
