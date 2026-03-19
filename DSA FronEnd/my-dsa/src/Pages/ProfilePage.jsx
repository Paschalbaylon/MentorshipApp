import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import { getMyProfile } from "../api/auth";

const ProfilePage = () => {
  const [profile, setProfile] = useState({
    fullname: "",
    bio: "",
    skill: "",
    email: "",
    role: "",
    availability: "",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);

        // Try API first, fall back to localStorage
        try {
          const data = await getMyProfile();
          setProfile({
            fullname: data.fullName || data.fullname || "",
            bio: data.bio || "",
            skill: data.skill || "",
            email: data.email || "",
            role: data.role || "",
            availability: data.availability || "",
          });
        } catch {
          // Fall back to stored user data
          const stored = JSON.parse(localStorage.getItem("user") || "{}");
          setProfile({
            fullname: stored.fullName || stored.fullname || "",
            bio: stored.bio || "",
            skill: stored.skill || "",
            email: stored.email || "",
            role: stored.role || "",
            availability: stored.availability || "",
          });
        }

        setError("");
      } catch (error) {
        console.error("Failed to fetch profile:", error);
        setError("Failed to load profile. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      const refreshToken = localStorage.getItem("refreshToken");
      await axiosInstance.post("/auth/logout", { token: refreshToken });
    } catch (error) {
      console.error("Logout failed", error);
    } finally {
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      setLoggingOut(false);
      setShowLogoutModal(false);
      navigate("/Login/Sign_In");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-green-600 flex items-center justify-center">
        <div className="text-white text-xl">Loading profile...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-green-600 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
          <h2 className="text-2xl md:text-3xl font-semibold text-center text-indigo-700 mb-6">
            Profile Information
          </h2>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div className="border-b border-gray-200 pb-3">
              <label className="text-gray-500 text-sm block mb-1">
                Full Name
              </label>
              <p className="text-lg font-medium text-gray-800">
                {profile.fullname || "N/A"}
              </p>
            </div>

            <div className="border-b border-gray-200 pb-3">
              <label className="text-gray-500 text-sm block mb-1">Bio</label>
              <p className="text-gray-700 font-medium">
                {profile.bio || "N/A"}
              </p>
            </div>

            <div className="border-b border-gray-200 pb-3">
              <label className="text-gray-500 text-sm block mb-1">Skills</label>
              <p className="text-gray-700 font-medium">
                {profile.skill || "N/A"}
              </p>
            </div>

            <div className="border-b border-gray-200 pb-3">
              <label className="text-gray-500 text-sm block mb-1">Email</label>
              <p className="text-gray-700 font-medium">
                {profile.email || "N/A"}
              </p>
            </div>

            <div className="border-b border-gray-200 pb-3">
              <label className="text-gray-500 text-sm block mb-1">Role</label>
              <p className="text-gray-700 capitalize font-medium">
                {profile.role || "N/A"}
              </p>
            </div>

            <div className="border-b border-gray-200 pb-3">
              <label className="text-gray-500 text-sm block mb-1">
                Availability
              </label>
              <p className="text-gray-700 capitalize font-medium">
                {profile.availability || "N/A"}
              </p>
            </div>
          </div>

          {/* Logout Button */}
          <div className="mt-8">
            <button
              onClick={() => setShowLogoutModal(true)}
              className="w-full py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white font-semibold transition duration-200"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-sm mx-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Confirm Logout
            </h3>
            <p className="text-gray-500 text-sm mb-6">
              Are you sure you want to log out of your account?
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="flex-1 py-2 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                disabled={loggingOut}
                className="flex-1 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white font-medium transition disabled:opacity-50"
              >
                {loggingOut ? "Logging out..." : "Logout"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
