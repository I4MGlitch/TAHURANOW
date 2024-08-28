// Import dependencies
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const parser = require('body-parser');
const path = require('path');
const compression = require('compression'); // Add this import

// Import Schemas
const berita = require('./schemas/berita');
const fauna = require('./schemas/fauna');
const flora = require('./schemas/flora');

// Initialize app
const app = express();

// CORS Configuration: allow requests from your frontend domain
// const corsOptions = {
//   origin: 'https://tahura.vercel.app',
//   optionsSuccessStatus: 200
// };
// app.use(cors(corsOptions));
app.use(cors())

// Compression Middleware
app.use(compression()); // Add this line

app.use(parser.json());

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, '../public')));

// MongoDB Connection using Mongoose
mongoose.connect('mongodb+srv://mrxstylers:gonzo112233@tahura.ydoqsiv.mongodb.net/')
  .then(() => console.log('MongoDB connected to database: TAHURA'))
  .catch(err => console.error('MongoDB connection error:', err));

// Define API routes
app.get('/api/getFloraDetails/:id', async (req, res) => {
  try {
    const floraId = req.params.id;
    const floraDetails = await flora.findById(floraId).exec();
    if (!floraDetails) {
      return res.status(404).json({ error: 'Flora not found' });
    }
    res.json(floraDetails);
  } catch (error) {
    console.error('Error fetching flora details:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/getFaunaDetails/:id', async (req, res) => {
  try {
    const faunaId = req.params.id;
    const faunaDetails = await fauna.findById(faunaId).exec();
    if (!faunaDetails) {
      return res.status(404).json({ error: 'Fauna not found' });
    }
    res.json(faunaDetails);
  } catch (error) {
    console.error('Error fetching fauna details:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/getBeritaDetails/:id', async (req, res) => {
  try {
    const beritaId = req.params.id;
    const beritaDetails = await berita.findById(beritaId).exec();
    if (!beritaDetails) {
      return res.status(404).json({ error: 'Berita not found' });
    }
    res.json(beritaDetails);
  } catch (error) {
    console.error('Error fetching berita details:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/getAllFlora', async (req, res) => {
  try {
    const floraData = await flora.find().exec();
    res.json(floraData);
  } catch (error) {
    console.error('Error fetching flora data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/getAllFauna', async (req, res) => {
  try {
    const faunaData = await fauna.find().exec();
    res.json(faunaData);
  } catch (error) {
    console.error('Error fetching fauna data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/getAllBerita', async (req, res) => {
  try {
    const beritaData = await berita.find().exec();
    res.json(beritaData);
  } catch (error) {
    console.error('Error fetching berita data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Handle all other requests to serve the Angular frontend
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html')); // Ensure this path is correct
});

// Start the server
const PORT = process.env.PORT || 4242;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
