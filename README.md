
# ReSell Hub – Server (Backend)

ReSell Hub is a secure peer-to-peer second-hand marketplace platform where
users can buy and sell pre-owned products.

This repository contains the backend server built with Node.js, Express,
MongoDB, Better Auth, JWT, Stripe, and Google OAuth.

---

## 🚀 Live Server

Production Backend:

https://resell-hub-server-ashy.vercel.app

Production Frontend:

https://resell-hub-client-three.vercel.app

---

## 🛠️ Tech Stack

- Node.js
- Express.js
- MongoDB
- Better Auth
- @better-auth/mongodb-adapter
- JSON Web Token (JWT)
- Google OAuth 2.0
- Stripe
- CORS
- Dotenv
- Nodemon

---

## 📦 NPM Packages

### Dependencies

- `express`
- `better-auth`
- `@better-auth/mongo-adapter`
- `mongodb`
- `jsonwebtoken`
- `stripe`
- `cors`
- `dotenv`

### Development Dependencies

- `nodemon`

---

# 📁 Project Structure

```text
server/
│
├── src/
│   ├── config/
│   │   ├── auth.js
│   │   └── db.js
│   │
│   ├── middleware/
│   │   └── errorHandler.js
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── userRoutes.js
│   │   ├── productRoutes.js
│   │   ├── orderRoutes.js
│   │   ├── reviewRoutes.js
│   │   └── paymentRoutes.js
│   │
│   ├── app.js
│   └── server.js
│
├── .env
├── .env.local
├── package.json
├── seed.js
└── README.md