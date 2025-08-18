const express = require('express');
const { uploadDataset, getDataset, addDatasetManually, getAllDatasets, deleteDataset } = require('../controllers/datasetController');
const { verifyToken } = require('../middlewares/authmiddleware');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const router = express.Router();

router.post('/upload', verifyToken, upload.single('file'), uploadDataset);
router.post('/manual', verifyToken, addDatasetManually);
router.get('/all', verifyToken, getAllDatasets);
router.delete('/:id', verifyToken, deleteDataset);
router.get('/:id', verifyToken, getDataset);

module.exports = router;