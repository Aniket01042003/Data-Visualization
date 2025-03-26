import * as React from "react";
import { FixedSizeList as List } from "react-window";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { deleteDataset, deleteGraph } from "../../../Redux/Admin/Action";

export default function DataSetList({ filesData, index, setActiveItem }) {
  const dispatch = useDispatch();

  // Determine if it's chart or graph data
  const isChartData = index === 0;

  // Handle Delete
  const handleDelete = (fileId) => {
    if (window.confirm("Are you sure you want to delete this file?")) {
      if (isChartData) {
        dispatch(deleteDataset(fileId));  // Delete dataset
      } else {
        dispatch(deleteGraph(fileId));  // Delete graph
      }
    }
  };

  // Function to render each row
  const renderRow = ({ index, style }) => {
    const file = filesData[index];

    return (
      <div key={file._id} style={style} className="border-b p-3 bg-white flex justify-between items-center">
        <div>
          {isChartData ? (
            <div className="flex items-center gap-10">
              <p className="text-gray-700 font-semibold">{file.datasetName}</p>
              <p className="text-gray-500 text-sm">ID: {file._id}</p>
            </div>
          ) : (
            <div className="flex items-center gap-10">
              <p className="text-gray-700 font-semibold">Graph Type: {file.graphType}</p>
              <p className="text-gray-500 text-sm">ID: {file._id}</p>
            </div>
          )}
        </div>
        <div className="flex items-center gap-5">
          <button
            className="bg-[#26c6da] text-white px-3 py-1 rounded"
            onClick={() => setActiveItem({ type: isChartData ? "ChartData" : "GraphData", data: file })}
          >
            Show
          </button>
          <RiDeleteBin6Line
            className="w-[1.4rem] text-[#e53935] h-[1.4rem] cursor-pointer"
            onClick={() => handleDelete(file._id)} // Pass correct ID
          />
        </div>
      </div>
    );
  };

  return (
    <div className="w-[90%] mx-auto bg-gray-50 shadow-lg rounded-lg">
      <div
        style={{ background: isChartData ? 'linear-gradient(60deg, rgb(102, 187, 106), rgb(67, 160, 71))' : 'linear-gradient(60deg, #ffa726, #fb8c00)' }} 
        className="p-4 text-white font-bold text-lg text-center"
      >
        {isChartData ? "Chart Data" : "Graph Data"}
        <div>Total Files: {filesData.length}</div>
      </div>
      <div className="w-full">
        <List height={550} itemSize={60} itemCount={filesData.length} width="100%">
          {renderRow}
        </List>
      </div>
    </div>
  );
}
