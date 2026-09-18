# Development Guide

This document contains the detailed development and deployment
configuration for the Cricket Auction App.

------------------------------------------------------------------------

# 1. Project Overview

The application consists of two independently deployable applications:

``` text
client/  → React + Vite frontend
server/  → Node.js + Express backend
```

External services:

``` text
MongoDB Atlas → Database
Cloudinary    → Image storage
Vercel        → Frontend hosting
Render        → Backend hosting
```

------------------------------------------------------------------------

# 2. Development Environment

The project has been developed and tested on Windows using PowerShell
and VS Code.

Recommended tools:

-   Node.js 20+
-   npm
-   Git
-   VS Code
-   MongoDB Atlas account
-   Cloudinary account

------------------------------------------------------------------------

# 3. Frontend Configuration

Location:

``` text
client/
```

Install dependencies:

``` bash
cd client
npm install
```

Start development:

``` bash
npm run dev
```

Build production files:

``` bash
npm run build
```

The frontend uses Vite.

------------------------------------------------------------------------

# 4. Frontend Environment Variables

File:

``` text
client/.env
```

Local configuration:

``` env
VITE_API_URL=http://localhost:5000
```

Production configuration:

``` env
VITE_API_URL=https://cricket-auction-app-mfzy.onrender.com
```

A template should be maintained in:

``` text
client/.env.example
```

Example:

``` env
VITE_API_URL=
```

------------------------------------------------------------------------

# 5. API Client

API configuration is centralized in:

``` text
client/src/api/api.js
```

The API client uses the Vite environment variable:

``` text
VITE_API_URL
```

This avoids hardcoding:

``` text
http://localhost:5000
```

throughout the application.

The frontend can therefore use the same API code in local and production
environments.

------------------------------------------------------------------------

# 6. Backend Configuration

Location:

``` text
server/
```

Install:

``` bash
cd server
npm install
```

Start:

``` bash
npm start
```

The backend package provides the production/start command:

``` json
{
  "scripts": {
    "start": "node server.js"
  }
}
```

The backend port is configured using:

``` javascript
const PORT = process.env.PORT || 5000;
```

The server listens on:

``` text
0.0.0.0
```

This is required for the Render deployment environment.

------------------------------------------------------------------------

# 7. Backend Environment Variables

File:

``` text
server/.env
```

Required variables:

``` env
MONGO_URI=

CLOUD_NAME=
CLOUD_API_KEY=
CLOUD_API_SECRET=
```

Do not commit the actual values.

The repository should contain:

``` text
server/.env.example
```

with empty values.

------------------------------------------------------------------------

# 8. MongoDB Atlas Configuration

MongoDB Atlas is the application's database service.

The backend connects using:

``` text
MONGO_URI
```

## Database User

The MongoDB database user is separate from the application's admin user.

There are two different authentication systems:

``` text
MongoDB Atlas Database User
        │
        └── Used by backend → MongoDB

Cricket Auction Admin User
        │
        └── Used by human → Application login
```

Never use the application's admin credentials as the MongoDB connection
credentials unless the database configuration explicitly requires it.

------------------------------------------------------------------------

# 9. Cloudinary Configuration

Cloudinary stores uploaded images.

Backend variables:

``` env
CLOUD_NAME=
CLOUD_API_KEY=
CLOUD_API_SECRET=
```

Cloudinary is preferred for persistent image storage because the Render
service filesystem should not be treated as permanent storage.

------------------------------------------------------------------------

# 10. Authentication

The application provides its own admin authentication.

Application login credentials are stored in the application's database.

Passwords are hashed rather than stored as plain text.

A password hash cannot normally be converted back into the original
password.

For password recovery, reset the password using the application's
password-handling logic rather than attempting to retrieve the original
password from MongoDB.

------------------------------------------------------------------------

# 11. Important Application Areas

The current application contains workflows around:

``` text
Authentication
    │
    ├── Admin Login
    └── Admin Management
             │
             ▼
Tournament
    │
    ├── Ground
    ├── Teams
    └── Players
             │
             ▼
        Player Auction
             │
             ├── Current Bid
             ├── Current Team
             ├── Sold Players
             └── Unsold Players
```

Important frontend pages include workflows for:

-   Login
-   Create Admin
-   Add Ground
-   Add Team
-   Add Tournament
-   Player registration
-   Auction management
-   Live auction viewing

------------------------------------------------------------------------

# 12. Local Startup

Use two terminals.

## Terminal 1 --- Backend

``` bash
cd server
npm install
npm start
```

Expected:

``` text
Server running on port 5000
MongoDB Connected
```

## Terminal 2 --- Frontend

``` bash
cd client
npm install
npm run dev
```

Expected frontend URL:

``` text
http://localhost:5173
```

------------------------------------------------------------------------

# 13. Local Request Flow

``` text
Browser
   │
   │ http://localhost:5173
   ▼
React + Vite
   │
   │ API request
   ▼
http://localhost:5000
   │
   ▼
Express
   │
   ├── MongoDB Atlas
   │
   └── Cloudinary
```

------------------------------------------------------------------------

# 14. Production Deployment

## Frontend

Platform:

``` text
Vercel
```

Repository:

``` text
SumitSingh1992/cricket-auction-app
```

Configuration:

``` text
Root Directory: client
Framework: Vite
Build Command: npm run build
Output Directory: dist
```

Environment:

``` text
VITE_API_URL=https://cricket-auction-app-mfzy.onrender.com
```

Production URL:

``` text
https://cricket-auction-app-five.vercel.app/
```

------------------------------------------------------------------------

## Backend

Platform:

``` text
Render
```

Repository:

``` text
SumitSingh1992/cricket-auction-app
```

Configuration:

``` text
Branch: main
Root Directory: server
Build Command: npm install
Start Command: npm start
Plan: Free
```

Environment variables:

``` text
MONGO_URI
CLOUD_NAME
CLOUD_API_KEY
CLOUD_API_SECRET
```

Production URL:

``` text
https://cricket-auction-app-mfzy.onrender.com
```

------------------------------------------------------------------------

# 15. Deployment Flow

Changes are pushed to GitHub:

``` text
Local development
       │
       ▼
git add .
       │
       ▼
git commit
       │
       ▼
git push origin main
       │
       ├───────────────────┐
       ▼                   ▼
     Vercel              Render
       │                   │
       ▼                   ▼
   Frontend              Backend
```

The frontend production build uses the Vercel `VITE_API_URL` environment
variable.

The backend uses Render environment variables.

------------------------------------------------------------------------

# 16. Environment Separation

Never use production credentials in local `.env` files unless
intentionally required.

Recommended:

``` text
Local
├── client/.env
│   └── VITE_API_URL=http://localhost:5000
│
└── server/.env
    ├── MONGO_URI=<local/dev database>
    └── Cloudinary credentials

Production
├── Vercel
│   └── VITE_API_URL=<Render backend URL>
│
└── Render
    ├── MONGO_URI=<production database>
    └── Cloudinary credentials
```

------------------------------------------------------------------------

# 17. Git and Secret Management

The repository contains a root `.gitignore` that excludes environment
files and build output.

Important entries:

``` text
node_modules/
.env
.env.*
!.env.example
dist/
build/
*.log
```

Before pushing code:

``` bash
git status
```

Make sure secrets are not listed as staged changes.

If a secret is accidentally committed:

1.  Rotate the secret immediately.
2.  Remove it from the repository.
3.  Update the production environment variable.
4.  Review Git history if necessary.

------------------------------------------------------------------------

# 18. Troubleshooting

## MongoDB: ReplicaSetNoPrimary / Server Selection Error

Possible causes:

-   Atlas cluster is paused.
-   Atlas cluster is starting.
-   Network access configuration is incorrect.
-   Database credentials are incorrect.
-   Temporary connectivity issue.

Check Atlas first, then restart the backend.

------------------------------------------------------------------------

## Frontend API Errors

Check the browser's Network tab.

Verify:

``` text
Request URL
```

points to the expected backend:

Local:

``` text
http://localhost:5000
```

Production:

``` text
https://cricket-auction-app-mfzy.onrender.com
```

If the production frontend is still calling `localhost:5000`, check the
Vercel `VITE_API_URL` environment variable and redeploy.

------------------------------------------------------------------------

## Render Cold Start

The Render free service may sleep after inactivity.

A request immediately after inactivity may therefore take longer while
the service starts.

------------------------------------------------------------------------

## Image Upload Problems

Check:

``` text
CLOUD_NAME
CLOUD_API_KEY
CLOUD_API_SECRET
```

Also check Render logs for Cloudinary/upload errors.

------------------------------------------------------------------------

# 19. Recommended Development Workflow

For a new feature:

``` text
1. Create feature branch
2. Implement frontend
3. Implement backend/API if required
4. Test locally
5. Run frontend production build
6. Check git diff
7. Commit
8. Push
9. Verify deployment
10. Test production flow
```

Commands:

``` bash
git checkout -b feature/my-feature

git status

git add .

git commit -m "Add my feature"

git push origin feature/my-feature
```

For production changes:

``` bash
git checkout main
git pull
```

Then deploy through the connected GitHub/Vercel/Render workflow.

------------------------------------------------------------------------

# 20. Production Checklist

Before considering a feature complete:

-   [ ] Local frontend works
-   [ ] Local backend works
-   [ ] MongoDB connection works
-   [ ] Image upload works
-   [ ] Admin authentication works
-   [ ] API requests use environment configuration
-   [ ] No `localhost` URLs remain in production code
-   [ ] No secrets are committed
-   [ ] `npm run build` succeeds
-   [ ] Git changes are committed
-   [ ] GitHub is updated
-   [ ] Vercel deployment succeeds
-   [ ] Render deployment succeeds
-   [ ] Production login works
-   [ ] Main user workflow works

------------------------------------------------------------------------

# 21. Future Technical Improvements

Planned/improvable areas include:

-   Complete Socket.IO-based real-time auction synchronization
-   Automated unit and integration testing
-   E2E testing
-   Better authentication/session security
-   API validation
-   Centralized error handling
-   Request logging
-   Production monitoring
-   Rate limiting
-   Automated CI/CD checks
-   Role/permission refinement
-   Auction history and analytics
-   PWA/mobile improvements
