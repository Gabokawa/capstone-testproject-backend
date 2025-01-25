const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
// const uri = process.env.MONGODB_URI;
// console.log('MONGODB URI: ' + uri);
// mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// const connection = mongoose.connection;
// connection.once('open', () => {
//     console.log('MongoDB database connection established successfully');
// });

// Routes
app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/shops', (req, res) => {
    res.send('Shop data here');
});


// Import routes
const usersRouter = require('./routes/users');
const shopsRouter = require('./routes/shops');

// Use routes
app.use('/users', usersRouter);
app.use('/shops', shopsRouter);


// Start server
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});