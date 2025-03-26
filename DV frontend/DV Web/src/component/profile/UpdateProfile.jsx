import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateUser } from "../../Redux/Auth/Action";
import { toast } from "react-toastify";

const UpdateProfile = ({ user, jwt, onClose }) => {
  const dispatch = useDispatch();
  const [updatedUser, setUpdatedUser] = useState({
    name: user?.name || "",
    email: user?.email || "",
  });

  const handleChange = (e) => {
    setUpdatedUser({ ...updatedUser, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!updatedUser.name || !updatedUser.email) {
      toast.error("Name and Email cannot be empty.");
      return;
    }
  
    try {
      const result = await dispatch(updateUser(user._id, updatedUser, jwt));
      console.log("update error ",jwt)
      if (result.success) {
        toast.success("Profile updated successfully!");
        onClose(); 
      } else {
        toast.error(result.error || "Failed to update profile.");
      }
    } catch (error) {
      toast.error("An unexpected error occurred. Please try again.");
    }
  };
  

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] md:w-1/3">
        <h2 className="text-2xl font-semibold text-center mb-4">Update Profile</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium">Name</label>
            <input
              type="text"
              name="name"
              value={updatedUser.name}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-indigo-300"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={updatedUser.email}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-indigo-300"
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfile;
