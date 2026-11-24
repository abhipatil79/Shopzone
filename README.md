# ShopZone — Full-Stack Amazon Clone

A modern, full-featured e-commerce platform built with React, Redux Toolkit, Tailwind CSS, Node.js, Express, and MongoDB.

---

## 🚀 Features

### Customer Experience
- **Authentication & Profiles**: Secure JWT authentication, password hashing with bcryptjs, protected routes, and profile management with shipping addresses.
- **Product Catalog**:
  - Homepage featuring highlighted & trending products.
  - Multi-attribute search (by name, description, and brand).
  - Filtering by category, brand, price range, and rating.
  - Sorting by price (asc/desc), highest rating, and latest additions.
- **Product Details & Reviews**:
  - Stock quantity selectors and real-time inventory checks.
  - Verified customer reviews with 1–5 star ratings and recalculation of average ratings.
  - Related product recommendations.
- **Shopping Cart & Wishlist**:
  - Persistent database-backed cart synced to user accounts.
  - Dynamic tax (8%) and shipping calculations (Free shipping over $100).
  - Wishlist management with one-click transfer to cart.
- **Checkout & Order Tracking**:
  - Multi-step checkout flow (Shipping address → Order review & simulation).
  - Order history tracking with status stages (`pending`, `processing`, `shipped`, `delivered`, `cancelled`).

### Admin Management Portal (`/admin`)
- **Interactive Dashboard**: Real-time sales metrics (Total Revenue, Orders, Products, Registered Users).
- **Product Management**: Full CRUD interface to add, edit, or delete catalog items with image URLs and inventory.
- **Order Management**: Review customer orders and update shipping/fulfillment statuses.
- **User Management**: Administrative overview of registered accounts with protected admin role safeguards.

---

## 🛠 Tech Stack

- **Frontend**: React 18, Vite, Redux Toolkit, React Router v6, Tailwind CSS, React Hot Toast, React Icons
- **Backend**: Node.js, Express.js, Mongoose, JSON Web Tokens (JWT), bcryptjs, Morgan, CORS
- **Database**: MongoDB (Local or MongoDB Atlas)

---

## 📂 Project Structure

```
amazon-clone/
├── backend/
│   ├── config/           # Database configuration
│   ├── controllers/      # Route controllers (Auth, Products, Orders, Cart, etc.)
│   ├── middleware/       # JWT auth & error handling middleware
│   ├── models/           # Mongoose data schemas (User, Product, Order, Cart, Review)
│   ├── routes/           # REST API endpoints
│   ├── utils/            # JWT generator and database seed script
│   └── server.js         # Express server entry point
└── frontend/
    ├── src/
    │   ├── api/          # Axios instance and interceptors
    │   ├── components/   # Common, layout, product, and admin UI components
    │   ├── pages/        # Route pages (Home, ProductDetail, Cart, Checkout, Admin, etc.)
    │   ├── store/        # Redux store and slices (auth, products, cart, orders, wishlist)
    │   └── utils/        # Protected and Admin route guards
    └── index.html
```

---

## 🏁 Quick Start

### Prerequisites
- [Node.js](https://nodejs.org/) (v18+)
- [MongoDB](https://www.mongodb.com/) running locally or a MongoDB Atlas URI

### 1. Setup Backend
```bash
cd backend
npm install
```

Create a `.env` file in `backend/` (or copy from `.env.example`):
```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/amazon-clone
JWT_SECRET=your_secret_jwt_key
JWT_EXPIRE=30d
STRIPE_SECRET_KEY=sk_test_placeholder
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```

Seed initial products and demo accounts:
```bash
npm run seed
```

Start the backend API server:
```bash
npm run dev
# Running on http://localhost:5000
```

### 2. Setup Frontend
In a new terminal:
```bash
cd frontend
npm install
npm run dev
# Running on http://localhost:5173
```

Open `http://localhost:5173` in your browser.

---

## 🔑 Demo Credentials

| Role | Email | Password | Access |
|---|---|---|---|
| **Admin** | `admin@example.com` | `password123` | Full admin dashboard & customer features |
| **Customer** | `john@example.com` | `password123` | Shopping, cart, checkout, orders |
