# Online Judge Program

## Overview

This project is an Online Judge platform designed to allow users to solve problems using C++ and JavaScript. It features a user-friendly dashboard that displays the top 10 users based on the number of problems they've solved. Users can manage their profiles and solve problems through an intuitive interface.

## Frontend

The frontend is built using:

- **Vite**: A fast build tool for modern web development.
- **React**: A JavaScript library for building user interfaces.
- **Tailwind CSS**: A utility-first CSS framework for custom styling.
- **Redux**: For state management.
- **Firebase**: Used for profile photo storage.
- **OAuth**: For user authentication.

## Backend

The backend is built using:

- **Node.js**: A JavaScript runtime for building server-side applications.
- **Express**: A web application framework for Node.js.
- **MongoDB**: A NoSQL database for storing user and problem data.
- **Docker**: This is for containerizing the application.
- **JWT (JSON Web Tokens)**: For authentication and authorization.
- **BcryptJS**: This is for securely hashing passwords.

## Features

- **Dashboard**: Displays the top 10 users who have solved the most problems.
- **User Management**:
  - **Login**: Users can log in to their accounts.
  - **Signup**: Users can create new accounts.
  - **Profile Management**: Users can update and delete their profiles.
- **Problem Solving**: Users can solve problems using C++ and JavaScript.

## Installation

### Frontend

1. Clone the repository:
   ```bash
   git clone https://github.com/riyaz1523/OJ-Mern-Project.git
   ```
2. Navigate to the frontend directory:
    ```
    cd client
    ```
3. Install dependencies:
   ```
   npm install
   ```
4. Start the development server:
   ```
   npm run dev
   ```
.env example

    ```  
    VITE_FIREBASE_API_KEY = <Your API KEY>
    VITE_REACT_APP_API_URL=<Backend Endpoint URL>
    ```
### Backend

1. Navigate to the backend directory:
   ```
   cd api
   ```
2. Build and run the app:
   ```
   npm install
   npm run dev
   ```
env example

    ```  
    MONGO_URL= <your MongoDB URL>
    
    JWT_SECRET= <Your Secret Key>
    ```
