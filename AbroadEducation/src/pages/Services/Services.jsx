import React from 'react'
import { motion } from 'framer-motion'
import errorAnimation from '../../assets/Animation - 1738523462197.json'
import Lottie from 'lottie-react'

const Services = () => {
  return (
    <div className="error-container h-screen flex flex-col justify-center items-center px-4">
      <motion.h1 

        className="text-white text-2xl md:text-4xl font-bold mb-4 text-center"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}  
        transition={{ duration: 0.6 }}
      >
        Hello Users, Services are coming soon
      </motion.h1>
    
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
        <Lottie 

          animationData={errorAnimation}
          loop={true}
          autoplay={true}
        />
      </motion.div>
    </div>
  )
}

export default Services