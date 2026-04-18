import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const sliderRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    let scrollInterval = setInterval(() => {
      slider.scrollLeft += 2;
      if (slider.scrollLeft >= slider.scrollWidth / 2) {
        slider.scrollLeft = 0;
      }
    }, 30);

    return () => clearInterval(scrollInterval);
  }, []);

  return (
    <>
      <div className="relative flex flex-col md:flex-row items-center justify-center md:justify-start min-h-screen bg-[#C8E4F4] p-4 md:p-8">
        <motion.div
          className="max-w-lg md:w-1/2 text-center md:text-left"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <motion.h1
            className="text-3xl md:text-5xl font-bold font-serif text-blue-600 italic mt-8 pl-2"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            Smart Solutions
          </motion.h1>
          <motion.h2
            className="text-4xl md:text-6xl font-bold italic font-sans text-blue-900 mt-2"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2 }}
          >
            Swift Resolutions
          </motion.h2>
          <motion.p
            className="text-lg md:text-xl font-bold text-gray-700 mt-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5 }}
          >
            Report issues, monitor solutions, and share your feedback
          </motion.p>
          <div className="mt-6 flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
            <motion.button
              className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition"
              aria-label="Report an issue"
              onClick={() => navigate("/report")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Report Issue
            </motion.button>
            <motion.button
              className="px-6 py-3 bg-gray-300 text-gray-800 font-semibold rounded-lg shadow-md hover:bg-gray-400 transition"
              aria-label="Track issue status"
              onClick={() => navigate("/track")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Track Status
            </motion.button>
          </div>
        </motion.div>

        <motion.div
          className="hidden md:block absolute right-0 top-0 h-full w-1/2"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2 }}
        >
          <img
            src="/landing-pic.webp"
            loading="lazy"
            alt="Smart City Illustration"
            className="w-full h-full object-cover"
          />
        </motion.div>
      </div>
    </>
  );
};

export default HeroSection;