const express = require('express');
const router = express.Router();
const User = require('../models/userSchema'); // Import the User model

router.get('/', (req, res) => {
    res.send('Users route main page');
});


//***************
//SIGNUP FUNCTION
//***************
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


//**************
//LOGIN FUNCTION
//**************
router.post('/login', async (req, res) => {
  console.log('Login route hit');
  console.log(req.body);
  try {
    const { username, password } = req.body;
    console.log('Username: ' + username);
    console.log('Password: ' + password);

    // Find user by username
    const user = await User.findOne({ username: username });

    if (!user) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }

    // Check if password matches
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }

    // Respond with success message and redirect path
    res.status(200).json({ 
      message: 'Login successful',
      redirectPath: '/dashboard'
    });
  } 
  catch (error) {
    // Handle validation errors or other database errors
    res.status(500).json({ 
      message: 'Error logging in', 
      error: error.message 
    });
  }
});

// router.get('/login', (req, res) => {
//     res.send('User log in data here');
// });

module.exports = router;