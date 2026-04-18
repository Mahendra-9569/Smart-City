import React from "react";
import { motion } from "framer-motion";

// Card component with flexible styling
const Card = ({ children, color, rotation, className = "" }) => {
  return (
    <motion.div
      className={`shadow-lg ${color} ${className}`}
      style={{ rotate: rotation }}
      whileHover={{ scale: 1.05 }}
    >
      {children}
    </motion.div>
  );
};

// Features component with vertical layout and animations
const Features = () => {
  const items = [
    {
      icon: "/issues.webp",
      title: "Report Issues",
      description: "Effortlessly report any issues you encounter with just a few clicks.",
    },
    {
      icon: "/trackstatuslogo.webp",
      title: "Track Progress",
      description: "Stay updated on your issue’s progress with real-time tracking.",
    },
    {
      icon: "/feedbacklogo.webp",
      title: "Feedback",
      description: "Share your thoughts and experiences to help us improve.",
    },
    {
      icon: "/securelogo.webp",
      title: "Secure and Transparent",
      description: "Ensure the highest level of security and transparency in issue resolution.",
    },
  ];

  return (
    <div className="px-6 md:px-12 py-12">
      <h2 className="text-4xl font-bold text-gray-800 mb-12">Features</h2>
      <div className="space-y-12">
        {items.map((item, index) => (
          <motion.div
            key={index}
            className="flex items-start space-x-6"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            viewport={{ once: true }}
          >
            <div className="relative flex flex-col items-center">
              <div className="w-16 h-16 flex items-center justify-center bg-white shadow-lg rounded-full">
                <img src={item.icon} alt={item.title} className="w-12 h-12 object-contain" loading="lazy" />
              </div>
              {index !== items.length - 1 && <div className="w-1 h-16 bg-gray-300 mt-2"></div>}
            </div>
            <div>
              <h3 className="font-bold text-2xl text-gray-800">{item.title}</h3>
              <p className="text-gray-700 text-lg mt-2">{item.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// Main App component with responsive layout
export default function App() {
  return (
    <div className="p-6 flex flex-col md:flex-row">
      {/* Left Side - Images */}
      <div className="flex flex-col items-center space-y-6 md:w-1/2">
        <Card color="bg-[#f3f4f6]" rotation="-6deg" className="w-64">
          <img src="/pic1.webp" alt="Progress" className="w-full h-auto rounded-lg" />
        </Card>
        <Card color="bg-[#f3f4f6]" rotation="3deg" className="w-64">
          <img src="/pic3.webp" alt="Comparison" className="w-full h-auto rounded-lg" />
        </Card>
        <Card color="bg-[#f3f4f6]" rotation="-3deg" className="w-64">
          <img src="/pic2.webp" alt="Calendar" className="w-full h-auto rounded-lg" />
        </Card>
      </div>
      {/* Right Side - Features */}
      <div className="md:w-1/2 mt-12 md:mt-0 md:ml-12">
        <Features />
      </div>
    </div>
  );
}