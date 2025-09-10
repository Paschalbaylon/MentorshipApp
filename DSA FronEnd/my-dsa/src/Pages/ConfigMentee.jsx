import React, { useState } from "react";
import { createMenteeProfile, updateMenteeProfile } from "../api/auth";

const ConfigMentee = () => {
  const [bio, setBio] = useState("");
  const [goals, setGoals] = useState("");
  const [isUpdate, setIsUpdate] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const profileData = { bio, goals };

    try {
      let response;
      if (isUpdate) {
        response = await updateMenteeProfile(profileData);
      } else {
        response = await createMenteeProfile(profileData);
      }
      setMessage(response.message);
    } catch (error) {
      setMessage("Error: " + error);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-6 mt-8">
      <h2 className="text-2xl font-semibold text-center mb-4">
        {isUpdate ? "Update Mentee Profile" : "Create Mentee Profile"}
      </h2>
      {message && (
        <div className="mb-4 text-center text-sm text-green-600">{message}</div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 font-medium mb-1">Bio</label>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
            placeholder="Write something about yourself..."
            rows="3"
            required
          ></textarea>
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-1">Goals</label>
          <textarea
            value={goals}
            onChange={(e) => setGoals(e.target.value)}
            className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
            placeholder="What do you want to achieve?"
            rows="3"
            required
          ></textarea>
        </div>
        <div className="flex justify-between">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            {isUpdate ? "Update Profile" : "Create Profile"}
          </button>
          <button
            type="button"
            onClick={() => setIsUpdate(!isUpdate)}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
          >
            Switch to {isUpdate ? "Create" : "Update"}
          </button>
        </div>
      </form>
    </div>
  );
};
export default ConfigMentee;
