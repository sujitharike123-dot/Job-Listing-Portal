# Job Listing Portal

A full-stack web application built with **Django REST Framework** (Backend) and **Vite + React** (Frontend).  
This project allows users to register, log in (JWT-based authentication), and interact with job listings.

---

## 📁 Folder Structure Overview

```
Portal/
│
├── Backend/                        # Django backend (API server)
│   ├── Backend/                    # Core Django project settings
│   │   ├── settings.py             # Main Django settings file (DB, JWT, REST, apps)
│   │   ├── urls.py                 # Root URL configuration for backend routes
│   │   ├── asgi.py / wsgi.py       # Entry points for ASGI/WSGI servers (deployment)
│   │   └── __init__.py             # Marks this as a Python package
│   │
│   ├── accounts/                   # User management and authentication app
│   │   ├── models.py               # Custom User model and related database models
│   │   ├── serializers.py          # Converts model data to/from JSON for APIs
│   │   ├── views.py                # Handles user-related API logic (register, login)
│   │   ├── urls.py                 # Routes for user authentication endpoints
│   │   ├── admin.py                # Registers models for Django Admin
│   │   ├── apps.py                 # Django app configuration
│   │   └── migrations/             # Database migration files (auto-generated)
│   │
│   ├── db.sqlite3                  # SQLite database for local development
│   ├── manage.py                   # Django command-line utility
│   └── requirements.txt            # Backend dependencies list
│
├── Frontend/                       # React frontend (Vite project)
│   ├── src/                        # Main source code
│   │   ├── Components/             # Reusable UI components
│   │   ├── jobs/                   # Job-related components/pages
│   │   ├── App.jsx                 # Root React component
│   │   └── main.jsx                # Entry point for React app
│   │
│   ├── public/                     # Static assets like icons and images
│   ├── package.json                # Frontend dependencies and scripts
│   ├── vite.config.js              # Vite configuration (proxy, build settings)
│   ├── index.html                  # Main HTML entry point
│   └── README.md                   # (Optional) Frontend-specific documentation
│
├── venv/                           # Python virtual environment (not committed)
└── .gitignore                      # Ignored files and folders for Git
```

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/AYAZ2006/Job-Listing-Portal.git
cd Job-Listing-Portal
```

### 2️⃣ Backend Setup (Django)
```bash
cd Backend
python -m venv venv
venv\Scripts\activate       # (Windows)
# source venv/bin/activate    # (Mac/Linux)

pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```
**Backend runs at:** http://127.0.0.1:8000

### 3️⃣ Frontend Setup (Vite + React)
```bash
cd ../Frontend
npm install
npm run dev
```
**Frontend runs at:** http://localhost:5173

---

## 🔐 Authentication Endpoints

| Endpoint | Method | Description |
|-----------|---------|-------------|
| `/register/` | POST | Register a new user |
| `/login/` | POST | Authenticate user and return JWT |

---

## 🧠 Notes for Team Members
-Always work on Components folder(for React)  
-After Every Functions added to this project make sure to raise a pull request
