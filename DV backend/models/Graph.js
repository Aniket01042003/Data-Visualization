const mongoose = require('mongoose');

const graphSchema = new mongoose.Schema({

    datasetId: { type: mongoose.Schema.Types.ObjectId, ref: 'Dataset', required: true },

    graphType: { type: String, required: true, enum: ['Bar', 'Line', 'Pie', 'Scatter', '3D'] },

    graphConfig: { type: Object },
    
}, { timestamps: true });

module.exports = mongoose.model('Graph', graphSchema);