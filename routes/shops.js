const express = require('express');

const router = express.Router();

// Example route to get all shops
router.get('/', (req, res) => {
    res.send('Shop main page');
});

// Example route to get a specific shop by ID
router.get('/:id', (req, res) => {
    const shopId = req.params.id;
    res.send(`Get shop with ID: ${shopId}`);
});

// Example route to update a shop by ID
router.put('/:id', (req, res) => {
    const shopId = req.params.id;
    const updatedShop = req.body;
    res.send(`Update shop with ID: ${shopId}`);
});

module.exports = router;