const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Event = require('../models/Event');
const cors = require('cors');
const app = express();
const authenticate = require('../middlewares/auth');
app.use(bodyParser.json());
app.use(cors());

// MongoDB Connection
mongoose.connect('mongodb+srv://Arbaj19:Arbajkhan@cluster0.kezlp3u.mongodb.net/');


app.post('/api/users/register', async (req, res) => {
    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const user = new User({
        email: req.body.email,
        password: hashedPassword
      });
      const result = await user.save();
      const token = jwt.sign({ userId: user._id, email: user.email }, 'Arbajkhan', { expiresIn: "1h" });
      res.status(201).json({ message: 'User Registered succesfully', token: token });
    } catch (error) {
      res.status(500).json({ error: error });
    }
  });




  app.post('/api/users/login', async (req, res) => {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        return res.status(401).json({ message: 'Email not Registered' });
      }
      const match = await bcrypt.compare(req.body.password, user.password);
      if (match) {
        const token = jwt.sign({ userId: user._id, email: user.email }, 'Arbajkhan', { expiresIn: "1h" });
        return res.status(200).json({ message: 'Auth successful', token: token });
      }
      res.status(401).json({ message: 'Auth failed' });
    } catch (error) {
      res.status(500).json({ error: error });
    }
  });

  


  app.post('/api/events', authenticate, async (req, res) => {
    const event = new Event({
      title: req.body.title,
      description: req.body.description,
      date: req.body.date,
      time: req.body.time,
      location: req.body.location,
      organizer: req.body.organizer,
      attendees: []
    });
    try {
      const result = await event.save();
      res.status(201).json({ message: 'Event created', eventId: result._id });
    } catch (error) {
      res.status(500).json({ error: error });
    }
  });

  
  app.get('/api/events', async (req, res) => {
    try {
      const events = await Event.find();
      res.status(200).json(events);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  });

  
  app.get('/api/events/:id', async (req, res) => {
    try {
      const event = await Event.findById(req.params.id);
      if (event) {
        res.status(200).json(event);
      } else {
        res.status(404).json({ message: 'Event not found' });
      }
    } catch (error) {
      res.status(500).json({ error: error });
    }
  });

  
  app.put('/api/events/:id', authenticate, async (req, res) => {
    try {
      const event = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.status(200).json(event);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  });

  
  app.delete('/api/events/:id', authenticate, async (req, res) => {
    try {
      await Event.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: 'Event deleted' });
    } catch (error) {
      console.error("Error deleting event:", error);
      res.status(500).json({ error: 'An error occurred while deleting the event' });
    }
  });
  

  
  app.post('/api/events/:id/register', authenticate, async (req, res) => {
    try {
      const event = await Event.findById(req.params.id);
      if (event) {
        if (!event.attendees.includes(req.userData.userId)) {
          event.attendees.push(req.userData.userId);
          await event.save();
          res.status(200).json({ message: 'Registered successfully' });
        } else {
          res.status(400).json({ message: 'Already registered' });
        }
      } else {
        res.status(404).json({ message: 'Event not found' });
      }
    } catch (error) {
      res.status(500).json({ error: error });
    }
  });
  
  

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
