# Al Ansar Abaya Store — Complete Technical Documentation

> For building a similar Abaya e-commerce store

---

## 1. TECH STACK

### Frontend
- **Framework**: React 19.2 + Vite 7.3.1
- **Styling**: Tailwind CSS 4.1 with PostCSS
- **Routing**: React Router DOM 7.13.1
- **Animation**: Framer Motion 12.34.0
- **Icons**: Lucide React 0.563.0
- **Utilities**: clsx 2.1.1, tailwind-merge 3.4.0

### Backend
- **Language**: PHP 7.4+
- **Database**: MySQL 5.7+
- **ORM**: PDO (native PHP)
- **Server**: Apache (XAMPP local, Hostinger production)
- **Auth**: Session-based Bearer tokens (64-char hex, SHA256)

### Build & Deployment
- **Build Tool**: Vite
- **Code Splitting**: Manual chunks (framer-motion, react-router)
- **Production Build**: `npm run build` → `dist/` folder
- **Hosting**: XAMPP (local), Hostinger (production)
- **SPA Routing**: .htaccess rewrites for React Router

---

## 2. PROJECT STRUCTURE

```
T-SHIRT-ECOMMERCE-STORE/
├── src/
│   ├── main.jsx                      # Entry point: BrowserRouter > AuthProvider > CartProvider
│   ├── App.jsx                       # Route definitions & layout logic
│   ├── config.js                     # API URLs (local vs prod)
│   ├── constants.js                  # Image imports & constants
│   ├── App.css                       # Global styles (if any)
│   ├── index.css                     # Tailwind imports
│   │
│   ├── context/
│   │   ├── AuthContext.jsx           # Login/register/logout, token management
│   │   └── CartContext.jsx           # Cart state, localStorage persistence
│   │
│   ├── components/
│   │   ├── Header.jsx                # Fixed sticky header, mobile nav
│   │   ├── Hero.jsx                  # Hero banner
│   │   ├── Shop.jsx                  # Main shop with filters & pagination
│   │   ├── ProductDetail.jsx         # Single product page
│   │   ├── ProductCard.jsx           # Reusable product card
│   │   ├── CartSidebar.jsx           # Right slide-in cart panel
│   │   ├── Checkout.jsx              # Order form + payment methods
│   │   ├── AuthPage.jsx              # Login/register tabs
│   │   ├── AdminPanel.jsx            # Admin dashboard (products + orders)
│   │   ├── UserProfile.jsx           # User order history & settings
│   │   ├── BestSellers.jsx           # Homepage best sellers section
│   │   ├── FeaturedCollection.jsx    # Masonry grid of collections
│   │   ├── LeadCollection.jsx        # Secondary collections grid
│   │   ├── SaleBanner.jsx            # Sale promotion banner
│   │   ├── PromoCards.jsx            # 3-column promo cards
│   │   ├── SearchModal.jsx           # Debounced product search (modal)
│   │   ├── Categories.jsx            # Category filter page
│   │   ├── Footer.jsx                # Footer with links
│   │   ├── AnnouncementBar.jsx       # Top announcement bar
│   │   └── [Other components]        # BlogArticles, Features, ContactPage, etc.
│   │
│   └── assets/
│       ├── logo-2.png
│       ├── icon.jpeg
│       └── *.webp                    # Hero & product images
│
├── api/
│   ├── config.php                    # DB connection, CORS, auth validation
│   ├── login.php                     # POST login, rate limiting, token generation
│   ├── register.php                  # POST register, input validation
│   ├── logout.php                    # POST logout, session cleanup
│   │
│   ├── get_products.php              # GET /api/get_products?category=&search=&id=
│   ├── get_categories.php            # GET /api/get_categories
│   ├── get_product_images.php        # GET /api/get_product_images?product_id=
│   ├── get_brands.php                # GET /api/get_brands
│   ├── get_collections.php           # GET /api/get_collections
│   │
│   ├── place_order.php               # POST create order (requires auth)
│   ├── get_orders.php                # GET all orders (admin only)
│   ├── get_user_orders.php           # GET user's own orders (auth required)
│   ├── update_order_status.php       # PUT update order status (admin only)
│   ├── delete_order.php              # DELETE soft-delete order (admin only)
│   │
│   ├── admin_products.php            # GET/POST/PUT/DELETE products (admin token)
│   ├── admin_upload_image.php        # POST multipart image upload (admin token)
│   ├── admin_product_images.php      # Manage product images
│   │
│   ├── setup_db.php                  # One-time DB initialization
│   ├── get_schema.php                # GET current DB schema (debug)
│   ├── db_test.php                   # DB connection test
│   │
│   └── migrations/
│       └── assign_product_images.php
│
├── .htaccess                         # SPA routing + API proxy
├── index.html                        # HTML entry
├── vite.config.js                    # Vite bundler config
├── tailwind.config.js                # Tailwind CSS config
├── package.json                      # Dependencies
├── eslint.config.js                  # ESLint config
│
└── dist/                             # Production build (generated)
```

---

## 3. DATABASE SCHEMA

### Core Tables

#### `users` (User Accounts)
```sql
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,  -- bcrypt hashed
    role VARCHAR(20) DEFAULT 'user', -- 'user' or 'admin'
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_username (username),
    INDEX idx_email (email)
);
```

#### `user_sessions` (Auth Tokens)
```sql
CREATE TABLE user_sessions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    role VARCHAR(20) NOT NULL,
    token VARCHAR(64) NOT NULL UNIQUE,    -- 256-bit hex (random_bytes(32))
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expires_at DATETIME NOT NULL,         -- NOW() + 7 days
    INDEX idx_token (token),
    INDEX idx_username (username)
);
```

#### `cf_products` (Product Catalog)
```sql
CREATE TABLE cf_products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(100) DEFAULT 'General',
    price DECIMAL(10,2) NOT NULL,
    old_price DECIMAL(10,2) DEFAULT NULL,
    description TEXT,
    image VARCHAR(500) DEFAULT '',      -- relative or absolute URL
    sizes VARCHAR(200) DEFAULT '',      -- JSON or comma-separated
    colors VARCHAR(200) DEFAULT '',     -- JSON or comma-separated
    stock INT DEFAULT 0,
    featured TINYINT(1) DEFAULT 0,      -- trending/bestseller flag
    active TINYINT(1) DEFAULT 1,        -- soft delete
    sort_order INT DEFAULT 0,           -- manual sort priority
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_active (active),
    INDEX idx_category (category),
    INDEX idx_featured (featured)
);
```

#### `orders` (Customer Orders)
```sql
CREATE TABLE orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    address VARCHAR(255) NOT NULL,
    city VARCHAR(100) NOT NULL,
    postal_code VARCHAR(20),
    phone VARCHAR(20),
    payment_method VARCHAR(50),  -- 'cod', 'bank', 'easypaisa', 'jazzcash'
    items JSON NOT NULL,          -- array of {id, title, price, quantity}
    subtotal DECIMAL(10,2),
    shipping_cost DECIMAL(10,2),
    total DECIMAL(10,2),
    status VARCHAR(50) DEFAULT 'pending',  -- 'pending', 'confirmed', 'shipped', 'delivered'
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_username (username),
    INDEX idx_status (status),
    INDEX idx_created_at (created_at)
);
```

#### `login_attempts` (Rate Limiting)
```sql
CREATE TABLE login_attempts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    ip_address VARCHAR(45) NOT NULL,
    attempted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_ip_time (ip_address, attempted_at)
);
```

#### Optional Tables (not used yet)
- `product_images` — multi-image support per product
- `categories` — structured category hierarchy
- `brands` — brand catalog
- `collections` — product collections/bundles
- `wishlist` — user favorites
- `coupons` — discount codes

---

## 4. API ENDPOINTS

### Authentication

**POST /api/login.php**
```
Request:
{
  "username": "john_doe",
  "password": "secure_password"
}

Response (200):
{
  "success": true,
  "token": "a1b2c3d4...",  // 64-char hex
  "user": {
    "username": "john_doe",
    "email": "john@example.com",
    "role": "user"
  }
}

Response (401):
{
  "success": false,
  "error": "Invalid username or password"
}
```

**POST /api/register.php**
```
Request:
{
  "username": "newuser",
  "email": "new@example.com",
  "password": "password123"
}

Validation:
- Username: 3-30 chars, letters/numbers/underscores only
- Email: valid format, max 255 chars
- Password: 8-128 chars

Response (201):
{
  "success": true,
  "message": "Registration successful. Please log in."
}
```

**POST /api/logout.php**
```
Headers: Authorization: Bearer <token>
Response (200): {"success": true}
```

### Products

**GET /api/get_products.php**
```
Query Parameters:
?id=123              # Single product by ID
?category=Men        # Filter by category
?search=tshirt       # Search by name/description
?trending=1          # Only featured products
?limit=50            # Max results (default 100, max 500)

Response (200):
[
  {
    "id": 1,
    "title": "Classic T-Shirt",
    "price": 25.99,
    "retail_price": 39.99,
    "discount_pct": 35,
    "image_url": "http://...",
    "category": "Men",
    "is_trending": true,
    "stock_status": "in_stock",
    "stock_quantity": 42,
    "description": "...",
    "short_description": "...",
    "sizes": "S,M,L,XL",
    "colors": "Red,Blue,Black",
    "created_at": "2025-01-15T10:30:00"
  },
  ...
]
```

**GET /api/get_categories.php**
```
Response (200):
[
  {
    "id": 1,
    "name": "Men",
    "slug": "men",
    "image": "..."
  },
  ...
]
```

### Orders

**POST /api/place_order.php** (requires auth)
```
Headers: Authorization: Bearer <token>

Request:
{
  "email": "user@example.com",
  "firstName": "John",
  "lastName": "Doe",
  "address": "123 Main St",
  "city": "Karachi",
  "postalCode": "74000",
  "phone": "+923001234567",
  "paymentMethod": "cod",  // cod|bank|easypaisa|jazzcash
  "items": [
    { "id": 1, "title": "T-Shirt", "price": 25.99, "quantity": 2 }
  ],
  "notes": "Gift wrapping requested"
}

Validation:
- Server computes total from DB prices (never trusts client)
- All text fields: max length limits
- Email: valid format
- Items: 1-100, must exist in DB
- Payment method: whitelist check
- Must be logged in

Response (201):
{
  "success": true,
  "order_id": 12345,
  "message": "Order placed successfully"
}

Response (400):
{
  "success": false,
  "error": "Missing required field: firstName"
}

Response (401):
{
  "success": false,
  "error": "You must be logged in to place an order"
}
```

**GET /api/get_user_orders.php** (requires auth)
```
Headers: Authorization: Bearer <token>

Response (200):
[
  {
    "id": 12345,
    "email": "user@example.com",
    "first_name": "John",
    "total": 51.98,
    "status": "shipped",
    "created_at": "2025-01-20T14:22:00"
  },
  ...
]
```

**GET /api/get_orders.php** (admin only)
```
Headers: Authorization: Bearer <admin_token>

Query Parameters:
?status=pending    # Filter by status
?username=john_doe # Filter by user
?limit=50

Response (200): [... all orders ...]
```

**PUT /api/update_order_status.php** (admin only)
```
Headers: Authorization: Bearer <admin_token>

Request:
{
  "id": 12345,
  "status": "shipped"
}

Valid statuses: pending, confirmed, shipped, delivered, cancelled
```

---

## 5. FRONTEND ARCHITECTURE

### Context Providers

#### AuthContext (`src/context/AuthContext.jsx`)
```javascript
const { 
  user,              // { username, email, role }
  token,             // JWT bearer token
  loading,           // Initial load state
  isAdmin,           // user?.role === 'admin'
  login(user, pass), // → { success, role|error }
  register(u,e,p),   // → { success|error }
  logout(),          // Clears state & localStorage
  authFetch(url, opts) // fetch with auto Authorization header
} = useAuth()
```

**Storage Key**: `alansarabayah_auth` (localStorage)

#### CartContext (`src/context/CartContext.jsx`)
```javascript
const {
  cartItems,         // [ {id, title, price, quantity, ...} ]
  cartCount,         // Sum of all quantities
  cartTotal,         // Sum of (price * quantity)
  isCartOpen,        // Sidebar visibility
  addToCart(product),
  removeFromCart(id),
  updateQuantity(id, qty),
  clearCart(),
  setIsCartOpen(bool)
} = useCart()
```

**Storage Key**: `alansarabayah_cart` (localStorage)

### Routing

All routes use **React Router DOM v7** with layout detection in `App.jsx`:

| Route | Layout | Component | Auth |
|-------|--------|-----------|------|
| `/` | Store (header+footer) | HomePage | — |
| `/shop` | Store | Shop | — |
| `/category` | Store | Categories | — |
| `/product/:id` | Store | ProductDetail | — |
| `/checkout` | Store | Checkout | — |
| `/profile` | Store | UserProfile | user+ |
| `/login` | Full screen | AuthPage | — |
| `/register` | Full screen | AuthPage | — |
| `/admin` | Full screen | AdminPanel | admin |

**Layout Strategy**:
- Pages wrapped in `<Header>` + `<Footer>` + `<CartSidebar>`
- Auth & Admin pages get full-screen layout without header/footer
- Animated transitions via `AnimatePresence` (Framer Motion)

### Key Components

#### Header.jsx
- Fixed sticky position at top
- Mobile: hamburger menu (left sidebar), search icon
- Desktop: full nav bar
- Scroll-aware (color changes on scroll)
- Cart icon with badge (item count)
- Responsive breakpoints: `md:` (768px)

#### Shop.jsx
- Category filter tabs (All, Men, Women, etc.)
- Product grid (4 columns desktop, 2 mobile)
- "Load More" pagination button
- Search integration with SearchModal
- Debounced API calls

#### ProductCard.jsx
- Two variants: default & featured (featured = larger, with badge)
- Shows: image, title, price, discount %, rating
- "Add to Cart" button
- Click → navigate to detail page

#### ProductDetail.jsx
- Static 4-thumbnail gallery (all same image currently)
- Sizes & colors selection (UI only, not functional)
- Stock status badge
- Add to Cart (no quantity selector, always qty=1)
- "You May Also Like" section

#### Checkout.jsx
- Multi-step form (shipping, payment, review)
- Payment methods: COD, Bank Transfer, EasyPaisa, JazzCash (Pakistan-focused)
- Form validation
- Order summary
- POST to `/api/place_order.php`

#### AdminPanel.jsx
- Two tabs: Orders & Products
- **Orders**: poll every 10s, status dropdown, delete button
- **Products**: list with add/edit/delete, image upload
- Admin token required (`validateAuthToken(..., 'admin')`)

#### CartSidebar.jsx
- Right slide-in panel
- Animates with Framer Motion
- Item list with quantity controls
- Subtotal display
- Checkout button
- Empty cart message

---

## 6. AUTHENTICATION FLOW

### Token Generation & Validation

**On Login Success**:
1. Check username/email + password against DB
2. Generate 64-char hex token: `bin2hex(random_bytes(32))`
3. Store in `user_sessions` table with 7-day expiry
4. Return token to client

**On Protected API Call**:
1. Client sends: `Authorization: Bearer <token>`
2. Server validates token exists & not expired
3. Optional role check: `validateAuthToken($pdo, 'admin')`

**Rate Limiting**:
- 5 login attempts per IP per 15 minutes
- Tracked in `login_attempts` table
- Automatic cleanup of stale attempts

**Session Management**:
- Tokens expire after 7 days
- Expired sessions auto-cleaned from DB
- Client logout removes localStorage entry

---

## 7. SECURITY FEATURES

### Password Security
- **Hashing**: PHP `password_hash()` (bcrypt, cost=10)
- **Verification**: `password_verify()`
- **Length**: 8-128 chars
- **No plaintext** in logs or DB

### Input Validation
- Email: `FILTER_VALIDATE_EMAIL`
- Text fields: length limits (50-255 chars)
- Username: regex `^[a-zA-Z0-9_]+$`, 3-30 chars
- Payment method: whitelist check
- Array sizes: 1-100 items max

### Order Total Calculation
- **Server-side only** — client price ignored
- Fetches current prices from DB
- Prevents price tampering

### CORS
- Whitelist origin check
- Allowed: localhost (dev), alansarabayah.com (prod)
- Credentials allowed for auth

### Rate Limiting
- Login: 5 attempts per 15 mins per IP
- IP extracted from `X-Forwarded-For` header (proxy-aware)

---

## 8. DEPLOYMENT

### Local Development
```bash
# Frontend
npm install
npm run dev          # Vite dev server: http://localhost:5173

# Backend
# XAMPP: apache + MySQL running
# API access: http://localhost/T-SHIRT-ECOMMERCE-STORE/api/get_products.php
```

### Production (Hostinger)
```bash
# Build
npm run build        # → dist/

# Upload to Hostinger public_html/
upload: dist/ + api/

# .htaccess handles:
# - React Router SPA routing
# - API requests proxied to /api/
# - Static file serving
```

### Environment Config
- **Local**: `localhost` → XAMPP (root, no password)
- **Production**: Hostinger env vars (DB_HOST, DB_USER, DB_PASS, DB_NAME)
- **API_BASE_URL**: Auto-detected in `src/config.js`

### Database Initialization
1. First API call auto-creates tables if missing
2. Optional: run `api/setup_db.php` manually
3. No migrations needed — schema evolves with code

---

## 9. KEY FEATURES & HOW THEY WORK

### Product Search
- Debounced search in SearchModal (300ms delay)
- Searches: name, description, category
- LIKE queries in MySQL
- Live results as user types

### Shopping Cart
- localStorage-persisted state
- Add: quantity +1 if exists, else new item
- Remove: filter from array
- Quantity: update by item ID

### Order Placement
1. User must be logged in
2. Form validation (email, names, address, etc.)
3. Server fetches current product prices
4. Computes total: sum of (price * qty) + shipping
5. Inserts into `orders` table
6. Returns order ID

### Admin Dashboard
- Product CRUD: add/edit/delete with image upload
- Order management: view, status updates, delete
- Search & filters for both
- Polling every 10s for order updates

### Product Images
- Currently stored as single URL per product
- Optional: multi-image support via separate `product_images` table
- Upload to `images/products/` via admin panel

---

## 10. COMMON PATTERNS & CONVENTIONS

### API Response Format
All endpoints return JSON:
```javascript
// Success
{ "success": true, "data": {...} }

// Error
{ "success": false, "error": "message" } // HTTP status code set

// Alternative
{ "data": [...] }  // GET list endpoints
```

### HTTP Status Codes
- 200: OK
- 201: Created
- 204: No Content
- 400: Bad Request (validation)
- 401: Unauthorized (auth required)
- 403: Forbidden (insufficient role)
- 404: Not Found
- 405: Method Not Allowed
- 429: Too Many Requests
- 500: Server Error

### Frontend Styling
- **Color Scheme**: Pink (#EB3461), Black, White
- **Font**: Outfit (Google Fonts)
- **Tailwind Utilities**: clsx + tailwind-merge for class composition
- **Responsive**: Mobile-first, `md:` breakpoint (768px)

### Image Handling
- Relative paths in DB: `images/products/filename.jpg`
- API resolves to absolute URL on response
- Uses `imageBase` computed from request host

---

## 11. KNOWN LIMITATIONS & TODOs

### Not Yet Implemented
- [ ] Product variants (size/color selection functional)
- [ ] Multi-image gallery per product
- [ ] Wishlist (local state only, not DB-linked)
- [ ] Coupon codes & discounts
- [ ] Product ratings & reviews
- [ ] Refunds & returns
- [ ] Shipping tracking
- [ ] Email notifications
- [ ] Admin analytics dashboard

### Known Bugs
1. **Header.jsx:163** — Mobile nav shows Admin to all users (should check `isAdmin`)
2. **Checkout.jsx:327** — JazzCash condition checks wrong field
3. **LoginPage.jsx** — Failed login doesn't set error message
4. **Checkout.jsx:123** — Order confirmation shows random number instead of real order ID

### Potential Improvements
- [ ] Replace multi-image placeholder with real multi-image support
- [ ] Add 404 error page
- [ ] Implement password reset flow
- [ ] Add email confirmation on registration
- [ ] API pagination (infinite scroll or numbered pages)
- [ ] Admin role hierarchy (editor, moderator, admin)
- [ ] Audit logging for admin actions
- [ ] Analytics tracking (Google Analytics, Mixpanel)

---

## 12. FILE-BY-FILE BREAKDOWN

### Critical Files

**src/config.js** — All API URLs defined here. Change for new domain.

**api/config.php** — DB credentials, CORS, auth logic. Update for new database.

**src/context/AuthContext.jsx** — User login/token logic. Modify for custom auth flow.

**src/context/CartContext.jsx** — Cart state. Change localStorage key if needed.

**api/login.php** — Token generation, rate limiting. Core auth logic.

**api/place_order.php** — Order validation & total calculation. Critical for security.

**src/components/AdminPanel.jsx** — Product CRUD, order management. 300+ lines.

### Component Dependencies
- Most components depend on `useCart()` and `useAuth()`
- ProductCard → ProductDetail (navigate on click)
- Shop → ProductCard (renders grid)
- Checkout → place_order API
- AdminPanel → 4 admin API endpoints
- Header → uses `NAV_ITEMS` constant + responsive layout logic

---

## 13. MIGRATION GUIDE FOR NEW PROJECT (Abaya Store)

### Quick Setup
1. **Clone repo** or create new React + Vite project
2. **Update `src/config.js`** — Change API_BASE_URL for your domain
3. **Update `api/config.php`** — Change DB name, update CORS origins, add new domain
4. **Database**: Create new MySQL DB, tables auto-create on first API call
5. **Styling**: Change brand color (#EB3461 → your color) globally in Tailwind
6. **Content**: Update logo, hero images, product categories, company info
7. **Build & Deploy**: `npm run build`, upload dist/ + api/ to Hostinger

### Key Changes for Abaya Store
1. Category filters: "Abayas", "Cardigans", "Dresses" instead of "Men", "Women", "T-Shirts"
2. Size options: S/M/L/XL/2XL/3XL (Abaya runs larger)
3. Color palette: Blacks, whites, pastels, jewel tones (not bright reds)
4. Shipping: Pakistan-focused (adjust for Abaya market)
5. Product descriptions: Highlight fabric, hijab-friendly design, comfort
6. Modesty focus in marketing: Emphasize modest fashion, Islamic values
7. Hero images: Abaya-focused photography

---

## 14. ADDITIONAL RESOURCES

### Files with Extensive Comments
- `api/config.php` — Auth token validation, CORS setup
- `api/login.php` — Rate limiting, token generation
- `api/place_order.php` — Input validation, total calculation

### Testing Endpoints
```bash
# Healthcheck
curl http://localhost/T-SHIRT-ECOMMERCE-STORE/api/get_products.php?limit=1

# Login
curl -X POST http://localhost/T-SHIRT-ECOMMERCE-STORE/api/login.php \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","password":"password123"}'

# Create product (admin)
curl -X POST http://localhost/T-SHIRT-ECOMMERCE-STORE/api/admin_products.php \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"name":"New Product","price":99.99,"category":"Men"}'
```

---

**Last Updated**: 2025-05-11
**Project**: Al Ansar Abaya Store
**Purpose**: Reference for building similar e-commerce stores (Abaya, other fashion)
