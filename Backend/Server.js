const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require("dotenv").config();
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());
const dburi = process.env.dbURI;
mongoose.connect(dburi, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB database');
});


const userSchema = new mongoose.Schema({
  admin: String,
  password: String
});
const User = mongoose.model('User', userSchema);

const ResourcesSchema = new mongoose.Schema({
  title: String,
  description: String,
  imageUrl: String,
  videoUrl: String, 
});
const Resources = mongoose.model('Resources', ResourcesSchema);

const uploadSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  link: { type: String, default: '' }
});

const upload = mongoose.model('Uploads', uploadSchema);

app.get("/", async (req, res) => {
  res.json({ message: "API's are working!" });
})

app.post('/api/register', async (req, res) => {
  const { admin, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      admin,
      password: hashedPassword
    });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/api/login', async (req, res) => {
  const { admin, password } = req.body;

  try {
    const user = await User.findOne({ admin });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isPasswordValid = bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/api/upload', async (req, res) => {
  try {
    const { title, description, imageUrl, videoUrl } = req.body;
    const resources = new Resources({
      title,
      description,
      imageUrl,
      videoUrl
    });

    await resources.save();
    res.status(201).send('Resources uploaded successfully.');
  } catch (error) {
    console.error('Error uploading Resources:', error);
    res.status(500).send('Internal server error.');
  }
});

app.get('/api/resources', async (req, res) => {
  try {
    const resources = await Resources.find();
    res.json(resources);
  } catch (error) {
    console.error('Error fetching resources:', error);
    res.status(500).send('Internal server error.');
  }
});

app.post('/api/updates', async (req, res) => {
  try {
    const { title, description, imageUrl } = req.body;
    console.log(title,description,imageUrl)

    const newUpload = new upload({
      title,
      description,
      imageUrl,
      link: req.body.link || '' 
    });

    await newUpload.save();
    res.status(201).json({ message: 'Upload successful' });
  } catch (error) {
    console.error('Error uploading:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

app.get('/api/newupdates', async (req, res) => {
  try {
    const updates = await upload.find();
    res.json(updates);
  } catch (error) {
    console.error('Error fetching updates:', error);
    res.status(500).send('Internal server error.');
  }
});


app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});