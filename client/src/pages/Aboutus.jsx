import React from "react";
import { motion } from "framer-motion";

const AboutUs = () => {
  return (
    <div className="bg-gray-100 px-4 pb-6 flex items-center justify-center">
      <motion.div
        className="max-w-6xl mx-auto bg-white shadow-lg rounded-xl p-4 md:p-8 text-gray-800 flex flex-col md:flex-row items-center overflow-hidden"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5 }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.img
          src="/smart-city.webp"
          alt="Smart City"
          loading="lazy"
          className="w-full md:w-1/3 max-w-xs rounded-lg shadow-md mb-6 md:mb-0 md:mr-8"
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.5 }}
          viewport={{ once: true, amount: 0.3 }}
        />
        <motion.div
          className="flex-1 text-center md:text-left"
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.5 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.h2
            className="text-2xl md:text-4xl font-bold text-blue-800"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.8 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            About Us
          </motion.h2>
          <motion.p
            className="text-base md:text-lg text-gray-700 mt-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 2 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            Welcome to the Smart City Citizen Complaint and Feedback Platform — empowering citizens to report civic issues and share feedback through a secure, transparent, and accessible system.
          </motion.p>
          <motion.p
            className="text-base md:text-lg text-gray-700 mt-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 2.2 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            Our vision is to create a smarter city where technology bridges the gap between citizens and local authorities. By streamlining the feedback and complaint process, we aim to enhance service quality, promote transparency, and foster trust.
          </motion.p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 mt-6">
            {[
              { value: "10+", label: "Years" },
              { value: "300+", label: "Resolved Cases" },
              { value: "15+", label: "Awards" },
              { value: "1500", label: "Projects" },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="text-center p-2"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: index * 0.3 }}
                whileHover={{ scale: 1.1 }}
                viewport={{ once: true, amount: 0.3 }}
              >
                <p className="text-2xl md:text-3xl font-bold text-blue-800">{item.value}</p>
                <p className="text-gray-600">{item.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AboutUs;