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
    <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 h-screen overflow-hidden">
      <div className="mx-auto max-w-3xl">
        <div className="mt-7 p-4 ">
          <h2 className="text-center text-2xl font-bold font-serif text-amber-300">
            Welcome Admin
          </h2>
          <h3 className="mt-10 text-gray-300 text-sm">
            Logged in as{" "}
            <span className="font-semibold text-gray-100">{userEmail}</span>
          </h3>
          <div className="mt-6">
            <div>
              <Link
                to="/admin/profile"
                className="bg-indigo-600 text-white font-semibold px-4 py-2 rounded-[8px] cursor-pointer hover:bg-indigo-700 transition duration-200 ease-in"
              >
                View Profile
              </Link>
            </div>
            <div className="mt-8">
              <div className="mt-4 ">
                <Link
                  to="/admin/manage-user"
                  className="bg-emerald-600 text-white font-semibold px-4 py-3 rounded-[8px] cursor-pointer hover:bg-emerald-700 transition duration-200 ease-in block w-[400px] md:w-[600px]"
                >
                  📊 Manage Users
                </Link>
              </div>
              <div className="mt-4">
                <Link
                  to="/admin/configure-platform"
                  className="bg-amber-600 text-white font-semibold px-4 py-3 rounded-[8px] cursor-pointer hover:bg-amber-700 transition duration-200 ease-in block w-[400px] md:w-[600px]"
                >
                  🛠 Configure Platform
                </Link>
              </div>
              <div className="mt-4">
                <Link
                  to="/admin/manage-session"
                  className="bg-rose-600 text-white font-semibold px-4 py-3 rounded-[8px] cursor-pointer hover:bg-rose-700 transition duration-200 ease-in block w-[400px] md:w-[600px]"
                >
                  ✉ Manage Sessions
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AdminPage;
