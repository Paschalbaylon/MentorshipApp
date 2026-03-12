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
      <div className="p-4 max-w-4xl mx-auto">
        {profileError ? (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {profileError}
          </div>
        ) : (
          <p>Loading profile...</p>
        )}
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
    <div className="bg-gradient-to-r from-teal-400 via-blue-500 to-indigo-600">
      <div className="p-4 max-w-4xl mx-auto space-y-6 hidden md:block md:h-screen">
        <h1 className="text-2xl font-bold">Users & Profiles</h1>

        {/* Current User Profile */}
        <div className="md:flex md:justify-between space-x-4">
          <div className="border p-4 -mt-2 mb-2 md:-mt-3 md:mb-0 rounded-lg bg-gray-100 w-[420px] md:w-[420px]">
            <h2 className="text-xl font-bold">My Profile</h2>
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

          {/* Edit Profile */}
          <form
            onSubmit={handleUpdateProfile}
            className="space-y-3 border md:w-[400px] p-4 rounded-lg w-[420px]"
          >
            <h2 className="text-xl font-semibold">Edit My Profile</h2>
            
            {/* Update Success Message */}
            {updateSuccess && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded text-sm">
                {updateSuccess}
              </div>
            )}
            
            {/* Update Error Message */}
            {updateError && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded text-sm">
                {updateError}
              </div>
            )}
            
            <input
              type="text"
              placeholder="Bio"
              value={editForm.bio}
              onChange={(e) =>
                setEditForm({ ...editForm, bio: e.target.value })
              }
              className="border p-2 w-full rounded text-amber-100"
            />
            <input
              type="text"
              placeholder="Skills"
              value={editForm.skill}
              onChange={(e) =>
                setEditForm({ ...editForm, skill: e.target.value })
              }
              className="border p-2 w-full rounded text-amber-100"
            />
            <button
              type="submit"
              className="bg-blue-800 text-white px-4 py-2 mt-3 rounded cursor-pointer"
            >
              Save
            </button>
          </form>
        </div>

        {/* Search Another User */}
        <div className="md:flex md:justify-between md:-mt-3 md:p-4 space-x-4">
          <div className="border p-4 rounded-lg w-[420px] md:w-[400px]">
            <div className="mt-0 md:mt-6">
              <h2 className="text-xl font-semibold">Find Another User</h2>
              
              {/* Search Error Message */}
              {searchError && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded text-sm mb-2">
                  {searchError}
                </div>
              )}
              
              <input
                type="text"
                placeholder="Enter User ID"
                value={otherId}
                onChange={(e) => setOtherId(e.target.value)}
                className="border p-2 w-full rounded mb-2 md:mt-4 font-bold"
              />
              <button
                onClick={fetchOtherProfile}
                className="bg-blue-800 text-white px-4 py-2 md:mt-2 rounded cursor-pointer"
              >
                Get Profile
              </button>
            </div>
          </div>

          {/* Other User Profile */}
          <div className="border p-4 w-[420px] rounded-lg bg-gray-100 md:w-[450px] mt-4 md:mt-0">
            <h2 className="text-xl font-semibold">Other User Profile</h2>
            {otherProfile ? (
              <>
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
              </>
            ) : (
              <p>No profile found.</p>
            )}
          </div>
        </div>
      </div>

      {/* Small Screen */}
      <div className="p-4 space-y-6 md:hidden block h-[1010px]">
        <h1 className="text-2xl font-bold">Users & Profiles</h1>

        {/* Current User Profile */}
        <div className="md:flex md:justify-between space-x-4">
          <div className="border p-4 -mt-2 mb-2 md:-mt-3 md:mb-0 rounded-lg bg-gray-100 w-[410px]">
            <h2 className="text-xl font-bold">My Profile</h2>
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

          {/* Edit Profile */}
          <form
            onSubmit={handleUpdateProfile}
            className="space-y-3 border md:w-[400px] p-4 rounded-lg w-[410px]"
          >
            <h2 className="text-xl font-semibold">Edit My Profile</h2>
            
            {/* Update Success Message */}
            {updateSuccess && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded text-sm">
                {updateSuccess}
              </div>
            )}
            
            {/* Update Error Message */}
            {updateError && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded text-sm">
                {updateError}
              </div>
            )}
            
            <input
              type="text"
              placeholder="Bio"
              value={editForm.bio}
              onChange={(e) =>
                setEditForm({ ...editForm, bio: e.target.value })
              }
              className="border p-2 w-full rounded text-amber-100"
            />
            <input
              type="text"
              placeholder="Skills"
              value={editForm.skill}
              onChange={(e) =>
                setEditForm({ ...editForm, skill: e.target.value })
              }
              className="border p-2 w-full rounded text-amber-100"
            />
            <button
              type="submit"
              className="bg-blue-800 text-white px-4 py-2 mt-3 rounded cursor-pointer"
            >
              Save
            </button>
          </form>
        </div>

        {/* Search Another User */}
        <div className="md:flex md:justify-between md:p-4 space-x-4">
          <div className="border p-4 rounded-lg w-[410px]">
            <div className="mt-0 md:mt-6">
              <h2 className="text-xl font-semibold">Find Another User</h2>
              
              {/* Search Error Message */}
              {searchError && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded text-sm mb-2">
                  {searchError}
                </div>
              )}
              
              <input
                type="text"
                placeholder="Enter User ID"
                value={otherId}
                onChange={(e) => setOtherId(e.target.value)}
                className="border p-2 w-full rounded mb-2 md:mt-4 font-bold"
              />
              <button
                onClick={fetchOtherProfile}
                className="bg-blue-800 text-white px-4 py-2 md:mt-2 rounded cursor-pointer"
              >
                Get Profile
              </button>
            </div>
          </div>

          {/* Other User Profile */}
          <div className="border p-4 w-[410px] rounded-lg bg-gray-100 mt-4 md:mt-0">
            <h2 className="text-xl font-semibold">Other User Profile</h2>
            {otherProfile ? (
              <>
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
              </>
            ) : (
              <p>No profile found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfigurePlatform;