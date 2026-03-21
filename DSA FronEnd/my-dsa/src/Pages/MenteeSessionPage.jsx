import { useState, useEffect } from "react";
import { sendMentorRequest, getAvailableMentors } from "../api/auth";

const MenteeSessionPage = () => {
  const [mentorId, setMentorId] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [mentors, setMentors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const loadMentors = async () => {
      try {
        setLoading(true);
        const availableMentors = await getAvailableMentors();
        setMentors(availableMentors);
        console.log("Available mentors:", availableMentors);
      } catch (err) {
        console.error("Failed to load mentors:", err);
        setError("Failed to load available mentors");
      } finally {
        setLoading(false);
      }
    };
    loadMentors();
  }, []);

  const handleSendRequest = async (e) => {
    e.preventDefault(); // Prevent page reload
    setError("");
    setSuccess("");
    try {
      const result = await sendMentorRequest(mentorId, message);
      const newRequest = {
        id: result.requestId, // comes from backend response
        message: message,
        requestedAt: new Date().toISOString(),
      };

      setRequests((prev) => [newRequest, ...prev]); // prepend to list
      setMentorId("");
      setMessage("");
      setSuccess(result.message || "Mentor request sent successfully!");
    } catch (err) {
      console.error(
        "Error sending request:",
        err.response?.data || err.message,
      );
      setError(err.response?.data || "Failed to send mentorship request");
    }
  };

  if (loading) {
    return <div className="p-4">Loading available mentors...</div>;
  }

  return (
    <div className="p-4 max-w-3xl mx-auto ">
      <div className="p-6  relative right-2 md:right-0 bg-white shadow rounded">
        <h2 className="text-xl font-bold mb-4">Send A Mentor Request</h2>

        {/* ✅ Feedback Messages */}
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">
            {success}
          </div>
        )}

        {/* Show available mentors */}
        {mentors.length > 0 && (
          <div className="mb-4 p-3 bg-gray-100 rounded">
            <h3 className="font-medium mb-2">Available Mentors:</h3>
            <ul className="text-sm overflow-y-auto h-[200px]">
              {mentors.map((mentor) => (
                <li key={mentor.id} className="mb-1">
                  <strong>ID: {mentor.id}</strong> -{" "}
                  <span className="font-bold text-blue-800">{mentor.name}</span>{" "}
                  &nbsp;
                  <span className="font-semibold">{mentor.email}</span>
                  &nbsp;
                  <span className="font-semibold gap-4">
                    skill: {mentor.Skill}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <form onSubmit={handleSendRequest} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Mentor ID:</label>
            <input
              type="number"
              value={mentorId}
              onChange={(e) => setMentorId(e.target.value)}
              className="w-full border rounded px-3 py-2"
              required
              placeholder="Enter mentor ID from list above"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Message:</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full border rounded px-3 py-2"
              required
              placeholder="Write your message to the mentor"
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 cursor-pointer"
          >
            Send Request
          </button>
        </form>
      </div>
    </div>
  );
};

export default MenteeSessionPage;
