import axios from "axios";
import * as XLSX from "xlsx";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { API_BASE_URL } from "../../utils/apiConfig";
import {
    Bar, Line, Pie, Doughnut, Bubble, PolarArea, Radar, Scatter
} from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

Chart.register(...registerables);

const Graph2D = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [dataSet, setDataSet] = useState([]);
    const [chartData, setChartData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [chartType, setChartType] = useState("Bar");
    const chartRef = useRef(null);
    const canvasRef = useRef(null);

    useEffect(() => {
        if (chartRef.current && chartRef.current.canvas) {
            canvasRef.current = chartRef.current.canvas;
        }
    }, [chartData, chartType]);

    useEffect(() => {
        const fetchDataset = async () => {
            try {
                const jwt = localStorage.getItem("jwt");
                const response = await axios.get(`${API_BASE_URL}/dataset/${id}`, {
                    headers: { Authorization: `Bearer ${jwt}` },
                });
                setDataSet(response.data);
                console.log("data from graph2d ", response.data.manualData[1]);
                if (response.data.fileURL) {
                    processExcelFile(response.data.fileURL);
                } else {
                    const backgroundColors = generateColors(response.data.manualData[1].Y.length);
                    const borderColors = backgroundColors.map((color) =>
                        color.replace("0.7", "1")
                    );
                    setChartData({
                        labels: response.data.manualData[0].X,
                        datasets: [
                            {
                                label: response.data?.datasetName || "Dataset Graph",
                                data: response.data.manualData[1].Y,
                                backgroundColor: backgroundColors,
                                borderColor: borderColors,
                                borderWidth: 2,
                                pointBackgroundColor: backgroundColors,
                                pointBorderColor: borderColors,
                                pointRadius: 5,
                                pointHoverRadius: 7,
                                tension: 0.4,
                            },
                        ],
                    });
                }
            } catch (err) {
                console.log("err", err)
                setError(err.response?.data?.message || "Error fetching dataset");
            } finally {
                setLoading(false);
            }
        };
        fetchDataset();
    }, [id]);

    const getRandomColor = () => {
        return `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(
            Math.random() * 255
        )}, ${Math.floor(Math.random() * 255)}, 0.7)`;
    };

    const generateColors = (length) => {
        return Array.from({ length }, () => getRandomColor());
    };

    const processExcelFile = async (fileURL) => {
        try {
            const jwt = localStorage.getItem("jwt");
            const response = await axios.get(`${API_BASE_URL}/${fileURL}`, {
                headers: { Authorization: `Bearer ${jwt}` },
                responseType: "arraybuffer",
            });

            const data = new Uint8Array(response.data);
            const workbook = XLSX.read(data, { type: "array" });

            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];
            const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

            if (jsonData.length < 2) {
                setError("Invalid Excel format. Ensure you have X and Y columns.");
                return;
            }

            const xAxis = jsonData.map((row) => row[0]).slice(1);
            const yAxis = jsonData.map((row) => row[1]).slice(1);

            const backgroundColors = generateColors(yAxis.length);
            const borderColors = backgroundColors.map((color) =>
                color.replace("0.7", "1")
            );

            setChartData({
                labels: xAxis,
                datasets: [
                    {
                        label: dataSet?.datasetName || "Dataset Graph",
                        data: yAxis,
                        backgroundColor: backgroundColors,
                        borderColor: borderColors,
                        borderWidth: 2,
                        pointBackgroundColor: backgroundColors,
                        pointBorderColor: borderColors,
                        pointRadius: 5,
                        pointHoverRadius: 7,
                        tension: 0.4, // Smooth line for Line chart
                    },
                ],
            });
        } catch (error) {
            setError("Error processing Excel file.");
        }
    };

    const renderChart = () => {
        switch (chartType) {
            case "Bar":
                return <Bar ref={chartRef} data={chartData} />;
            case "Bubble":
                return <Bubble ref={chartRef} data={{
                    datasets: [{
                        label: "Bubble Chart",
                        data: chartData?.datasets[0]?.data.map((value, index) => ({
                            x: index,
                            y: value,
                            r: Math.random() * 10 + 5
                        })),
                        backgroundColor: chartData?.datasets[0]?.backgroundColor,
                    }]
                }} />;
            case "Doughnut":
                return <Doughnut ref={chartRef} data={chartData} />;
            case "Pie":
                return <Pie ref={chartRef} data={chartData} />;
            case "Line":
                return <Line ref={chartRef} data={chartData} />;
            case "PolarArea":
                return <PolarArea ref={chartRef} data={chartData} />;
            case "Radar":
                return <Radar ref={chartRef} data={chartData} />;
            case "Scatter":
                return <Scatter ref={chartRef} data={{
                    datasets: [{
                        label: "Scatter Chart",
                        data: chartData?.datasets[0]?.data.map((value, index) => ({
                            x: index,
                            y: value
                        })),
                        backgroundColor: chartData?.datasets[0]?.backgroundColor,
                    }]
                }} />;
            case "Mixed":
                return (
                    <Bar ref={chartRef} data={{
                        labels: chartData?.labels,
                        datasets: [
                            {
                                type: "bar",
                                label: "Bar Dataset",
                                data: chartData?.datasets[0]?.data,
                                backgroundColor: "rgba(54, 162, 235, 0.5)",
                                borderColor: "rgba(54, 162, 235, 1)",
                                borderWidth: 2,
                            },
                            {
                                type: "line",
                                label: "Line Dataset",
                                data: chartData?.datasets[0]?.data,
                                borderColor: "rgba(255, 99, 132, 1)",
                                borderWidth: 2,
                                fill: false,
                                pointRadius: 5,
                                tension: 0.4,
                            }
                        ]
                    }} />
                );
            default:
                return <Bar ref={chartRef} data={chartData} />;
        }
    };


    const downloadPDF = async () => {
        if (!canvasRef.current) {
            console.error("Chart reference is null");
            return;
        }

        const canvas = canvasRef.current;

        const canvasImg = await html2canvas(canvas);
        const imgData = canvasImg.toDataURL("image/png");

        const pdf = new jsPDF("landscape");
        pdf.addImage(imgData, "PNG", 10, 10, 250, 150);
        pdf.save("chart.pdf");
    };



    if (loading) return <p>Loading...</p>;
    if (error) return <p className="h-[80vh] text-red-500">Error: {error}</p>;
    console.log("chart data ", chartData);
    return (
        <div>
            <div className="flex h-[100vh]">
                {/* Sidebar for chart selection */}
                <div className="w-[20%] bg-gray-200 p-4">
                    <h3 className="text-lg font-semibold mb-3">Chart Types</h3>
                    <ul className="space-y-2">
                        {[
                            "Bar", "Bubble", "Doughnut", "Pie",
                            "Line", "PolarArea", "Radar", "Scatter", "Mixed"
                        ].map((type) => (
                            <li
                                key={type}
                                className={`p-2 cursor-pointer rounded-lg ${chartType === type ? "bg-blue-500 text-white" : "bg-gray-300"
                                    }`}
                                onClick={() => setChartType(type)}
                            >
                                {type} Chart
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Chart display section */}
                <div className="w-[50%] flex justify-center items-center">
                    <div className="w-[70%]">
                        <h2 className="text-center text-xl font-bold mb-4">
                            {dataSet?.datasetName || "2D Chart"}
                        </h2>
                        {chartData ? renderChart() : <p>Loading chart...</p>}
                    </div>
                </div>
                <div>
                    <button className="px-4 py-2 bg-blue-500 h-[3rem] shadow-lg text-white rounded-lg" onClick={downloadPDF}>
                        Download PDF
                    </button>
                    <button
                        className="px-4 py-2 bg-blue-500 h-[3rem] shadow-lg text-white rounded-lg"
                        onClick={() => navigate(`/3dgraph/${id}`, { state: { chartData, chartType } })}

                    >
                        3D graph
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Graph2D;
