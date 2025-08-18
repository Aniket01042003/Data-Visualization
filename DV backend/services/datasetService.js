const Dataset = require('../models/Dataset');
const fs = require('fs');
const path = require('path');

exports.uploadDataset = async (file,userId) => {
    try {
        if (!file) {
            throw new Error('File is required for upload');
        }

        const dataset = new Dataset({
            userId,
            datasetName: file.originalname,
            fileURL: file.path, 
            manualData: [], 
        });

        const savedDataset = await dataset.save();
        return savedDataset;
    } catch (error) {
        // console.error('Error uploading dataset:', error.message);
        throw new Error('Failed to upload dataset');
    }
};

exports.addDatasetManually = async (data, userId) => {
    try {
        if (!data.name || !data.description || !data.manualData || !Array.isArray(data.manualData)) {
            throw new Error('name, description, and manualData (array) are required');
        }

        const dataset = new Dataset({
            userId,
            datasetName: data.name,
            manualData: data.manualData, // Store structured data
            fileURL: null, // Since no file is uploaded
        });

        const savedDataset = await dataset.save();
        return savedDataset;
    } catch (error) {
        // console.error('Error adding dataset manually:', error.message);
        throw new Error('Failed to add dataset manually');
    }
};

exports.getDatasetById = async (datasetId) => {
    try {
        const dataset = await Dataset.findById(datasetId);
        if (!dataset) {
            throw new Error('Dataset not found');
        }
        return dataset;
    } catch (error) {
        // console.error('Error fetching dataset:', error.message);
        throw new Error('Failed to fetch dataset');
    }
};

exports.getAllDatasets = async (userId) => {
    try {
        // console.log("userId gad",userId)
        const datasets = await Dataset.find({ userId });

        if (!datasets || datasets.length === 0) {
            throw new Error('No datasets found for this user');
        }

        return datasets;
    } catch (error) {
        // console.error('Error fetching all datasets:', error.message);
        throw new Error('Failed to fetch datasets');
    }
};

exports.deleteDataset = async (datasetId, userId) => {
    try {
        const dataset = await Dataset.findOne({ _id: datasetId, userId });

        if (!dataset) {
            throw new Error('Dataset not found or unauthorized');
        }

        if (dataset.fileURL) {
            const filePath = path.join(__dirname, '..', dataset.fileURL);
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }
        }

        await Dataset.deleteOne({ _id: datasetId });
        return { message: 'Dataset deleted successfully' };
    } catch (error) {
        // console.error('Error deleting dataset:', error.message);
        throw new Error('Failed to delete dataset');
    }
};
