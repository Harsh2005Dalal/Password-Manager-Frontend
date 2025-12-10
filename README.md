# Password Manager

A secure password manager application built with React, Express, and MongoDB. Features include user authentication, OTP-based password reset, and encrypted password storage.

## Features

- User authentication (signup/login)
- Secure password storage with AES-256 encryption
- OTP-based password reset via email
- Full CRUD operations for password management
- Search and filter passwords
- Copy to clipboard functionality
- Responsive design

## Tech Stack

### Frontend
- React + TypeScript
- Vite
- Tailwind CSS
- Lucide React (icons)

### Backend
- Express.js
- MongoDB Atlas
- Mongoose
- JWT Authentication
- Nodemailer (OTP emails)
- bcryptjs (password hashing)

## Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- MongoDB Atlas account
- Gmail account for sending OTP emails

### Backend Setup

1. Navigate to the server directory:
```bash
cd server
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the server directory:
```bash
cp .env.example .env
```

4. Configure the `.env` file:
```
PORT=5000
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret_key_minimum_32_characters
ENCRYPTION_KEY=your_32_character_encryption_key

EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_gmail_app_password
```

**Important Notes:**
- For `MONGODB_URI`: Get your connection string from MongoDB Atlas dashboard
- For `JWT_SECRET`: Use a strong random string (minimum 32 characters)
- For `ENCRYPTION_KEY`: Must be exactly 32 characters
- For `EMAIL_PASS`: Use Gmail App Password (not your regular password):
  1. Enable 2-Factor Authentication on your Gmail account
  2. Go to Google Account > Security > 2-Step Verification > App Passwords
  3. Generate a new app password for "Mail"
  4. Use this 16-character password in your .env file

5. Start the server:
```bash
npm start
```

The server will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the project root directory

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file:
```bash
cp .env.example .env
```

4. Configure the `.env` file:
```
VITE_API_URL=http://localhost:5000/api
```

5. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:5173`

## Deployment on Render

### Backend Deployment

1. Create a new Web Service on Render
2. Connect your GitHub repository
3. Configure the service:
   - **Root Directory**: `server`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
4. Add environment variables in Render dashboard:
   - `MONGODB_URI`
   - `JWT_SECRET`
   - `ENCRYPTION_KEY`
   - `EMAIL_USER`
   - `EMAIL_PASS`
5. Deploy the service

### Frontend Deployment

1. Update the `.env` file with your backend URL:
```
VITE_API_URL=https://your-backend-url.onrender.com/api
```

2. Create a new Static Site on Render
3. Configure the service:
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`
4. Add environment variable:
   - `VITE_API_URL`: Your backend API URL
5. Deploy the service

## Usage

1. **Sign Up**: Create a new account with username, email, and password
2. **Login**: Sign in with your credentials
3. **Add Password**: Click "Add Password" to store a new password
4. **View Passwords**: Browse your saved passwords in the dashboard
5. **Search**: Use the search bar to filter passwords
6. **Copy**: Click copy icons to copy username or password to clipboard
7. **Edit**: Click edit icon to modify a password entry
8. **Delete**: Click delete icon to remove a password entry
9. **Forgot Password**: Use email-based OTP verification to reset your password

## Security Features

- User passwords are hashed using bcryptjs before storage
- Stored website passwords are encrypted using AES-256 encryption
- JWT tokens for secure authentication
- OTP-based password reset with 10-minute expiry
- Protected API routes with authentication middleware

## License

MIT
