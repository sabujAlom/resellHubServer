# ReSell Hub – Server (Backend)

ReSell Hub is an online second-hand marketplace platform. This directory contains the backend server built with **Node.js, Express, and MongoDB**, integrating Stripe checkout and Better Auth security.

---

## 🛠️ Tech Stack & Packages
- **Node.js & Express.js** (Server framework with ES Modules)
- **MongoDB** (Native driver for database collections)
- **Better Auth & @better-auth/mongodb-adapter** (Secure session and cookie managers)
- **Stripe SDK** (Secure checkout session creation and payment verification)
- **JSONWebToken (JWT)** (Custom routing authorizations and token signing)
- **CORS & Dotenv** (Request access configuration and environment management)

---

## 📦 NPM Packages Used
- `express`
- `better-auth`
- `@better-auth/mongo-adapter`
- `mongodb`
- `jsonwebtoken`
- `stripe`
- `cors`
- `dotenv`
- `nodemon` (Development watch mode)

---

## 🔑 Environment Configuration

Create a `.env` file in the root of the server folder:
```env
PORT=5000
DATABASE_URL=mongodb://127.0.0.1:27017/resellHubDB
BETTER_AUTH_SECRET=your_better_auth_session_secret_32_chars
BETTER_AUTH_URL=http://localhost:5000
STRIPE_SECRET_KEY=sk_test_...
JWT_SECRET=your_super_secret_jwt_signing_key_32_chars
```

---

## 📡 API Endpoints

### 🔐 Authentication
* `ALL /api/auth/*` - Better Auth routes handler
* `POST /api/jwt` - Generates custom JWT token for verified sessions
* `POST /api/register` - Custom fallback register endpoint
* `POST /api/login` - Custom fallback login endpoint

### 👥 Users
* `GET /api/users` - Retrieve all users (Admin)
* `PATCH /api/users/:id` - Update user status or verify sellers
* `DELETE /api/users/:id` - Delete user account

### 📦 Products
* `GET /api/products` - Fetch all products (supports filtering by category, condition, search, sort, and pagination)
* `GET /api/products/:id` - Fetch single product details
* `POST /api/products` - List a new product (Seller)
* `PATCH /api/products/:id` - Update product details or approval status
* `DELETE /api/products/:id` - Delete product listing

### 🛒 Orders
* `GET /api/orders` - Fetch orders (supports buyerId/sellerId filtering)
* `POST /api/orders` - Create a new booking/order
* `PATCH /api/orders/:id` - Update order delivery status
* `DELETE /api/orders/:id` - Cancel/delete order listing

### 💬 Reviews
* `GET /api/reviews` - Fetch reviews for a specific product
* `POST /api/reviews` - Submit review rating and comment

### 💳 Payments
* `POST /api/payments/create-checkout-session` - Generates a Stripe checkout session URL
* `GET /api/payments/verify-session` - Validates the Stripe session status, updates order to paid, and marks product sold
* `GET /api/payments` - Retrieve payment records/history
* `POST /api/payments` - Fallback manual payment record creation
