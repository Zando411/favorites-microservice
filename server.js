require('dotenv').config();
const express = require('express');
const { MongoClient } = require('mongodb');
const app = express();
const cors = require('cors');

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

app.use(cors());
app.use(express.json());

const client = new MongoClient(MONGO_URI);

async function connectToDB() {
  try {
    await client.connect();
    console.log('Connected to MongoDB successfully');
  } catch (e) {
    console.error('Error connecting to the database', e);
    process.exit(1);
  }
}
connectToDB();

const db = client.db('favoritesDB');
const collection = db.collection('favorites');

// endpoints
app.post('/api/favorites', async (req, res) => {
  const { userID, favorite } = req.body;

  // must have both fields
  if (!userID || !favorite) {
    return res.status(400).json({ error: 'Missing userID or favorite' });
  }

  try {
    const user = await collection.findOne({ _id: userID });

    // Check if the game is already in the user's favorites
    if (user && user.favorites && user.favorites.includes(favorite)) {
      return res.status(400).json({ error: 'Game is already in favorites' });
    }

    const result = await collection.updateOne(
      { _id: userID },
      { $addToSet: { favorites: favorite } },
      { upsert: true }
    );

    console.log(result);
    res.json({ message: 'Game added to favorites' });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error inserting favorite' });
  }
});

app.get('/api/favorites/:id', async (req, res) => {
  const userID = req.params.id;

  if (!userID) {
    return res.status(400).json({ error: 'Missing userID' });
  }

  try {
    const user = await collection.findOne({ _id: userID });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ favorites: user.favorites });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error getting favorites' });
  }
});

app.delete('/api/favorites', async (req, res) => {
  const { userID, favorite } = req.body;

  // Validate input
  if (!userID || !favorite) {
    return res.status(400).json({ error: 'Missing userID or favorite' });
  }

  try {
    const user = await collection.findOne({ _id: userID });

    if (!user || !user.favorites || !user.favorites.includes(favorite)) {
      return res.status(404).json({ error: 'Game not found in favorites' });
    }

    const result = await collection.updateOne(
      { _id: userID },
      { $pull: { favorites: favorite } }
    );

    console.log(result);
    res.json({ message: 'Game removed from favorites' });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error removing favorite' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
