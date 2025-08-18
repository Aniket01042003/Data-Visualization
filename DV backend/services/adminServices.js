const User = require('../models/User');
const Dataset = require('../models/Dataset');
const Graph = require('../models/Graph');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.adminLogin = async (email, password) => {
    try {
        const admin = await User.findOne({ email, role: 'Admin' });
        if (!admin) throw new Error('Admin not found');

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) throw new Error('Invalid credentials');

        const token = jwt.sign({ id: admin._id, role: admin.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

        return { token, admin: { id: admin._id, email: admin.email, role: admin.role } };
    } catch (error) {
        throw new Error(error.message);
    }
};

exports.getAllUsers = async () => {
    try {
        return await User.find({ role: { $ne: 'Admin' } });
    } catch (error) {
        throw new Error('Failed to fetch users');
    }
};

exports.deleteUser = async (userId) => {
    try {
        const user = await User.findById(userId);
        if (!user) throw new Error('User not found');

        // Step 1: Find all datasets of this user
        const datasets = await Dataset.find({ userId: userId });

        for (let dataset of datasets) {
            // Step 2: Delete related graphs for each dataset
            await Graph.deleteMany({ datasetId: dataset._id });

            // Step 3: Delete dataset file from storage (optional)
            if (dataset.fileURL && dataset.fileURL.startsWith('/uploads/')) {
                try {
                    fs.unlinkSync(`./public${dataset.fileURL}`);
                } catch (err) {
                    console.error(`Failed to delete file: ${dataset.fileURL}`, err);
                }
            }
        }

        // Step 4: Delete datasets
        await Dataset.deleteMany({ userId: userId });

        // Step 5: Delete user
        await User.findByIdAndDelete(userId);

        return { message: 'User and related data deleted successfully' };
    } catch (error) {
        console.error(error);
        throw new Error('Failed to delete user');
    }
};

exports.viewAllDatasets = async () => {
    try {
        const res = await Dataset.find().populate('userId');
        // console.log(res);
        return res;
    } catch (error) {
        // console.log("error",error);
        throw new Error('Failed to fetch datasets');
    }
};

exports.viewAllGraphs = async () => {
    try {
        const res = await Graph.find();
        return res;
    } catch (error) {
        throw new Error('Failed to fetch graphs');
    }
};

exports.deleteDataset = async (datasetId) => {
    try {
        const dataset = await Dataset.findByIdAndDelete(datasetId);
        if (!dataset) throw new Error('Dataset not found');
        return { message: 'Dataset deleted successfully' };
    } catch (error) {
        throw new Error('Failed to delete dataset');
    }
};

exports.deleteGraph = async (graphId) => {
    try {
        const graph = await Graph.findByIdAndDelete(graphId);
        if (!graph) throw new Error('Graph not found');
        return { message: 'Graph deleted successfully' };
    } catch (error) {
        throw new Error('Failed to delete graph');
    }
};

