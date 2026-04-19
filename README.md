# 🏙️ Smart City — Civic Issue Reporting & Management Platform

<div align="center">

![Smart City Banner](https://img.shields.io/badge/Smart%20City-Civic%20Platform-blue?style=for-the-badge&logo=city&logoColor=white)

[![React](https://img.shields.io/badge/React-19.0.0-61DAFB?style=flat-square&logo=react)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=flat-square&logo=node.js)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=flat-square&logo=mongodb)](https://www.mongodb.com/)
[![Socket.io](https://img.shields.io/badge/Socket.io-Real--time-010101?style=flat-square&logo=socket.io)](https://socket.io/)
[![Gemini AI](https://img.shields.io/badge/Gemini-AI%20Chatbot-4285F4?style=flat-square&logo=google)](https://ai.google.dev/)
[![Cloudinary](https://img.shields.io/badge/Cloudinary-Image%20Upload-3448C5?style=flat-square&logo=cloudinary)](https://cloudinary.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](LICENSE)

**A full-stack web platform that empowers citizens to report, track, and resolve civic issues — powered by AI, real-time communication, and interactive maps.**

[🌐 Live Demo](#) &nbsp;|&nbsp; [📖 API Docs](#api-reference) &nbsp;|&nbsp; [🐛 Report Bug](https://github.com/Mahendra-9569/Smart-City/issues) &nbsp;|&nbsp; [💡 Request Feature](https://github.com/Mahendra-9569/Smart-City/issues)

</div>

---

## 📋 Table of Contents

- [Overview](#overview)
- [Screenshots](#screenshots)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [System Architecture](#system-architecture)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Running the Application](#running-the-application)
- [API Reference](#api-reference)
- [Database Schema](#database-schema)
- [Authentication Flow](#authentication-flow)
- [Key Modules Explained](#key-modules-explained)
- [Admin Panel](#admin-panel)
- [AI Chatbot](#ai-chatbot)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)
- [Author](#author)

---

## 🧭 Overview

**Smart City** is a modern civic engagement platform designed to bridge the gap between citizens and city administration. Citizens can report infrastructure problems (road damage, water leakage, power outages, garbage issues, etc.), attach photos, pin the exact location on an interactive map, and track the resolution status of each complaint in real time.

An **Admin Panel** gives city officials a comprehensive view of all submitted issues — filterable by status — allowing them to update the resolution status or delete resolved entries. An **AI-powered chatbot** (built on Google Gemini 1.5 Pro + Socket.io) provides real-time assistance to citizens about their complaints and general city services.

The platform supports both **local email/password authentication** and **Google OAuth 2.0** single sign-on, providing flexibility and security for all users.

---

## 📸 Screenshots

### 🗺️ Report an Issue — Interactive Map
> Citizens can select the exact GPS location by clicking on the map, or automatically detect their current location via the browser's geolocation API. Complaints can be filed with a category, description, and optional photo attachment.

![Report Issue](https://raw.githubusercontent.com/Mahendra-9569/Smart-City/main/client/public/issues.webp)

---

### 📊 Admin Panel — Track & Manage Issues
> Admins can view all submitted issues with user email, location address (reverse-geocoded via Nominatim/OpenStreetMap), status badges, and photo attachments. Status can be updated directly from the panel (Pending → In Progress → Resolved) and issues can be deleted.

---

### 📬 Track Your Complaints
> Logged-in users can view only their own submitted complaints and their current resolution status in a clean card layout.

---

### 📞 Contact Us
> A contact page with the city's email, phone, and office location displayed on a Leaflet map. Includes a message form with a Privacy Policy agreement checkbox.

---

## ✨ Features

### 👤 Citizen Features
| Feature | Description |
|---|---|
| **Register / Login** | Email + password signup or one-click Google OAuth |
| **Report an Issue** | Submit complaints with category, description, optional image attachment, and GPS-pinned location |
| **Interactive Map** | Click-to-pin location on a Leaflet map or use "Get Current Location" (browser Geolocation API) |
| **Reverse Geocoding** | Coordinates are automatically converted to human-readable addresses via OpenStreetMap Nominatim |
| **Track Complaints** | View personal complaint history with live status (Pending / In Progress / Resolved) |
| **AI Chatbot** | Real-time floating chatbot powered by Google Gemini 1.5 Pro and Socket.io |
| **Responsive Design** | Fully mobile-responsive layout built with Tailwind CSS |

### 🛡️ Admin Features
| Feature | Description |
|---|---|
| **View All Issues** | See every submitted issue from all users |
| **Filter by Status** | Filter issues by Pending, In Progress, or Resolved |
| **Update Status** | Change issue status from a dropdown directly in the table |
| **Delete Issues** | Remove resolved or invalid issues permanently |
| **View Attachments** | Preview uploaded images directly in the admin panel |
| **Location Display** | Human-readable addresses auto-fetched for each complaint |

### 🤖 AI Chatbot Features
| Command | Response |
|---|---|
| `report issue` | Guides the user through issue categories |
| `check status` | Shows the user's pending issues from the database |
| `nearest hospital` | Returns nearest hospital info |
| `garbage collection schedule` | Returns local schedule |
| Any other message | Answered by Gemini 1.5 Pro in context of user's issues |

---

## 🛠️ Tech Stack

### Frontend (`/client`)
| Technology | Purpose |
|---|---|
| **React 19** | UI framework |
| **Vite** | Build tool and dev server |
| **Tailwind CSS 3** | Utility-first CSS framework |
| **Redux Toolkit** | Global state management (auth & issue slices) |
| **React Router DOM 7** | Client-side routing with protected and open routes |
| **React Leaflet + Leaflet.js** | Interactive maps and GPS marker |
| **Framer Motion** | Page and component animations |
| **Socket.io Client** | Real-time chatbot communication |
| **Axios** | HTTP API calls |
| **React Hot Toast** | Notification toasts |
| **React Markdown** | Renders markdown in chatbot responses |
| **Lucide React** | Icon library |
| **@react-oauth/google** | Google OAuth 2.0 integration |

### Backend (`/backend`)
| Technology | Purpose |
|---|---|
| **Node.js + Express.js** | REST API server |
| **MongoDB + Mongoose** | NoSQL database with ODM |
| **Socket.io** | WebSocket server for real-time chatbot |
| **Google Generative AI (Gemini 1.5 Pro)** | AI chatbot responses |
| **JWT (jsonwebtoken)** | Stateless authentication tokens |
| **bcryptjs** | Password hashing |
| **google-auth-library** | Google OAuth token verification |
| **Cloudinary** | Cloud image storage and CDN |
| **express-fileupload** | Multipart file handling |
| **Axios** | Nominatim API calls for reverse geocoding |
| **cookie-parser** | Cookie-based token handling |
| **CORS** | Cross-origin request security |
| **dotenv** | Environment variable management |

### Admin Panel (`/admin`)
| Technology | Purpose |
|---|---|
| **React + Vite** | Standalone admin dashboard |
| **Axios** | API communication with backend |
| **React Toastify** | Status update notifications |

### External Services
| Service | Usage |
|---|---|
| **MongoDB Atlas** | Cloud-hosted database |
| **Cloudinary** | Image uploads and storage |
| **OpenStreetMap + Nominatim** | Reverse geocoding (coordinates → address) |
| **Google OAuth 2.0** | Social login |
| **Google Gemini 1.5 Pro API** | AI chatbot intelligence |

---

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        SMART CITY PLATFORM                      │
├──────────────────┬──────────────────────┬───────────────────────┤
│   CLIENT (React) │  ADMIN PANEL (React)  │  BACKEND (Express)    │
│   Port: 5174     │  Port: 5173           │  Port: 5000           │
├──────────────────┴──────────────────────┴───────────────────────┤
│                                                                 │
│   ┌─────────────┐      HTTP/REST API     ┌──────────────────┐   │
│   │   Browser   │ ◄──────────────────► │   Express Server │   │
│   │   (React)   │                        │                  │   │
│   │             │ ◄── WebSocket (WS) ──► │   Socket.io      │   │
│   └─────────────┘                        └────────┬─────────┘   │
│                                                   │             │
│                              ┌────────────────────┼──────────┐  │
│                              │                    │          │  │
│                         ┌────▼────┐        ┌──────▼──────┐   │  │
│                         │MongoDB  │        │ Gemini 1.5  │   │  │
│                         │ Atlas   │        │  Pro AI     │   │  │
│                         └─────────┘        └─────────────┘   │  │
│                                                               │  │
│                         ┌─────────┐        ┌─────────────┐   │  │
│                         │Cloudinary│       │ OpenStreet  │   │  │
│                         │(Images) │        │ Map Nominat.│   │  │
│                         └─────────┘        └─────────────┘   │  │
└─────────────────────────────────────────────────────────────────┘
```

**Data Flow:**
1. User logs in (JWT token stored in Redux state + HTTP-only cookie)
2. User submits an issue with category, description, GPS coordinates, and optional image
3. Backend uploads image to Cloudinary, saves issue to MongoDB with coordinates
4. Admin fetches all issues; coordinates are reverse-geocoded to readable addresses
5. Chatbot messages travel over Socket.io; Gemini AI generates context-aware responses based on user's live issue data

---

## 📁 Project Structure

```
smartCity/
├── client/                          # Citizen-facing React app
│   ├── public/                      # Static assets (images, SVGs, avatars)
│   ├── src/
│   │   ├── components/
│   │   │   ├── auth/
│   │   │   │   ├── GoogleAuthButton.jsx  # Google OAuth button component
│   │   │   │   ├── PrivateRoute.jsx      # Protects authenticated routes
│   │   │   │   └── OpenRoute.jsx         # Redirects if already logged in
│   │   │   └── common/
│   │   │       ├── Navbar.jsx            # Responsive navigation bar
│   │   │       ├── Footer.jsx            # Site footer
│   │   │       └── Chatbot.jsx           # Floating AI chatbot (Socket.io)
│   │   ├── pages/
│   │   │   ├── Home.jsx                  # Landing page
│   │   │   ├── Login.jsx                 # Login with email/Google
│   │   │   ├── Signup.jsx                # Registration page
│   │   │   ├── ReportIssues.jsx          # Issue submission form + Leaflet map
│   │   │   ├── TrackProgress.jsx         # User's complaint history
│   │   │   ├── Contactus.jsx             # Contact form + map
│   │   │   └── Aboutus.jsx               # About page
│   │   ├── sections/
│   │   │   ├── HeroSection.jsx           # Landing hero with animation
│   │   │   ├── features.jsx              # Features section
│   │   │   ├── feedback.jsx              # Feedback/testimonials section
│   │   │   └── SuccessStories.jsx        # Success stories section
│   │   ├── slices/
│   │   │   ├── auth.jsx                  # Redux auth slice
│   │   │   └── issue.jsx                 # Redux issue slice
│   │   ├── reducer/
│   │   │   └── index.jsx                 # Redux store configuration
│   │   ├── App.jsx                       # Root component with routing
│   │   └── main.jsx                      # Entry point with Redux + Google OAuth Provider
│   ├── .env                             # Frontend environment variables
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── package.json
│
├── admin/                           # Admin-facing React dashboard
│   ├── src/
│   │   ├── App.jsx                       # Full admin panel (issue table, filter, update, delete)
│   │   └── main.jsx
│   ├── .env
│   └── package.json
│
└── backend/                         # Node.js + Express REST API
    ├── config/
    │   ├── database.js               # MongoDB Atlas connection
    │   └── cloudinary.js             # Cloudinary SDK configuration
    ├── controllers/
    │   ├── Auth.js                   # Login, Signup, GoogleLogin, Logout
    │   └── Issue.js                  # createIssue, getIssues, getAllIssues,
    │                                 # updateIssueStatus, deleteIssue, getAddress
    ├── middlewares/
    │   └── Auth.js                   # JWT verification middleware
    ├── models/
    │   ├── user.js                   # User Mongoose schema
    │   └── issue.js                  # Issue Mongoose schema
    ├── routes/
    │   ├── Auth.js                   # /auth/* routes
    │   └── Issue.js                  # /issues/* routes
    ├── utils/
    │   └── imageUploader.js          # Cloudinary upload helper
    ├── index.js                      # Server entry point, Socket.io, Gemini AI
    ├── .env
    └── package.json
```

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed on your machine:

- **Node.js** v18+ — [Download](https://nodejs.org/)
- **npm** v9+ (comes with Node.js)
- **MongoDB Atlas** account — [Sign up free](https://www.mongodb.com/cloud/atlas)
- **Cloudinary** account — [Sign up free](https://cloudinary.com/)
- **Google Cloud Console** project with OAuth 2.0 credentials — [Console](https://console.cloud.google.com/)
- **Google Gemini API Key** — [Get key](https://ai.google.dev/)

---

### Installation

**1. Clone the repository**
```bash
git clone https://github.com/Mahendra-9569/Smart-City.git
cd Smart-City
```

**2. Install Backend dependencies**
```bash
cd backend
npm install
```

**3. Install Client dependencies**
```bash
cd ../client
npm install
```

**4. Install Admin Panel dependencies**
```bash
cd ../admin
npm install
```

---

### Environment Variables

#### Backend — `backend/.env`
```env
# MongoDB Atlas connection string
DATABASE_URL=mongodb+srv://<username>:<password>@cluster0.xxxx.mongodb.net/smartCityDB

# Cloudinary credentials (from your Cloudinary dashboard)
CLOUD_NAME=your_cloudinary_cloud_name
API_KEY=your_cloudinary_api_key
API_SECRET=your_cloudinary_api_secret
FOLDER_NAME=smartcity_attachments

# JWT secret (use a long, random string in production)
JWT_SECRET=your_super_secret_jwt_key

# Google OAuth 2.0 Client ID
GOOGLE_CLIENT_ID=xxxx.apps.googleusercontent.com

# Google Gemini AI API key
GEMINI_API_KEY=your_gemini_api_key

# Server port
PORT=5000

# CORS: URLs of your frontend and admin panel
FRONTEND_URL=http://localhost:5174
ADMIN_URL=http://localhost:5173

# Set to "production" when deploying
NODE_ENV=development
```

#### Client — `client/.env`
```env
# Backend API base URL
VITE_APP_SERVER_URL=http://localhost:5000

# Google OAuth 2.0 Client ID (same as backend)
VITE_GOOGLE_CLIENT_ID=xxxx.apps.googleusercontent.com
```

#### Admin — `admin/.env`
```env
# Backend API base URL
VITE_APP_SERVER_URL=http://localhost:5000
```

> ⚠️ **Security Notice:** Never commit `.env` files to version control. Add `.env` to your `.gitignore` file. The credentials shown in this repo's source code have been rotated.

---

### Running the Application

You need **three separate terminal windows** to run all parts of the platform simultaneously.

**Terminal 1 — Start the Backend Server**
```bash
cd backend
npm run dev       # Development (nodemon, auto-restart)
# or
npm start         # Production
```
Backend will be available at: `http://localhost:5000`

**Terminal 2 — Start the Citizen Client**
```bash
cd client
npm run dev
```
Client will be available at: `http://localhost:5174`

**Terminal 3 — Start the Admin Panel**
```bash
cd admin
npm run dev
```
Admin panel will be available at: `http://localhost:5173`

---

## 📡 API Reference

### Base URL
```
http://localhost:5000
```

### Authentication Routes — `/auth`

| Method | Endpoint | Auth Required | Description |
|---|---|---|---|
| `POST` | `/auth/signup` | ❌ | Register with email + password |
| `POST` | `/auth/login` | ❌ | Login with email + password |
| `POST` | `/auth/google` | ❌ | Login or register with Google OAuth |
| `POST` | `/auth/logout` | ✅ | Logout and clear session cookie |

**POST `/auth/signup`**
```json
// Request Body
{
  "name": "Mahendra Yadav",
  "email": "user@example.com",
  "password": "Pass@1234"
}

// Response 201
{
  "success": true,
  "message": "User registered successfully",
  "user": { "_id": "...", "name": "...", "email": "...", "provider": "local" }
}
```

**POST `/auth/login`**
```json
// Request Body
{
  "email": "user@example.com",
  "password": "Pass@1234"
}

// Response 200 — also sets HTTP-only cookie "token"
{
  "success": true,
  "token": "<jwt_token>",
  "user": { "_id": "...", "name": "...", "email": "..." }
}
```

**POST `/auth/google`**
```json
// Request Body
{
  "credential": "<google_id_token_from_oauth>"
}
```

---

### Issue Routes — `/issues`

| Method | Endpoint | Auth Required | Description |
|---|---|---|---|
| `POST` | `/issues/createIssue` | ✅ | Submit a new issue |
| `GET` | `/issues/getIssues` | ✅ | Get current user's issues |
| `GET` | `/issues/getAllIssues` | ❌ | Get all issues (admin) |
| `PUT` | `/issues/:issueId` | ❌ | Update issue status (admin) |
| `DELETE` | `/issues/:issueId` | ❌ | Delete an issue (admin) |
| `GET` | `/issues/get-address` | ❌ | Reverse geocode coordinates |

**POST `/issues/createIssue`** — `multipart/form-data`
```
Headers: Authorization: Bearer <token>

Form fields:
  category   = "Road Damage" | "Water Leakage" | "Power Outage" | "Garbage Collection" | "Other"
  desc       = "Large pothole near the main market"
  latitude   = 19.0760
  longitude  = 72.8777
  attachment = <file> (optional image)
```

**GET `/issues/get-address?lat=19.07&lng=72.87`**
```json
// Response 200
{
  "success": true,
  "address": "Marine Lines, Mumbai, Maharashtra, 400020, India",
  "full": { ... }  // full Nominatim response
}
```

**PUT `/issues/:issueId`**
```json
// Request Body
{ "status": "Resolved" }
// status can be: "Pending" | "In Progress" | "Resolved"
```

---

## 🗄️ Database Schema

### User Model

```js
{
  name:           String,   // required
  email:          String,   // required, unique, lowercase
  password:       String,   // null for Google OAuth users
  googleId:       String,   // populated for Google OAuth users
  avatar:         String,   // profile picture URL
  provider:       String,   // "local" | "google"
  emailVerified:  Boolean,
  createdAt:      Date,
  updatedAt:      Date
}
```

### Issue Model

```js
{
  user: ObjectId (ref: 'User'),  // reference to the reporting user
  category: String,              // "Road Damage" | "Water Leakage" | "Power Outage" | "Garbage Collection" | "Other"
  desc: String,                  // issue description
  attachment: String,            // Cloudinary URL of uploaded image
  status: String,                // "Pending" | "In Progress" | "Resolved" (default: "Pending")
  location: {
    latitude:  Number,           // GPS latitude
    longitude: Number            // GPS longitude
  },
  date: Date,                    // submission date (default: now)
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🔐 Authentication Flow

### Local (Email/Password)
```
1. User submits signup form → POST /auth/signup
2. Backend validates input, hashes password with bcrypt (salt rounds: 10)
3. User document created in MongoDB
4. On login → POST /auth/login → bcrypt.compare()
5. JWT token generated (expires in 7 days), returned in response body + HTTP-only cookie
6. Frontend stores token in Redux state (persisted)
7. Protected routes use Authorization: Bearer <token> header
8. JWT middleware verifies token on every protected request
```

### Google OAuth 2.0
```
1. User clicks "Continue with Google" → Google ID token returned to frontend
2. Frontend sends credential → POST /auth/google
3. Backend verifies token with google-auth-library
4. If email exists: update profile, link Google ID
5. If new user: create account with provider: "google", password: null
6. JWT issued same as local flow
```

### Route Protection
- **`PrivateRoute`**: Redirects unauthenticated users to `/login`
- **`OpenRoute`**: Redirects already-authenticated users to `/` (prevents revisiting login/signup)

---

## 🔑 Key Modules Explained

### 1. Interactive Map — `ReportIssues.jsx`
Built with **React Leaflet**, the map allows two location input methods:
- **Click-to-pin**: Clicking anywhere on the map triggers `useMapEvents`, captures `e.latlng.lat` and `e.latlng.lng`, updates the marker and form state
- **GPS detection**: Browser's `navigator.geolocation.getCurrentPosition()` fetches real-time coordinates; map animates to the location using `map.flyTo()`

The selected coordinates are sent to the backend as `latitude` and `longitude` form fields.

### 2. Real-Time Chatbot — `Chatbot.jsx` + `index.js`
The chatbot uses **Socket.io** for bidirectional WebSocket communication:

**Frontend flow:**
1. `socket.emit("sendMessage", { message, userId })` sends the user's message
2. Server processes the message and emits `"receiveMessage"` back
3. `ReactMarkdown` renders formatted responses (bold, lists, etc.)

**Backend logic (in `index.js`):**
- Keyword-based routing for common queries (`"report issue"`, `"check status"`, etc.)
- For all other messages: fetches the user's pending issues from MongoDB, constructs a context-aware prompt, and calls **Gemini 1.5 Pro** via `@google/generative-ai`
- The AI response is personalized based on the user's actual complaint history

### 3. Image Upload — `imageUploader.js` + Cloudinary
When an issue is submitted with an attachment:
1. `express-fileupload` saves the file to `/tmp`
2. `uploadImageToCloudinary()` utility uploads it to Cloudinary with specified dimensions
3. The returned `secure_url` is stored in the Issue document in MongoDB
4. The image URL is later rendered directly in the Admin Panel

### 4. Reverse Geocoding — `getAddress` controller
When the Admin Panel loads issues, it calls `/issues/get-address?lat=X&lng=Y` for each issue. The backend queries **OpenStreetMap's Nominatim API** and returns the human-readable address. This avoids embedding API keys in the frontend and centralizes geocoding logic.

### 5. Redux State Management
Two slices manage global state:

**`auth.jsx` slice:**
- Stores: `user` (object), `token` (string)
- Actions: `setUser`, `setToken`, `logout`
- Used by: Navbar (profile display), PrivateRoute (auth check), Chatbot (userId for AI context)

**`issue.jsx` slice:**
- Stores: `issues` (array)
- Used by: TrackProgress page

---

## 🖥️ Admin Panel

The Admin Panel is a **standalone React app** (`/admin`) that connects to the same backend. It provides city administrators with a powerful issue management dashboard.

### Features in Detail

**Issue Table** — Displays all submitted issues with columns:
- **Category** (bold)
- **Description**
- **User Email** (from populated user reference)
- **Location** (reverse-geocoded from GPS coordinates)
- **Status** (color-coded badges: 🟢 Resolved, 🟡 Pending, 🔵 In Progress)
- **Attachment** (image preview thumbnail)
- **Actions** (status dropdown + Delete button)

**Filter by Status** — Dropdown at the top filters the table to show only issues matching the selected status.

**Status Update** — Admin selects a new status from the dropdown; the change is immediately sent via `PUT /issues/:issueId` and the UI refreshes.

**Delete** — Permanently removes the issue from the database via `DELETE /issues/:issueId`.

> **Note:** The Admin Panel is currently open (no admin authentication). For production, add a separate admin authentication layer.

---

## 🤖 AI Chatbot

The Smart City Chatbot is available to all logged-in users as a floating button (bottom-right corner). It uses:

- **Transport layer:** Socket.io WebSockets for real-time, low-latency messaging
- **AI engine:** Google Gemini 1.5 Pro for natural language understanding
- **Context injection:** The user's current pending issues are fetched from MongoDB and included in the AI prompt, making responses personalized and relevant

### Sample Conversations

```
User: check status
Bot:  You have 2 pending issue(s):
      - Road Damage (Status: Pending)
      - Power Outage (Status: In Progress)

User: What should I do about the road damage near my house?
Bot:  [Gemini AI responds with context-aware guidance about the user's Road Damage complaint]

User: nearest hospital
Bot:  The nearest hospital is City Care Hospital at 123 Main St.
```

---

## ☁️ Deployment

### Backend Deployment (Render / Railway / Cyclic)
1. Push code to GitHub
2. Connect your repository to Render
3. Set the following environment variables in the Render dashboard (same as `backend/.env`)
4. Set build command: `npm install` and start command: `node index.js`

### Frontend Deployment (Vercel / Netlify)
1. Set `VITE_APP_SERVER_URL` to your deployed backend URL
2. Set `VITE_GOOGLE_CLIENT_ID` to your Google OAuth Client ID
3. Vercel/Netlify will auto-detect Vite and build the project

### Admin Panel Deployment (Vercel / Netlify)
1. Set `VITE_APP_SERVER_URL` to your deployed backend URL
2. Deploy as a separate project on Vercel

### Google OAuth Setup for Production
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Add your production domains to **Authorized JavaScript Origins**
3. Add callback URLs to **Authorized Redirect URIs**

---

## 🤝 Contributing

Contributions are welcome! Here's how to get started:

1. **Fork** the repository
2. **Create** a feature branch
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit** your changes
   ```bash
   git commit -m "feat: add amazing feature"
   ```
4. **Push** to the branch
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open** a Pull Request

### Contribution Guidelines
- Follow the existing code structure and naming conventions
- Write meaningful commit messages (use [Conventional Commits](https://www.conventionalcommits.org/))
- Ensure your code doesn't break existing functionality
- For major features, open an issue first to discuss

---

## 🐛 Known Issues & Roadmap

### Current Limitations
- Admin panel has no authentication guard (anyone with the URL can access it)
- No email notifications when issue status changes
- Chatbot context limited to current session (no conversation history persistence)

### Planned Features
- [ ] Admin authentication with role-based access control
- [ ] Email notifications (NodeMailer) on status updates
- [ ] Push notifications for mobile browsers
- [ ] Dashboard analytics (charts for issue categories, resolution rates)
- [ ] Multi-language support (i18n)
- [ ] Upvoting system for community issue prioritization
- [ ] Export issues to CSV/PDF

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Mahendra Yadav**

[![GitHub](https://img.shields.io/badge/GitHub-Mahendra--9569-181717?style=flat-square&logo=github)](https://github.com/Mahendra-9569)

---

## 🙏 Acknowledgements

- [Leaflet.js](https://leafletjs.com/) — Open-source JavaScript maps
- [OpenStreetMap & Nominatim](https://nominatim.openstreetmap.org/) — Free geocoding API
- [Google Gemini](https://ai.google.dev/) — Generative AI
- [Cloudinary](https://cloudinary.com/) — Image management
- [Socket.io](https://socket.io/) — Real-time communication
- [Framer Motion](https://www.framer.com/motion/) — Animations
- [Tailwind CSS](https://tailwindcss.com/) — Styling framework

---

<div align="center">
  <p>Made with ❤️ for smarter cities and better civic engagement</p>
  <p>⭐ If you found this project helpful, please give it a star!</p>
</div>
