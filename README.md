# 🏏 Cricket Auction App

A full-stack web application for managing cricket tournaments, grounds,
teams, player registration, and cricket player auctions.

The application is designed for tournament organizers who need to manage
the complete player-auction workflow from registration through team
allocation.

## 🌐 Live Application

-   **Frontend:** https://cricket-auction-app-five.vercel.app/
-   **Backend API:** https://cricket-auction-app-mfzy.onrender.com
-   **Source Code:**
    https://github.com/SumitSingh1992/cricket-auction-app

> The frontend is hosted on Vercel and the backend is hosted on Render.
> MongoDB Atlas is used as the database and Cloudinary is used for image
> storage.

------------------------------------------------------------------------

## ✨ Features

### 🔐 Admin Authentication

-   Admin login
-   Super Admin support
-   Admin creation
-   Role-based access to administrative functionality
-   Passwords stored using secure hashing

### 🏏 Player Registration

Players can register for a tournament with information such as:

-   Full Name
-   Mobile Number
-   Player Role
-   Batting Style
-   Bowling Style
-   Payment information
-   Cricheroes profile link
-   Profile photo

Supported roles:

-   Batter
-   Bowler
-   All Rounder
-   Batter + Keeper

Supported batting styles:

-   Right Hand Bat
-   Left Hand Bat

Supported bowling styles:

-   None
-   Right Arm Medium
-   Left Arm Medium
-   Right Arm Spinner
-   Left Arm Spinner

### 🏆 Tournament Management

Tournament configuration includes:

-   Tournament name
-   Ball type
-   Number of overs
-   Powerplay overs
-   Tournament start date
-   Tournament end date
-   Ground

### 🏟️ Ground Management

Ground registration supports:

-   Ground name
-   Location
-   Contact information
-   Owner / Manager
-   Ground photos

### 👥 Team Management

Teams can be created and managed for a tournament.

The auction workflow tracks:

-   Team purse
-   Current bid
-   Current bidding team
-   Players purchased
-   Remaining purse
-   Sold players
-   Unsold players

### 💰 Player Auction

The auction module supports:

-   Player base price
-   Bid increments
-   Current bid
-   Current bidding team
-   Team purse validation
-   Sold player tracking
-   Unsold player tracking
-   Auction status

Example auction rules used during development:

``` text
Base price: ₹50,000

Up to ₹5,00,000:
Increment: ₹50,000

Above ₹5,00,000:
Increment: ₹1,00,000
```

------------------------------------------------------------------------

# 🛠️ Technology Stack

## Frontend

-   React
-   JavaScript / JSX
-   Vite
-   Tailwind CSS
-   Axios
-   React Router
-   Socket.IO Client

## Backend

-   Node.js
-   Express.js
-   JavaScript
-   Mongoose
-   Socket.IO

## Database

-   MongoDB Atlas

## Image Storage

-   Cloudinary

## Hosting

-   Vercel --- React frontend
-   Render --- Node.js/Express backend
-   MongoDB Atlas --- database
-   Cloudinary --- uploaded images

------------------------------------------------------------------------

# 🏗️ High-Level Architecture

``` text
                    ┌──────────────────────┐
                    │       Users          │
                    │   Admin / Players    │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │       Vercel         │
                    │    React + Vite      │
                    └──────────┬───────────┘
                               │
                         REST API
                               │
                               ▼
                    ┌──────────────────────┐
                    │       Render         │
                    │ Node.js + Express    │
                    └───────┬───────┬──────┘
                            │       │
                 ┌──────────┘       └────────────┐
                 ▼                               ▼
        ┌─────────────────┐             ┌─────────────────┐
        │  MongoDB Atlas  │             │   Cloudinary    │
        │                 │             │                 │
        │ Application Data│             │ Player / Ground │
        │                 │             │ Images          │
        └─────────────────┘             └─────────────────┘
```

------------------------------------------------------------------------

# 📁 Project Structure

The repository is split into a frontend and backend application:

``` text
cricket-auction-app/
│
├── client/
│   ├── src/
│   │   ├── api/
│   │   │   └── api.js
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── public/
│   ├── .env
│   ├── .env.example
│   ├── package.json
│   └── vite.config.js
│
├── server/
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   └── ...
│   ├── .env
│   ├── .env.example
│   ├── server.js
│   └── package.json
│
├── .gitignore
└── README.md
```

> The project structure can evolve as new modules are added. The
> `client/src/api/api.js` file centralizes frontend API configuration.

------------------------------------------------------------------------

# 🚀 Local Development

## Prerequisites

Install:

-   Node.js 20+
-   npm
-   Git
-   MongoDB Atlas account
-   Cloudinary account

Clone the repository:

``` bash
git clone https://github.com/SumitSingh1992/cricket-auction-app.git
cd cricket-auction-app
```

------------------------------------------------------------------------

## 🎨 Frontend Setup

``` bash
cd client
npm install
```

Create:

``` text
client/.env
```

Add:

``` env
VITE_API_URL=http://localhost:5000
```

Start the frontend:

``` bash
npm run dev
```

The Vite development server normally runs at:

``` text
http://localhost:5173
```

------------------------------------------------------------------------

## ⚙️ Backend Setup

Open another terminal:

``` bash
cd server
npm install
```

Create:

``` text
server/.env
```

Add:

``` env
MONGO_URI=your_mongodb_connection_string

CLOUD_NAME=your_cloudinary_cloud_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret
```

Start the backend:

``` bash
npm start
```

The backend runs locally on:

``` text
http://localhost:5000
```

Expected startup messages include:

``` text
Server running on port 5000
MongoDB Connected
```

------------------------------------------------------------------------

# 🔌 API Configuration

Frontend API calls are configured through:

``` text
client/src/api/api.js
```

The API base URL is controlled by:

``` env
VITE_API_URL
```

Local development:

``` env
VITE_API_URL=http://localhost:5000
```

Production:

``` env
VITE_API_URL=https://cricket-auction-app-mfzy.onrender.com
```

This allows the same frontend code to work against different backend
environments.

------------------------------------------------------------------------

# 🔑 Environment Variables

## Frontend

`client/.env`

``` env
VITE_API_URL=
```

## Backend

`server/.env`

``` env
MONGO_URI=

CLOUD_NAME=
CLOUD_API_KEY=
CLOUD_API_SECRET=
```

Use `.env.example` files to document required variables without exposing
secrets.

### ⚠️ Security

Never commit:

-   `.env`
-   MongoDB passwords
-   MongoDB connection strings containing credentials
-   Cloudinary API secrets
-   Admin passwords
-   JWT/session secrets
-   Other private API keys

------------------------------------------------------------------------

# 🗄️ MongoDB Atlas

MongoDB Atlas stores application data.

The MongoDB connection string is supplied to the backend through:

``` env
MONGO_URI
```

Before running the backend:

1.  Make sure the Atlas cluster is running.
2.  Make sure the database user exists.
3.  Make sure the required network access/IP access is configured.
4.  Make sure the connection string is correct.

Database users in MongoDB Atlas are separate from users who log into the
Atlas website.

------------------------------------------------------------------------

# 🖼️ Cloudinary

Cloudinary is used for uploaded images so that image files do not depend
on the local or Render filesystem.

Required backend variables:

``` env
CLOUD_NAME=
CLOUD_API_KEY=
CLOUD_API_SECRET=
```

------------------------------------------------------------------------

# 🔐 Admin Accounts

The application has its own admin authentication system.

An application admin account is different from a MongoDB Atlas database
user.

MongoDB Atlas database users are used by the backend to connect to
MongoDB.

Application admin users are used to log into the Cricket Auction App.

Passwords are stored as hashes and should not be stored as plain text.

If an application admin password is forgotten, reset it through the
application's supported admin/password-reset process or by updating the
account using the application's password-hashing mechanism.

------------------------------------------------------------------------

# 🧪 Production Build

Build the frontend:

``` bash
cd client
npm run build
```

The production output is generated in:

``` text
client/dist/
```

------------------------------------------------------------------------

# 🚢 Production Deployment

## Frontend --- Vercel

Current deployment:

``` text
https://cricket-auction-app-five.vercel.app/
```

Vercel configuration:

``` text
Root Directory: client
Framework: Vite
Build Command: npm run build
Output Directory: dist
```

Production environment variable:

``` env
VITE_API_URL=https://cricket-auction-app-mfzy.onrender.com
```

After changing a Vite environment variable, redeploy the frontend so the
new value is included in the build.

------------------------------------------------------------------------

## Backend --- Render

Current deployment:

``` text
https://cricket-auction-app-mfzy.onrender.com
```

Render configuration:

``` text
Root Directory: server
Build Command: npm install
Start Command: npm start
```

The backend uses:

``` javascript
const PORT = process.env.PORT || 5000;
```

and listens on:

``` text
0.0.0.0
```

Required Render environment variables:

``` text
MONGO_URI
CLOUD_NAME
CLOUD_API_KEY
CLOUD_API_SECRET
```

> Render's free service can spin down after inactivity, so the first
> request after a period of inactivity can take longer.

------------------------------------------------------------------------

# 🔄 Development vs Production

## Local

``` text
React/Vite
localhost:5173
       │
       ▼
Node/Express
localhost:5000
       │
       ▼
MongoDB Atlas
       │
       ▼
Cloudinary
```

## Production

``` text
Vercel
React/Vite
       │
       ▼
Render
Node/Express
       │
       ├──────────────► MongoDB Atlas
       │
       └──────────────► Cloudinary
```

------------------------------------------------------------------------

# 🐛 Troubleshooting

## MongoDB connection error

Check:

-   Atlas cluster is running.
-   MongoDB database user credentials are correct.
-   Network Access allows the backend connection.
-   `MONGO_URI` is correct.
-   The backend has been restarted after environment changes.

## Frontend cannot reach backend

Check:

``` env
VITE_API_URL=http://localhost:5000
```

for local development.

For production:

``` env
VITE_API_URL=https://cricket-auction-app-mfzy.onrender.com
```

Also verify that the frontend was redeployed after changing the Vercel
environment variable.

## Render backend is slow initially

The free Render service can sleep when inactive. Allow some time for the
service to start on the first request.

## Images are missing

Check:

-   Cloudinary credentials
-   Cloudinary upload configuration
-   Backend logs
-   Stored image URL returned by the backend

------------------------------------------------------------------------

# 🌱 Git Workflow

Create a feature branch:

``` bash
git checkout -b feature/my-feature
```

Check changes:

``` bash
git status
```

Commit:

``` bash
git add .
git commit -m "Add my feature"
```

Push:

``` bash
git push origin feature/my-feature
```

The production deployment is connected to the `main` branch.

------------------------------------------------------------------------

# 🔮 Future Improvements

Potential improvements:

-   Complete real-time auction synchronization with Socket.IO
-   Dedicated live auction viewer
-   Auction history
-   Player statistics
-   Team statistics
-   Tournament analytics
-   Payment gateway integration
-   Improved admin permissions
-   Notifications
-   Better mobile/PWA experience
-   Automated testing
-   CI/CD pipeline
-   Production monitoring and logging

------------------------------------------------------------------------

# 👨‍💻 Author

**Sumit Singh**

GitHub: https://github.com/SumitSingh1992

------------------------------------------------------------------------

# 📄 License

This project is currently intended for personal/project development and
portfolio purposes.
