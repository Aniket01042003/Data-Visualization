import { useEffect, useRef, useState } from "react";
import { VariableSizeList as List } from "react-window";
import { FaChevronDown } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import {  fetchUsers, deleteDataset, deleteGraph } from "../../../Redux/Admin/Action";

export default function UserProfileList({ filesData,setActiveItem }) {
  const [expandedUser, setExpandedUser] = useState(null);
  const [files, setFiles] = useState(filesData); // State for files
  const listRef = useRef(null);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const userData = useSelector((store) => store.users);
  const users = userData.users; 

  // Function to toggle dropdown
  const toggleDropdown = (id) => {
    setExpandedUser(expandedUser === id ? null : id);
    listRef.current?.resetAfterIndex(0); // Reset list heights when expanding
  };

  // Function to delete a file
  const handleDelete = (fileId) => {
    if (window.confirm("Are you sure you want to delete this file?")) {
      const fileToDelete = files.find((file) => file._id === fileId);
      console.log("fileToDelete", fileToDelete);

      if (fileToDelete) {
        if (fileToDelete) {
          dispatch(deleteDataset(fileId)); // Delete dataset
        } 

        // Remove from UI
        setFiles(files.filter((file) => file._id !== fileId));
      }
    }
  };

  // Function to return dynamic row height
  const getItemSize = (index) => {
    const user = users[index];
    const isExpanded = expandedUser === user._id;
    const baseHeight = 60; // Default row height
    return isExpanded ? baseHeight + files.filter(file => file.userId === user._id).length * 40 + 20 : baseHeight;
  };

  // Render each row
  const renderRow = ({ index, style }) => {
    const user = users[index];
    const isExpanded = expandedUser === user._id;
    const userFiles = files.filter(file => file.userId === user._id);

    return (
      <div key={user._id} style={style} className="border-b p-3 bg-white">
        {/* Main row */}
        <div className="flex justify-between items-center">
          <div className="w-1/3">{user.name}</div>
          <div className="w-1/3">{user.email}</div>
          <button
            className="bg-[#26c6da] text-white px-3 py-1 rounded flex items-center"
            onClick={() => toggleDropdown(user._id)}
          >
            Files <FaChevronDown className="ml-1" />
          </button>
        </div>

        {/* Expanded File List */}
        {isExpanded && (
          <div className="mt-2 bg-gray-100 p-2 rounded">
            {userFiles.length > 0 ? (
              userFiles.map((file) => (
                <div key={file._id} className="flex justify-between p-2 border-b">
                  <span>{file.datasetName}</span>
                  <span>{file._id}</span>
                  <div className="flex items-center gap-5">
                    <button className="bg-[#ffa726] text-white px-2 py-1 rounded"
                    onClick={() => setActiveItem({ type: "ChartData", data: file })}>
                      Show
                    </button>
                    <RiDeleteBin6Line
                      className="w-[1.4rem] text-[#e53935] h-[1.4rem] cursor-pointer"
                      onClick={() => handleDelete(file._id)}
                    />
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-sm p-2">No files available</p>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="w-[90%] mx-auto bg-gray-50 shadow-lg rounded-lg">
      <div style={{ background: 'linear-gradient(60deg, #ab47bc, #8e24aa)' }} className="p-4 text-white shadow-xl mb-10 font-bold text-lg text-center">
        User Profile List
      </div>
      <div className="w-[100%]">
        <List
          ref={listRef}
          height={600}
          itemSize={getItemSize}
          itemCount={users.length}
          width="100%"
        >
          {renderRow}
        </List>
      </div>
    </div>
  );
}
