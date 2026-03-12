
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

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axiosInstance.get("/auth/me"); 
        setProfile(response.data);
      } catch (error) {
        console.error("Failed to fetch profile:", error);
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
    } catch (error) {
      console.error("Logout failed", error);
    }

    localStorage.removeItem("token");
    navigate("/Login/Sign_In");
  };

  return (
    <div className="bg-green-600 h-screen overflow-hidden ">
      <div className="md:max-w-md mx-auto ">
        <div className="hidden md:block">
          <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-md space-y-4">
            <h2 className="text-2xl font-semibold text-center text-indigo-700">
              Profile Information
            </h2>

            <div className="space-y-2">
              <div>
                <label className="text-gray-500 text-sm">Full Name</label>
                <p className="text-lg font-medium">{profile.fullname}</p>
              </div>

              <div>
                <label className="text-gray-500 text-sm">Bio</label>
                <p className="text-gray-700 font-medium">{profile.bio}</p>
              </div>

              <div>
                <label className="text-gray-500 text-sm">Skill</label>
                <p className="text-gray-700 font-medium">{profile.skill}</p>
              </div>

              <div>
                <label className="text-gray-500 text-sm">Email</label>
                <p className="text-gray-700 font-medium">{profile.email}</p>
              </div>

              <div>
                <label className="text-gray-500 text-sm">Role</label>
                <p className="text-gray-700 capitalize font-medium">
                  {profile.role}
                </p>
              </div>
              <div>
                <label className="text-gray-500 text-sm">Availability</label>
                <p className="text-gray-700 capitalize font-medium">
                  {profile.availability}
                </p>
              </div>

              <div className="pt-4">
                <button
                  onClick={handleLogout}
                  className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 transition cursor-pointer"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto md:hidden p-4 ">
          <div className=" mt-16 p-6 bg-white rounded-xl shadow-md ">
            <h2 className="text-2xl font-semibold text-center text-indigo-700">
              Profile Information
            </h2>

            <div className="space-y-2">
              <div>
                <label className="text-gray-500 text-sm">Full Name</label>
                <p className="text-lg font-medium">{profile.fullname}</p>
              </div>

              <div>
                <label className="text-gray-500 text-sm">Bio</label>
                <p className="text-gray-700 font-medium">{profile.bio}</p>
              </div>

              <div>
                <label className="text-gray-500 text-sm">Skill</label>
                <p className="text-gray-700 font-medium">{profile.skill}</p>
              </div>

              <div>
                <label className="text-gray-500 text-sm">Email</label>
                <p className="text-gray-700 font-medium">{profile.email}</p>
              </div>

              <div>
                <label className="text-gray-500 text-sm">Role</label>
                <p className="text-gray-700 capitalize font-medium">
                  {profile.role}
                </p>
              </div>
              <div>
                <label className="text-gray-500 text-sm">Availability</label>
                <p className="text-gray-700 capitalize font-medium">
                  {profile.availability}
                </p>
              </div>

              <div className="pt-4">
                <button
                  onClick={handleLogout}
                  className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 transition cursor-pointer"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
