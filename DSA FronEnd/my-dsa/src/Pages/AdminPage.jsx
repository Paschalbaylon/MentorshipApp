import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const AdminPage = () => {
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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold font-serif text-amber-300">
            Welcome Admin
          </h2>

          <p className="mt-3 text-gray-300 text-sm md:text-base">
            Logged in as{" "}
            <span className="font-semibold text-white break-all">
              {userEmail}
            </span>
          </p>
        </div>

        {/* Main Card */}
        <div className="mt-10 bg-gray-800/70 backdrop-blur-md rounded-2xl shadow-lg p-6 md:p-8">
          {/* Profile */}
          <div className="mb-8 text-center md:text-left">
            <Link
              to="/admin/profile"
              className="inline-block bg-indigo-600 text-white font-semibold px-6 py-2 rounded-lg hover:bg-indigo-700 transition"
            >
              View Profile
            </Link>
          </div>

          {/* Actions */}
          <div className="grid gap-5 sm:grid-cols-2">
            <Link
              to="/admin/manage-user"
              className="bg-emerald-600 text-white font-semibold p-5 rounded-xl text-center hover:bg-emerald-700 transition shadow"
            >
              📊 Manage Users
            </Link>

            <Link
              to="/admin/configure-platform"
              className="bg-amber-600 text-white font-semibold p-5 rounded-xl text-center hover:bg-amber-700 transition shadow"
            >
              🛠 Configure Platform
            </Link>

            <Link
              to="/admin/manage-session"
              className="bg-rose-600 text-white font-semibold p-5 rounded-xl text-center hover:bg-rose-700 transition shadow sm:col-span-2"
            >
              ✉ Manage Sessions
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
