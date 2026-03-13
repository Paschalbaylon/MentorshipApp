import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const MenteePage = () => {
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);

        const email =
          decoded[
            "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"
          ];

        setUserEmail(email || "Unknown Email");
      } catch (error) {
        console.error("Error decoding token:", error);
        setUserEmail("Invalid Token");
      }
    } else {
      setUserEmail("No Token Found");
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-teal-400 via-blue-500 to-indigo-600">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">
        {/* Welcome Section */}
        <div className="text-center mb-6 sm:mb-8 lg:mb-10">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold font-serif text-amber-200 mb-2">
            Welcome Mentee
          </h1>
          <p className="text-sm sm:text-base lg:text-lg text-amber-100">
            Logged in as <span className="font-semibold text-amber-50">{userEmail}</span>
          </p>
        </div>

        {/* Desktop View (md and above) */}
        <div className="hidden md:block">
          {/* View Profile Button */}
          <div className="mb-8 flex justify-center">
            <Link
              to="/mentee/profile"
              className="inline-block bg-amber-700 hover:bg-amber-800 text-amber-50 font-semibold px-6 py-3 rounded-lg transition duration-200 ease-in transform hover:scale-105 shadow-lg text-base lg:text-lg"
            >
              View Profile
            </Link>
          </div>

          {/* Action Cards Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {/* Configure Mentee Profile */}
            <Link
              to="/mentee/configure-mentee-profile"
              className="group bg-amber-700 hover:bg-amber-800 rounded-lg p-6 transition duration-200 ease-in transform hover:scale-105 shadow-lg"
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-amber-600 rounded-full flex items-center justify-center mb-4 group-hover:bg-amber-500 transition-colors">
                  <svg className="w-8 h-8 text-amber-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h3 className="text-amber-50 font-semibold text-sm lg:text-base">
                  Configure Profile
                </h3>
                <p className="text-amber-200 text-xs lg:text-sm mt-2">
                  Update your mentee profile information
                </p>
              </div>
            </Link>

            {/* Send Mentor Request */}
            <Link
              to="/mentee/send-mentor-request"
              className="group bg-amber-700 hover:bg-amber-800 rounded-lg p-6 transition duration-200 ease-in transform hover:scale-105 shadow-lg"
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-amber-600 rounded-full flex items-center justify-center mb-4 group-hover:bg-amber-500 transition-colors">
                  <svg className="w-8 h-8 text-amber-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <h3 className="text-amber-50 font-semibold text-sm lg:text-base">
                  Find Mentor
                </h3>
                <p className="text-amber-200 text-xs lg:text-sm mt-2">
                  Search and request mentors
                </p>
              </div>
            </Link>

            {/* Review Requests */}
            <Link
              to="/mentee/Review-mentee-requests"
              className="group bg-amber-700 hover:bg-amber-800 rounded-lg p-6 transition duration-200 ease-in transform hover:scale-105 shadow-lg"
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-amber-600 rounded-full flex items-center justify-center mb-4 group-hover:bg-amber-500 transition-colors">
                  <svg className="w-8 h-8 text-amber-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-amber-50 font-semibold text-sm lg:text-base">
                  Review Requests
                </h3>
                <p className="text-amber-200 text-xs lg:text-sm mt-2">
                  Manage mentor requests
                </p>
              </div>
            </Link>

            {/* Sessions */}
            <Link
              to="/mentee/Schedule-Session"
              className="group bg-amber-700 hover:bg-amber-800 rounded-lg p-6 transition duration-200 ease-in transform hover:scale-105 shadow-lg"
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-amber-600 rounded-full flex items-center justify-center mb-4 group-hover:bg-amber-500 transition-colors">
                  <svg className="w-8 h-8 text-amber-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-amber-50 font-semibold text-sm lg:text-base">
                  Sessions
                </h3>
                <p className="text-amber-200 text-xs lg:text-sm mt-2">
                  Schedule and manage sessions
                </p>
              </div>
            </Link>
          </div>
        </div>

        {/* Mobile View (below md) */}
        <div className="md:hidden">
          {/* View Profile Button - Mobile */}
          <div className="mb-6 flex justify-center">
            <Link
              to="/mentee/profile"
              className="inline-block bg-amber-700 hover:bg-amber-800 text-amber-50 font-semibold px-6 py-3 rounded-lg transition duration-200 ease-in w-full max-w-xs text-center shadow-md"
            >
              View Profile
            </Link>
          </div>

          {/* Mobile Action Grid */}
          <div className="grid grid-cols-2 gap-3">
            {/* Configure Profile */}
            <Link
              to="/mentee/configure-mentee-profile"
              className="bg-amber-700 hover:bg-amber-800 rounded-lg p-4 transition duration-200 ease-in shadow-md"
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-amber-600 rounded-full flex items-center justify-center mb-2">
                  <svg className="w-6 h-6 text-amber-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h3 className="text-amber-50 font-semibold text-xs">
                  Configure Profile
                </h3>
              </div>
            </Link>

            {/* Send Request */}
            <Link
              to="/mentee/send-mentor-request"
              className="bg-amber-700 hover:bg-amber-800 rounded-lg p-4 transition duration-200 ease-in shadow-md"
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-amber-600 rounded-full flex items-center justify-center mb-2">
                  <svg className="w-6 h-6 text-amber-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                  </svg>
                </div>
                <h3 className="text-amber-50 font-semibold text-xs">
                  Find Mentor
                </h3>
              </div>
            </Link>

            {/* Review Requests */}
            <Link
              to="/mentee/Review-mentee-requests"
              className="bg-amber-700 hover:bg-amber-800 rounded-lg p-4 transition duration-200 ease-in shadow-md"
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-amber-600 rounded-full flex items-center justify-center mb-2">
                  <svg className="w-6 h-6 text-amber-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-amber-50 font-semibold text-xs">
                  Review Requests
                </h3>
              </div>
            </Link>

            {/* Sessions */}
            <Link
              to="/mentee/Schedule-Session"
              className="bg-amber-700 hover:bg-amber-800 rounded-lg p-4 transition duration-200 ease-in shadow-md"
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-amber-600 rounded-full flex items-center justify-center mb-2">
                  <svg className="w-6 h-6 text-amber-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-amber-50 font-semibold text-xs">
                  Sessions
                </h3>
              </div>
            </Link>
          </div>
        </div>

        {/* Quick Stats Section - Optional */}
        <div className="mt-8 sm:mt-10 lg:mt-12 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 sm:p-4 text-center">
            <div className="text-xl sm:text-2xl font-bold text-amber-300">3</div>
            <div className="text-xs sm:text-sm text-amber-100">Active Sessions</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 sm:p-4 text-center">
            <div className="text-xl sm:text-2xl font-bold text-amber-300">2</div>
            <div className="text-xs sm:text-sm text-amber-100">Pending Requests</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 sm:p-4 text-center">
            <div className="text-xl sm:text-2xl font-bold text-amber-300">5</div>
            <div className="text-xs sm:text-sm text-amber-100">Completed Sessions</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 sm:p-4 text-center">
            <div className="text-xl sm:text-2xl font-bold text-amber-300">1</div>
            <div className="text-xs sm:text-sm text-amber-100">Mentors</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenteePage;