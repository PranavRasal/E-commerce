# 🛒 E-Commerce Platform

A full-stack e-commerce application built with **React.js, Node.js, Express.js, and MongoDB**. The platform provides a complete shopping experience with user authentication, product browsing, cart management, and order placement, along with a secure Admin Panel for managing products and orders.

## 🚀 Live Demo

https://e-commerce-1l1y.vercel.app/

## 📌 Features

### 👤 User

- User registration and login
- Secure authentication
- Browse products
- View product details
- Add products to cart
- Update cart quantity
- Remove products from cart
- Place orders
- View order details

### 🛠️ Admin

- Secure Admin Panel
- Add new products
- Edit products
- Update product information
- Manage products
- View customer orders
- Manage order status
- Update delivery status
- Complete product and order lifecycle management

## 🧑‍💻 Tech Stack

- **Frontend:** React.js, JavaScript, HTML5, CSS3
- **Backend:** Node.js, Express.js
- **Database:** MongoDB, Mongoose
- **Authentication:** JWT, bcrypt
- **API:** RESTful APIs
- **Tools:** Git, GitHub
- **Deployment:** Vercel

## 🏗️ Project Structure

```text
E-commerce/
│
├── Backend/
│
├── Frontend/
│
├── .gitignore
├── package.json
└── README.md
🔄 User Workflow
Register / Login
       ↓
Browse Products
       ↓
View Product
       ↓
Add to Cart
       ↓
Manage Cart
       ↓
Place Order
       ↓
View Order
🔐 Admin Workflow
Admin Login
     ↓
Admin Panel
     ↓
Add Product
     ↓
Edit / Update Product
     ↓
View Customer Orders
     ↓
Manage Orders
     ↓
Update Delivery Status
🛍️ Product Management

Users can browse products and view detailed product information.

Admins can:

Add products
Edit products
Update product details
Manage products
🛒 Cart Management

Users can:

Add products to cart
Remove products
Update product quantities
View cart items
Review cart before checkout
📦 Order Management

Users can place orders after adding products to their cart.

Admins can:

View customer orders
Manage order information
Update order status
Update delivery status
Track order progress
🔒 Authentication & Security

The application uses:

JWT-based authentication
bcrypt password hashing
Protected routes
Admin authorization
Environment variables for sensitive credentials
🔌 REST API

The backend follows a RESTful architecture:

React Frontend
      ↓
REST API
      ↓
Express.js
      ↓
Controllers
      ↓
Mongoose
      ↓
MongoDB

The API handles:

Authentication
Users
Products
Cart
Orders
Admin operations
⚙️ Installation
Clone Repository
git clone https://github.com/PranavRasal/E-commerce.git

cd E-commerce
Backend
cd Backend
npm install

Create a .env file:

PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

Start the backend:

npm run dev
Frontend

Open another terminal:

cd Frontend
npm install
npm run dev
🔑 Environment Variables
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

⚠️ Never commit your .env file or expose secret keys on GitHub.

Add .env to .gitignore:

.env
📱 Responsive Design

The application provides a responsive experience across:

💻 Desktop
💻 Laptop
📱 Tablet
📱 Mobile
📸 Screenshots

Add your screenshots directly to the repository and reference them here:

![Home Page](screenshots/home.png)

![Product Page](screenshots/product.png)

![Shopping Cart](screenshots/cart.png)

![Admin Panel](screenshots/admin.png)
🌟 Key Highlights
Full-stack MERN e-commerce application
User authentication and authorization
Product browsing and management
Shopping cart functionality
Order placement and management
Secure Admin Panel
Product CRUD operations
Delivery status management
RESTful API architecture
MongoDB database integration
JWT authentication
bcrypt password hashing
Responsive frontend
Deployed application
👨‍💻 Author

Pranav Rasal

GitHub: https://github.com/PranavRasal
LeetCode: https://leetcode.com/u/PranavRasal19/
Portfolio: https://pranav-rasal.vercel.app/
⭐ Support

If you like this project, consider giving the repository a ⭐ on GitHub.

📄 License

This project is created for educational and portfolio purposes.


This entire block is **one file only: `README.md`**.
