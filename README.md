# Fantasy Football Backend

This project is the backend implementation for a fantasy football web application. It is built using Node.js, Express, and MySQL. The backend provides RESTful API endpoints to support frontend operations and manage user data, fantasy football teams, and league standings.

## Table of Contents

- [Fantasy Football Backend](#fantasy-football-backend)
  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
  - [Usage](#usage)
  - [API Endpoints](#api-endpoints)
  - [Database Structure](#database-structure)
  - [License](#license)

## Installation

1. Clone the repository:

_git clone https://github.com/davidpiper89/fantasyfootballbackendgroup.git_

2. Navigate to the project folder:

_cd fantasyfootballbackendgroup_

3. Install dependencies:

_npm install_

4. Set up a MySQL database and import the provided `schema.sql` file to create the necessary tables.

5. Create a `.env` file in the project root folder and provide the necessary environment variables:

DB_HOST=<your_database_host>
DB_USER=<your_database_user>
DB_PASSWORD=<your_database_password>
DB_NAME=<your_database_name>
JWT_SECRET=<your_jwt_secret_key>

6. Start the development server:

_npm start_

The backend API will be accessible at `http://localhost:3001`.

## Usage

The backend provides API endpoints that can be accessed by the frontend application to perform CRUD operations on users, fantasy football teams, and league standings.

## API Endpoints

| Method | Endpoint                 | Description                               |
| ------ | ------------------------ | ----------------------------------------- |
| POST   | `/api/users/signup`      | Register a new user                       |
| POST   | `/api/users/login`       | Authenticate and log in a user            |
| GET    | `/api/users/:userId`     | Get user data                             |
| PUT    | `/api/users/:userId`     | Update user data                          |
| DELETE | `/api/users/:userId`     | Delete a user                             |
| GET    | `/api/teams`             | Get all teams                             |
| GET    | `/api/teams/:teamId`     | Get team data                             |
| GET    | `/api/players`           | Get all players                           |
| GET    | `/api/players/:playerId` | Get player data                           |
| GET    | `/api/league`            | Get league standings                      |
| GET    | `/api/userTeam`          | Get the user's fantasy football team data |

## Database Structure

The backend uses a MySQL database with the following tables:

- `users`: Stores user account information
- `fantasy`: Stores fantasy football team data for each user
- `line_up`: Stores player data for each user's fantasy football team
- `teams`: Stores team data
- `players`: Stores player data

## License

This project is open-source and available under the [MIT License](LICENSE).
