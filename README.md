# Hotel Management API

A Node.js and Express.js backend API to manage hotel data, including adding, updating, retrieving hotel details, and uploading images. This API uses a JSON file as a data store and includes unit tests for key functionalities.

## Table of Contents

- **Features**: A list of functionalities provided by the API.
- **Project Structure**: An organized layout of the project's folders and files, following the MVC pattern.
- **Getting Started**: Instructions for setting up the project on your local machine.
- **Installation**: Steps to install the necessary dependencies.
- **Usage**: Details on how to start the server and interact with the API.
- **API Endpoints**: Documentation of available API endpoints and their functionalities.
- **Schema**: Description of the data structure stored in the JSON file.
- **Testing**: Information about unit tests included in the project and how to run them.
- **Technologies Used**: List of technologies and libraries used in this project, such as Node.js, Express.js, and Jest.
- **Contributing**: Guidelines for contributing to the project, including branching and commit conventions.
- **License**: Details on the license for the project, specifying permissions and restrictions.


## Features
- **CRUD Operations**: Create, Read, Update, and Delete hotel entries.
- **Image Upload**: Upload images for hotels, storing them in a designated directory and associating URLs with hotel records.
- **Slug Generation**: Automatically generates a slug from the hotel title for unique URL-friendly identifiers.
- **Validation**: Ensures data integrity for POST and PUT requests.
- **Error Handling**: Provides meaningful error messages and handles HTTP status codes properly.
- **Organized Structure**: Follows the MVC pattern for scalable code organization.


## Project Structure

```bash

W3-NODE/
├── Data/
│   └── hotel-id.json             # JSON file for hotel data
├── Hotel/
│   ├── Controller/
│   │   └── hotelController.js     # Handles hotel-related request logic
│   ├── Models/
│   │   └── hotelModel.js          # Manages data operations for hotels
│   ├── Routes/
│   │   └── hotelRoutes.js         # Defines hotel-related API routes
├── UnitTest/
│   └── server.test.js             # Unit tests for API endpoints
├── uploads/                       # Directory for uploaded images
├── node_modules/
├── package.json
├── package-lock.json
└── server.js                      # Main server file

