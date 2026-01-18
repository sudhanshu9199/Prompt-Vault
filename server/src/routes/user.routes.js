const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    console.log('Hello how are you');
    res.send('Hello wordl Hi');
});

module.exports = router;