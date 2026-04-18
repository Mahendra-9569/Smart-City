import React from "react";

const Footer = () => {
  return (
    <footer className="w-full bg-white text-center py-4 border-t border-gray-200">
      <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-10 text-gray-700 mb-4 px-4">
        <a
          href="/About"
          className="hover:text-blue-500 transition-colors duration-200 text-sm md:text-base"
        >
          About Us
        </a>
        <a
          href="/Contact"
          className="hover:text-blue-500 transition-colors duration-200 text-sm md:text-base"
        >
          Contact Us
        </a>
      </div>
      <p className="text-gray-500 text-xs md:text-sm px-4">
        © 2025 Smart City. All Rights Reserved.
      </p>
    </footer>
  );
};

export default Footer;