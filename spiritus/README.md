# Spiritus - Comprehensive Documentation

## Table of Contents
1. [Project Overview](#project-overview)
2. [Features](#features)
3. [Installation](#installation)
4. [Configuration](#configuration)
5. [Usage](#usage)
6. [API Documentation](#api-documentation)
7. [Deployment](#deployment)
8. [Contributing](#contributing)

## 1. Project Overview

### 1.1 Introduction
Spiritus is a full-stack web application designed to manage appointments and user interactions in a healthcare setting. It provides separate interfaces for administrators, doctors, and patients.

### 1.2 Purpose and Goals
The primary goal of Spiritus is to streamline appointment scheduling, patient management, and healthcare provider coordination.

### 1.3 Technology Stack
- **Frontend**: React, Vite, TailwindCSS
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **File Storage**: Cloudinary
- **Authentication**: JWT

### 1.4 System Architecture
[Diagram to be added]

## 2. Features

### 2.1 User Authentication
- Secure login/registration system
- Role-based access control (Admin, Doctor, User)

### 2.2 Appointment Management
- Schedule new appointments
- View and manage existing appointments
- Appointment status tracking

### 2.3 Doctor Management
- Doctor registration and profile management
- Doctor availability scheduling

### 2.4 Admin Dashboard
- User management
- Appointment overview
- Analytics and reporting

### 2.5 User Profile
- Profile information management
- Appointment history
- Medical records access

## 3. Installation

### 3.1 Prerequisites
- Node.js (v16 or higher)
- MongoDB (v5 or higher)
- Cloudinary account

### 3.2 Frontend Setup
```bash
cd spiritus
npm install
```

### 3.3 Backend Setup
```bash
cd server
npm install
```

### 3.4 Common Issues
- Dependency conflicts: Try deleting node_modules and package-lock.json, then run `npm install`
- Environment setup: Ensure all required environment variables are set

## 4. Configuration

### 4.1 Environment Variables
Create a `.env` file in the root directory with the following variables:
```
VITE_API_BASE_URL=http://localhost:3000
MONGO_URI=mongodb://localhost:27017/spiritus
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
JWT_SECRET=your_jwt_secret
```

### 4.2 Database Configuration
Ensure MongoDB is running and accessible at the specified URI.

### 4.3 Cloudinary Setup
Create a Cloudinary account and configure the required API keys.

### 4.4 Authentication Configuration
Set a strong JWT secret for token generation and verification.

## 5. Usage

### 5.1 Running the Application
Start the development server:
```bash
npm run dev
```

### 5.2 User Roles
- **Admin**: Full access to all features
- **Doctor**: Manage appointments and patient profiles
- **User**: Schedule appointments and view medical records

### 5.3 Common Workflows
- Creating appointments
- Managing user profiles
- Generating reports

## 6. API Documentation

### 6.1 Authentication Endpoints
- POST /api/auth/register - User registration
- POST /api/auth/login - User login

### 6.2 User Management Endpoints
- GET /api/users - Get all users
- GET /api/users/:id - Get specific user

### 6.3 Appointment Endpoints
- POST /api/appointments - Create new appointment
- GET /api/appointments - Get all appointments

### 6.4 Doctor Management Endpoints
- POST /api/doctors - Create new doctor profile
- GET /api/doctors - Get all doctors

### 6.5 Error Handling
Common error codes:
- 400: Bad Request
- 401: Unauthorized
- 404: Not Found
- 500: Internal Server Error

## 7. Deployment

### 7.1 Building the Application
Build the frontend:
```bash
npm run build
```

### 7.2 Deployment to Vercel
1. Install Vercel CLI
2. Run `vercel` command
3. Configure environment variables

### 7.3 Deployment to Heroku
1. Create Heroku app
2. Push code to Heroku
3. Configure environment variables

### 7.4 Production Considerations
- Enable HTTPS
- Implement rate limiting
- Set up monitoring

## 8. Contributing

### 8.1 Development Setup
1. Fork the repository
2. Create a new branch
3. Make your changes

### 8.2 Coding Standards
- Follow JavaScript best practices
- Use consistent code formatting

### 8.3 Testing
Write unit tests for new features:
```bash
npm test
```

### 8.4 Pull Request Process
1. Create a new branch for your feature
2. Write clear commit messages
3. Submit a pull request with detailed description
