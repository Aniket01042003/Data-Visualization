const DatasetService = require('../services/datasetService');

exports.uploadDataset = async (req, res) => {
    try {
        // console.log("user",req.user.id)
        const dataset = await DatasetService.uploadDataset(req.file, req.user.id);
        res.status(201).json({ message: 'Dataset uploaded successfully', dataset });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.addDatasetManually = async (req, res) => {
    try {
        const dataset = await DatasetService.addDatasetManually(req.body, req.user.id);
        res.status(201).json({ message: 'Dataset added successfully', dataset });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getDataset = async (req, res) => {
    try {
        const dataset = await DatasetService.getDatasetById(req.params.id);
        res.status(200).json(dataset);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

exports.getAllDatasets = async (req, res) => {
    try {
        // console.log("userId gad",req.user.id)
        const datasets = await DatasetService.getAllDatasets(req.user.id);
        res.status(200).json(datasets);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteDataset = async (req, res) => {
    try {
        // console.log(req.params)
        const result = await DatasetService.deleteDataset(req.params.id, req.user.id);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
