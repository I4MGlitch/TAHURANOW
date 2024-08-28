// Tools
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const parser = require('body-parser');

// Schemas
const berita = require('../backend/schemas/berita');
const fauna = require('../backend/schemas/fauna');
const flora = require('../backend/schemas/flora');

// Initializing 
const app = express();
app.use(cors());
app.use(parser.json());
app.use(express.static('public'))

// MongoDB Connection using Mongoose
mongoose.connect('mongodb+srv://TAHURA:TAHURA123@tahura.cjtoycf.mongodb.net/TAHURA', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected to database: TAHURA'))
.catch(err => console.error('MongoDB connection error:', err));


// Define routes
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
    const floraData = await flora.find();
    res.json(floraData);
  } catch (error) {
    console.error('Error fetching flora data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/getAllFauna', async (req, res) => {
  try {
    const faunaData = await fauna.find();
    res.json(faunaData);
  } catch (error) {
    console.error('Error fetching fauna data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/getAllBerita', async (req, res) => {
  try {
    const beritaData = await berita.find();
    res.json(beritaData);
  } catch (error) {
    console.error('Error fetching berita data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Server Check
const PORT = process.env.PORT || 4242;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
