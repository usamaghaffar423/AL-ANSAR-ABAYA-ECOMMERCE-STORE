# ⚡ GitHub Actions Deployment - Quick Start

**Your Setup:**
```
Backend:  Hostinger (linen-bee-509910.hostingersite.com)
Frontend: Vercel
Deploy:   GitHub Actions (auto-deploy on git push)
Database: Hostinger MySQL
```

---

## 🚀 COMPLETE SETUP IN 5 MINUTES

### **STEP 1: Add GitHub Secrets** (2 min)

Go to: `GitHub → Repository → Settings → Secrets and variables → Actions`

Click **"New repository secret"** and add these 4:

| Name | Value |
|------|-------|
| `DB_HOST` | `localhost` |
| `DB_USER` | `u463999436_alansarabaya` |
| `DB_PASS` | `Abaya@9911323!` |
| `DB_NAME` | `u463999436_alansarabaya` |

✅ Each one will show with a green checkmark

---

### **STEP 2: Push Updated Workflow to GitHub** (1 min)

The workflow file is already updated. Just push:

```bash
git push origin main
```

This triggers automatic deployment with secrets! ✅

---

### **STEP 3: Verify Deployment** (2 min)

**In GitHub:**
1. Go to **Actions** tab in your repo
2. You'll see the workflow running
3. Watch for checkmarks ✅

**Check the backend:**
```
https://linen-bee-509910.hostingersite.com/api/get_products.php
```

Should return JSON with products ✅

---

## 📊 WHAT HAPPENS NOW

```
You push to GitHub (git push)
        ↓
GitHub Actions triggers
        ↓
Reads DB_HOST, DB_USER, DB_PASS, DB_NAME from Secrets
        ↓
Creates api/.env.php on the fly
        ↓
Uploads all files to Hostinger via SSH
        ↓
Backend is now live with database connection! ✅
```

---

## 🔐 YOUR SECRETS ARE SECURE

**GitHub Secrets:**
- ✅ Encrypted at rest
- ✅ Never shown in logs
- ✅ Never appear in console output
- ✅ Only visible to repository admins
- ✅ Auto-redacted in workflows (shows as ***)

**The `.env.php` file:**
- ✅ Created during workflow (not in git)
- ✅ Uploaded only to Hostinger
- ✅ Contains credentials (safe on server)
- ✅ Never committed to GitHub

---

## 📋 QUICK CHECKLIST

- [ ] Added `DB_HOST` secret to GitHub
- [ ] Added `DB_USER` secret to GitHub
- [ ] Added `DB_PASS` secret to GitHub
- [ ] Added `DB_NAME` secret to GitHub
- [ ] Ran `git push origin main`
- [ ] GitHub Actions completed (green checkmark)
- [ ] Backend API responds to requests
- [ ] No database connection errors

---

## 🔗 API ENDPOINT

Your backend is now at:

```
https://linen-bee-509910.hostingersite.com/api
```

**Test endpoints:**

```bash
# Get all products
curl https://linen-bee-509910.hostingersite.com/api/get_products.php

# Get categories
curl https://linen-bee-509910.hostingersite.com/api/get_categories.php

# Verify database connection
curl https://linen-bee-509910.hostingersite.com/api/get_schema.php
```

---

## ✅ FRONTEND SETUP (Vercel)

Your Vercel frontend should auto-deploy and call the backend at:

```
https://linen-bee-509910.hostingersite.com/api
```

(Already configured in `src/config.js`)

---

## 🆘 IF SOMETHING GOES WRONG

### Backend not connecting to database?

1. Check GitHub Actions logs for errors
2. Verify secrets are set correctly
3. Verify `.env.php` was created:
   ```bash
   ssh to Hostinger and check: /public_html/api/.env.php
   ```

### Workflow fails?

1. Go to **Actions** tab in GitHub
2. Click on failed workflow
3. Scroll to "Create .env.php" step
4. Check error message
5. Most common: Secrets not found (add them and try again)

### API returns error?

1. Check: `https://linen-bee-509910.hostingersite.com/api/check_db.php`
2. See if database is connecting
3. Check Hostinger error logs

---

## 🔄 WORKFLOW DIAGRAM

```
┌─────────────────────────────────────────┐
│     You Push Code to GitHub             │
└────────────────┬────────────────────────┘
                 ↓
┌─────────────────────────────────────────┐
│   GitHub Actions Triggers               │
│   (on push to main, if api/ changed)    │
└────────────────┬────────────────────────┘
                 ↓
┌─────────────────────────────────────────┐
│   Checkout Code                         │
└────────────────┬────────────────────────┘
                 ↓
┌─────────────────────────────────────────┐
│   Read GitHub Secrets                   │
│   - DB_HOST                             │
│   - DB_USER                             │
│   - DB_PASS                             │
│   - DB_NAME                             │
└────────────────┬────────────────────────┘
                 ↓
┌─────────────────────────────────────────┐
│   Create api/.env.php File              │
│   (with secret values from above)       │
└────────────────┬────────────────────────┘
                 ↓
┌─────────────────────────────────────────┐
│   Setup SSH Connection to Hostinger     │
│   (using SSH_PRIVATE_KEY secret)        │
└────────────────┬────────────────────────┘
                 ↓
┌─────────────────────────────────────────┐
│   Deploy via rsync                      │
│   - Upload api/ folder                  │
│   - Upload .env.php                     │
│   - To: linen-bee-509910.hostingersite │
└────────────────┬────────────────────────┘
                 ↓
┌─────────────────────────────────────────┐
│   ✅ Backend is Live!                    │
│   API responds with database data       │
└─────────────────────────────────────────┘
```

---

## 📚 RELATED GUIDES

1. **GITHUB_SECRETS_SETUP.md** - Detailed secret configuration
2. **VERCEL_SETUP_QUICK.md** - Frontend setup on Vercel
3. **ENVIRONMENT_VARIABLES_QUICK_REF.md** - All variables overview

---

## 🎯 NEXT STEPS

### Immediate:
1. ✅ Add 4 GitHub Secrets (DB_HOST, DB_USER, DB_PASS, DB_NAME)
2. ✅ Push to GitHub
3. ✅ Wait for GitHub Actions to complete

### After backend is live:
1. ✅ Set Vercel environment variables (if not already done):
   - `VITE_API_URL = https://linen-bee-509910.hostingersite.com/api`
   - `VITE_IMAGE_URL = https://linen-bee-509910.hostingersite.com/`
2. ✅ Deploy frontend to Vercel
3. ✅ Test full site end-to-end

---

## 🔐 SECURITY SUMMARY

**Before (Credentials in code):**
```
❌ api/config.php had hardcoded passwords
❌ Anyone with repo access could see DB_PASS
❌ Credentials in git history forever
```

**After (GitHub Secrets):**
```
✅ Secrets stored encrypted in GitHub
✅ Only injected during GitHub Actions
✅ Never appear in code or logs
✅ Easy to rotate (just update secret)
✅ No security risk
```

---

## 📞 SUPPORT

- **GitHub Actions Docs:** https://docs.github.com/en/actions
- **GitHub Secrets:** https://docs.github.com/en/actions/security-guides/using-secrets-in-github-actions
- **GitHub Workflow Syntax:** https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions

---

**Status:** ✅ Ready to Deploy  
**Time to Live:** 5 minutes + workflow run time (2 min)  
**Total:** ~7 minutes to working backend

🚀 Let's do this!

```
Next step: Add 4 GitHub Secrets, then git push
```
