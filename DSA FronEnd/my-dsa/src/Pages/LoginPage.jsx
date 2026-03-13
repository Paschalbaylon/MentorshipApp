import React from "react";
import NavBar from "../Components/NavBar";
import { Link } from "react-router-dom";
import image from "../assets/Login.png";

const LoginPage = () => {
  return (
    <div className="min-h-screen bg-amber-50">
      <NavBar />
      
      {/* Main Container */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 md:py-12">
        {/* Content Section */}
        <div className="flex flex-col-reverse lg:flex-row items-center gap-8 lg:gap-12 xl:gap-16">
          
          {/* Text Content */}
          <div className="w-full lg:w-1/2 space-y-4 sm:space-y-6">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-5xl font-bold font-serif text-amber-900 leading-tight">
              Match Mentors and Mentees with our easy-to-use platform.
            </h1>
            
            <p className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed max-w-2xl">
              Together Monitoring Software ensures every employee has a relevant
              mentor to accelerate their growth. From registration to reporting,
              managing your mentorship program has never been so easy.
            </p>

            {/* Button Container - Moved closer to text on mobile */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 pt-4 sm:pt-6">
              <Link
                to="/Login/Sign_Up"
                className="w-full sm:w-auto text-center border px-6 py-3 bg-amber-700 hover:bg-amber-800 text-amber-50 rounded-lg font-semibold transition duration-200 ease-in-out transform hover:scale-105 shadow-md hover:shadow-lg text-base sm:text-lg"
              >
                Sign Up
              </Link>
              <Link
                to="/Login/Sign_In"
                className="w-full sm:w-auto text-center border px-6 py-3 bg-green-700 hover:bg-green-800 text-amber-50 rounded-lg font-semibold transition duration-200 ease-in-out transform hover:scale-105 shadow-md hover:shadow-lg text-base sm:text-lg"
              >
                Sign In
              </Link>
            </div>
          </div>

          {/* Image Section */}
          <div className="w-full lg:w-1/2 flex justify-center items-center">
            <div className="relative w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl">
              <img 
                className="w-full h-auto object-contain rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300" 
                src={image} 
                alt="Mentorship Platform Illustration" 
              />
              
              {/* Optional Decorative Element */}
              <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-amber-200 rounded-full opacity-20 blur-2xl -z-10"></div>
              <div className="absolute -top-4 -right-4 w-32 h-32 bg-green-200 rounded-full opacity-20 blur-2xl -z-10"></div>
            </div>
          </div>
        </div>

        {/* Additional Features Section - Optional but adds value */}
        <div className="mt-16 sm:mt-20 lg:mt-24 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-amber-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">Smart Matching</h3>
            <p className="text-gray-600">AI-powered algorithm matches mentors and mentees based on skills and goals.</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">Track Progress</h3>
            <p className="text-gray-600">Monitor mentorship goals, sessions, and achievements in real-time.</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow sm:col-span-2 lg:col-span-1">
            <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-amber-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">Flexible Scheduling</h3>
            <p className="text-gray-600">Easy calendar integration for seamless session planning.</p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-16 sm:mt-20 text-center">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div>
              <div className="text-3xl sm:text-4xl font-bold text-amber-700">500+</div>
              <div className="text-sm sm:text-base text-gray-600 mt-2">Active Mentors</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-bold text-green-700">1000+</div>
              <div className="text-sm sm:text-base text-gray-600 mt-2">Happy Mentees</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-bold text-amber-700">50+</div>
              <div className="text-sm sm:text-base text-gray-600 mt-2">Partner Companies</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;