const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

const port = 4000;
const app = express();

app.use(express.static(path.join(__dirname, 'build'))); // Serve static files from the 'build' directory
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors()); // Allow cross-origin requests

mongoose.connect('mongodb://127.0.0.1:27017/students', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.once('open', () => {
  console.log('MongoDB connection successful');
});

const userSchema = new mongoose.Schema({
  name: String,
  id: String,
  email: String,
  location: String
});

const User = mongoose.model('User', userSchema);

app.post('/post', async (req, res) => {
  const { name, id, email } = req.body;
  const user = new User({ name, id, email, location });
  try {
    await user.save();
    res.send('Form Submitted Successfully');
  } catch (error) {
    res.status(500).send('Error submitting form');
  }
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
