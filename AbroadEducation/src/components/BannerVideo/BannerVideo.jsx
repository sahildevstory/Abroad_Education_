import React from 'react';
import videoFile from '../../assets/videoFile.mp4';
import { FaInfoCircle, FaEnvelope } from 'react-icons/fa'; // Importing icons
import './banner.css';

const BannerVideo = () => {
  return (
    <div className="relative w-full h-auto ">
      {/* Video Element */}
      <video
        width="100%"
        height="auto"
        autoPlay
        loop
        muted
        controlsList="nodownload nofullscreen noremoteplayback noinfo noseeking nocontrols"
        className="w-full h-auto opacity-30"
      >
        <source src={videoFile} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Text and Button Overlay */}
      <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-start mt-2  sm:mt:0  p-4 sm:p-8 text-left text-white">
        <h1 className="text-xl sm:text-2xl md:text-4xl lg:text-64xl xl:text-6xl font-bold mb-4">
          Welcome to Abroad Education!
        </h1>
        <p className=" hidden sm:block text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl mb-2 w-1/2 text-gray-100">
          At Abroad Education, we believe that education isn’t just about the classroom; it’s about expanding your horizons, challenging your perspectives, and embracing the world beyond your borders. Whether you’re a student seeking the best international universities or an adventurer eager to explore new cultures, we’re here to guide you every step of the way.
        </p>
        <div className="flex flex-row space-x-4 mb-5">
          <a 
            href="https://forms.office.com/pages/responsepage.aspx?id=DQSIkWdsW0yxEjajBLZtrQAAAAAAAAAAAAO__S4U9C9UNldKQzZDSFJGR05MNlhaMjQ5NVoxSTJEVi4u&route=shorturl"
            className="flip-up inline-block bg-black/10 backdrop-blur-md p-2 sm:p-4 rounded-full text-white shadow-lg border border-white/20 hover:bg-black/20 transition flex items-center justify-center"
          >
            <FaInfoCircle className="block sm:hidden" size={20} /> {/* Icon for small screens */}
            <span className="hidden sm:block">Call Us</span> {/* Text for larger screens */}
          </a>
          <a
            href="/contact"

            className="flip-up inline-block bg-black/10 backdrop-blur-md p-2 sm:p-4 rounded-full text-white shadow-lg border border-white/20 hover:bg-black/20 transition flex items-center justify-center"
          >
            <FaEnvelope className="block sm:hidden" size={20} /> {/* Icon for small screens */}
            <span className="hidden sm:block">Contact Us</span> {/* Text for larger screens */}
          </a>
        </div>
      </div>
    </div>
  );
};

export default BannerVideo;
