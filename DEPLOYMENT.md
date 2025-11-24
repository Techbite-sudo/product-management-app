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
   
   Create `.github/workflows/deploy.yml`:
   ```yaml
   name: Deploy to GitHub Pages
   
   on:
     push:
       branches: [ main ]
   
   jobs:
     deploy:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v3
         - uses: oven-sh/setup-bun@v1
         - run: bun install
         - run: bun run build
         - uses: peaceiris/actions-gh-pages@v3
           with:
             github_token: ${{ secrets.GITHUB_TOKEN }}
             publish_dir: ./dist
   ```

4. **Verify Base Path:**
   - The `vite.config.js` is configured with base path `/product-management-app/` for production
   - Make sure your repository name matches this path, or update the base path accordingly
   - For a repository named `product-management-app`, the base path should be `/product-management-app/`
   - For a repository at the root level (username.github.io), change base path to `/`

### Important Notes

- The base path in `vite.config.js` must match your GitHub Pages URL structure
- After deployment, your app will be available at: `https://username.github.io/product-management-app/`
- Make sure Vue Router is using `createWebHistory()` (which it is) for proper routing

## Other Hosting Options

### Vercel / Netlify

1. Build command: `bun run build` or `npm run build`
2. Output directory: `dist`
3. Change base path in `vite.config.js` to `/` for these platforms

### Custom Server

1. Build the application
2. Serve the `dist` folder with any static file server
3. Ensure the server is configured for SPA routing (all routes should serve `index.html`)

