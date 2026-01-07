# SafeZone – Real-Time Emergency Assistance System

## Project Overview

SafeZone is a real-time web-based emergency assistance system designed to help users quickly request help during critical situations. The platform enables users to send SOS alerts, share their location in real-time, and discover nearby emergency facilities such as hospitals and police stations. The system emphasizes speed, reliability, and real-time communication to enhance personal safety.

This project demonstrates full-stack development, real-time systems, and geospatial data integration for safety-critical applications.

---

## Key Features

- **Role-Based Authentication**  
  Separate login and registration for server users (administrators) and client users.

- **Emergency Dashboard**  
  Users can trigger SOS alerts and share their live location instantly.

- **Real-Time Communication**  
  Powered by Socket.io for instant alert updates and live location tracking.

- **Geolocation & Mapping**  
  Displays nearby emergency facilities using Overpass API and Leaflet.js.

- **Secure Data Management**  
  Stores user profiles, emergency signals, and location logs in a MySQL database.

---

## System Architecture

### Client Side
- EJS templates for UI rendering (Login, Signup, Dashboard)
- JavaScript for frontend logic and Socket.io communication
- Leaflet.js for interactive map visualization
- Overpass API for nearby emergency service discovery

### Server Side
- Node.js + Express.js for backend API and routing
- Socket.io Server for real-time data streaming
- MySQL for persistent data storage

### Database
- Tables for:
  - Server users
  - Client users
  - Emergency alerts
  - Location tracking data

---

## Technologies Used

### Frontend
- HTML, CSS, JavaScript
- EJS (Embedded JavaScript Templates)
- Leaflet.js
- Socket.io (Client)

### Backend
- Node.js
- Express.js
- Socket.io (Server)
- MySQL
- XAMPP

### External APIs
- Overpass API
- Ngrok (for public access testing)

---

## Installation & Setup

### 1️⃣ Install Node.js
- Download the latest LTS version from the official Node.js website.
- Ensure Node.js is added to your system environment variables.

### 2️⃣ Database Setup
- Import the `safe_zone` database using XAMPP (MySQL).

### 3️⃣ Project Setup
```bash
# Extract the project folder
cd path/to/project-folder

# Start the application
node app.js
### 4️⃣ Server-Side Access

- Open your browser and go to:  
  http://localhost:3030

**Server Login Credentials**
- Email: tun@gmail.com  
- Password: 000000

---

### 5️⃣ Public Access via Ngrok
```bash
ngrok http 3030

### 6️⃣ Client-Side Access

- Open the Ngrok public URL.

**Client Login Credentials**
- Email: lu@gmail.com  
- Password: 000000

---

## Usage Guide

### Server Users
- Monitor emergency alerts
- View user activity logs
- Manage emergency data

### Client Users
- Send SOS alerts instantly
- Share real-time location
- View nearby emergency facilities on the map

---

## Project Highlights for Recruiters
- End-to-end full-stack development
- Real-time systems using WebSockets
- Geospatial data integration
- Secure authentication & role-based access
- Practical application in public safety and emergency response

---

## Future Improvements
- Mobile app version (React Native)
- Push notifications
- AI-based risk detection
- Role-based analytics dashboard
- Deployment on cloud (AWS/GCP)
