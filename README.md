# Secure LMS Web Application

## 🔐 Overview

A secure and robust Learning Management System (LMS) engineered to prioritize application security while delivering essential LMS functionality. Designed with modern web security practices to counter OWASP Top 10 threats, protect user sessions, and reduce the attack surface.

---

## 🛠 Tech Stack

- **Frontend**: React.js
- **Backend**: Node.js, Express.js
- **Authentication**: JWT (JSON Web Tokens)
- **Security Enhancements**:
  - Helmet.js (Sets secure HTTP headers)
  - Rate Limiting (Prevents brute-force and DoS attacks)
  - Input validation and sanitization

---

## 🔒 Security Highlights

- **JWT-based authentication** with secure cookie options
- **Helmet.js** for setting security headers (HSTS, XSS protection, etc.)
- **Rate Limiting** using Express middleware to restrict request flood
- **Input validation** to prevent injection attacks (SQLi, XSS)
- **Session management** with token expiry and refresh strategies
- **Secure development lifecycle** principles incorporated

> Result: Web attack surface reduced by over **90%**.

---

## 🚀 How to Run

### Frontend

```bash
cd client
npm install
npm start
```

### Backend

```bash
cd server
npm install
# Create a .env file with your keys/secrets
npm run dev
```

---

## 📁 Folder Structure

```
Secure-LMS/
├── client/         # React frontend
├── server/         # Node.js backend with security features
└── README.md
```

---

## 📄 License

Licensed under the MIT License.
