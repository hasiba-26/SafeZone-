# SafeZone – Real-Time Emergency Assistance System

## Project Overview
SafeZone is a real-time web-based emergency assistance system designed to help users quickly request help during critical situations. The platform enables users to send SOS alerts, share their location in real-time, and discover nearby emergency facilities such as hospitals and police stations. The system emphasizes speed, reliability, and real-time communication to enhance personal safety.

This project demonstrates full-stack development, real-time systems, and geospatial data integration for safety-critical applications.
## Features

- **User Authentication:** Separate login and signup for server users and client users.
- **Emergency Dashboard:** Client users can send emergency signals and share their location.
- **Real-time Communication:** Utilizes Socket.io for real-time updates and communication.
- **Geolocation Services:** Fetches nearby emergency services using the Overpass API and displays them on a map using Leaflet.js.
- **Database Management:** Stores user data, emergency signals, and location data in a MySQL database.

## Architecture

The system architecture is divided into several key components:

- **Client Side:**
  - EJS templates for views (login, signup, dashboard)
  - JavaScript files for front-end logic and real-time communication
  - Leaflet.js for map display and Overpass API integration

- **Server Side:**
  - Node.js with Express for handling HTTP requests
  - Socket.io Server for real-time communication
  - MySQL Database for storing user and emergency data

- **Database:**
  - Tables for server users, client users, emergency signals, and locations

- **External APIs:**
  - Overpass API for fetching nearby places based on user location

## Technologies Used

- **Front-end:**
  - HTML, CSS, JavaScript
  - EJS (Embedded JavaScript Templating)
  - Leaflet.js
  - Socket.io

- **Back-end:**
  - Node.js with Express
  - Socket.io Server
  - MySQL Database

- **External APIs:**
  - Overpass API

## Installation

1. **Download and Install Node.js:**
   - Visit the [Node.js official website](https://nodejs.org/) and download the latest LTS version of Node.js.
   - Install Node.js by following the instructions for your operating system.
   - Make sure to add Node.js to your system's environment variables.

2. **Set Up the Database:**
   - Import the database named `safe_zone` in XAMPP.

3. **Extract the Project Folder:**
   - Download the project ZIP file.
   - Extract the ZIP file to a desired location on your computer.

4. **Navigate to the Project Directory:**
   - Open the command prompt (or terminal).
   - Change the directory to the path where you extracted the project folder. You can use the `cd` command to do this. For example:
     ```bash
     cd path/to/extracted/folder
     ```

5. **Run the Application:**
   - In the command prompt, run the following command to start the application:
     ```bash
     node app.js
     ```

6. **Access the Server Side:**
   - Open a web browser and navigate to `http://localhost:3030`.
   - Use the following credentials to log in:
     - Email: tun@gmail.com
     - Password: 000000

7. **Download and Install Ngrok:**
   - Visit the [Ngrok official website](https://ngrok.com/) and download Ngrok.
   - Install Ngrok by following the instructions for your operating system.

8. **Run Ngrok:**
   - In the command prompt, run the following command to expose your local server to the internet:
     ```bash
     ngrok http 3030
     ```
   - Ngrok will provide you a public URL. You can use this URL to access the application from your phone.

9. **Access the Client Side:**
   - Use the Ngrok URL to access the client side of the application.
   - Use the following credentials to log in:
     - Username: lu@gmail.com
     - Password: 000000

## Usage

1. **Access the Application:**
   - Open a web browser and navigate to `http://localhost:3030` for server side access.
   - Use the Ngrok URL for client side access.

2. **Server User:**
   - Login or sign up to access the server dashboard and view logs.

3. **Client User:**
   - Login or sign up to access the emergency dashboard.
   - Send emergency signals and share your location.
  
## Project Highlights for Recruiters

-End-to-end full-stack development

-Real-time systems using WebSockets

-Geospatial data integration

-Secure authentication & role-based access

-Practical application in public safety and emergency response

## Future Improvements

-Mobile app version (React Native)

-Push notifications

-AI-based risk detection

-Role-based analytics dashboard

-Deployment on cloud (AWS/GCP)
