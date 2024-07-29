import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const LandingPage = () => {
  return (
    <div className="bg-dark-layer-2 min-h-screen flex flex-col">
      <main className="flex-grow flex items-center justify-center">
        <div className="text-center">
          <motion.h2
            className="text-4xl font-extrabold text-white mb-4"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            Welcome to Online Judge
          </motion.h2>
          <motion.p
            className="text-lg text-dark-gray-6 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            A platform to solve coding problems, compete with peers, and enhance your skills. Join us today!
          </motion.p>
          <Link 
            to="/sign-in" 
            className="bg-brand-orange text-white py-3 px-6 rounded-md text-lg font-semibold hover:bg-brand-orange-s transition duration-300 transform hover:scale-105"
          >
            Get Started
          </Link>
        </div>
      </main>

      <footer className="bg-dark-layer-1 py-4">
        <div className="container mx-auto text-center text-dark-gray-7">
          <p>&copy; 2024 Online Judge. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
