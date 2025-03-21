# 🚀 MERN Portfolio Admin Panel - Backend

This is the **backend API** for the **MERN Portfolio Admin Panel**. It is built using **Node.js, Express.js, and MongoDB** and provides a secure **REST API** to manage profile, skills, myapps, timeline, and projects dynamically.

✅ **Handles authentication with JWT**  
✅ **Connects to MongoDB for data storage**  
✅ **Implements CRUD operations for portfolio management**  

---

## 🛠️ **Tech Stack**

| Technology  | Usage |
|-------------|--------------------------------|
| **Node.js** | Backend JavaScript runtime |
| **Express.js** | API framework for Node.js |
| **MongoDB** | NoSQL database |
| **Mongoose** | ODM (Object-Data Mapping) for MongoDB |
| **JWT (JSON Web Token)** | Authentication & Authorization |
| **Cloudinary** | File upload handling |
| **Bcrypt.js** | Password hashing |
| **Dotenv** | Environment variable management |
| **CORS** | Cross-Origin Resource Sharing |

---

## 🔥 **Features**

✅ **Admin Authentication** – JWT-based login system  
✅ **CRUD Operations** – Add, edit, delete projects, blogs, and testimonials    
✅ **MongoDB Integration** – Uses Mongoose models for structured data  
✅ **Secure Password Hashing** – Bcrypt.js for encrypting user passwords  
✅ **Error Handling Middleware** – Centralized error responses  
✅ **File Uploads** – Profile images & portfolio images stored securely  
✅ **Deployed on Render** – Scalable and free hosting  

---

## 📌 **API Endpoints**
🔹 **Authentication**
| Method  | Endpoint | Description | Auth required |
|----------|--------------------|-----------------------------|-----------|
| **POST** | /api/v1/user/login | Login and receive JWT token | NO |
| **POST** | /api/v1/user/password/forgot | forgot password | NO |
| **PUT** | /api/v1/user/password/rest/:token | reset password  | NO |
| **GET** | /api/v1/user/logout | Logout and remove JWT token | Yes |
| **GET** | /api/v1/user/me | Get logged-in user details | Yes |
| **PUT** | /api/v1/user/update/me | update user profile details | Yes |
| **PUT** | /api/v1/user/update/password | user can change the password | Yes |
| **GET** | /api/v1/user/me | Get logged-in user details | Yes |
| **GET** | /api/v1/user/portfolio/me | Get user details for potfolio | NO |

---




