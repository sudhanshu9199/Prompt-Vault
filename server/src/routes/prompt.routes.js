const express = require('express');
const authMiddleware = require('../middlewares/auth.middleware');

const router = express.Router();
router.use(authMiddleware);
router.get('/', (req ,res) => {});
router.post('/', (req, res) => {});
router.delete('/', (req, res) => {});

module.exports = router;