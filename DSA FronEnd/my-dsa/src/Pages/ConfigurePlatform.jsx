import React, { useState, useEffect } from "react";
import { getMyProfile, getUserById, updateMyProfile } from "../api/auth";

const ConfigurePlatform = () => {
  const [profile, setProfile] = useState(null);
  const [otherProfile, setOtherProfile] = useState(null);
  const [editForm, setEditForm] = useState({
    bio: "",
    skill: "",
  });
  const [otherId, setOtherId] = useState("");
  
  // Error states
  const [profileError, setProfileError] = useState("");
  const [updateError, setUpdateError] = useState("");
  const [searchError, setSearchError] = useState("");
  const [updateSuccess, setUpdateSuccess] = useState("");

  // ✅ Fetch current user profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setProfileError("");
        const response = await getMyProfile();
        setProfile(response);
        setEditForm({
          bio: response.bio || "",
          skill: response.skill || "",
        });
      } catch (error) {
        console.error("Failed to fetch profile:", error);
        setProfileError(error.response?.data?.message || "Failed to load profile. Please try again.");
      }
    };
    fetchProfile();
  }, []);

  if (!profile) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-teal-400 via-blue-500 to-indigo-600 p-4">
        <div className="max-w-4xl mx-auto">
          {profileError ? (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {profileError}
            </div>
          ) : (
            <p className="text-white">Loading profile...</p>
          )}
        </div>
      </div>
    );
  }

  // ✅ Update profile
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      setUpdateError("");
      setUpdateSuccess("");
      await updateMyProfile(editForm);
      const updatedProfile = await getMyProfile();
      setProfile(updatedProfile);
      setUpdateSuccess("Profile updated successfully!");
      
      // Clear success message after 3 seconds
      setTimeout(() => setUpdateSuccess(""), 3000);
    } catch (err) {
      console.error("Failed to update profile", err);
      setUpdateError(err.response?.data?.message || "Failed to update profile. Please try again.");
    }
  };

  // Fetch another user's profile
  const fetchOtherProfile = async () => {
    try {
      setSearchError("");
      setOtherProfile(null);
      
      if (!otherId) {
        setSearchError("Please enter a user ID");
        return;
      }

      const id = Number(otherId);
      if (isNaN(id)) {
        setSearchError("Invalid ID format. Please enter a valid number.");
        return;
      }

      const response = await getUserById(id);
      setOtherProfile(response);
    } catch (err) {
      console.error("Failed to fetch other profile", err);
      setSearchError(err.response?.data?.message || `User with ID ${otherId} not found.`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-teal-400 via-blue-500 to-indigo-600 py-6">
      <div className="container mx-auto px-4 max-w-6xl">
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-6">Users & Profiles</h1>

        {/* Main Content - Responsive Grid */}
        <div className="space-y-6">
          {/* First Row - My Profile and Edit Form */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Current User Profile */}
            <div className="border p-6 rounded-lg bg-gray-100">
              <h2 className="text-xl font-bold mb-4">My Profile</h2>
              <div className="space-y-2">
                <p>
                  <strong>User Id: </strong>
                  <span className="font-semibold text-green-700">{profile.id}</span>
                </p>
                <p>
                  <strong>Fullname: </strong>
                  <span className="font-semibold text-green-700">
                    {profile.fullName}
                  </span>
                </p>
                <p>
                  <strong>Email: </strong>
                  <span className="font-semibold text-green-700">
                    {profile.email}
                  </span>
                </p>
                <p>
                  <strong>Role: </strong>
                  <span className="font-semibold text-green-700">
                    {profile.role}
                  </span>
                </p>
                <p>
                  <strong>Bio: </strong>
                  <span className="font-semibold text-green-700">
                    {profile.bio || "N/A"}
                  </span>
                </p>
                <p>
                  <strong>Skills: </strong>
                  <span className="font-semibold text-green-700">
                    {profile.skill || "N/A"}
                  </span>
                </p>
                <p>
                  <strong>Availability: </strong>
                  <span className="font-semibold text-green-700">
                    {profile.availability || "N/A"}
                  </span>
                </p>
              </div>
            </div>

            {/* Edit Profile */}
            <form
              onSubmit={handleUpdateProfile}
              className="border p-6 rounded-lg bg-white"
            >
              <h2 className="text-xl font-semibold mb-4">Edit My Profile</h2>
              
              {/* Update Success Message */}
              {updateSuccess && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
                  {updateSuccess}
                </div>
              )}
              
              {/* Update Error Message */}
              {updateError && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                  {updateError}
                </div>
              )}
              
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Bio"
                  value={editForm.bio}
                  onChange={(e) =>
                    setEditForm({ ...editForm, bio: e.target.value })
                  }
                  className="border p-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  placeholder="Skills"
                  value={editForm.skill}
                  onChange={(e) =>
                    setEditForm({ ...editForm, skill: e.target.value })
                  }
                  className="border p-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="submit"
                  className="bg-blue-800 text-white px-6 py-3 rounded cursor-pointer hover:bg-blue-700 transition-colors w-full md:w-auto"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>

          {/* Second Row - Search and Other Profile */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Search Another User */}
            <div className="border p-6 rounded-lg bg-white">
              <h2 className="text-xl font-semibold mb-4">Find Another User</h2>
              
              {/* Search Error Message */}
              {searchError && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                  {searchError}
                </div>
              )}
              
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Enter User ID"
                  value={otherId}
                  onChange={(e) => setOtherId(e.target.value)}
                  className="border p-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={fetchOtherProfile}
                  className="bg-blue-800 text-white px-6 py-3 rounded cursor-pointer hover:bg-blue-700 transition-colors w-full md:w-auto"
                >
                  Get Profile
                </button>
              </div>
            </div>

            {/* Other User Profile */}
            <div className="border p-6 rounded-lg bg-gray-100">
              <h2 className="text-xl font-semibold mb-4">Other User Profile</h2>
              {otherProfile ? (
                <div className="space-y-2">
                  <p>
                    <strong>ID:</strong>{" "}
                    <span className="font-semibold text-blue-700">
                      {otherProfile.id}
                    </span>
                  </p>
                  <p>
                    <strong>Fullname:</strong>{" "}
                    <span className="font-semibold text-blue-700">
                      {otherProfile.fullname}
                    </span>
                  </p>
                  <p>
                    <strong>Email:</strong>{" "}
                    <span className="font-semibold text-blue-700">
                      {otherProfile.email}
                    </span>
                  </p>
                  <p>
                    <strong>Role:</strong>{" "}
                    <span className="font-semibold text-blue-700">
                      {otherProfile.role}
                    </span>
                  </p>
                  <p>
                    <strong>Bio:</strong>{" "}
                    <span className="font-semibold text-blue-700">
                      {otherProfile.bio || "N/A"}
                    </span>
                  </p>
                  <p>
                    <strong>Skills:</strong>{" "}
                    <span className="font-semibold text-blue-700">
                      {otherProfile.skill || "N/A"}
                    </span>
                  </p>
                  <p>
                    <strong>Availability:</strong>{" "}
                    <span className="font-semibold text-blue-700">
                      {otherProfile.availability || "N/A"}
                    </span>
                  </p>
                </div>
              ) : (
                <p className="text-gray-600">No profile found. Search for a user above.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfigurePlatform;