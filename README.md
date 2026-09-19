# 🚀 TinyRoute - Production-Grade URL Shortener & Analytics Platform

TinyRoute is an enterprise-ready, full-stack URL Shortener Web Application built using Node.js (Express), MySQL, React (Vite), and Tailwind CSS v4. Designed using **Clean Architecture** and the **Repository Pattern**, it features JWT authentication with refresh token family rotation, Base62 shortcode generation with automated collision resolution, password-protected links, QR code generation (PNG & SVG), interactive Recharts analytics diagrams, NodeCache dashboard caching, and a full Admin Panel.

---

## 🏗️ Architecture & Directory Structure Explanation

### Backend Structure (`server/src/`)

```
server/src/
├── config/         # Centralized environment & logger configurations
├── constants/      # App roles, HTTP status codes, and standardized response messages
├── controllers/    # Express route handlers; validates inputs & invokes services
├── services/       # Core business logic layer; orchestrates repositories & security
├── repositories/   # Data access layer (MySQL queries & transactions)
├── routes/         # Express router definitions & endpoint mounting
├── middleware/     # Auth, role authorization, rate limiting, logging & error handling
├── validators/     # Express-validator schema definitions
├── utils/          # Standalone pure utilities (Base62, JWT, GeoIP, UserAgent, Cache)
├── helpers/        # Domain-specific formatters & token helpers
├── database/       # MySQL pool connections, migration SQL scripts & seeders
├── errors/         # Custom AppError exception class hierarchy
├── app.js          # Express app configuration & middleware pipeline
└── server.js       # Node HTTP server entry point & graceful shutdown hooks
```

#### Why Every Folder Exists:

1. **`config/`**: Holds runtime application configuration and Winston logger definitions.
   - *Belongs*: Env parsers, logger transports. *Does NOT belong*: Business logic or SQL queries.
2. **`constants/`**: Holds immutable system constants (HTTP codes, Roles, Messages).
   - *Belongs*: Enumerations, string mappings. *Does NOT belong*: Dynamic states.
3. **`controllers/`**: Handles HTTP request parsing and response formatting.
   - *Belongs*: `req`/`res` interactions. *Does NOT belong*: Direct SQL execution.
4. **`services/`**: Encapsulates all business logic and domain workflows.
   - *Belongs*: Hashing algorithms, collision checks, cache coordination. *Does NOT belong*: HTTP status code manipulation.
5. **`repositories/`**: Interacts directly with the database using SQL queries.
   - *Belongs*: Raw SQL, parameter binding, transactions. *Does NOT belong*: Express request objects.
6. **`routes/`**: Binds HTTP methods and URIs to middleware and controller functions.
   - *Belongs*: Router endpoints, middleware chaining. *Does NOT belong*: Business calculations.
7. **`middleware/`**: Intercepts HTTP requests for cross-cutting concerns (Auth, Rate Limiting, Error Handling).
   - *Belongs*: JWT verification, CORS, Helmet headers. *Does NOT belong*: Database queries.
8. **`validators/`**: Request body and query validation rules using `express-validator`.
   - *Belongs*: Input sanitization and rule sets. *Does NOT belong*: Direct response sending.
9. **`utils/`**: Reusable standalone helper functions.
   - *Belongs*: Base62 math, IP geolocation lookup, user agent parsing. *Does NOT belong*: DB state.
10. **`database/`**: Database connection pool management, SQL migrations, and initial seed files.
    - *Belongs*: Table schemas, seed data. *Does NOT belong*: Route handlers.

---

### Frontend Structure (`client/src/`)

```
client/src/
├── api/          # Axios HTTP clients & API endpoint services
├── assets/       # Static media assets (logos, icons, images)
├── components/   # Reusable UI components (common, auth, url, analytics, admin)
├── constants/    # Frontend route paths & base API URL configurations
├── context/      # React Context state providers (AuthContext, ThemeContext)
├── hooks/        # Custom React hooks (useAuth, useUrls, useAnalytics, useDebounce)
├── layouts/      # Main, Auth, Dashboard, and Admin wrapper layouts
├── pages/        # Top-level view pages (Home, Login, Dashboard, Analytics, Admin)
├── routes/       # React Router setup, ProtectedRoute & AdminRoute guards
├── styles/       # Tailwind CSS & global stylesheet
├── utils/        # Formatters, local storage wrappers, and validators
├── App.jsx       # Main App component with Context Providers
└── main.jsx      # React DOM root entry point
```

---

## 📐 System Design & Architecture

### High-Level Architecture (HLD)

```
[ Client Browser (React SPA) ]
             │
             │ HTTPS / JSON
             ▼
[ Reverse Proxy / Nginx ]
             │
             ▼
[ Node.js Express API (Port 5000) ]
   ├── Rate Limiter & Helmet Security
   ├── JWT Auth & Token Rotation
   ├── Base62 Short Code Engine
   ├── Redirection & Click Tracker
   └── In-Memory NodeCache
             │
             ▼
[ MySQL 8.0 Database (Port 3306) ]
   ├── users & refresh_tokens
   ├── urls & url_clicks (Indexes & Fulltext)
   └── audit_logs & user_settings
```

---

## 🔠 Base62 Encoding & Collision Strategy

TinyRoute utilizes **Base62 Encoding** (`0-9`, `a-z`, `A-Z`) to represent URLs cleanly. A 6-character Base62 string yields over **56.8 Billion** unique combinations ($62^6 = 56,800,235,584$).

### Collision Handling Protocol:
1. When a user requests a short URL without a custom alias, the system generates a 6-character random Base62 candidate string.
2. The `UrlRepository` queries the indexed `urls` table for `short_code = candidate`.
3. If no match exists, the code is assigned and saved.
4. If a collision is detected, the candidate generator executes a fallback retry loop (up to 10 attempts) or increases the string length automatically.

---

## 🗄️ Database Schema & ER Diagram

### Entity-Relationship Diagram

```
 +------------------+        +----------------------+
 |      users       |1      *|    user_settings     |
 |------------------|--------|----------------------|
 | id (PK)          |        | id (PK)              |
 | email (UQ)       |        | user_id (FK)         |
 | role (USER/ADMIN)|        +----------------------+
 +------------------+
        │1
        │
        │*                   +----------------------+
 +------------------+        |    refresh_tokens    |
 |       urls       |        |----------------------|
 |------------------|        | id (PK)              |
 | id (PK)          |        | user_id (FK)         |
 | user_id (FK)     |        | family_id            |
 | short_code (UQ)  |        +----------------------+
 | custom_alias(UQ) |
 | is_active        |
 +------------------+
        │1
        │
        │*
 +------------------+        +----------------------+
 |    url_clicks    |        |      audit_logs      |
 |------------------|        |----------------------|
 | id (PK)          |        | id (PK)              |
 | url_id (FK)      |        | user_id (FK)         |
 | ip_address       |        | action               |
 | browser, os      |        +----------------------+
 | country, city    |
 +------------------+
```

---

## ⚡ Quick Start Guide (Local Setup)

### Prerequisites
- Node.js (v18+)
- MySQL Server (v8.0+)
- npm or yarn

### 1. Database Setup
Start your local MySQL service and execute the migration scripts in `server/src/database/migrations/`:
```bash
mysql -u root -p < server/src/database/migrations/001_create_database.sql
mysql -u root -p < server/src/database/migrations/002_create_users_table.sql
mysql -u root -p < server/src/database/migrations/003_create_user_settings_table.sql
mysql -u root -p < server/src/database/migrations/004_create_refresh_tokens_table.sql
mysql -u root -p < server/src/database/migrations/005_create_password_resets_table.sql
mysql -u root -p < server/src/database/migrations/006_create_email_verifications_table.sql
mysql -u root -p < server/src/database/migrations/007_create_urls_table.sql
mysql -u root -p < server/src/database/migrations/008_create_url_clicks_table.sql
mysql -u root -p < server/src/database/migrations/009_create_audit_logs_table.sql
```

Optionally run seeders:
```bash
mysql -u root -p < server/src/database/seeders/001_users_seed.sql
mysql -u root -p < server/src/database/seeders/002_urls_seed.sql
mysql -u root -p < server/src/database/seeders/003_clicks_seed.sql
mysql -u root -p < server/src/database/seeders/004_audit_logs_seed.sql
```

### 2. Backend Setup
```bash
cd server
npm install
npm run dev
```
Backend will start on `http://localhost:5000`.

### 3. Frontend Setup
```bash
cd client
npm install
npm run dev
```
Frontend will start on `http://localhost:5173`.

---

## 🧪 Postman & Manual Testing Checklist

1. Import `postman/TinyRoute.postman_collection.json` into Postman.
2. **Auth Flow**: Register user -> Login user -> Refresh token -> Fetch profile.
3. **URL Creation**: Create Base62 shortcode -> Create Custom Alias -> Create Password-protected link.
4. **Redirection & Tracking**: Visit `http://localhost:5000/:shortCode` in browser -> Check click counter and visitor analytics.
5. **Admin Access**: Login with `admin@tinyroute.com` (`Password123!`) -> Access `/admin` -> View audit logs and toggle user accounts.
