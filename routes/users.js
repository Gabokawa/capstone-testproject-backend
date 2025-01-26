const express = require('express');
const router = express.Router();
const User = require('../models/userSchema'); // Import the User model

router.get('/', (req, res) => {
    res.send('Users route main page');
});


router.post('/signup', async (req, res) => {
    try {
      const { username, password, email } = req.body;
  
      // Check if user already exists
      const existingUser = await User.findOne({ 
        $or: [
          { username: username },
          { email: email }
        ]
      });
  
      if (existingUser) {
        return res.status(400).json({ 
          message: existingUser.username === username 
            ? 'Username already exists' 
            : 'Email already exists' 
        });
      }
  
      // Create new user
      const newUser = new User({
        username,
        password,
        email
      });
  
      // Save user to database
      const savedUser = await newUser.save();
  
      // Respond with success message
      res.status(201).json({ 
        message: 'User created successfully',
        userId: savedUser._id
      });
    } 
    catch (error) {
      // Handle validation errors or other database errors
      res.status(500).json({ 
        message: 'Error creating user', 
        error: error.message 
      });
    }
});

router.get('/login', (req, res) => {
    res.send('User log in data here');
});

module.exports = router;