# Rate-Limited URL Shortener Service

A production-style backend application that converts long URLs into short links, enforces per-IP rate limiting, tracks usage analytics, and performs real-time HTTP redirects.

This project was built to learn and demonstrate **backend engineering fundamentals** using Node.js, Express, and MongoDB.

---

## 🚀 Features

- Create short URLs using REST APIs
- Redirect short URLs to original destinations
- Per-IP rate limiting (10 requests per minute)
- Click tracking with last-accessed timestamps
- Persistent storage using MongoDB
- Clean MVC-style project structure
- Environment-based configuration
- HTTP request logging

---

## 🛠 Tech Stack

- **Node.js**
- **Express.js**
- **MongoDB (Local)**
- **Mongoose**
- **NanoID**
- **dotenv**
- **Morgan**

---

## 📂 Project Structure
```
src/
├── config/
│ └── db.js # MongoDB connection
│
├── controllers/
│ └── urlController.js # Business logic
│
├── middleware/
│ └── rateLimiter.js # Per-IP rate limiting
│
├── models/
│ └── Url.js # Mongoose schema
│
├── routes/
│ └── urlRoutes.js # API routes
│
└── index.js # Application entry point
```


---

## ⚙️ Setup Instructions

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd url_shortener
```

2. Install Dependencies
```bash
npm install
```
3. Create .env File

Create a .env file in the project root:

```bash
PORT=3000
BASE_URL=http://localhost:3000
MONGO_URI=mongodb://127.0.0.1:27017/url_shortener
```
4. Start MongoDB

Ensure MongoDB is running locally (port 27017).

5. Run the Server

```bash
npm start
```
Server will start at:

```bash
http://localhost:3000
```
🔗 API Endpoints Create Short URL POST /api/urls

```bash
Request Body


{
  "originalUrl": "https://www.google.com"
}
```
Redirect to Original URL 
---
GET /:shortCode


```bash
Example:
http://localhost:3000/AbC123X
```

Get URL Statistics
```bash
GET /api/urls/:shortCode/stats
```
---
Returns:
---
```
-> Original URL

->Click count

Creation timestamp

Last accessed timestamp
```
📈 Rate Limiting
---
```
Endpoint: POST /api/urls

Limit: 10 requests per minute per IP

Response on limit exceeded:

HTTP 429 Too Many Requests
```
🔐 Environment Variables
---
```
Variable	Description
PORT	Server port
BASE_URL	Base URL for short links
MONGO_URI	MongoDB connection string
```
📌 Future Improvements
---
```
Redis-based distributed rate limiting

URL expiration support

User authentication (JWT)

Analytics dashboard

Deployment to cloud platform
```

👨‍💻 Author
---
```
Built as a backend engineering learning project focusing on real-world API design, middleware, database modeling, and production practices.
```

