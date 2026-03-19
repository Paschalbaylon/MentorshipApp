import { useState } from "react";
import { createMentorProfile, updateMentorProfile } from "../api/auth";

export default function MentorProfileForm() {
  const [bio, setBio] = useState("");
  const [role, setRole] = useState("");
  const [skill, setSkill] = useState("");
  const [availability, setAvailability] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await createMentorProfile({
        bio,
        role,
        skill,
        availability,
      });
      setMessage(result.message);
      setMessageType("success");
    } catch (err) {
      setMessage("❌ " + err);
      setMessageType("error");
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    try {
      await updateMentorProfile({ bio, skill, availability });
      setMessage("Mentor profile updated successfully");
      setMessageType("success");
    } catch (err) {
      setMessage("❌ " + err.message || "Something went wrong");
      setMessageType("error");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-700 to-blue-500 px-4 py-8">
      <div className="max-w-6xl mx-auto grid gap-6 md:grid-cols-2">
        {/* Create Profile */}
        <div className="bg-gray-200 rounded-2xl shadow-lg p-6 md:p-8">
          <h2 className="text-xl md:text-2xl font-bold mb-6 text-gray-800">
            Create Mentor Profile
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <textarea
              placeholder="Your Bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
            <input
              type="text"
              placeholder="Role (e.g. Software Engineer)"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
            <input
              type="text"
              placeholder="Skills (e.g. C#, React)"
              value={skill}
              onChange={(e) => setSkill(e.target.value)}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
            <input
              type="text"
              placeholder="Availability (e.g. Weekends)"
              value={availability}
              onChange={(e) => setAvailability(e.target.value)}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500"
            />

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
            >
              Save Profile
            </button>
          </form>

          {message && (
            <p
              className={`mt-4 text-center font-medium ${
                messageType === "success" ? "text-green-600" : "text-red-600"
              }`}
            >
              {message}
            </p>
          )}
        </div>

        {/* Update Profile */}
        <div className="bg-gray-200 rounded-2xl shadow-lg p-6 md:p-8">
          <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-6 text-center">
            Update Mentor Profile
          </h2>

          {message && (
            <div
              className={`mb-4 p-3 rounded-lg text-center ${
                messageType === "success"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {message}
            </div>
          )}

          <form onSubmit={handleUpdateProfile} className="space-y-5">
            <div>
              <label className="block text-gray-600 font-medium mb-2">
                Bio
              </label>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500"
                rows="3"
                placeholder="Write a short bio..."
                required
              />
            </div>

            <div>
              <label className="block text-gray-600 font-medium mb-2">
                Skill
              </label>
              <input
                type="text"
                value={skill}
                onChange={(e) => setSkill(e.target.value)}
                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500"
                placeholder="Your skills (e.g. React, C#)"
                required
              />
            </div>

            <div>
              <label className="block text-gray-600 font-medium mb-2">
                Availability
              </label>
              <input
                type="text"
                value={availability}
                onChange={(e) => setAvailability(e.target.value)}
                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500"
                placeholder="e.g. Weekends, Weekdays 6-9PM"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white font-semibold py-3 rounded-lg hover:bg-indigo-700 transition"
            >
              Update Profile
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
