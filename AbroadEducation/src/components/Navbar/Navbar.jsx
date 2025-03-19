import React from 'react';
import logo from '../../assets/logo.png';
import { FaUserPlus, FaSignInAlt, } from "react-icons/fa";
import { RiLogoutCircleLine } from "react-icons/ri";
import { IoMdPeople } from "react-icons/io";
import { MdOutlinePostAdd } from "react-icons/md";
// import { GrServices } from "react-icons/gr";
import { MdConnectWithoutContact } from "react-icons/md";
import { FaHome } from "react-icons/fa";
import './nav.css';
import { useNavigate } from 'react-router-dom';
import { FaUser } from "react-icons/fa";
import { jwtDecode } from "jwt-decode";



const Navbar = () => {
    
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    let isAdminLoggedIn = null;

    if (token) {
        try {
            const decodedToken = jwtDecode(token);
            if (decodedToken && decodedToken.role === "admin") {
                isAdminLoggedIn = decodedToken;
            }
        } catch (error) {
            console.error('Error decoding token:', error);
        }

    }

    console.log(isAdminLoggedIn);
    const handleLogout = () => {
        try {
            // Clear all auth-related data
            localStorage.clear(); // This will remove all localStorage items
            // Or if you prefer to remove specific items:
            localStorage.removeItem('token');
            localStorage.removeItem('userId');

            // Force reload the application to reset all states
            window.location.href = '/login';
        } catch (error) {
            console.error('Logout error:', error);
            navigate('/login');
        }
    };

   
    return (
        <>
            {/* Desktop Navbar */}
            <div className="h-18">
                <div className="hidden md:flex justify-between items-center p-4 text-white animate-fadeIn">
                    {/* Logo Section */}
                    <div id="logo" className="h-auto hover:scale-105 transition-transform duration-300">
                        <a href="/">
                            <h2 className='text-white text-xl w-full hover:text-gray-300 transition-colors duration-300'>Abroad Education</h2>
                            {/* <img src={logo} alt="logo" className="w-full h-auto" /> */}
                        </a>
                    </div>

                    {/* Navigation Items */}
                    <div
                        id="nav-items"
                        className="flex justify-around items-center w-1/2 bg-black/10 backdrop-blur-md p-2 rounded-full text-white shadow-lg border border-white/20 animate-slideInFromTop"
                    >
                        <a href="/blog" className="flip-up hover:scale-110 transition-transform duration-300">Blog</a>
                        <a href="/about" className="flip-up hover:scale-110 transition-transform duration-300">About</a>
                        {/* <a href="/services" className="flip-up hover:scale-110 transition-transform duration-300">Services</a> */}
                        <a href="/contact" className="flip-up hover:scale-110 transition-transform duration-300">Contact Us</a>
                        {isAdminLoggedIn && isAdminLoggedIn.role === "admin" ? (
                            <a href="/adminpost" className="flip-up hover:scale-110 transition-transform duration-300">Admin</a>
                        ) : null}


                    </div>


                    {/* Authentication Links */}
                    <div
                        id="auth-items"
                        className="flex justify-around items-center w-[200px] bg-black/10 backdrop-blur-md p-2 rounded-full text-white shadow-lg border border-white/20 animate-slideInFromRight"
                    >
                        {!token && (
                            <>
                                {/* Text for large screens */}
                                <a href="/register" className="flip-up hidden md:inline hover:scale-110 transition-transform duration-300">SignUp</a>
                                <a href="/register" className="hidden md:inline hover:scale-110 transition-transform duration-300">
                                    <FaUserPlus size={20} />
                                </a>
                            </>
                        )}




                        {!token ? (
                            <>
                                <a href="/login" className="flip-up hidden md:inline hover:scale-110 transition-transform duration-300">Login</a>
                                <a href="/login" className="hidden md:inline hover:scale-110 transition-transform duration-300">
                                    <RiLogoutCircleLine size={20} />
                                </a>
                            </>
                        ) : (
                            <>
                                <a href="/login" onClick={handleLogout} className="flip-up hidden md:inline hover:scale-110 transition-transform duration-300">Logout</a>
                                {/* <a href="/login" onClick={handleLogout} className="hidden md:inline hover:scale-110 transition-transform duration-300">
                                    <FaSignInAlt size={20} />

                                </a> */}
                            </>
                        )}

                    </div>


                </div>


                {/* Mobile Navbar - Only Icons */}
                <div
                    id="mobile-nav"
                    className="fixed top-3 right-3 w-[25%] max-w-[300px] flex justify-around items-center z-10
                    bg-black/30 backdrop-blur-lg p-2 rounded-full text-white shadow-xl border border-white/20 md:hidden animate-slideInFromTop pl-2"
                >

                    <a href="/" className="flip-up hover:scale-110 transition-transform duration-300">
                        <FaHome size={20} />
                    </a>

                    {/* Only Icons on Small Screens */}
                    {!token && (
                        <a href="/register" className="flip-up hover:scale-110 transition-transform duration-300">
                            <FaUserPlus size={20} />
                        </a>
                    )}



                    {!token ? (
                        <>
                            <a href="/login" className="flip-up hover:scale-110 transition-transform duration-300">
                                <RiLogoutCircleLine size={20} />
                            </a>
                        </>
                    ) : (
                        <a href="/login" onClick={handleLogout} className="flip-up hover:scale-110 transition-transform duration-300">
                            <FaSignInAlt size={20} />
                        </a>
                    )}


                </div>





                {/* Mobile Bottom Navbar */}
                <div
                    id="mobile-nav"
                    className="fixed bottom-3 left-1/2 transform -translate-x-1/2 w-[90%] max-w-[400px] flex justify-around items-center 
                    bg-black/30 backdrop-blur-lg p-2 rounded-full text-white shadow-xl border border-white/20 md:hidden animate-slideInFromBottom z-10"
                >

                    <a href="/blog" className="flip-up hover:scale-110 transition-transform duration-300 ">
                        <MdOutlinePostAdd size={20} className="ml-2" />Blog
                    </a>
                    <a href="/about" className="flip-up hover:scale-110 transition-transform duration-300">
                        <IoMdPeople size={20} className="ml-3" />About

                    </a>
                    {/* <a href="/services" className="flip-up hover:scale-110 transition-transform duration-300">
                        <GrServices size={20} className='ml-3' />Services
                    </a> */}
                    <a href="/contact" className="flip-up hover:scale-110 transition-transform duration-300">
                        <MdConnectWithoutContact size={20} className="ml-3" />Contact

                    </a>
                    {isAdminLoggedIn && isAdminLoggedIn.role === "admin" ? (
                        <a href="/adminpost" className="flip-up hover:scale-110 transition-transform duration-300">
                            <FaUser size={15} className="ml-3" />Admin
                        </a>
                    ) : null}

                </div>


                <div id="logo" className="z-20 left-3 right-3 p-2 mt-4 md:hidden animate-fadeIn">
                    <a href="/">
                        <h2 className='text-white text-xl hover:text-gray-300 transition-colors duration-300'>Abroad Education</h2>
                        {/* <img src={logo} alt="logo" className="w-full h-auto" /> */}
                    </a>
                </div>
            </div>
        </>
    );
};

export default Navbar;