import React from 'react';
import { Router, Route, Routes } from 'react-router-dom';
import DashBoard from '../component/Admin/DashBoard';
import Profile from '../component/profile/profile';

const UserRoutes = () => {
    return (
        <div>
            <Routes>
                <Route path="/" element={<DashBoard/>} />
                <Route path="/profile" element={<Profile/>} />
            </Routes>
        </div >
    );
};

export default UserRoutes;