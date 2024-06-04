const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const surahs = require('./surahs.json'); // Import Surahs data

const app = express();

app.use(bodyParser.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/quranApp', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const UserSchema = new mongoose.Schema({
  name: String,
  rakahs: Number,
  memorizationBank: [{ surah: String, startVerse: Number, endVerse: Number }],
  reviewBank: [{ surah: String, startVerse: Number, endVerse: Number }]
});

const User = mongoose.model('User', UserSchema);

app.post('/createUser', async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.send(user);
});

app.post('/generatePlan', (req, res) => {
  const { rakahs, memorizationBank, reviewBank } = req.body;

  const generatePrayerPlan = (rakahs, memorizationBank, reviewBank) => {
    let plan = [];
    let reviewIndex = 0;
    let memorizationIndex = 0;

    for (let i = 0; i < rakahs; i++) {
      if (i % 3 === 0 && memorizationIndex < memorizationBank.length) {
        plan.push(memorizationBank[memorizationIndex]);
        memorizationIndex++;
      } else if (reviewIndex < reviewBank.length) {
        plan.push(reviewBank[reviewIndex]);
        reviewIndex++;
      } else {
        plan.push(memorizationBank[memorizationIndex]);
        memorizationIndex++;
      }

      if (memorizationIndex >= memorizationBank.length) {
        memorizationIndex = 0;
      }
      if (reviewIndex >= reviewBank.length) {
        reviewIndex = 0;
      }
    }
    return plan;
  };

  const plan = generatePrayerPlan(rakahs, memorizationBank, reviewBank);
  res.send(plan);
});

app.get('/surahs', (req, res) => {
  res.json(surahs);
});

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

app.listen(process.env.PORT || 3000, () => {
  console.log('Server running on port 3000');
});

