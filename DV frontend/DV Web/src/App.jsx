import { Route, Routes } from 'react-router-dom'
import './App.css'
import UserRoutes from './Routes/UserRoutes.'
import AdminRoutes from './Routes/AdminRoutes'
import { ToastContainer } from 'react-toastify'
import { useDispatch } from 'react-redux';
import { setUserAuthenticated } from './Redux/Auth/Action';
import { useEffect } from 'react';
// import DashBoard from '../component/Admin/DashBoard'

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
      const jwt = localStorage.getItem("jwt");
      if (jwt) {
          dispatch(setUserAuthenticated(jwt)); 
      }
  }, [dispatch]);

  return (
    <div>
       <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        <Route path='/*' element={<UserRoutes/>} ></Route>
        <Route path='/admin/*' element={<AdminRoutes/>} ></Route>
      </Routes>
    </div>
  )
}

export default App
