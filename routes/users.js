const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Users route main page');
});


router.get('/signup', (req, res) => {
    res.send('User sign up data here');
});

router.get('/login', (req, res) => {
    res.send('User log in data here');
});

module.exports = router;
// WALA PANIY SULOD HAHAHAHAHAHA