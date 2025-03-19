import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Lottie from 'lottie-react'
import login from '../assets/login.json' 
// import { FaPrayingHands } from 'react-icons/fa'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const AdminLogin = () => {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

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

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        setLoading(true)
    
        try {
            // Send credentials to the API
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/adminlogin`, {
                email: formData.email,
                password: formData.password
            });
    
            // Ensure the response contains the necessary data
            if (response.data.token && response.data.user) {
                // Store the token and user info in localStorage
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('userId', JSON.stringify(response.data.user));
    
                // Redirect to the admin dashboard
                navigate('/adminpost');
            } else {
                setError('Invalid admin credentials');
            }
        } catch (error) {
            setError('An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };
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
                        {/* <FaPrayingHands size={40} className='text-white' /> */}
                        <h1 className='text-2xl md:text-4xl font-bold text-blue-300 mb-4'>Admin Login credentials</h1>
                    </motion.div>

                    <motion.div variants={itemVariants} className='text-center px-4'>
                        <p className='text-white text-base md:text-xl'>Please enter your Admin Login credentials</p>
                    </motion.div>

                    <motion.div className='text-center mt-6'>
                        <form onSubmit={handleSubmit} className='flex flex-col gap-8 md:gap-10 p-4 md:p-8'>
                            {error && (
                                <motion.div
                                    variants={itemVariants}
                                    className="bg-red-500/20 border border-red-500/50 text-red-200 p-3 rounded-md"
                                >
                                    {error}
                                </motion.div>
                            )}
                            
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
                                    className='p-4 rounded-md w-full peer bg-white/5 border border-white/20 outline-none text-white'
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
                                    className='p-4 rounded-md w-full peer bg-white/5 border border-white/20 outline-none text-white'
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
                            </motion.div>

                            <motion.button
                                type="submit"
                                variants={itemVariants}
                                whileHover={{ scale: 1.05, backgroundColor: 'rgba(59, 130, 246, 0.8)' }}
                                whileTap={{ scale: 0.95 }}
                                className='p-4 rounded-md bg-blue-500/60 text-white transition-colors backdrop-blur-sm border border-blue-400/30 text-2xl font-bold disabled:opacity-50'
                                disabled={loading}
                                onClick={handleSubmit}
                            >
                                {loading ? 'Logging in...' : 'Login'}

                            </motion.button>

                            <motion.div
                                variants={itemVariants}
                                className="text-white text-sm"
                            > Use harcode the email and password for admin login
                            </motion.div>
                          
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
                            animationData={login}
                            loop={true}
                            autoplay={true}
                        />
                    </motion.div>
                </motion.div>
            </motion.div>    
        </div>
    )
}

export default AdminLogin