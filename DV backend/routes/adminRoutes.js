const express = require('express');
const router = express.Router();
const AdminController = require('../controllers/adminController');
const { isAdmin } = require('../middlewares/authmiddleware');

// Admin Login
router.post('/login', AdminController.adminLogin);

// User Management
router.get('/users', isAdmin, AdminController.getAllUsers);
router.delete('/user/:id', isAdmin, AdminController.deleteUser);

// Dataset Management
router.get('/datasets', isAdmin, AdminController.viewAllDatasets);
router.delete('/datasets/:id', isAdmin, AdminController.deleteDataset);

// Graph Management
router.get('/graphs', isAdmin, AdminController.viewAllGraphs);
router.delete('/graphs/:id', isAdmin, AdminController.deleteGraph);

module.exports = router;
