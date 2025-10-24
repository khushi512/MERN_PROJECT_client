# Vercel Deployment Guide

This guide will help you deploy your React job portal application to Vercel.

## Prerequisites

- A Vercel account (sign up at [vercel.com](https://vercel.com))
- Your project pushed to a Git repository (GitHub, GitLab, or Bitbucket)

## Environment Variables

Before deploying, you need to set up environment variables in Vercel:

1. Go to your project dashboard in Vercel
2. Navigate to Settings → Environment Variables
3. Add the following environment variable:

```
VITE_API_BASE_URL = https://your-backend-api-url.com
```

Replace `https://your-backend-api-url.com` with your actual backend API URL.

## Deployment Steps

### Option 1: Deploy via Vercel Dashboard

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "New Project"
3. Import your Git repository
4. Vercel will automatically detect this as a Vite project
5. Set the environment variable `VITE_API_BASE_URL` to your backend URL
6. Click "Deploy"

### Option 2: Deploy via Vercel CLI

1. Install Vercel CLI globally:
   ```bash
   npm i -g vercel
   ```

2. In your project directory, run:
   ```bash
   vercel
   ```

3. Follow the prompts to configure your project
4. Set the environment variable when prompted

## Configuration Files

The following files have been configured for Vercel deployment:

- `vercel.json` - Vercel configuration
- `vite.config.js` - Optimized build configuration
- `.env.example` - Environment variables template

## Build Configuration

The project is configured with:
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Framework**: Vite
- **Node Version**: Auto-detected

## Features Enabled

- ✅ Code splitting for better performance
- ✅ Gzip compression
- ✅ SPA routing support (all routes redirect to index.html)
- ✅ Environment variable support
- ✅ Optimized build output

## Troubleshooting

### Common Issues

1. **Build Fails**: Make sure all dependencies are installed and there are no TypeScript/ESLint errors
2. **API Calls Fail**: Verify that `VITE_API_BASE_URL` is set correctly in Vercel environment variables
3. **Routing Issues**: The `vercel.json` file includes rewrites to handle SPA routing

### Local Testing

To test the production build locally:

```bash
npm run build
npm run preview
```

## Support

If you encounter any issues during deployment, check:
1. Vercel deployment logs
2. Browser console for errors
3. Network tab for failed API calls
4. Environment variables are correctly set