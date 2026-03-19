import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const MentorPage = () => {
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
    <div className="min-h-screen bg-gradient-to-br from-green-800 via-green-500 to-blue-400 px-4 py-8">
      {/* Container */}
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold font-serif text-amber-200">
            Welcome Mentor
          </h2>

          <p className="mt-3 text-amber-100 text-sm md:text-base">
            Logged in as{" "}
            <span className="font-semibold text-amber-50 break-all">
              {userEmail}
            </span>
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-amber-100 rounded-2xl shadow-lg p-6 md:p-10">
          {/* Profile Button */}
          <div className="mb-8 text-center md:text-left">
            <Link
              to="/mentor/profile"
              className="inline-block bg-amber-700 text-white font-semibold px-6 py-2 rounded-lg hover:bg-amber-800 transition"
            >
              View Profile
            </Link>
          </div>

          {/* Actions Grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {/* Configure Profile */}
            <Link to="/mentor/create-mentor">
              <div className="bg-amber-700 text-white p-6 rounded-xl shadow hover:bg-amber-800 transition h-full flex items-center justify-center text-center">
                Configure Mentor Profile
              </div>
            </Link>

            {/* Review Requests */}
            <Link to="/mentor/Review-mentor-requests">
              <div className="bg-amber-700 text-white p-6 rounded-xl shadow hover:bg-amber-800 transition h-full flex items-center justify-center text-center">
                Review Mentor Requests
              </div>
            </Link>

            {/* Sessions */}
            <Link to="/mentor/Schedule-Session">
              <div className="bg-amber-700 text-white p-6 rounded-xl shadow hover:bg-amber-800 transition h-full flex items-center justify-center text-center">
                Sessions
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentorPage;
