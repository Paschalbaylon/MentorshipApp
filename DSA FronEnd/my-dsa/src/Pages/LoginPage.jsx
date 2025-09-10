import React from "react";
import NavBar from "../Components/NavBar";
import { Link } from "react-router-dom";
import image from "../assets/Login.png";

const LoginPage = () => {
  return (
    <div>
      <NavBar />
      <div className="p-4  mt-5 md:mt-10 flex flex-col-reverse md:flex-row md:space-x-3">
        <i className="absolute "></i>
        <div className="md:max-w-2xl">
          <h1 className="text-4xl  mt-4 md:mt-20 font-bold font-serif">
            Match Mentors and Mentees with our easy to-use platform.
          </h1>
          <p className="mt-5 md:max-w-[500px] md:mt-10 text-[20px]">
            Together Monitoring Software ensures every employee has a relevant
            mentor to accelerate their growth. From registration to reporting,
            managing your mentorship program has never been so easy.
          </p>
        </div>
        <div>
          <img className="w-[600px] " src={image} alt="Logo in Login" />
        </div>
      </div>
      <div className="p-4 space-x-8 md:mt-[-100px]">
        <Link
          to="/Login/Sign_Up"
          className="border px-4 py-2 bg-amber-700 text-amber-50 rounded-[8px] font-semibold"
        >
          Sign Up
        </Link>
        <Link
          to="/Login/Sign_In"
          className="border px-4 py-2 bg-green-700 text-amber-50 rounded-[8px] font-semibold"
        >
          Sign in
        </Link>
      </div>
    </div>
  );
};
export default LoginPage;
