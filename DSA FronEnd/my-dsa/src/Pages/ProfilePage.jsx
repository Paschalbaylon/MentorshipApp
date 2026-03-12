import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";

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

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get("/auth/me");
        setProfile(response.data);
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

  const navigate = useNavigate();

  const handleLogout = async () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (!confirmLogout) return;

    try {
      await axiosInstance.post("/auth/logout", {});
      localStorage.removeItem("token");
      navigate("/Login/Sign_In");
    } catch (error) {
      console.error("Logout failed", error);
      alert("Logout failed. Please try again.");
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
              <label className="text-gray-500 text-sm block mb-1">Full Name</label>
              <p className="text-lg font-medium text-gray-800">{profile.fullname || "N/A"}</p>
            </div>

            <div className="border-b border-gray-200 pb-3">
              <label className="text-gray-500 text-sm block mb-1">Bio</label>
              <p className="text-gray-700 font-medium">{profile.bio || "N/A"}</p>
            </div>

            <div className="border-b border-gray-200 pb-3">
              <label className="text-gray-500 text-sm block mb-1">Skills</label>
              <p className="text-gray-700 font-medium">{profile.skill || "N/A"}</p>
            </div>

            <div className="border-b border-gray-200 pb-3">
              <label className="text-gray-500 text-sm block mb-1">Email</label>
              <p className="text-gray-700 font-medium">{profile.email || "N/A"}</p>
            </div>

            <div className="border-b border-gray-200 pb-3">
              <label className="text-gray-500 text-sm block mb-1">Role</label>
              <p className="text-gray-700 capitalize font-medium">
                {profile.role || "N/A"}
              </p>
            </div>

            <div className="border-b border-gray-200 pb-3">
              <label className="text-gray-500 text-sm block mb-1">Availability</label>
              <p className="text-gray-700 capitalize font-medium">
                {profile.availability || "N/A"}
              </p>
            </div>

            <div className="pt-6">
              <button
                onClick={handleLogout}
                className="w-full bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 transition cursor-pointer font-medium text-lg"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;