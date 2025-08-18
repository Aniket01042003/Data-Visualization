import React from 'react';
import { Router, Route, Routes } from 'react-router-dom';
import Login from '../component/LoginReg/Login';
import Home from '../pages/Home';
import Navbar from '../component/Navbar/Navbar';
import Register from '../component/LoginReg/Register';
import ContactUs from '../component/Contact/ContactUs';
import About from '../aboutUs/About';
import Footer from '../footer/footer.js';
import Profile from '../component/profile/profile';
import ShowDataset from '../component/UploadData/ShowDataset';
import Graph2D from '../component/2dchart/Graph2D';
import Graph3D from '../component/3dgraph/Graph3D';
import AdminLoginForm from '../component/LoginReg/AdminLoginForm';

const UserRoutes = () => {
    return (
        <div>
            <div>
                <Navbar/>
            </div>
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/login" element={<Login/>} />
                <Route path="/admin-login" element={<AdminLoginForm/>} />
                <Route path="/register" element={<Register/>} />
                <Route path="/contact" element={<ContactUs/>} />
                <Route path="/about" element={<About/>} />
                <Route path="/profile" element={<Profile/>} />
                <Route path="/showdataset" element={<ShowDataset/>} />
                <Route path="/2dchart/:id" element={<Graph2D/>} />
                <Route path="/3dgraph/:id" element={<Graph3D/>} />
            </Routes>
            <div>
                <Footer/>
            </div>
        </div >
    );
};


export default UserRoutes;
