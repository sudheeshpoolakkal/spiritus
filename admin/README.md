# Spiritus Admin Interface Documentation

## Table of Contents
1. [Overview](#overview)
2. [Features](#features)
3. [Installation](#installation)
4. [Usage](#usage)
5. [API Integration](#api-integration)

## 1. Overview
The Admin Interface provides comprehensive management tools for administrators to oversee the entire Spiritus system.

## 2. Features
- User management
- Appointment tracking
- Doctor management
- Analytics and reporting
- System configuration

## 3. Installation
```bash
cd admin
npm install
```

## 4. Usage
Start the development server:
```bash
npm run dev
```

Access the admin interface at `http://localhost:5173`

## 5. API Integration
The admin interface communicates with the backend API for all data operations. Key API endpoints include:

- GET /api/admin/users - Get all users
- POST /api/admin/users - Create new user
- GET /api/admin/appointments - Get all appointments
- PUT /api/admin/appointments/:id - Update appointment status
