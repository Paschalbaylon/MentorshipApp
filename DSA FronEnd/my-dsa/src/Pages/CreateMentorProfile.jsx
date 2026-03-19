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
    } catch (err) {
      setMessage("❌ " + err);
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    try {
      const data = await updateMentorProfile({ bio, skill, availability });
      setMessage("Mentor profile updated successfully"); // ✅ string only
      setMessageType("success");
    } catch (err) {
      setMessage("❌ " + err.message || "Something went wrong");
      setMessageType("error");
    }
  };

  return (
    <>
      <div className="mx-auto flex flex-col md:flex-row max-w-5xl bg-gray-100">
        <div className=" p-6 bg-white rounded-xl max-w-[600px] md:mt-20">
          <h2 className="text-xl font-bold mb-4">Create Mentor Profile</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <textarea
              placeholder="Your Bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full p-2 border rounded-md"
            />
            <input
              type="text"
              placeholder="Role (e.g. Software Engineer)"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full p-2 border rounded-md"
            />
            <input
              type="text"
              placeholder="Skills (e.g. C#, React)"
              value={skill}
              onChange={(e) => setSkill(e.target.value)}
              className="w-full p-2 border rounded-md"
            />
            <input
              type="text"
              placeholder="Availability (e.g. Weekends)"
              value={availability}
              onChange={(e) => setAvailability(e.target.value)}
              className="w-full p-2 border rounded-md"
            />
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
            >
              Save Profile
            </button>
          </form>
          {message && <p className="mt-4 text-center">{message}</p>}
        </div>

        {/* Update Mentor */}

        <div className=" mx-auto flex justify-center items-center min-h-screen bg-gray-100 p-6 mt-4 md:mt-0 ">
          <div className=" bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
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
                  className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
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
                  className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
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
                  className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="e.g. Weekends, Weekdays 6-9PM"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-indigo-600 text-white font-semibold py-3 rounded-xl hover:bg-indigo-700 transition"
              >
                Update Profile
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
