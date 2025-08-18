const Graph = require('../models/Graph');

exports.createGraph = async (graphData) => {
    try {
        if (!graphData || Object.keys(graphData).length === 0) {
            throw new Error('Graph data is required');
        }

        const graph = new Graph(graphData);
        const savedGraph = await graph.save();
        return savedGraph;
    } catch (error) {
        // console.error('Error creating graph:', error.message);
        throw new Error('Failed to create graph');
    }
};

exports.getGraphById = async (graphId) => {
    try {
        if (!graphId) {
            throw new Error('Graph ID is required');
        }

        const graph = await Graph.findById(graphId);
        if (!graph) {
            throw new Error('Graph not found');
        }

        return graph;
    } catch (error) {
        // console.error('Error fetching graph:', error.message);
        throw new Error('Failed to fetch graph');
    }
};
