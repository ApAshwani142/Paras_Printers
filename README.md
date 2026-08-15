# 🖨️ Paras Printers — Full-Stack Packaging Platform

Add professional GitHub badges for:
- Next.js
- Node.js + Express
- MongoDB
- Security / MFA / CSRF / Rate Limiting

Add a short project description:

"Paras Printers is a modern, secure and responsive full-stack web platform for a packaging and label manufacturing business. It allows customers to explore products and services, create and verify accounts, securely authenticate, manage their profiles, and request quotations."

---

## ✨ Overview

Explain briefly that Paras Printers is a full-stack web application designed for a packaging and label manufacturing business.

Mention that customers can:

- Explore products and services
- Create and verify an account
- Securely log in
- Use MFA when enabled
- Recover forgotten passwords
- Manage their account
- Request quotations
- Use the platform across desktop, tablet and mobile

Mention that the application uses:
- Next.js frontend
- Node.js + Express REST API
- MongoDB/Mongoose database
- Modular and security-focused architecture

---

## 🚀 Key Features

Include these features:

- 🏠 Professional corporate homepage
- 📦 Product and service discovery
- 🧾 Request Quote workflow
- 📝 Secure registration and login
- ✉️ Email verification
- 🔑 Forgot/reset/change password
- 🛡️ Multi-factor authentication
- 🔐 MFA recovery codes
- 👤 Protected customer account
- 🍪 Secure authentication cookies
- 🧱 CSRF protection
- 🚦 Authentication rate limiting
- 🧪 Server-side request validation
- 🌙 Light/Dark theme
- 📱 Fully responsive UI
- 🧩 Reusable React/Next.js components

---

## 🛡️ Security Highlights

### 🔐 Authentication

Show this workflow:

Signup
↓
Email Verification
↓
Login
↓
MFA (if enabled)
↓
Authenticated Session
↓
Account / Protected Features

### ✉️ Email Verification

Explain that verification tokens are securely generated, stored in hashed form, expire after a configured period, and cannot be reused.

### 🔑 Password Security

Mention that passwords are hashed using bcrypt before being stored in MongoDB.

### 🛡️ MFA

Mention support for:

- Authenticator-based MFA
- MFA setup and confirmation
- MFA login verification
- MFA disabling
- Recovery codes

### 🍪 Secure Sessions

Mention security-focused cookie settings:

- HttpOnly
- Secure in production
- SameSite

### 🧱 CSRF Protection

Mention that state-changing requests such as POST, PUT, PATCH and DELETE are protected against CSRF attacks.

### 🚦 Rate Limiting

Explain that sensitive authentication endpoints use rate limiting to reduce brute-force and abuse attempts.

### 🔒 Protected APIs

Include this example:

router.get("/me", protect, getMe);

Explain that protected endpoints use authentication middleware and sensitive information such as passwords, password hashes, secrets, MFA secrets and database credentials are never returned to the frontend.

---

## 🔄 Application Workflow

Add a Mermaid flowchart showing:

Visitor
→ Account?
→ If No: Signup
→ Verify Email
→ Login
→ MFA if enabled
→ Home
→ Account / Products / Request Quote

Also show:
Login
→ Forgot Password
→ Password Recovery
→ Login

Use a clean Mermaid flowchart.

---

## 🏗️ Architecture

Add a Mermaid architecture diagram:

Customer
→ Next.js Frontend
→ Express REST API
→ Security Middleware
→ Controllers
→ MongoDB

Also connect Controllers to:
- Email / SMTP

Use appropriate icons/emojis where useful.

---

## 🧰 Technology Stack

Create a concise markdown table:

| Layer | Technologies |
| Frontend | Next.js, React, JavaScript/JSX |
| Styling | Tailwind CSS, CSS Variables |
| Icons | Lucide React |
| State | React Context API |
| Backend | Node.js, Express.js |
| Database | MongoDB, Mongoose |
| Validation | Zod |
| Authentication | Secure Token/Session Architecture |
| Password Security | bcrypt |
| Email | Nodemailer + SMTP |
| Security | CSRF, Helmet, CORS, Rate Limiting |
| API | REST |

---

## 📁 Project Structure

Show this structure:

ParasPrintersNew/
│
├── frontend/
│   ├── app/
│   ├── components/
│   ├── context/
│   ├── lib/
│   ├── public/
│   └── package.json
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── utils/
│   │   ├── validators/
│   │   └── server.js
│   └── package.json
│
└── README.md

---

## 📡 Important API Endpoints

Create a concise table:

| Method | Endpoint | Access |
| POST | /api/auth/signup | Public |
| POST | /api/auth/login | Public |
| POST | /api/auth/logout | Auth Flow |
| GET | /api/auth/me | Protected |
| GET | /api/auth/verify-email | Public |
| POST | /api/auth/resend-verification | Public |
| POST | /api/auth/forgot-password | Public |
| POST | /api/auth/reset-password | Public |
| POST | /api/auth/change-password | Protected |
| POST | /api/auth/verify-mfa | Auth Flow |
| POST | /api/auth/verify-mfa-recovery | Auth Flow |
| POST | /api/auth/mfa/setup | Protected |
| POST | /api/auth/mfa/confirm | Protected |
| POST | /api/auth/mfa/disable | Protected |

---

## ⚙️ Getting Started

### Prerequisites

Mention:

- Node.js
- npm
- Git
- MongoDB Atlas or local MongoDB
- SMTP/email provider

### 1. Clone Repository

```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
cd ParasPrintersNew

2. Backend Setup
cd backend
npm install

Show an example backend .env:

NODE_ENV=development
PORT=5000
MONGODB_URI=your_mongodb_connection_string
CLIENT_URL=http://localhost:3000

CSRF_SECRET=your_secret
JWT_SECRET=your_secret

SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=your_email@example.com
SMTP_PASSWORD=your_app_password
EMAIL_FROM=your_email@example.com

EMAIL_VERIFICATION_URL=http://localhost:3000/verify-email
PASSWORD_RESET_URL=http://localhost:3000/reset-password

3. Frontend Setup
cd frontend
npm install

Show:

NEXT_PUBLIC_API_URL=http://localhost:5000/api

4. Run Backend
cd backend
npm start

5. Run Frontend
cd frontend
npm run dev

🧪 Testing Flow

Show:

Signup
↓
Verify Email
↓
Login
↓
MFA (if enabled)
↓
Home
↓
Navbar → User Avatar + Name
↓
My Account
↓
Logout

Also mention testing:

Forgot password
Password reset
MFA recovery
Invalid/expired verification links
Protected API routes
Rate limiting
CSRF-protected requests

Production Checklist

Add a checklist:

 Never commit .env files
 Use strong production secrets
 Enable HTTPS
 Enable secure cookies in production
 Configure production CORS
 Configure MongoDB Atlas securely
 Configure SMTP securely
 Keep CSRF and rate limiting enabled
 Remove sensitive debug logs
 Never expose passwords/secrets in API responses
 Test authentication, MFA and password recovery

 🔮 Future Enhancements

Mention:

🛒 Shopping cart and ordering
💳 Online payments
📦 Order tracking
👨‍💼 Admin dashboard
📊 Business analytics
📧 Advanced notifications
💬 WhatsApp integration
☁️ Redis caching
⚙️ Background job processing
🚀 CI/CD and cloud scaling

👨‍💻 Author

Add:

Ashwani Pandey
Full-Stack Developer

GitHub:
https://github.com/ApAshwani142

LinkedIn:
https://www.linkedin.com/in/ashwani-pandey-12a068376