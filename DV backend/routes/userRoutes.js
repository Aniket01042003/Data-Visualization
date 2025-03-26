const express = require('express');

const { getUserProfile, updateUser } = require('../controllers/userController');
const { verifyToken } = require('../middlewares/authmiddleware');

const router = express.Router();

router.get('/profile', verifyToken, getUserProfile);
router.put('/update', verifyToken, updateUser);

module.exports = router;
