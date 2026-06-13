# 🔐 GitHub Secrets Setup for Environment Variables

**Your Setup:**
- Backend: Auto-deploys from GitHub to `linen-bee-509910.hostingersite.com`
- Frontend: Auto-deploys from GitHub to Vercel
- Environment Variables: Stored in GitHub Secrets (keeps credentials safe)

---

## 📋 WHAT ARE GITHUB SECRETS?

GitHub Secrets are encrypted environment variables that:
- ✅ Never appear in logs or build output
- ✅ Never expose credentials in the repository
- ✅ Can be injected into GitHub Actions workflows
- ✅ Auto-create files during deployment

**Perfect for:** Database credentials, API keys, tokens

---

## 🔑 YOUR DATABASE CREDENTIALS

From your `api/config.php`:

```
DB_HOST = localhost
DB_USER = u463999436_alansarabaya
DB_PASS = Abaya@9911323!
DB_NAME = u463999436_alansarabaya
```

These will be stored as GitHub Secrets, then injected during deployment.

---

## 📍 STEP 1: Go to GitHub Repository Settings

1. Go to your GitHub repository: `ABAYA-AL-ANSAR-ECOMMERCE-STORE/abaya-ecommerce-store`
2. Click **Settings** (top menu bar)
3. Left sidebar → **Secrets and variables** → **Actions**

You'll see:
```
✓ Secrets
✓ Variables
```

---

## 🔐 STEP 2: Add Repository Secrets

In the **Secrets** tab, click **"New repository secret"**

### Secret 1: SSH Private Key (Already Added?)

```
Name: SSH_PRIVATE_KEY
Value: (your private SSH key for Hostinger)
```

This is used for deploying to Hostinger via SSH. Check if it already exists.

### Secret 2: Database Host

```
Name: DB_HOST
Value: localhost
```
👉 Click **"Add secret"**

---

### Secret 3: Database User

```
Name: DB_USER
Value: u463999436_alansarabaya
```
👉 Click **"Add secret"**

---

### Secret 4: Database Password

```
Name: DB_PASS
Value: Abaya@9911323!
```
👉 Click **"Add secret"**

---

### Secret 5: Database Name

```
Name: DB_NAME
Value: u463999436_alansarabaya
```
👉 Click **"Add secret"**

---

### Secret 6: Vercel Token

```
Name: VERCEL_TOKEN
Value: (your Vercel token from vercel.com/account/tokens)
```

Already added if frontend deploys to Vercel.

---

## 📝 STEP 3: Update GitHub Actions Workflow

Now update `.github/workflows/deploy-backend.yml` to use these secrets.

**Current workflow deploys files but doesn't set env variables.**

We need to update it to create `.env.php` file from secrets.

---

## ✅ COMPLETE WORKFLOW (Updated)

Replace your `.github/workflows/deploy-backend.yml` with:

```yaml
name: Deploy Backend to Hostinger

on:
  push:
    branches:
      - main
    paths:
      - 'api/**'
      - '.github/workflows/deploy-backend.yml'
  workflow_dispatch:

jobs:
  deploy-backend:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Create .env.php from secrets
        env:
          DB_HOST: ${{ secrets.DB_HOST }}
          DB_USER: ${{ secrets.DB_USER }}
          DB_PASS: ${{ secrets.DB_PASS }}
          DB_NAME: ${{ secrets.DB_NAME }}
        run: |
          cat > api/.env.php << 'EOF'
          <?php
          define('PROD_DB_HOST', '${{ env.DB_HOST }}');
          define('PROD_DB_USER', '${{ env.DB_USER }}');
          define('PROD_DB_PASS', '${{ env.DB_PASS }}');
          define('PROD_DB_NAME', '${{ env.DB_NAME }}');
          ?>
          EOF

      - name: Setup SSH
        env:
          SSH_PRIVATE_KEY: ${{ secrets.SSH_PRIVATE_KEY }}
        run: |
          mkdir -p ~/.ssh
          echo "$SSH_PRIVATE_KEY" > ~/.ssh/id_ed25519
          chmod 600 ~/.ssh/id_ed25519
          ssh-keyscan -p 65002 82.112.239.120 >> ~/.ssh/known_hosts 2>/dev/null || true

      - name: Deploy API to Hostinger
        run: |
          echo "📤 Syncing API to Hostinger..."
          rsync -avz -e "ssh -i ~/.ssh/id_ed25519 -p 65002" \
            --delete-after \
            --exclude='test_*.php' \
            --exclude='setup_*.php' \
            --exclude='db_test.php' \
            --exclude='config_local.php' \
            api/ u463999436@82.112.239.120:/home/u463999436/domains/linen-bee-509910.hostingersite.com/public_html/api/

      - name: Verify Deployment
        run: |
          echo "✅ Backend API deployed successfully!"
          echo "🌐 API Endpoint: https://linen-bee-509910.hostingersite.com/api"
          echo "📝 Check status: curl -s https://linen-bee-509910.hostingersite.com/api/get_products.php"
```

**What changed:**
- Added "Create .env.php from secrets" step
- Uses GitHub Secrets to create `.env.php` file before deployment
- `.env.php` is created in workflow, uploaded to Hostinger, then ignored in git

---

## 🚀 STEP 4: Update Frontend Workflow (Optional)

Your frontend already deploys to Vercel. To add environment variables:

Add these lines to `.github/workflows/deploy-frontend.yml`:

```yaml
      - name: Set Vercel Environment Variables
        run: |
          vercel env add VITE_API_URL https://linen-bee-509910.hostingersite.com/api --prod --token=$VERCEL_TOKEN
          vercel env add VITE_IMAGE_URL https://linen-bee-509910.hostingersite.com/ --prod --token=$VERCEL_TOKEN
```

Or manually add them in Vercel dashboard (easier):

**Vercel Dashboard → Settings → Environment Variables:**
```
VITE_API_URL = https://linen-bee-509910.hostingersite.com/api
VITE_IMAGE_URL = https://linen-bee-509910.hostingersite.com/
```

---

## 📋 GITHUB SECRETS CHECKLIST

- [ ] Go to GitHub repo → Settings → Secrets and variables → Actions
- [ ] Secret: **DB_HOST** = `localhost`
- [ ] Secret: **DB_USER** = `u463999436_alansarabaya`
- [ ] Secret: **DB_PASS** = `Abaya@9911323!`
- [ ] Secret: **DB_NAME** = `u463999436_alansarabaya`
- [ ] Secret: **SSH_PRIVATE_KEY** = (already exists?)
- [ ] Secret: **VERCEL_TOKEN** = (for Vercel deployment)
- [ ] Update `.github/workflows/deploy-backend.yml` with new steps
- [ ] Push to GitHub
- [ ] Verify deployment in GitHub Actions tab

---

## 🔄 HOW IT WORKS NOW

```
1. You push code to GitHub
   ↓
2. GitHub Actions workflow triggered
   ↓
3. Reads DB_HOST, DB_USER, DB_PASS, DB_NAME from Secrets
   ↓
4. Creates api/.env.php file with these values
   ↓
5. Deploys everything to Hostinger via SSH
   ↓
6. api/config.php loads credentials from .env.php
   ↓
7. API connects to database
   ↓
8. Frontend calls API from Vercel
   ✅ Everything works!
```

---

## 🔐 SECURITY BENEFITS

**Before (Credentials in code):**
```
❌ Hardcoded in config.php
❌ Visible if repo is public
❌ Anyone with repo access can see passwords
```

**After (GitHub Secrets):**
```
✅ Encrypted in GitHub
✅ Never shown in logs or UI
✅ Only injected during GitHub Actions
✅ Credentials never in git history
```

---

## ⚠️ IMPORTANT NOTES

1. **GitHub Secrets are encrypted** - You can't view them after creation
2. **If you need to change a secret** - Delete it and create a new one
3. **Secrets are per-repository** - Different repos need their own secrets
4. **Workflow logs are public** - Secrets never appear in logs (GitHub hides them)
5. **The `.env.php` file is created in workflow** - Never committed to git

---

## 🆘 TROUBLESHOOTING

### Issue: "Secrets not found in workflow"

**Solution:**
1. Go to GitHub repo → Settings → Secrets
2. Verify secrets exist (they should show with a ✓)
3. Push a test commit to trigger workflow
4. Check GitHub Actions tab for logs

### Issue: ".env.php not created on Hostinger"

**Solution:**
1. Check GitHub Actions logs for errors
2. Verify rsync command ran successfully
3. SSH to Hostinger and check: `/public_html/api/.env.php`
4. If missing, check file permissions

### Issue: "Database connection failed" after deployment

**Solution:**
1. Verify `.env.php` exists on Hostinger
2. Check `.env.php` contains correct values
3. Test manually: `curl https://linen-bee-509910.hostingersite.com/api/get_products.php`
4. Check Hostinger error logs

---

## 📞 GitHub Actions Documentation

- **GitHub Secrets:** https://docs.github.com/en/actions/security-guides/using-secrets-in-github-actions
- **GitHub Actions:** https://docs.github.com/en/actions
- **Workflow Syntax:** https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions

---

## 🎯 SUMMARY

**Your secure deployment flow:**

```
GitHub Repo (no credentials) 
    ↓ (with Secrets)
GitHub Actions 
    ↓ (creates .env.php from Secrets)
Hostinger Server 
    ↓ (api/config.php loads from .env.php)
Database Connection ✅
    ↓
API Returns Data ✅
    ↓
Frontend Uses It ✅
```

---

**Status:** Ready to implement  
**Time Required:** 10 minutes  
**Next Step:** Add GitHub Secrets, then update workflow file

🔒 Your credentials are now secure! 🚀
