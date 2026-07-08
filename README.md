# Ship Shop - Grand Line Shipyard

A premium full-stack e-commerce web application designed for browsing, purchasing, and managing legendary One Piece pirate vessels. It features a stunning glassmorphic dark-ocean design, secure JWT authentication, password hashing, persistent customer orders, and administrative ship and order management tools.

This project is rebuilt from the reference design in `24hr1a3121.html` using a modular architecture.

---

## Technology Stack

- **Frontend**: React (Vite), Axios, React Icons, Custom HSL Hues & Glassmorphism Styling.
- **Backend**: Node.js, Express, MongoDB, Mongoose, Bcryptjs, Jsonwebtoken, CORS.
- **Development Utility**: Nodemon.

---

## Project Structure

```
ship-shop/
├── backend/                         # Express Server & DB
│   ├── src/
│   │   ├── config/db.js             # MongoDB Connection setup
│   │   ├── models/                  # Database Schemas
│   │   │   ├── User.js              # Credentials (pre-save hashed)
│   │   │   ├── Product.js           # Ship specifications
│   │   │   └── Order.js             # Cart orders associated to User
│   │   ├── middleware/
│   │   │   └── authMiddleware.js    # JWT authorization & role gates
│   │   ├── controllers/             # Endpoint logic controllers
│   │   │   ├── userController.js    # Login, signup, JWT generation
│   │   │   ├── productController.js # Ship CRUD functions
│   │   │   └── orderController.js   # Order placements & status updates
│   │   ├── routes/                  # Express routes
│   │   │   ├── userRoutes.js        # /api/users
│   │   │   ├── productRoutes.js     # /api/products
│   │   │   └── orderRoutes.js       # /api/orders
│   │   └── index.js                 # Server mount & initializer
│   ├── seeder.js                    # Database seeder (Ships + Default Users)
│   ├── .env                         # Server environment variables
│   └── package.json
└── frontend/                        # React Frontend
    ├── src/
    │   ├── components/              # Modular UI components
    │   │   ├── Header.jsx           # Navbar, user state & cart count
    │   │   ├── ProductCard.jsx      # Adaptive card (User Add to Cart / Admin Edit-Delete)
    │   │   ├── ProductGrid.jsx      # Search filter layout
    │   │   ├── CartDrawer.jsx       # Checkout drawer requiring login
    │   │   ├── AuthPage.jsx         # Toggle login/signup forms
    │   │   ├── OrdersPanel.jsx      # Customers order log & Admin status grid
    │   │   └── Footer.jsx           # Supernova special offer banner
    │   ├── services/api.js          # Axios client with request token interceptor
    │   ├── App.jsx                  # Main React controller (routing, states)
    │   └── index.css                # Custom glassmorphic CSS variables & animations
    ├── vite.config.js
    ├── index.html
    └── package.json
```

---

## Default Accounts for Testing
When you seed the database, it will automatically register two accounts:

1. **Administrator Account**
   - **Email**: `admin@shipshop.com`
   - **Password**: `admin123`
   - **Access**: Full Product CRUD (Refitting/Scrapping/Commissioning) & Master Order status fulfillment updates.

2. **Customer Account**
   - **Email**: `zoro@shipshop.com`
   - **Password**: `zoro123`
   - **Access**: Add ships to cart, checkout, view personal order commission history.

---

## Local Run Instructions

### Prerequisites
- [Node.js](https://nodejs.org) (v18+ recommended)
- [MongoDB Community Server](https://www.mongodb.com/try/download/community) running locally on port `27017` (or an Atlas connection string).

---

### Step 1: Configure Environment Variables

**Backend (`backend/.env`)**
Create or edit `backend/.env` file:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/shipshop
JWT_SECRET=grandlineshipyardsecret
```
*(Change `MONGO_URI` if using MongoDB Atlas. Replace `JWT_SECRET` with any secure key).*

**Frontend (`frontend/.env`)**
Optional, configure API URL:
```env
VITE_API_URL=http://localhost:5000/api
```

---

### Step 2: Install & Start Backend

1. Open your terminal. If your directory path contains spaces, **always wrap the path in double quotes**:
   ```powershell
   cd "C:\Users\K DINESH\.gemini\antigravity\scratch\ship-shop\backend"
   ```
2. Install server dependencies:
   ```bash
   npm install
   ```
3. Wipe and seed the database with products and default users:
   ```bash
   npm run seed
   ```
4. Start the Express server:
   ```bash
   npm run dev
   ```

---

### Step 3: Install & Start Frontend

1. Open a new terminal window:
   ```powershell
   cd "C:\Users\K DINESH\.gemini\antigravity\scratch\ship-shop\frontend"
   ```
2. Install React dependencies:
   ```bash
   npm install
   ```
3. Start the Vite React development server:
   ```bash
   npm run dev
   ```
4. Vite will launch the server and open **`http://localhost:3000`** in your browser.

---

## API Documentation (Routes)

### 1. User & Authentication (`/api/users`)
- `POST /api/users` - Register a new user. Returns user details + JWT token.
- `POST /api/users/login` - Authenticate user credentials. Returns details + JWT token.
- `GET /api/users/profile` - Get logged-in user profile info. *(Requires JWT Bearer Header)*.

### 2. Products (`/api/products`)
- `GET /api/products` - List all products.
- `GET /api/products/:id` - Get detail of a specific ship.
- `POST /api/products` - Commission (Create) a ship. *(Requires JWT Admin Bearer)*.
- `PUT /api/products/:id` - Refit (Update) a ship. *(Requires JWT Admin Bearer)*.
- `DELETE /api/products/:id` - Scrap (Delete) a ship. *(Requires JWT Admin Bearer)*.

### 3. Orders (`/api/orders`)
- `POST /api/orders` - Place a new order with cart items. *(Requires JWT Bearer)*.
- `GET /api/orders/myorders` - List personal order logs. *(Requires JWT Bearer)*.
- `GET /api/orders` - List all client order logs. *(Requires JWT Admin Bearer)*.
- `PUT /api/orders/:id/status` - Update an order status (`Pending`, `Processing`, `Shipped`, `Delivered`). *(Requires JWT Admin Bearer)*.

---

## Deployment Guide

### 1. Database Deployment (MongoDB Atlas)
1. Register/Login at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2. Create a Free Shared Cluster.
3. In **Database Access**, create a user with read/write credentials.
4. In **Network Access**, add IP Address `0.0.0.0/0` (allow access from anywhere).
5. Click **Connect** &rarr; Copy your MongoDB Connection String (URI).
6. Replace the username and password in the connection string and use it as `MONGO_URI` in the backend environment.

### 2. Backend Deployment (Render or Railway)
**Using Render:**
1. Put your backend code in a GitHub repository.
2. Log in to [Render](https://render.com) and create a new **Web Service**.
3. Link your GitHub repository.
4. Configure these fields:
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `node src/index.js`
5. Go to the **Environment** tab and add the Environment Variables:
   - `MONGO_URI` = *(Your MongoDB Atlas URI)*
   - `JWT_SECRET` = *(Your Secure Secret Key)*
   - `PORT` = `5000`
6. Click Deploy. Render will provide a public URL (e.g. `https://ship-shop-api.onrender.com`).

### 3. Frontend Deployment (Vercel or Netlify)
**Using Vercel:**
1. Navigate to the `frontend/` directory.
2. Create or ensure you have a `vercel.json` for routing:
   ```json
   {
     "rewrites": [{ "source": "/(.*)", "destination": "/" }]
   }
   ```
3. Log in to [Vercel](https://vercel.com).
4. Create a new project, select the repository, and set the **Root Directory** as `frontend`.
5. Set the **Framework Preset** as `Vite`.
6. Add Environment Variables:
   - `VITE_API_URL` = `https://ship-shop-api.onrender.com/api` (Point to your deployed backend URL).
7. Click Deploy. Vercel will host your app (e.g., `https://ship-shop.vercel.app`).
