import React from 'react'
import './Footer.css'
import { motion } from 'framer-motion'
import { FaUserPlus, FaSignInAlt } from "react-icons/fa";

const Footer = () => {
    const fadeInUp = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6 }
    }

    const staggerChildren = {
        animate: {
            transition: {
                staggerChildren: 0.1
            }
        }
    }

    return (
        <motion.div
            initial="initial"
            animate="animate"
            variants={staggerChildren}
        >
            <hr className="mt-16 mb-10 border-bg-shine" />
            <section className="py-10 bg-shine sm:pt-16 lg:pt-24">
                <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-8xl">
                    <motion.div
                        variants={staggerChildren}
                        className="grid grid-cols-2 md:col-span-3 lg:grid-cols-6 gap-y-16 gap-x-12"
                    >
                        <motion.div
                            variants={fadeInUp}
                            className="col-span-2 md:col-span-3 lg:col-span-2 lg:pr-8"
                        >
                            <motion.div
                                variants={fadeInUp}
                                id="auth-items"
                                className="flex justify-around items-center w-52 bg-black/10 backdrop-blur-md p-2 rounded-full text-white shadow-lg border border-white/20"
                            >
                                <a href="" className="flip-up hidden md:inline">Abroad Education</a>
                            </motion.div>

                            <motion.p
                                variants={fadeInUp}
                                className="text-base leading-relaxed text-white mt-7"
                            >
                                We envision a world where every student has the opportunity to study and travel abroad, not as a luxury, but as an accessible, life-changing experience. Through our platform, we aim to break barriers, open doors, and provide a supportive space for students around the world to thrive
                            </motion.p>

                            <motion.ul
                                variants={staggerChildren}
                                className="flex items-center space-x-3 mt-9"
                            >
                                <motion.li
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <a href="https://www.whatsapp.com/channel/0029Va86Cw19mrGZsTf0LJ42"  target="_blank" rel="noopener noreferrer"  title="" className="flex items-center justify-center text-white transition-all duration-200 bg-gray-800 rounded-full w-7 h-7 hover:bg-blue-600 focus:bg-blue-600">
                                        <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M12 0C5.373 0 0 5.373 0 12c0 2.139.562 4.146 1.552 5.885L0 24l6.333-1.643A11.953 11.953 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22a9.959 9.959 0 0 1-5.226-1.473L4 21l.469-2.693A9.94 9.94 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm5.362-7.583c-.285-.144-1.689-.832-1.951-.926s-.452-.144-.642.144c-.191.285-.735.926-.903 1.119-.165.191-.333.217-.618.073-.285-.144-1.203-.443-2.291-1.413-.847-.75-1.416-1.678-1.582-1.963-.166-.285-.018-.438.126-.582.129-.128.285-.333.428-.499a1.986 1.986 0 0 0 .285-.474c.096-.191.048-.355-.024-.499-.073-.144-.642-1.545-.879-2.11-.231-.555-.463-.48-.642-.489a1.212 1.212 0 0 0-.438.044c-.144.032-.371.048-.566.272-.191.225-.744.727-.744 1.772s.76 2.061.868 2.205c.104.144 1.495 2.284 3.624 3.202.505.22.901.352 1.21.451.509.161.973.138 1.34.084.408-.062 1.689-.687 1.927-1.35.238-.663.238-1.232.166-1.35-.071-.118-.26-.19-.545-.333z"></path>
                                        </svg>

                                    </a>
                                </motion.li>

                                <motion.li
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <a href="https://www.linkedin.com/in/sohaib-khan-9259a7280"  target="_blank" rel="noopener noreferrer"  title="" className="flex items-center justify-center text-white transition-all duration-200 bg-gray-800 rounded-full w-7 h-7 hover:bg-blue-600 focus:bg-blue-600">
                                        <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.28c-.97 0-1.75-.78-1.75-1.75s.78-1.75 1.75-1.75 1.75.78 1.75 1.75-.78 1.75-1.75 1.75zm13.5 11.28h-3v-5.36c0-1.28-.03-2.92-1.78-2.92s-2.05 1.39-2.05 2.82v5.46h-3v-10h2.88v1.36h.04c.4-.76 1.38-1.56 2.85-1.56 3.05 0 3.61 2.01 3.61 4.62v5.58z" />
                                        </svg>

                                    </a>
                                </motion.li>

                                <motion.li
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <a href="https://www.instagram.com/abroad_educations_"  target="_blank" rel="noopener noreferrer"  title="" className="flex items-center justify-center text-white transition-all duration-200 bg-gray-800 rounded-full w-7 h-7 hover:bg-blue-600 focus:bg-blue-600">
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
                                    <a href="https://www.youtube.com/@abroad_educations"  target="_blank" rel="noopener noreferrer"  title="" className="flex items-center justify-center text-white transition-all duration-200 bg-gray-800 rounded-full w-7 h-7 hover:bg-blue-600 focus:bg-blue-600">
                                        <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M23.498 6.186a2.91 2.91 0 0 0-2.05-2.058C19.094 3.5 12 3.5 12 3.5s-7.094 0-9.448.628a2.91 2.91 0 0 0-2.05 2.058C0 8.595 0 12 0 12s0 3.405.502 5.814a2.91 2.91 0 0 0 2.05 2.058C4.906 20.5 12 20.5 12 20.5s7.094 0 9.448-.628a2.91 2.91 0 0 0 2.05-2.058C24 15.405 24 12 24 12s0-3.405-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                                        </svg>

                                    </a>
                                </motion.li>
                            </motion.ul>
                        </motion.div>

                        <motion.div variants={fadeInUp}>
                            <motion.p
                                variants={fadeInUp}
                                className="text-sm font-semibold tracking-widest text-white uppercase"
                            >
                                Company
                            </motion.p>

                            <motion.ul
                                variants={staggerChildren}
                                className="mt-6 space-y-4"
                            >
                                <motion.li
                                    whileHover={{ x: 5 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                >
                                    <a href="/blog" className="flex text-base text-white transition-all duration-200 hover:text-blue-600 focus:text-blue-600"> Blog </a>
                                </motion.li>

                                <motion.li
                                    whileHover={{ x: 5 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                >
                                    <a href="/about" className="flex text-base text-white transition-all duration-200 hover:text-blue-600 focus:text-blue-600"> About </a>
                                </motion.li>

                                <motion.li
                                    whileHover={{ x: 5 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                >
                                    <a href="/services" className="flex text-base text-white transition-all duration-200 hover:text-blue-600 focus:text-blue-600"> Service </a>
                                </motion.li>

                                <motion.li
                                    whileHover={{ x: 5 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                >
                                    <a href="/contact" className="flex text-base text-white transition-all duration-200 hover:text-blue-600 focus:text-blue-600"> Contact </a>
                                </motion.li>
                            </motion.ul>
                        </motion.div>

                        <motion.div variants={fadeInUp}>
                            <motion.p
                                variants={fadeInUp}
                                className="text-sm font-semibold tracking-widest text-white uppercase"
                            >
                                Help
                            </motion.p>

                            <motion.ul
                                variants={staggerChildren}
                                className="mt-6 space-y-4"
                            >
                                <motion.li
                                    whileHover={{ x: 5 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                >
                                    <a href="#" className="flex text-base text-white transition-all duration-200 hover:text-blue-600 focus:text-blue-600"> Customer Support </a>
                                </motion.li>

                                <motion.li
                                    whileHover={{ x: 5 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                >
                                    <a href="#" className="flex text-base text-white transition-all duration-200 hover:text-blue-600 focus:text-blue-600"> Delivery Details </a>
                                </motion.li>

                                <motion.li
                                    whileHover={{ x: 5 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                >
                                    <a href="#" className="flex text-base text-white transition-all duration-200 hover:text-blue-600 focus:text-blue-600"> Terms & Conditions </a>
                                </motion.li>

                                <motion.li
                                    whileHover={{ x: 5 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                >
                                    <a href="#" className="flex text-base text-white transition-all duration-200 hover:text-blue-600 focus:text-blue-600"> Privacy Policy </a>
                                </motion.li>
                            </motion.ul>
                        </motion.div>

                        <motion.div
                            variants={fadeInUp}
                            className="col-span-2 md:col-span-1 lg:col-span-2 lg:pl-8"
                        >
                            <motion.p
                                variants={fadeInUp}
                                className="text-sm font-semibold tracking-widest text-white uppercase transition-all duration-200 hover:text-blue-600 focus:text-blue-600"
                            >
                                Subscribe to newsletter
                            </motion.p>

                            <motion.form
                                variants={fadeInUp}
                                action="#"
                                method="POST"
                                className="mt-6"
                            >
                                <div>
                                    <label htmlFor="email" className="sr-only">Email</label>
                                    <motion.input
                                        whileFocus={{ scale: 1.02 }}
                                        type="email"
                                        name="email"
                                        id="email"
                                        placeholder="Enter your email"
                                        className="block w-full p-4 text-black placeholder-gray-500 transition-all duration-200 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-blue-600 caret-blue-600"
                                    />
                                </div>

                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    type="submit"
                                    className="inline-flex items-center justify-center px-6 py-4 mt-3 font-semibold text-white transition-all duration-200 bg-shine rounded-md hover:bg-blue-700 focus:bg-blue-700 cursor-pointer"
                                >
                                    Subscribe
                                </motion.button>
                            </motion.form>
                        </motion.div>
                    </motion.div>

                    <hr className="mt-16 mb-10 border-bg-shine" />

                    <motion.p
                        variants={fadeInUp}
                        className="text-sm text-center text-white"
                    >
                        © Copyright 2021, All Rights Reserved by Abroad Education
                    </motion.p>
                </div>
            </section>
        </motion.div>
    )
}

export default Footer