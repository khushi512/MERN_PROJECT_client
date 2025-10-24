# DesignHire

**DesignHire** is a full-stack platform that connects creative professionals with clients seeking top-tier interior design services. The platform allows designers to showcase their skills and portfolios, and clients to explore, save, and apply to design projects seamlessly. 

---

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Setup & Installation](#setup--installation)
- [Deployment](#deployment)
- [Usage](#usage)
- [Future Enhancements](#future-enhancements)


---

## Overview
DesignHire is built with a **MERN stack** (MongoDB, Express, React, Node.js). It provides an interactive and modern interface for designers and clients, focusing on seamless collaboration. Users can sign up, sign in, manage profiles, save jobs, filter by skills, and explore available projects. 

The frontend is designed using **React** with a focus on minimalism, usability, and modern UI patterns. The backend is built with **Node.js** and **Express**, handling authentication, job management, and user data securely with JWT.

---

## Features

### Authentication
- Sign Up / Sign In / Forgot Password
- Password reset via email (simulation)
- Secure JWT-based authentication
- Profile management for designers

### Job Portal
- Explore available jobs/projects
- Apply to jobs
- Save jobs for later
- Filter jobs by required skills
- Search functionality for job titles

### User Profile
- Add personal info, bio, and skills
- View applied and saved jobs
- Edit profile details

### UI/UX
- Modern, minimal, and clean design
- Responsive layout for desktop and mobile
- Gradient buttons and interactive elements
- Skill tags, cards, and hover effects

---

## Tech Stack

### Frontend
- React
- Redux Toolkit
- React Router
- Tailwind CSS
- Vite

### Backend
- Node.js
- Express.js
- MongoDB & Mongoose
- JWT authentication
- CORS handling
- Cookie parser

### Deployment
- Frontend: Vercel
- Backend: Render

---

## Project Structure
DesignHire/
├─ client/ # Frontend
│ ├─ src/
│ │ ├─ components/ # Navbar, Cards, Modals
│ │ ├─ pages/ # SignIn, SignUp, Browse, Profile, Landing
│ │ ├─ redux/ # User Slice
│ │ └─ hooks/ # Custom hooks
│ ├─ package.json
│ └─ vite.config.js
├─ server/ # Backend
│ ├─ config/ # DB connection
│ ├─ routes/ # Auth, User, Job routes
│ ├─ controllers/ # Business logic
│ ├─ models/ # Mongoose models
│ ├─ package.json
│ └─ server.js
├─ README.md


---

## Setup & Installation

### Prerequisites
- Node.js >= 18
- MongoDB (Atlas or local)
- NPM or Yarn

### Backend Setup
1. Navigate to the backend folder:
```bash
npm install
```
2. Create .env file
3. Start the server
### Frontend Setup
1. Navigate to the frontend folder
2. Install dependencies
3. Start development serevr

### Deployment

Frontend: Vercel
Set VITE_API_URL to your backend URL and run npm run build.

Backend: Render
Connect GitHub repo, set environment variables, and deploy.

Ensure CORS in backend allows requests from deployed frontend.
