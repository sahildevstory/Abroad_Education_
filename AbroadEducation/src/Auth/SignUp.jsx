import React, { useState } from 'react'

import { motion } from 'framer-motion'
import Lottie from 'lottie-react'
import signup from '../assets/signup.json'
// import { FaPrayingHands } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const SignUp = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        // confirmPassword: ''
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const validateForm = () => {
        const newErrors = {};


        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            newErrors.email = 'Invalid email address';
        }

        const phoneRegex = /^\d{10}$/;
        if (!phoneRegex.test(formData.phone)) {
            newErrors.phone = 'Phone number must be 10 digits';
        }

        if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }

        // if (formData.password !== formData.confirmPassword) {
        //     newErrors.confirmPassword = "Passwords don't match";
        // }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [id]: value
        }));
        if (errors[id]) {
            setErrors(prev => ({
                ...prev,
                [id]: ''
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/register`, {
                name: formData.name.trim(),
                email: formData.email.trim(),
                phone: formData.phone,
                password: formData.password,
                // confirmPassword: formData.confirmPassword
            });

            // If we get here, the request was successful
            alert('Registration successful!');
            navigate('/login');  // Navigate to login page after successful registration


        } catch (error) {
            console.error('Error:', error);
            alert(error.response?.data?.message || error.message || 'An error occurred during registration. Please try again.');
        }
    };
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2 }
        }
    }

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.5 }
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-indigo-900">
            <motion.div className='flex flex-col lg:flex-row justify-center items-center p-4 md:p-20 gap-20'>
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                    className='w-full lg:w-1/2 mx-auto backdrop-blur-md bg-white/10 rounded-xl shadow-lg p-6'
                >
                    <motion.div variants={itemVariants} className='text-center flex justify-center items-center gap-4'>
                        {/* <FaPrayingHands size={50} className='text-white' /> */}
                        <h1 className='text-3xl md:text-5xl font-bold text-blue-300 mb-4'>Please register here</h1>
                    </motion.div>

                    <motion.div variants={itemVariants} className='text-center px-4'>
                        <p className='text-white text-base md:text-xl'>Please register yourself to read our blogs and get more information about abroad education</p>
                    </motion.div>

                    <motion.div className='text-center mt-6'>
                        <form onSubmit={handleSubmit} className='flex flex-col gap-8 md:gap-10 p-4 md:p-8'>
                            <motion.div
                                variants={itemVariants}
                                className="relative"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <input
                                    type="text"
                                    id="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className={`p-4 rounded-md w-full peer bg-white/5 border ${errors.name ? 'border-red-500' : 'border-white/20'} outline-none text-white`}
                                    placeholder=" "
                                    required
                                />
                                <label
                                    htmlFor="name"
                                    className='absolute left-2 top-1 text-white transition-all 
                                    peer-focus:-translate-y-7 peer-focus:text-sm
                                    peer-[:not(:placeholder-shown)]:-translate-y-7 peer-[:not(:placeholder-shown)]:text-sm font-bold'
                                >
                                    Full Name
                                </label>
                                {errors.name && (
                                    <span className="text-red-500 text-sm mt-1 absolute -bottom-6 left-0">{errors.name}</span>
                                )}
                            </motion.div>

                            <motion.div
                                variants={itemVariants}
                                className="relative"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <input
                                    type="email"
                                    id="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className={`p-4 rounded-md w-full peer bg-white/5 border ${errors.email ? 'border-red-500' : 'border-white/20'} outline-none text-white`}
                                    placeholder=" "
                                    required
                                />
                                <label
                                    htmlFor="email"
                                    className='absolute left-2 top-1 text-white transition-all 
                                    peer-focus:-translate-y-7 peer-focus:text-sm
                                    peer-[:not(:placeholder-shown)]:-translate-y-7 peer-[:not(:placeholder-shown)]:text-sm font-bold'
                                >
                                    Email
                                </label>
                                {errors.email && (
                                    <span className="text-red-500 text-sm mt-1 absolute -bottom-6 left-0">{errors.email}</span>
                                )}
                            </motion.div>

                            <motion.div
                                variants={itemVariants}
                                className="relative"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <input
                                    type="text"
                                    id="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className={`p-4 rounded-md w-full peer bg-white/5 border ${errors.phone ? 'border-red-500' : 'border-white/20'} outline-none text-white`}
                                    placeholder=" "
                                    required
                                />
                                <label
                                    htmlFor="phone"
                                    className='absolute left-2 top-1 text-white transition-all 
                                    peer-focus:-translate-y-7 peer-focus:text-sm
                                    peer-[:not(:placeholder-shown)]:-translate-y-7 peer-[:not(:placeholder-shown)]:text-sm font-bold'
                                >
                                    Phone Number
                                </label>
                                {errors.phone && (
                                    <span className="text-red-500 text-sm mt-1 absolute -bottom-6 left-0">{errors.phone}</span>
                                )}
                            </motion.div>

                            <motion.div
                                variants={itemVariants}
                                className="relative"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <input
                                    type="password"
                                    id="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className={`p-4 rounded-md w-full peer bg-white/5 border ${errors.password ? 'border-red-500' : 'border-white/20'} outline-none text-white`}
                                    placeholder=" "
                                    required
                                />
                                <label
                                    htmlFor="password"
                                    className='absolute left-2 top-1 text-white transition-all 
                                    peer-focus:-translate-y-7 peer-focus:text-sm
                                    peer-[:not(:placeholder-shown)]:-translate-y-7 peer-[:not(:placeholder-shown)]:text-sm font-bold'
                                >
                                    Password
                                </label>
                                {errors.password && (
                                    <span className="text-red-500 text-sm mt-1 absolute -bottom-6 left-0">{errors.password}</span>
                                )}
                            </motion.div>

                            {/* <motion.div
                                variants={itemVariants}
                                className="relative"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            > */}
                                {/* <input
                                    type="password"
                                    id="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    className={`p-4 rounded-md w-full peer bg-white/5 border ${errors.confirmPassword ? 'border-red-500' : 'border-white/20'} outline-none text-white`}
                                    placeholder=" "
                                    required
                                />
                                <label
                                    htmlFor="confirmPassword"
                                    className='absolute left-2 top-1 text-white transition-all 
                                    peer-focus:-translate-y-7 peer-focus:text-sm
                                    peer-[:not(:placeholder-shown)]:-translate-y-7 peer-[:not(:placeholder-shown)]:text-sm font-bold'
                                >
                                    Re-enter Password
                                </label>
                                {errors.confirmPassword && (
                                    <span className="text-red-500 text-sm mt-1 absolute -bottom-6 left-0">{errors.confirmPassword}</span>
                                )} */}
                            {/* </motion.div> */}

                            <motion.button
                                type="submit"
                                variants={itemVariants}
                                whileHover={{ scale: 1.05, backgroundColor: 'rgba(59, 130, 246, 0.8)' }}
                                whileTap={{ scale: 0.95 }}
                                disabled={loading}
                                onClick={handleSubmit}

                                className='p-4 rounded-md bg-blue-500/60 text-white transition-colors backdrop-blur-sm border border-blue-400/30 text-2xl font-bold mt-8'
                            >
                                Register
                            </motion.button>
                        </form>
                    </motion.div>

                </motion.div>

                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                    className='w-full lg:w-1/2 mx-auto flex justify-center items-center mt-8 lg:mt-0'
                >
                    <motion.div variants={itemVariants} className='text-center w-full px-4'>
                        <Lottie
                            animationData={signup}
                            loop={true}
                            autoplay={true}
                        />
                    </motion.div>
                </motion.div>
            </motion.div>
        </div>
    )
}

export default SignUp