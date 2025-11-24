# Product Management App

A Vue 3 Product Management Application built for AlienSoft Technologies technical assessment.

## Features

- ✅ User authentication with token-based session management
- ✅ Product listing with search and category filtering
- ✅ View product details
- ✅ Add new products
- ✅ Delete products with confirmation
- ✅ Responsive design with Tailwind CSS
- ✅ State management with Pinia
- ✅ Route protection and authentication guards

## Tech Stack

- **Vue 3** (Composition API)
- **Vue Router** - For navigation and route management
- **Pinia** - For state management (auth & products)
- **Tailwind CSS** - For styling
- **Axios** - For HTTP requests
- **Vite** - Build tool and dev server

## Project Structure

```
product-management-app/
├── src/
│   ├── api/
│   │   └── dummyjson.js          # API client for DummyJSON
│   ├── stores/
│   │   ├── auth.js               # Authentication Pinia store
│   │   └── products.js           # Products Pinia store
│   ├── router/
│   │   └── index.js              # Vue Router configuration
│   ├── views/
│   │   ├── Login.vue             # Login page
│   │   ├── ProductList.vue       # Product listing page
│   │   ├── ProductDetail.vue     # Product detail page
│   │   └── AddProduct.vue        # Add product page
│   ├── components/
│   │   └── LoadingSpinner.vue    # Loading spinner component
│   ├── App.vue                   # Root component
│   ├── main.js                   # Application entry point
│   └── style.css                 # Global styles with Tailwind
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── env.example              # Environment variables example
├── public/
│   ├── 404.html            # GitHub Pages SPA routing
│   └── .nojekyll           # Disable Jekyll processing
└── README.md
```

## Setup Instructions

### Prerequisites

- Node.js (v16 or higher)
- Bun (or npm/yarn)

### Installation

1. **Clone the repository** (or navigate to the project directory)

2. **Install dependencies:**
   ```bash
   bun install
   ```
   or
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   bun run dev
   ```
   or
   ```bash
   npm run dev
   ```

4. **Open your browser** and navigate to the URL shown in the terminal (typically `http://localhost:5173`)

### Build for Production

```bash
bun run build
```
or
```bash
npm run build
```

The built files will be in the `dist` directory.

### Preview Production Build

```bash
bun run preview
```
or
```bash
npm run preview
```

## Usage

### Login

1. Navigate to the login page (`/login`)
2. Use any valid DummyJSON credentials to login
   - Example credentials:
     - Username: `emilys`, Password: `emilyspass`
     - Username: `michaelw`, Password: `michaelwpass`
     - Username: `sophiab`, Password: `sophiabpass`
3. Upon successful login, you'll be redirected to the products page

### Product Management

- **View Products**: Browse all products on the main products page
- **Search**: Use the search bar to filter products by title
- **Filter by Category**: Select a category from the dropdown to filter products
- **View Details**: Click on any product row or the "View" button to see full details
- **Add Product**: Click "Add New Product" button to create a new product
- **Delete Product**: On the product detail page, click "Delete Product" and confirm

## API Integration

This application uses the [DummyJSON API](https://dummyjson.com) for:

- **Authentication**: `/auth/login` - Returns `accessToken` and user information
- **Products**: `/products` (GET, POST, PUT, DELETE)
- **Product Details**: `/products/:id`

The authentication `accessToken` is automatically included in API requests after login via axios request interceptors. Note that DummyJSON returns `accessToken` (not `token`) in the login response.

## Configuration

### Primary Color

The primary color `#000080` (Navy Blue) is configured in `tailwind.config.js` and used throughout the application for buttons, links, and accents.

### GitHub Pages Deployment

The `vite.config.js` includes a base path configuration (`/product-management-app/`) for GitHub Pages deployment. If deploying elsewhere, you may need to adjust this.

### Environment Variables

The project uses environment variables for configuration. An example file `env.example` is provided.

**For Local Development:**

Create a `.env.local` file in the root directory (this file is gitignored):

```env
# Base path for local development (usually '/')
VITE_BASE_PATH=/

# API Configuration (if needed in future)
# VITE_API_BASE_URL=https://dummyjson.com
```

**Available Environment Variables:**

- `VITE_BASE_PATH` - Base path for the application (default: `/product-management-app/` for production, `/` for development)
  - For GitHub Pages: Set automatically by the workflow based on repository name
  - For local dev: Usually `/` or leave empty
  - For custom deployment: Match your deployment path

- `VITE_API_BASE_URL` - API base URL (currently hardcoded to `https://dummyjson.com`)

**Note:** 
- Environment variables prefixed with `VITE_` are exposed to the client-side code
- For GitHub Pages deployment, `VITE_BASE_PATH` is automatically set by the GitHub Actions workflow
- The `.env.local` file is gitignored and should not be committed
- See `env.example` for a template

## Assumptions & Notes

1. **Authentication**: The app uses DummyJSON's authentication endpoint. The `accessToken` is stored in localStorage and persists across page refreshes.

2. **API Token Format**: DummyJSON returns an `accessToken` (not `token`) which is used with Bearer authentication for protected endpoints. The token is automatically included in API requests via axios interceptors.

3. **Product Images**: Product thumbnails are displayed as circular images. If an image fails to load, a placeholder is shown.

4. **Responsive Design**: The application is responsive and works well on desktop and tablet screens.

5. **Error Handling**: All API errors are caught and displayed to the user with appropriate error messages.

6. **Route Protection**: 
   - Unauthenticated users can only access `/login`
   - Authenticated users are redirected away from `/login` to `/products`

## Development Notes

- The application uses Vue 3 Composition API throughout
- Pinia stores handle all state management
- Route guards protect authenticated routes
- Loading states and error messages are displayed for better UX
- Form validation is implemented on the Add Product page

## Troubleshooting

### Login Issues

If you're experiencing "Invalid credentials" errors:

1. **Verify credentials**: Make sure you're using valid DummyJSON credentials. You can test with curl:
   ```bash
   curl -X POST https://dummyjson.com/auth/login \
     -H "Content-Type: application/json" \
     -d '{"username":"emilys","password":"emilyspass"}'
   ```

2. **Check token storage**: After successful login, verify that `accessToken` is stored in localStorage (check browser DevTools).

3. **API Response Format**: DummyJSON returns `accessToken` (not `token`) in the login response. The app handles this correctly.

### API Issues

- **Products not loading**: Check browser console for errors. The products API may work without authentication, but authenticated requests use Bearer token format.
- **CORS errors**: DummyJSON API should handle CORS correctly. If issues persist, check network tab in DevTools.

## License

This project was created for AlienSoft Technologies technical assessment.

