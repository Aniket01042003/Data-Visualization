const AdminService = require('../services/adminServices');

exports.adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const result = await AdminService.adminLogin(email, password);
        // console.log("result ", result)
        res.status(200).json(result);
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
};

exports.getAllUsers = async (req, res) => {
    try {
        const users = await AdminService.getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        await AdminService.deleteUser(req.params.id);
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.viewAllDatasets = async (req, res) => {
    try {
        const datasets = await AdminService.viewAllDatasets();
        res.status(200).json(datasets);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.viewAllGraphs = async (req, res) => {
    try {
        const graphs = await AdminService.viewAllGraphs();
        res.status(200).json(graphs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteDataset = async (req, res) => {
    try {
        const result = await AdminService.deleteDataset(req.params.id);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteGraph = async (req, res) => {
    try {
        const result = await AdminService.deleteGraph(req.params.id);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
