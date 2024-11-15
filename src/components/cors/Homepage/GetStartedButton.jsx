import React from 'react';
import { Link } from 'react-router-dom';

const GetStartedButton = () => {
  return (
    <div className="flex justify-start mt-5 md:mt-10">
      <Link to="/login">
        <button className="bg-gradient-to-r from-richblue-700 to-caribbeangreen-300 text-white font-inter text-lg md:text-xl py-3 px-8 md:py-4 md:px-10 rounded-lg shadow-lg hover:shadow-2xl hover:scale-105 transform transition-all duration-300 ease-in-out">
          Get Started
        </button>
      </Link>
    </div>
  );
};

export default GetStartedButton;
