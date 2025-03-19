import React from 'react'
import { MdErrorOutline } from 'react-icons/md'
import { motion } from 'framer-motion'
import errorAnimation from '../../assets/Animation - 1738523462197.json'
import Lottie from 'lottie-react'

const Error404 = () => {
  return (
    <div className="error-container h-screen flex flex-col justify-center items-center px-4">
      <motion.h1 
        className="text-white text-2xl md:text-4xl font-bold mb-4 text-center"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}  
        transition={{ duration: 0.6 }}
      >
        Hello Users, You are not authorized to access this page
      </motion.h1>
      
      <a href="login" className="text-blue-500 text-2xl font-bold mb-4">
        <motion.p 
        className="text-red-500 text-2xl font-bold mb-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        Please login to continue
      </motion.p>
      </a>
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20,
          delay: 0.6
        }}
        whileHover={{ 
          scale: 1.1,
          rotate: [0, -10, 10, -10, 0],
          transition: { duration: 0.5 }
        }}
      >
        {/* <MdErrorOutline size={80} color="red"/> */}
        <Lottie 
          animationData={errorAnimation}
          loop={true}
          autoplay={true}
        />
      </motion.div>
    </div>
  )
}

export default Error404