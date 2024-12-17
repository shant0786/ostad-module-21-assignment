# User Management API

## Overview

This project provides a set of APIs for managing users in an application. It includes functionality for user registration, login, authentication, and profile management.

## Requirements

1. **User Registration API**: Allows users to create a new account.
2. **User Login API**: Enables users to log into their account.
3. **User Authentication by JWT Token + Cookie**: Secures endpoints using JWT tokens stored in cookies.
4. **Single User Profile Read API**: Retrieves the profile details of a single user.
5. **All User Profiles Read API**: Fetches the profiles of all users.
6. **Single User Profile Update API**: Updates the profile of a single user.
7. **Delete Single User API**: Deletes the profile of a specific user.

## Features

- **Authentication & Authorization**: Secure user sessions using JSON Web Tokens (JWT) and cookies.
- **CRUD Operations**: Perform Create, Read, Update, and Delete operations on user profiles.
- **Scalability**: Designed with scalability in mind to handle multiple users efficiently.

## Installation

1. Clone the repository:

   ```bash
   https://github.com/shant0786/ostad-module-21-assignment.git
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables by creating a `configs/config.js` file in the root directory:

   ```env
   PORT=5000
   JWT_SECRET=your_jwt_secret
   DB_URI=your_database_connection_uri
   ```

4. Start the server:
   ```bash
   npm start
   ```

## API Endpoints

### 1. User Registration API

**Endpoint**: `/api/registration`
**Method**: POST
**Description**: Registers a new user.
**Request Body**:

```json
{
  "firstName": "String",
  "lastName": "String",
  "NIDNumber": "String",
  "phoneNumber": "String",
  "email": "String",
  "password": "String",
  "bloodGroup": "String"
}
```

### 2. User Login API

**Endpoint**: `/api/login`
**Method**: POST
**Description**: Logs in a user and returns a JWT token.
**Request Body**:

```json
{
  "email": "string",
  "password": "string"
}
```

### 3. User Authentication by JWT Token + Cookie

**Middleware**: Apply authentication middleware to secure routes.

### 4. Single User Profile Read API

**Endpoint**: `/api/users/:id`
**Method**: GET
**Description**: Fetches the profile of a specific user.

### 5. All User Profiles Read API

**Endpoint**: `/api/users`
**Method**: GET
**Description**: Retrieves all user profiles.

### 6. Single User Profile Update API

**Endpoint**: `/api/users/:id`
**Method**: PUT
**Description**: Updates the profile of a specific user.
**Request Body**:

```json
{
  "firstName": "String",
  "lastName": "String",
  "NIDNumber": "String",
  "phoneNumber": "String",
  "email": "String",
  "password": "String",
  "bloodGroup": "String"
}
```

### 7. Delete Single User API

**Endpoint**: `/api/users/:id`
**Method**: DELETE
**Description**: Deletes a specific user profile.

## Technology Stack

- **Backend**: Node.js, Express
- **Database**: MongoDB / PostgreSQL
- **Authentication**: JWT, Cookies

## Contributing

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add feature"
   ```
4. Push to the branch:
   ```bash
   git push origin feature-name
   ```
5. Create a pull request.

## License

This project is licensed under the MIT License. See the LICENSE file for details.
