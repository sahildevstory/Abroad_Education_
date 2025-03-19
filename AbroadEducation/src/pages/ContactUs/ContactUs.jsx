import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Lottie from 'lottie-react'
import Contact from '../../assets/contact.json'
import globe from '../../assets/globe.json'
import emailjs from '@emailjs/browser'

const ContactUs = () => {
  emailjs.init('kY7x-u3lVfj--_NAZ');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    number: '',
    message: ''
  });

  const [submitStatus, setSubmitStatus] = useState({
    loading: false,
    error: null,
    success: false
  });

  // const handleInputChange = (e) => {
  //   const { id, value } = e.target;
  //   setFormData(prev => ({
  //     ...prev,
  //     [id]: value
  //   }));
  // };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    let processedValue = value;
    
    if (id === 'number') {
      // Remove non-digit characters and limit to 10 digits
      processedValue = value
        .replace(/\D/g, '') // Remove non-digit characters
        .slice(0, 10);      // Limit to 10 characters
    }

    setFormData(prev => ({
      ...prev,
      [id]: processedValue
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus({ loading: true, error: null, success: false });

    try {
      await emailjs.send(
        'service_qhijz15',  // Your Service ID
        'template_runb17w', // Your Template ID
        {
          from_name: formData.name,
          from_email: formData.email,
          phone_number: formData.number,
          message: formData.message,
          to_name: 'Abroad Education', // Add recipient name
          reply_to: formData.email,    // Add reply-to email
        },
        'kY7x-u3lVfj--_NAZ'  // Your Public Key
      );

      setSubmitStatus({ loading: false, error: null, success: true });
      setFormData({ name: '', email: '', number: '', message: '' });
    } catch (error) {
      console.error('EmailJS Error:', error);
      setSubmitStatus({ 
        loading: false, 
        error: 'Failed to send message. Please try again later.', 
        success: false 
      });
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
    <motion.div>
      <motion.div className='flex flex-col lg:flex-row justify-center items-center p-4 md:p-20'>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className='w-full lg:w-1/2 mx-auto border-gray-300'
        >
          <motion.div variants={itemVariants} className='text-center'>
            <h1 className='text-3xl md:text-5xl font-bold text-blue-500 mb-4'>Chat to our team</h1>
          </motion.div>
          <motion.div variants={itemVariants} className='text-center px-4 mb-4'>
            <p className='text-white text-base md:text-xl'>We're here to help you. Please fill in the form below and we'll get back to you as soon as possible.</p>
          </motion.div>
          <motion.div className='text-center bg-gradient-to-br from-black via-gray-700 to-indigo-900 ">
'>
            <form onSubmit={handleSubmit} className='flex flex-col gap-6 md:gap-10 p-4 md:p-8'>
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
                  onChange={handleInputChange}
                  className='p-4 rounded-md w-full peer bg-white border-none outline-none'
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="name"
                  className='absolute left-2 top-1 text-blue-800 transition-all 
                  peer-focus:-translate-y-7 peer-focus:text-sm
                  peer-[:not(:placeholder-shown)]:-translate-y-7 peer-[:not(:placeholder-shown)]:text-sm font-bold'
                >
                  Name
                </label>
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
                  onChange={handleInputChange}
                  className='p-4 rounded-md w-full peer bg-white'
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="email"
                  className='absolute left-2 top-1 text-blue-800 transition-all 
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
                  type="tel"
                  id="number"
                  value={formData.number}
                  onChange={handleInputChange}
                  className='p-4 rounded-md w-full peer bg-white'
                  placeholder=" "
                  required
                  pattern="^[6-9]\d{9}$"
                  title="Please enter a valid 10-digit Indian phone number"
                />
                <label
                  htmlFor="number"
                  className='absolute left-2 top-1 text-blue-800 transition-all 
                  peer-focus:-translate-y-7 peer-focus:text-sm
                  peer-[:not(:placeholder-shown)]:-translate-y-7 peer-[:not(:placeholder-shown)]:text-sm font-bold'
                >
                  Enter your phone Number
                </label>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="relative"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  className='p-4 rounded-md w-full peer bg-white min-h-[100px] resize-none'
                  placeholder=" "
                  required

                />
                <label
                  htmlFor="message"
                  className='absolute left-2 top-1 text-blue-800 transition-all 
                  peer-focus:-translate-y-7 peer-focus:text-sm
                  peer-[:not(:placeholder-shown)]:-translate-y-7 peer-[:not(:placeholder-shown)]:text-sm font-bold'
                >
                  Leave here a small message
                </label>
              </motion.div>

              <motion.button
                type="submit"
                variants={itemVariants}
                whileHover={{ scale: 1.05, backgroundColor: '#2563ec' }}
                whileTap={{ scale: 0.95 }}
                className='p-4 rounded-md bg-blue-500 text-white transition-colors'
                disabled={submitStatus.loading}
                onClick={handleSubmit}

              >
                {submitStatus.loading ? 'Sending...' : 'Send'}
              </motion.button>

              {submitStatus.success && (
                <p className="text-green-500 font-bold">Message sent successfully!</p>
              )}
              {submitStatus.error && (
                <p className="text-red-500 font-bold">{submitStatus.error}</p>
              )}
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
              animationData={Contact}
              loop={true}
              autoplay={true}
            />
          </motion.div>
        </motion.div>
      </motion.div>

      <motion.div className='flex flex-col lg:flex-row justify-between mt-8 lg:mt-0'>
        <motion.div className='w-full lg:w-1/3 mx-auto flex justify-center items-center'>
          <Lottie
            animationData={globe}
            loop={true}
            autoplay={true}
          />
        </motion.div>

        <motion.div className='w-full lg:w-1/2 mx-auto items-center p-4 '>
          <motion.div className='mx-auto flex justify-center items-center'>
            <h1 className='text-3xl md:text-5xl font-bold text-blue-500 mb-4 text-center'>We support you</h1>
          </motion.div>
          
          <motion.div className='flex justify-center items-center px-4'>
            <p className='text-sm md:text-md font-bold text-white mb-8 text-center'>
              Are you ready to embark on your journey? Whether you're just starting to consider studying abroad or you're already in the process of applying, Abroad Education is here to guide you. Explore our resources, join our community, and take the first step toward an incredible adventure.
            </p>
          </motion.div>

          <motion.div className='flex flex-wrap justify-center items-center gap-4 px-4'>
            <motion.div 
              className='w-full sm:w-[45%] items-center border p-4 rounded-lg'
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <h3 className='text-sm font-bold text-blue-500'>Email support
                <p className='text-sm font-bold text-white'>abroadkeeda@gmail.com</p>
              </h3>
            </motion.div>

            <motion.div 
              className='w-full sm:w-[45%] items-center border p-4 rounded-lg'
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <h3 className='text-sm font-bold text-blue-500'>Phone Support
                <p className='text-sm font-bold text-white'>+91 9589348646</p>
              </h3>
            </motion.div>

            <motion.div 
              className='w-full sm:w-[45%] items-center border p-4 rounded-lg'
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <h3 className='text-sm font-bold text-blue-500 mb-4'>Office Hours</h3>
              <p className='text-sm font-bold text-white'>Monday – Friday</p>
              <p className='text-sm font-bold text-white'>10:00 AM – 6:00 PM</p>
            </motion.div>

            <motion.div 
              className='w-full sm:w-[45%] items-center border p-6 rounded-lg'
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <h3 className='text-sm font-bold text-blue-500 mb-4'>Address</h3>
              <p className='text-sm font-bold text-white'>Bhopal India, 462008</p>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

export default ContactUs