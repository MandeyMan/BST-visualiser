import React from 'react';
import { FaLinkedin, FaGithub } from 'react-icons/fa'; // Import LinkedIn and GitHub icons from react-icons

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-3 mt-8">
      <div className="container mx-auto flex flex-col items-center justify-between flex-col sm:justify-between sm:px-6">
        {/* Text */}
        <p className="text-center text-sm mb-2 sm:mb-0">
          &copy; {new Date().getFullYear()} Binary Search Tree Visualizer. Built with ❤️ and React.
        </p>

        {/* Social Media Icons */}
        <div className="flex justify-center space-x-4 mt-2">
          <a 
            href="https://www.linkedin.com/in/prakash-prajapati-717146229/?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-gray-300 hover:text-blue-500 transition-colors"
          >
            <FaLinkedin size={24} />
          </a>
          <a 
            href="https://github.com/MandeyMan" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-gray-300 hover:text-black transition-colors"
          >
            <FaGithub size={24} />
          </a>
        </div>
      </div>
    </footer>
  );
}
