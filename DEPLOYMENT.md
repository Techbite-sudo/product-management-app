# Deployment Guide

## GitHub Pages Deployment

### Steps

1. **Build the application:**
   ```bash
   bun run build
   ```
   or
   ```bash
   npm run build
   ```

2. **Configure GitHub Pages:**
   - Go to your repository settings on GitHub
   - Navigate to "Pages" section
   - Set source to "GitHub Actions" or "Deploy from a branch"
   - If using branch deployment, select the `gh-pages` branch and `/` folder

3. **Using GitHub Actions (Recommended):**
   
   The workflow file `.github/workflows/deploy.yml` is already configured. Make sure:
   
   - **Enable GitHub Pages** in your repository settings:
     - Go to Settings → Pages
     - Under "Source", select "GitHub Actions"
   
   - **Repository Name**: The base path in `vite.config.js` automatically uses your repository name. If your repo is named `product-management-app`, the app will be available at `https://username.github.io/product-management-app/`
   
   - **For root-level GitHub Pages** (username.github.io), update `vite.config.js` base path to `/`
   
   The workflow uses the modern GitHub Pages deployment method with proper permissions and artifact handling.

4. **Verify Base Path:**
   - The `vite.config.js` is configured with base path `/product-management-app/` for production
   - Make sure your repository name matches this path, or update the base path accordingly
   - For a repository named `product-management-app`, the base path should be `/product-management-app/`
   - For a repository at the root level (username.github.io), change base path to `/`

### Important Notes

- **Enable GitHub Pages**: You must enable GitHub Pages in your repository settings and select "GitHub Actions" as the source
- The base path in `vite.config.js` automatically uses your repository name
- After deployment, your app will be available at: `https://username.github.io/repository-name/`
- Make sure Vue Router is using `createWebHistory()` (which it is) for proper routing
- The workflow supports both `main` and `master` branches

### Troubleshooting Deployment

If deployment fails:

1. **Check GitHub Pages Settings**:
   - Go to Settings → Pages
   - Ensure "Source" is set to "GitHub Actions"
   - Check that the workflow has proper permissions

2. **Verify Repository Name**:
   - The base path should match your repository name
   - For a repo named `product-management-app`, the base path should be `/product-management-app/`

3. **Check Workflow Logs**:
   - Go to Actions tab in your repository
   - Click on the failed workflow run
   - Check the build logs for errors

4. **Common Issues**:
   - **Build fails**: Check that all dependencies are in `package.json`
   - **404 errors**: Verify base path matches repository name
   - **Permission errors**: Ensure workflow has `pages: write` permission

## Other Hosting Options

### Vercel / Netlify

1. Build command: `bun run build` or `npm run build`
2. Output directory: `dist`
3. Change base path in `vite.config.js` to `/` for these platforms

### Custom Server

1. Build the application
2. Serve the `dist` folder with any static file server
3. Ensure the server is configured for SPA routing (all routes should serve `index.html`)

