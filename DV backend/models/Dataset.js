const mongoose = require('mongoose');

const datasetSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User ', required: true },

    datasetName: { type: String, required: true },

    fileURL: { type: String },

    manualData: { type: Array },
    
}, { timestamps: true });

module.exports = mongoose.model('Dataset', datasetSchema);