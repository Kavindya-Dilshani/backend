# PDF Hub web app - MERN Stack

This README provides an overview of the project structure of backend side and how to get started.

## Getting started

### Prerequisites

Before you begin, ensure you have the following software installed on your machine:

- Node.js (_v18.15.0 or higher_)
- npm ( _9.5.0 or higher_)
  -mongoDB

### Installation

1. **Clone** this repository to your local machine:
   git clone https://github.com/Kavindya-Dilshani/backend.git

2. **Navigate** to the project directory:
   cd backend

3. **Install** the project dependencies:
   Using npm:
   npm install

   ## Development

update backend\config\config.json file accordingly:

To start the application, run the following command:
npm start

This will run the server on the port specified in your config.json file.

## API Endpoints

Create a User

- URL: /api/auth/signup
- Method: POST
- Description: Register a new user for application.
- Request:
  Content-Type: application/json
  Body: {
  "name": string,
  "email":string,
  "password": string,
  "confirmPassword":string
  }

  Login user

- URL: /api/auth/login
- Method: POST
- Description: User login for existing users.
- Request:
  Content-Type: application/json
  Body: {
  "email":string,
  "password":string
  }

Upload a PDF

- URL: /api/files/upload-files
- Method: POST
- Description: Uploads a PDF file.
- Request:
  Content-Type: multipart/form-data
  Body: { file: <PDF file> }

Get All PDFs

- URL: /api/files/get-files
- Method: GET
- Request:
  Query Parameters: userId
- Description: Retrieves a list of uploaded PDF files for a given user ID.

Get a PDF

- URL: /api/files/get-file
- Method: GET
  Query Parameters: documentId
- Description: Retrieves a selected PDF file for a given document ID.

## Database

This project uses MongoDB to store metadata about uploaded PDF files and to store metadata about user.

## Project Structure

The project structure is organized as follows:

- `controllers/` : Contains logic for handling file and user operations
- `models/` : Defines the schema for storing file and user metadata
- `routes/` : Defines the API endpoints related to file and user operations
- `server.js` : main file that sets up and starts the server.
- `dist/`: Output directory for production builds.
- `node_modules/`: Dependencies installed via npm.
- `package.json`: Project configuration and dependencies.

## License

This project is licensed under the **MIT License**. See the `LICENSE` file for details.
