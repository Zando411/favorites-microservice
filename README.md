# Favorites Microservice

This microservice allows users to store, retrieve, and remove their favorite
items. It provides a REST API with `POST`, `GET`, and `DELETE` endpoints.

## **Communication Contract**

This microservice follows a **REST API architecture** and requests must be sent
as **JSON**.

- **Base URL:** `http://localhost:<PORT>/api/favorites`
- **Default Port:** `3000`
- **To change the port:** Set `PORT=<chosen port>` in a `.env` file
  ([Environment Variables](#environment-variables)).
- **Content Type:** `application/json`
- **Response Format:** `JSON`

## **How to Programmatically REQUEST Data**

This section explains how to interact with the microservice by making requests.

### **Add a Favorite Game**

- **Endpoint:** `POST /api/favorites`
- **Description:** Adds a game to a user's favorites list.
- **Request Body Example:**

  ```json
  { "userID": "1", "gameID": "Minecraft" }
  ```

- **Example Python API call:**

  ```python
  import requests

  PORT = 3000 # Change this if needed
  URL = f"http://localhost:{PORT}/api/favorites"

  response = requests.post(URL, json={"userID": "1", "gameID": "Minecraft"})
  print(response.json())
  ```

---

### **Remove a Favorite Game**

- **Endpoint:** `DELETE /api/favorites`
- **Description:** Removes a game from a user's favorites list.
- **Request Body Example:**

  ```json
  { "userID": "1", "gameID": "Minecraft" }
  ```

- **Example Python API call:**

  ```python
  import requests

  PORT = 3000 # Change this if needed
  URL = f"http://localhost:{PORT}/api/favorites"

  response = requests.delete(URL, json={"userID": "1", "gameID": "Minecraft"})
  print(response.json())
  ```

---

### **Retrieve Favorite Games**

- **Endpoint:** `GET /api/favorites/{userID}`
- **Description:** Retrieves all favorite games for a given user.
- **Example Python API call:**

  ```python
  user_id = "1"
  PORT = 3000 # Change this if needed
  URL = f"http://localhost:{PORT}/api/favorites/{user_id}"

  response = requests.get(URL)
  print(response.json())
  ```

---

## **How to Programmatically RECEIVE Data**

This section explains how data is received from the microservice.

### **Response for Adding a Favorite Game**

- **Endpoint:** `POST /api/favorites`
- **Example Success Response:**

  ```json
  { "message": "Game added to favorites" }
  ```

- **Example Error Response:**

  ```json
  { "error": "Game is already in favorites" }
  ```

---

### **Response for Removing a Favorite Game**

- **Endpoint:** `DELETE /api/favorites`
- **Example Success Response:**

  ```json
  { "message": "Game removed from favorites" }
  ```

- **Example Error Response:**

  ```json
  { "error": "Game not found in favorites" }
  ```

---

### **Response for Retrieving Favorite Games**

- **Endpoint:** `GET /api/favorites/{userID}`
- **Example Success Response (if user has favorites):**

  ```json
  { "favorites": ["Minecraft", "Tetris", "Zelda"] }
  ```

- **Example Success Response (if user has no favorites):**

  ```json
  { "favorites": [] }
  ```

- **Example Error Response (if user not found):**

  ```json
  { "error": "User not found" }
  ```

---

## **MongoDB Setup**

This microservice requires **MongoDB Community Edition** to be installed and
running locally. If you do not have MongoDB installed, follow the steps below

1. **Go to the official MongoDB download page and download the MongoDB Server**:
   [MongoDB Community Edition Download](https://www.mongodb.com/try/download/community)
2. Select the version applicable to your system
3. Run installer and tick the "Install MongoDB Compass" option

   > Personally I used MongoDB compass to help visualize and setup the database
   > easily, if you have never used MongoDB before, I would recommend doing
   > this.

4. Once compass has been installed, open it
5. On the left, you should see `CONNECTIONS`. If you have no connections on the
   left, create a new connection with the default options.

    <img src="./README images/compass.webp" alt="MongoDB compass" width="800"/>

6. Once you have a connection, hover it on the left and click connect. You are
   now connected to your database!
7. Add your port to .env as described below

## **Environment Variables**

This microservice is configured to use a .env file with the dotenv package. To
support this, you will need to create a .env file with the information
necessary.

1. Create a `.env` file in the root directory
2. Add the following environment variables:

   ```sh
   MONGO_URI=mongodb://localhost:27017 # default provided by compass, if you set your own custom port update it here
   PORT=3000 # can be changed to whatever port you'd like
   ```

3. Done! Your program should be ready to run

## **Running this Microservice Locally**

Make sure you have [Node.js](https://nodejs.org/en) installed and you are
connected to MongoDB, then run:

```sh
npm install
```

To install all needed packages. Then, start the Node.js server by running:

```sh
npm start
```

The console should display:

```
Server is running on port 3000.
Connected to MongoDB successfully
```
