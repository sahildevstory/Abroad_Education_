import React from 'react'
import about from '../../assets/about.jpg';
import story from '../../assets/story.jpg';
import mission from '../../assets/mission.jpg';
import vision from '../../assets/vision.jpg';
import team2 from '../../assets/team2.jpg';
import { TiSocialLinkedin } from 'react-icons/ti';
import { TiSocialTwitter } from 'react-icons/ti';
import { TiSocialInstagram } from 'react-icons/ti';
import { TiSocialFacebook } from 'react-icons/ti';
import { motion } from 'framer-motion';

const About = () => {
  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  }
  return (
    <>
      <motion.h1
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className='text-blue-400 text-3xl md:text-8xl font-bold line-through text-left decoration-blue-400 mt-10 pl-4'
      >
        Work Hard
      </motion.h1>

      <motion.h1
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className='text-blue-400 text-3xl md:text-8xl font-bold line-through text-left decoration-blue-400 pl-4'
      >
        Work Smart
      </motion.h1>

      <motion.h1
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className='text-green-400 text-3xl md:text-8xl font-bold pl-4'
      >
        Keep Working consistently
      </motion.h1>

      <motion.h1
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.9 }}
        className='text-green-400 text-3xl md:text-8xl font-bold pl-4'
      >
        Achieve your goals
      </motion.h1>

      <div className='flex flex-col items-center justify-center p-4'>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className='flex flex-col md:flex-row items-center justify-center gap-10 mb-10'
        >
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className='pr-4 md:pr-10 border rounded-lg p-6 md:p-10 w-full md:w-auto'
          >
            <h1 className='text-white text-3xl md:text-4xl font-bold mb-4'>Who are we?</h1>
            <p className='text-white text-lg md:text-xl pr-4'>
              At Abroad Education, we believe that education isn't just about the classroom; it's about expanding your horizons, challenging your perspectives, and embracing the world beyond your borders. Whether you're a student seeking the best international universities or an adventurer eager to explore new cultures, we're here to guide you every step of the way.
            </p>
          </motion.div>
          <motion.img
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            src={about}
            alt=""
            className='w-full md:w-1/3 h-auto border-2 border-white rounded-lg'
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className='flex flex-col-reverse md:flex-row items-center justify-center mt-10 gap-10 mb-10'
        >
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className='w-full md:w-auto'
          >
            <img src={story} alt="" className='w-full h-auto border-2 border-white rounded-lg' />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className='pl-4 md:pl-10 border rounded-lg p-6 md:p-10 w-full md:w-auto'
          >
            <h1 className='text-white text-3xl md:text-4xl font-bold mb-4'>Our Story</h1>
            <p className='text-white text-lg md:text-xl pr-4'>
              Abroad Education was founded with the vision of making studying and traveling abroad accessible and achievable for students worldwide. Our journey began when we, too, experienced the thrill and challenges of pursuing education in foreign countries. We understand the hurdles—visa applications, scholarships, travel plans, and adjusting to life in a new culture—and we wanted to make the process smoother for students who share our dream of exploring the world through education.
            </p>

          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className='flex flex-col md:flex-row items-center justify-center gap-10 mb-10'
        >
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className='pr-4 md:pr-10 border rounded-lg p-6 md:p-10 w-full md:w-auto'
          >
            <h1 className='text-white text-3xl md:text-4xl font-bold mb-4'>Our Mission</h1>
            <p className='text-white text-lg md:text-xl pr-4'>
              Our mission is simple: to provide students with the information, tools, and support they need to succeed in their international education and travel endeavors. We aim to empower you to explore the best study abroad opportunities, secure scholarships, navigate visa processes, and enjoy unforgettable travel experiences, all while making the journey seamless and stress-free.
            </p>
          </motion.div>
          <motion.img
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            src={mission}
            alt=""
            className='w-full md:w-1/3 h-auto border-2 border-white rounded-lg'
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className='flex flex-col-reverse md:flex-row items-center justify-center gap-10 mt-20'
        >
          <motion.img
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            src={vision}
            alt=""
            className='w-full md:w-1/3 h-auto border-2 border-white rounded-lg'
          />
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className='pr-4 md:pr-10 border rounded-lg p-6 md:p-10 w-full md:w-auto'
          >
            <h1 className='text-white text-3xl md:text-4xl font-bold mb-4'>Our Vision</h1>
            <p className='text-white text-lg md:text-xl pr-4'>
              We envision a world where every student has the opportunity to study and travel abroad, not as a luxury, but as an accessible, life-changing experience. Through our platform, we aim to break barriers, open doors, and provide a supportive space for students around the world to thrive.
            </p>
          </motion.div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className='text-white text-3xl md:text-4xl font-bold mt-20 text-center'
        >
          what makes us different?
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className='text-white text-lg md:text-xl px-4 md:px-8 text-center'
        >
          We stand out because we don't just focus on one aspect of studying abroad; we combine study advice with travel expertise to create a holistic resource for students. Whether you're looking to apply to the best universities, seeking guidance on visa processes, or need tips on how to make the most of your time abroad, Abroad Education has you covered.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className='flex flex-col md:flex-row items-center justify-center gap-10 mt-20'
        >
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className='pr-4 md:pr-10 border rounded-lg p-6 md:p-10 w-full md:w-1/3'
          >
            <h1 className='text-blue-500 text-3xl md:text-4xl font-bold mb-4'>A Supportive Community:</h1>
            <p className='text-white text-lg md:text-xl pr-4'>
              Comprehensive Guidance: From university application tips to scholarship opportunities, we offer in-depth resources to help you achieve your goals.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className='pr-4 md:pr-10 border rounded-lg p-6 md:p-6 w-full md:w-1/3'
          >
            <h1 className='text-blue-500 text-3xl md:text-4xl font-bold mb-4'>Comprehensive Guidance:</h1>
            <p className='text-white text-lg md:text-xl pr-4'>
              We aim to empower you to explore the best study abroad opportunities, secure scholarships, navigate visa processes, and enjoy unforgettable travel experiences, all while making the journey seamless and stress-free.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className='pr-4 md:pr-10 border rounded-lg p-6 md:p-12 w-full md:w-1/3'
          >
            <h1 className='text-blue-500 text-3xl md:text-4xl font-bold mb-4'>Travel Support: </h1>
            <p className='text-white text-lg md:text-xl pr-4'>
              Studying abroad is more than just academics. We provide travel tips and insights to help you explore your host country, from cultural advice or suggestions to budget-friendly travel suggestions.
            </p>
          </motion.div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className='text-white text-3xl md:text-4xl font-bold mt-20'
        >
          Our Team
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className='flex flex-col md:flex-row items-center justify-center mt-20'
        >
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className='flex flex-col items-center justify-center gap-2 w-1/2'
          >
            <img src={team2} alt="" className=' h-auto border border-blue-700 rounded-full  ' />
            <h1 className='text-blue-500 text-2xl font-bold'>Sohaib Khan</h1>
            <p className='text-white text-lg '>Founder Abroad Education | Operations Manager | Business Operations Optimization & Strategy</p>
            <motion.ul
              variants={staggerChildren}
              className="flex items-center  space-x-3 mt-2 "
            >
              <motion.li
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <a href="https://www.whatsapp.com/channel/0029Va86Cw19mrGZsTf0LJ42" target="_blank" rel="noopener noreferrer" title="" className="flex items-center justify-center text-white transition-all duration-200 bg-gray-800 rounded-full w-7 h-7 hover:bg-blue-600 focus:bg-blue-600">
                  <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.139.562 4.146 1.552 5.885L0 24l6.333-1.643A11.953 11.953 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22a9.959 9.959 0 0 1-5.226-1.473L4 21l.469-2.693A9.94 9.94 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm5.362-7.583c-.285-.144-1.689-.832-1.951-.926s-.452-.144-.642.144c-.191.285-.735.926-.903 1.119-.165.191-.333.217-.618.073-.285-.144-1.203-.443-2.291-1.413-.847-.75-1.416-1.678-1.582-1.963-.166-.285-.018-.438.126-.582.129-.128.285-.333.428-.499a1.986 1.986 0 0 0 .285-.474c.096-.191.048-.355-.024-.499-.073-.144-.642-1.545-.879-2.11-.231-.555-.463-.48-.642-.489a1.212 1.212 0 0 0-.438.044c-.144.032-.371.048-.566.272-.191.225-.744.727-.744 1.772s.76 2.061.868 2.205c.104.144 1.495 2.284 3.624 3.202.505.22.901.352 1.21.451.509.161.973.138 1.34.084.408-.062 1.689-.687 1.927-1.35.238-.663.238-1.232.166-1.35-.071-.118-.26-.19-.545-.333z"></path>
                  </svg>

                </a>
              </motion.li>

              <motion.li
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <a href="https://www.linkedin.com/in/sohaib-khan-9259a7280" target="_blank" rel="noopener noreferrer" title="" className="flex items-center justify-center text-white transition-all duration-200 bg-gray-800 rounded-full w-7 h-7 hover:bg-blue-600 focus:bg-blue-600">
                  <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.28c-.97 0-1.75-.78-1.75-1.75s.78-1.75 1.75-1.75 1.75.78 1.75 1.75-.78 1.75-1.75 1.75zm13.5 11.28h-3v-5.36c0-1.28-.03-2.92-1.78-2.92s-2.05 1.39-2.05 2.82v5.46h-3v-10h2.88v1.36h.04c.4-.76 1.38-1.56 2.85-1.56 3.05 0 3.61 2.01 3.61 4.62v5.58z" />
                  </svg>

                </a>
              </motion.li>

              <motion.li
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <a href="https://www.instagram.com/abroad_educations_" target="_blank" rel="noopener noreferrer" title="" className="flex items-center justify-center text-white transition-all duration-200 bg-gray-800 rounded-full w-7 h-7 hover:bg-blue-600 focus:bg-blue-600">
                  <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M11.999 7.377a4.623 4.623 0 1 0 0 9.248 4.623 4.623 0 0 0 0-9.248zm0 7.627a3.004 3.004 0 1 1 0-6.008 3.004 3.004 0 0 1 0 6.008z"></path>
                    <circle cx="16.806" cy="7.207" r="1.078"></circle>
                    <path d="M20.533 6.111A4.605 4.605 0 0 0 17.9 3.479a6.606 6.606 0 0 0-2.186-.42c-.963-.042-1.268-.054-3.71-.054s-2.755 0-3.71.054a6.554 6.554 0 0 0-2.184.42 4.6 4.6 0 0 0-2.633 2.632 6.585 6.585 0 0 0-.419 2.186c-.043.962-.056 1.267-.056 3.71 0 2.442 0 2.753.056 3.71.015.748.156 1.486.419 2.187a4.61 4.61 0 0 0 2.634 2.632 6.584 6.584 0 0 0 2.185.45c.963.042 1.268.055 3.71.055s2.755 0 3.71-.055a6.615 6.615 0 0 0 2.186-.419 4.613 4.613 0 0 0 2.633-2.633c.263-.7.404-1.438.419-2.186.043-.962.056-1.267.056-3.71s0-2.753-.056-3.71a6.581 6.581 0 0 0-.421-2.217zm-1.218 9.532a5.043 5.043 0 0 1-.311 1.688 2.987 2.987 0 0 1-1.712 1.711 4.985 4.985 0 0 1-1.67.311c-.95.044-1.218.055-3.654.055-2.438 0-2.687 0-3.655-.055a4.96 4.96 0 0 1-1.669-.311 2.985 2.985 0 0 1-1.719-1.711 5.08 5.08 0 0 1-.311-1.669c-.043-.95-.053-1.218-.053-3.654 0-2.437 0-2.686.053-3.655a5.038 5.038 0 0 1 .311-1.687c.305-.789.93-1.41 1.719-1.712a5.01 5.01 0 0 1 1.669-.311c.951-.043 1.218-.055 3.655-.055s2.687 0 3.654.055a4.96 4.96 0 0 1 1.67.311 2.991 2.991 0 0 1 1.712 1.712 5.08 5.08 0 0 1 .311 1.669c.043.951.054 1.218.054 3.655 0 2.436 0 2.698-.043 3.654h-.011z"></path>
                  </svg>
                </a>
              </motion.li>

              <motion.li
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <a href="https://www.youtube.com/@abroad_educations" target="_blank" rel="noopener noreferrer" title="" className="flex items-center justify-center text-white transition-all duration-200 bg-gray-800 rounded-full w-7 h-7 hover:bg-blue-600 focus:bg-blue-600">
                  <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.498 6.186a2.91 2.91 0 0 0-2.05-2.058C19.094 3.5 12 3.5 12 3.5s-7.094 0-9.448.628a2.91 2.91 0 0 0-2.05 2.058C0 8.595 0 12 0 12s0 3.405.502 5.814a2.91 2.91 0 0 0 2.05 2.058C4.906 20.5 12 20.5 12 20.5s7.094 0 9.448-.628a2.91 2.91 0 0 0 2.05-2.058C24 15.405 24 12 24 12s0-3.405-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>

                </a>
              </motion.li>
            </motion.ul>
          </motion.div>

          {/* <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className='flex flex-col items-center justify-center gap-2 mb-4'
          >
            <img src={team2} alt="" className='w-1/2 h-auto border-2 border-white rounded-lg' />
            <h1 className='text-blue-500 text-2xl font-bold'>Team Member 2</h1>
            <p className='text-white text-lg'>Founder</p>
            <p className='text-white text-lg w-1/2 text-center'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.</p>
            <div className='flex items-center justify-center gap-2'>
              <a href="https://www.facebook.com/sohaib.khan.7545"><TiSocialLinkedin size={20} color='blue' /></a>
              <a href="https://www.twitter.com/sohaib.khan.7545"><TiSocialTwitter size={20} color='blue' /></a>
              <a href="https://www.instagram.com/sohaib.khan.7545"><TiSocialInstagram size={20} color='blue' /></a>
              <a href="https://www.facebook.com/sohaib.khan.7545"><TiSocialFacebook size={20} color='blue' /></a>
            </div>
          </motion.div> */}
        </motion.div>
      </div>
    </>
  )
}

export default About