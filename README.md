#  Courses Management System

This project is a Node.js-based backend for Courses Management System. It allows users to perform CRUD operations (Create, Read, Update, Delete) on courses. The project includes authentication and authorization using JWT, and uses Multer to handle image uploads.

## Features

- **Get all courses**: Retrieve a list of all available courses.
- **Create a course**: Add new courses to the platform.
- **Update a course**: Modify the details of an existing course.
- **Delete a course**: Remove a course from the platform.
- **Authentication and Authorization**: JWT is used to authenticate users and protect routes.
- **Image Upload**: Multer is integrated for handling course image uploads.

## Technologies Used

- **Node.js**: Runtime environment for building server-side applications.
- **Express.js**: Web framework for Node.js.
- **MongoDB**: NoSQL database used to store course data.
- **Mongoose**: ODM library for MongoDB, used for defining schemas and interacting with the database.
- **JWT (jsonwebtoken)**: Used for user authentication and route protection.
- **Multer**: Middleware for handling image uploads.
- **CORS**: Middleware to enable Cross-Origin Resource Sharing.
- **bcryptjs**: Library to hash and compare passwords.
- **dotenv**: Loads environment variables from a `.env` file.
