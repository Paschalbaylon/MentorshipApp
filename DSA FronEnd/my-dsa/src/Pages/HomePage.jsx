import React from "react";
import { Link, useNavigate } from "react-router-dom";
import img from "../assets/image.png";

const HomePage = () => {
  const navigate = useNavigate();

  // Function to handle button click based on user role
  const handleGetStarted = () => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role")?.toLowerCase();
    if (token && role) {
      if (role === "mentee") {
        navigate("/mentee");
      } else if (role === "mentor") {
        navigate("/mentor");
      } else if (role === "admin") {
        navigate("/admin");
      }
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-600 via-purple-700 to-pink-700 flex flex-col items-center justify-center text-white px-6">
      {/* Hero Section */}
      <div className="text-center max-w-3xl">
        <h1 className="text-6xl md:text-7xl font-extrabold mb-6 drop-shadow-lg tracking-tight">
          MentorHub
        </h1>
        <p className="text-lg md:text-2xl mb-10 leading-relaxed drop-shadow-md">
          Empower your career with guidance from experienced mentors. Schedule
          sessions, exchange knowledge, and take your skills to the next level.
        </p>

        {/* Single Call-to-Action Button */}
        <button
          onClick={handleGetStarted}
          className="px-10 py-4 bg-white text-indigo-700 font-bold rounded-full shadow-xl hover:bg-indigo-50 transition transform hover:scale-105 hover:shadow-2xl cursor-pointer"
        >
          Get Started
        </button>
      </div>

      {/* Elegant Illustration */}
      <div className="mt-16">
        <img
          src={img}
          alt="Mentorship Illustration"
          className="w-30 mx-auto drop-shadow-2xl rounded-full"
        />
      </div>

      {/* Subtle Footer Accent */}
      <div className="absolute bottom-6 text-white/70 text-sm">
        © 2025 MentorHub. All rights reserved.
      </div>
    </div>
  );
};

export default HomePage;
