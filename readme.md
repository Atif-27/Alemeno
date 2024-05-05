# Learning Management System (LMS)

This project involves building a React-based web application it showcases a list of courses and their details, a student dashboard, and real-time updates for course likes.

## Technologies Used

### Frontend

- **React.js**: Used with Vite for fast development and build tooling.
- **Tailwind CSS** and **DaisyUI**: For styling and UI components.
- **Redux Toolkit**: For state management.
- **TypeScript**: For type safety and better developer experience.
- **Axios**: For HTTP requests to interact with the backend.
- **React Router DOM**: For routing.
- **Socket.IO Client**: For real-time web socket communications.

### Backend

- **Express**: Web server framework.
- **MongoDB** with **Mongoose**: For the database and data modeling.
- **JWT**: For secure authentication.
- **Socket.IO**: For real-time communication between clients and server.

## Project Setup

### Running the Project

#### Backend

1. Navigate to the server directory:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the server:
   ```bash
   npm run dev
   ```
4. Rename .env.sample to .env

#### Frontend

1. Navigate to the frontend directory:
   ```bash
   cd client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Rename .env.sample to .env

### Environmental Variables

Ensure you have the following environment variables set in your `.env` file in the server:

- `PORT`: Port at which server is running
- `MONGO_URI`: Your MongoDB connection string.
- `JWT_SECRET`: Secret key for JWT token generation.

Ensure you have the following environment variables set in your `.env` file in the client:

- `VITE_BASE_URL`: Contains the base url of the backned
- `VITE_SOCKET_URL`: Contain the socket url.

## Features

### Pages and Features

#### Login

- Secure login implementation with JWT.

#### Register

- User registration with email conflict checking.

#### Course Listing

- Displays a list of courses fetched from the backend.
- Supports searching, sorting, and filtering; state managed in URL for persistence across sessions.
- Click on a course to view detailed information.

#### Course Detail

- Displays detailed information about a course.
- Real-time likes feature implemented using Socket.IO.

#### Dashboard Summary

- Shows a summary view for a student with enrolled courses and their progress.

#### Enrolled Courses

- Displays courses the student is enrolled in with a progress indicator.
- Allows marking courses as completed.

### Advanced State Management

- Utilizes Redux Toolkit for managing application state, including courses, authentication, and enrollment data.

## Demo Video

Include a link to a demo video of the website showcasing all functionalities.
