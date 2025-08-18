const GraphService = require('../services/graphService');

exports.createGraph = async (req, res) => {
    try {
        // console.log("req",req.body);
        const graph = await GraphService.createGraph(req.body);
        res.status(201).json(graph);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getGraph = async (req, res) => {
    try {
        const graph = await GraphService.getGraphById(req.params.id);
        res.status(200).json(graph);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};