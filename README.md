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
| **POST** | /api/v1/user/login | Login and receive JWT token | ❌NO |
| **POST** | /api/v1/user/password/forgot | user can change the password | ❌NO |
| **PUT** | /api/v1/user/password/rest/:token | user can reset the password  | ❌NO |
| **GET** | /api/v1/user/logout | Logout and remove JWT token | ✅Yes |
| **GET** | /api/v1/user/me | Get logged-in user details | ✅Yes |
| **PUT** | /api/v1/user/update/me | update user profile details | ✅Yes |
| **PUT** | /api/v1/user/update/password | user can update the password | ✅Yes |
| **GET** | /api/v1/user/me | Get logged-in user details | ✅Yes |
| **GET** | /api/v1/user/portfolio/me | Get user details for potfolio | ❌NO |

🔹 **Projects**
| Method  | Endpoint | Description | Auth required |
|----------|--------------------|-----------------------------|-----------|
| **POST** | /api/v1/project/add | To add a new project | ✅Yes |
| **DELETE** | /api/v1/project/delete/:id | To delete one project by id | ✅Yes |
| **PUT** | /api/v1/project/update/:id | update the project by id  | ✅Yes |
| **GET** | /api/v1/project/getall | To get all projects for portfolio | ❌No |
| **GET** | /api/v1/project/get/:id | To get a single project | ❌No |

🔹 **Skills**
| Method  | Endpoint | Description | Auth required |
|----------|--------------------|-----------------------------|-----------|
| **POST** | /api/v1/skill/add | To add a new skill | ✅Yes |
| **DELETE** | /api/v1/skill/delete/:id | To delete one skill by id | ✅Yes |
| **PUT** | /api/v1/skill/update/:id | update a skill by id  | ✅Yes |
| **GET** | /api/v1/skill/getall | To get all skills for portfolio | ❌No |

🔹 **Software Applications**
| Method  | Endpoint | Description | Auth required |
|----------|--------------------|-----------------------------|-----------|
| **POST** | /api/v1/softwareapplication/add | To add a new application | ✅Yes |
| **DELETE** | /api/v1/softwareapplication/delete/:id | To delete one application by id | ✅Yes |
| **GET** | /api/v1/softwareapplication/getall | To get all applications for portfolio | ❌No |

🔹 **Timelines**
| Method  | Endpoint | Description | Auth required |
|----------|--------------------|-----------------------------|-----------|
| **POST** | /api/v1/timeline/add | To add a new timeline | ✅Yes |
| **DELETE** | /api/v1/timeline/delete/:id | To delete one timeline by id | ✅Yes |
| **GET** | /api/v1/timeline/getall | To get all timelines for portfolio | ❌No |

🔹 **Messages**
| Method  | Endpoint | Description | Auth required |
|----------|--------------------|-----------------------------|-----------|
| **POST** | /api/v1/message/send | To send a message in portfolio contact-me | ❌NO |
| **DELETE** | /api/v1/message/delete/:id | To delete single message by id | ✅Yes |
| **GET** | /api/v1/message/getall | To get all messages for Admin | ❌No |
