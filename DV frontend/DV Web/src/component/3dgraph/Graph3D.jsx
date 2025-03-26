import axios from "axios";
import React, { useEffect, useState, useMemo, useRef } from "react";
import { useLocation, useParams } from "react-router-dom";
import { API_BASE_URL } from "../../utils/apiConfig";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import * as d3 from "d3";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
// import { OrbitControls, Text } from "@react-three/drei";

const graphTypes = ["Bar", "Line", "Scatter"];

const Graph3D = () => {
    const location = useLocation();
    const { id } = useParams();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const chartData = location.state?.chartData;
    const mountRef = useRef(null);
    const [graphType, setGraphType] = useState("Bar"); // Default graph type
    const [graphConfig, setGraphConfig] = useState(null); // Store API response

    useEffect(() => {
        const fetchGraphData = async () => {
            try {
                setLoading(true);
                const jwt = localStorage.getItem("jwt");
                console.log("id ", id);
                const requestBody = {
                    datasetId: id,
                    graphType: graphType,
                    graphConfig: {
                        xAxis: "X",
                        yAxis: "Y",
                        labels: chartData.labels, // Static or fetched labels
                        values: chartData.datasets[0].data, // Static or fetched values
                        color: "blue",
                        title: "X-Y Axis Data Visualization",
                    },
                };

                console.log("Sending requestBody:", requestBody);
                
                const response = await axios.post(`${API_BASE_URL}/graph/create`,requestBody,{ headers: { Authorization: `Bearer ${jwt}` } });

                console.log("Response received:", response.data);
                setGraphConfig(response.data.graphConfig);
                setLoading(false);
            } catch (error) {
                setError(error);
                console.error("Error fetching graph data:", error);
            }
        };

        fetchGraphData();
    }, [id, graphType]);


    useEffect(() => {
        if (!graphConfig || !mountRef.current) return;

        // Clear previous scene
        while (mountRef.current.firstChild) {
            mountRef.current.removeChild(mountRef.current.firstChild);
        }

        // Extract graph config
        const { labels, values, color, title } = graphConfig;
        console.log("graphConfig",graphConfig)

        // Scene, Camera, Renderer
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0xf0f0f0); // Light grey background

        const width = mountRef.current.clientWidth;
        const height = mountRef.current.clientHeight;

        const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ antialias: true });

        renderer.setSize(width, height);
        mountRef.current.appendChild(renderer.domElement); // Append renderer to DOM

        // Orbit Controls (Enable 360-degree rotation)
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.enableRotate = true;
        controls.autoRotate = true;
        controls.autoRotateSpeed = 1.0; // Adjust speed

        // Position Camera
        camera.position.set(5, 5, 10);
        camera.lookAt(0, 0, 0);

        // Axes Helper
        const axesHelper = new THREE.AxesHelper(5);
        scene.add(axesHelper);

        // D3 Scales
        const xScale = d3.scaleBand().domain(labels).range([-4, 4]).padding(0.2);
        const yScale = d3.scaleLinear().domain([0, d3.max(values)]).range([0, 5]);

        // Create Graph
        if (graphType === "Bar") {
            labels.forEach((label, index) => {
                const barHeight = yScale(values[index]);
                const geometry = new THREE.BoxGeometry(0.5, barHeight, 0.5);
                const material = new THREE.MeshStandardMaterial({ color });
                const bar = new THREE.Mesh(geometry, material);
                bar.position.set(xScale(label), barHeight / 2, 0);
                scene.add(bar);
            });
        } else if (graphType === "Scatter") {
            labels.forEach((label, index) => {
                const geometry = new THREE.SphereGeometry(0.2, 16, 16);
                const material = new THREE.MeshStandardMaterial({ color });
                const point = new THREE.Mesh(geometry, material);
                point.position.set(xScale(label), yScale(values[index]), Math.random() * 2 - 1);
                scene.add(point);
            });
        } else if (graphType === "Line") {
            const points = labels.map((label, index) => new THREE.Vector3(xScale(label), yScale(values[index]), 0));
            const geometry = new THREE.BufferGeometry().setFromPoints(points);
            const material = new THREE.LineBasicMaterial({ color });
            const line = new THREE.Line(geometry, material);
            scene.add(line);
        }

        // Lighting
        const light = new THREE.DirectionalLight(0xffffff, 1);
        light.position.set(5, 5, 5).normalize();
        scene.add(light);

        // Animation Loop
        const animate = () => {
            requestAnimationFrame(animate);
            controls.update();
            renderer.render(scene, camera);
        };
        animate();

        // Cleanup
        return () => {
            if (mountRef.current) {
                mountRef.current.innerHTML = "";
            }
        };
    }, [graphConfig, graphType]);

    if (loading) return <p>Loading 3D Graph...</p>;
    if (error) return <p className="text-red-500">{error}</p>;
    // if (!graphData || !graphData.values.length) return <p>No data available for visualization.</p>;

    return (
        <div className="h-[100vh] flex">
            {/* Sidebar for Graph Selection */}
            <div className="w-1/5 bg-gray-800 text-white p-4">
                <h2 className="text-lg font-semibold mb-4">Select Graph Type</h2>
                <ul>
                    {graphTypes.map((type) => (
                        <li
                            key={type}
                            className={`p-2 cursor-pointer rounded ${graphType === type ? "bg-blue-500" : "hover:bg-gray-700"
                                }`}
                            onClick={() => setGraphType(type)}
                        >
                            {type}
                        </li>
                    ))}
                </ul>
            </div>
            <div ref={mountRef} className="w-[800px] h-[600px] shadow-lg rounded"></div>
        </div>
    );
};

export default Graph3D;
