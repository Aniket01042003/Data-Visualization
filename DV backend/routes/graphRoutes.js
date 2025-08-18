const express = require('express');
const { createGraph, getGraph } = require('../controllers/graphController');
const { verifyToken } = require('../middlewares/authmiddleware');

const router = express.Router();

router.post('/create', verifyToken, createGraph);
router.get('/:id', verifyToken, getGraph);

module.exports = router;