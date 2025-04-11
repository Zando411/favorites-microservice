# Favorites Microservice

This microservice handles operations related to user favorites in the
**CatCall** application. It provides RESTful endpoints to add, remove, retrieve,
and initialize a user's favorites list.

## Notes

- This service is intended to run as part of the CatCall application and does
  not need to be run independently.
- MongoDB must be running and accessible using the URI specified in your `.env`
  file to run locally.
- The user's ID can be any string, whether it be an email, UUID, or simply a
  number. The favorite can also be any string. In the CatCall app I use and
  emails for the user ID and cat UUID's for the favorite item.

## Base Configuration

- **Base URL:** `http://localhost:<PORT>/api/favorites`
- **Default Port:** `3000`
- **Change the Port:** Set `PORT=<your_port>` in a `.env` file (see
  `.env.example` for a template).
- **Content Type:** `application/json`
- **Response Format:** `JSON`

## Endpoints

> Note: If an unexpected error occurs on the server (e.g. database error), a
> `500 Internal Server Error` will be returned with a generic error message.

### `POST /api/favorites`

**Add a favorite item to a user's list.**

**Request Body:**

```json
{
  "userID": "user@example.com",
  "favorite": "13b930c1-bb52-4616-822e-c9ca7d219dca"
}
```

**Success Response:**

```json
{ "message": "Item added to favorites" }
```

**Error Response:**

```json
{ "error": "Item is already in favorites" }
```

---

### `DELETE /api/favorites`

**Remove a favorite game from a user's list.**

**Request Body:**

```json
{
  "userID": "user@example.com",
  "favorite": "13b930c1-bb52-4616-822e-c9ca7d219dca"
}
```

**Success Response:**

```json
{ "message": "Item not found in favorites" }
```

**Error Response:**

```json
{ "error": "Item not found in favorites" }
```

---

### `GET /api/favorites/:userID`

**Retrieve a user's full list of favorite games.**

**Response (with favorites):**

```json
{
  "favorites": [
    "13b930c1-bb52-4616-822e-c9ca7d219dca",
    "f9461501-93b8-4cb4-96ae-faeabca8e02c",
    "91ade6cc-2a35-485b-874e-b8b1117ae99d"
  ]
}
```

**Response (no favorites):**

```json
{ "favorites": [] }
```

**Error Response:**

```json
{ "error": "User not found" }
```

---

### `POST /api/favorites/newUser`

**Create an empty favorites list for a new user (e.g. on signup).**

**Request Body:**

```json
{ "userID": "user@example.com" }
```

**Success Response:**

```json
{ "message": "User created successfully" }
```

**Error Response:**

```json
{ "error": "User already exists" }
```

---

## Environment Setup To Run Locally

1. Copy the example environment file:

   ```bash
   cp .env.example .env
   ```

2. Modify the values in `.env` as needed:

   **Example `.env` contents:**

   ```env
   PORT=3000
   MONGO_URI=mongodb://localhost:27017
   ```

---

## Running Locally (Without Docker)

Make sure [Node.js](https://nodejs.org/) is installed and MongoDB is running.
Then:

```bash
npm install
npm start
```

You should see output similar to:

```
Server is running on port 3000.
Connected to MongoDB successfully
```
