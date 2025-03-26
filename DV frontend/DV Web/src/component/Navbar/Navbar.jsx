import React, { useState } from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Navbar = () => {
  const user = useSelector((store) => store.auth);
  const firstName = user?.user?.name[0];

  const [menuOpen, setMenuOpen] = useState(false); // Manage menu state

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev); // Toggle menu visibility
  };

  const closeMenu = () => {
    setMenuOpen(false); // Close menu when clicking a link
  };

  return (
    <header className="lg:px-16 px-4 bg-white flex flex-wrap items-center py-4 shadow-md mb-[20px]">
      <div className="flex-1 flex justify-between items-center">
        <Link to="/" className="text-l flex justify-center items-center">
          <img className="w-[3rem] h-[3rem]" src="src/assets/logo.png" alt="img" />
          <span className="pl-[8px]">JUST-DV</span>
        </Link>
      </div>

      {/* Mobile menu toggle */}
      <button onClick={toggleMenu} className="cursor-pointer md:hidden block">
        <svg
          className="fill-current text-gray-900"
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 20 20"
        >
          <title>menu</title>
          <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
        </svg>
      </button>

      {/* Menu items */}
      <div className={`${menuOpen ? "block" : "hidden"} md:flex md:items-center md:w-auto w-full`}>
        <nav>
          <ul className="md:flex items-center justify-between text-base text-gray-700 pt-4 md:pt-0">
            <li><Link to="/about" className="md:p-4 py-3 px-0 block" onClick={closeMenu}>About Us</Link></li>
            <li><Link to="/showdataset" className="md:p-4 py-3 px-0 block" onClick={closeMenu}>All files</Link></li>
            <li><Link to="/contact" className="md:p-4 py-3 px-0 block" onClick={closeMenu}>Contact Us</Link></li>
            <li><Link to="/register" className="md:p-4 py-3 px-0 block md:mb-0 mb-2" onClick={closeMenu}>Register</Link></li>
            <li><Link to="/admin-login" className="md:p-4 py-3 px-0 block md:mb-0 mb-2" onClick={closeMenu}>Admin</Link></li>
            {firstName ? (
              <Link to="/profile" className="md:p-4 py-3 px-0 block md:mb-0 mb-2" onClick={closeMenu}>
                <div className="flex justify-center items-center text-white bg-purple-500 rounded-2xl w-[2rem] h-[2rem]">
                  {firstName}
                </div>
              </Link>
            ) : (
              <Link to="/login" className="md:p-4 py-3 px-0 block md:mb-0 mb-2" onClick={closeMenu}>Login</Link>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
