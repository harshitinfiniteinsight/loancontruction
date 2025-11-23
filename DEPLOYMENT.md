# Deployment Guide - Construction Loan Admin Prototype

## Quick Start

### Local Development

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run development server:**
   ```bash
   npm run dev
   ```

3. **Open browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

4. **Login:**
   Select a role from the home page:
   - Builder Portal
   - Lender Dashboard
   - Admin Dashboard
   - Fund Admin Portal

## Deploy to Vercel

### Option 1: Deploy via Vercel Dashboard (Recommended)

1. **Push to Git:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-repo-url>
   git push -u origin main
   ```

2. **Import to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Sign up/Login
   - Click "New Project"
   - Import your Git repository
   - Vercel auto-detects Next.js
   - Click "Deploy"

3. **Your site is live!**
   - Vercel provides a URL like: `your-project.vercel.app`
   - Custom domains can be added in project settings

### Option 2: Deploy via Vercel CLI

1. **Install Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Login:**
   ```bash
   vercel login
   ```

3. **Deploy:**
   ```bash
   vercel
   ```

4. **Follow prompts:**
   - Link to existing project or create new
   - Confirm settings
   - Deploy!

### Option 3: Deploy via GitHub Integration

1. **Push to GitHub:**
   ```bash
   git push origin main
   ```

2. **Connect in Vercel:**
   - Dashboard → New Project
   - Select GitHub repository
   - Configure (auto-detected)
   - Deploy

3. **Auto-deployments:**
   - Every push to `main` auto-deploys
   - Pull requests get preview deployments

## Environment Variables

This prototype doesn't require environment variables. For production, you would add:

- `DATABASE_URL`
- `NEXT_PUBLIC_API_URL`
- `AUTH_SECRET`
- etc.

## Build Configuration

Vercel automatically detects:
- **Framework:** Next.js
- **Build Command:** `npm run build`
- **Output Directory:** `.next`
- **Install Command:** `npm install`

No additional configuration needed!

## Troubleshooting

### Build Fails

1. Check Node.js version (requires 18+)
2. Clear `.next` folder: `rm -rf .next`
3. Reinstall: `rm -rf node_modules && npm install`

### Routing Issues

- Ensure all pages use `'use client'` directive
- Check that dynamic routes use `[param]` syntax
- Verify `Link` components from `next/link`

### Styling Issues

- Ensure Tailwind CSS is configured
- Check `tailwind.config.ts` paths
- Verify `globals.css` imports Tailwind

## Performance

- **Static Generation:** Pages are pre-rendered
- **Image Optimization:** Next.js Image component ready
- **Code Splitting:** Automatic via Next.js
- **Caching:** Vercel Edge Network caching

## Custom Domain

1. Go to Project Settings → Domains
2. Add your domain
3. Update DNS records as instructed
4. SSL certificate auto-provisioned

## Preview Deployments

Every pull request gets a preview URL:
- Share with stakeholders
- Test before merging
- Automatic cleanup after PR merge

## Analytics

Enable Vercel Analytics:
1. Project Settings → Analytics
2. Enable Web Analytics
3. View in Dashboard

## Support

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [Vercel Support](https://vercel.com/support)

