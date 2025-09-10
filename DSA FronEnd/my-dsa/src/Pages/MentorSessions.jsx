import React, { useEffect, useState } from "react";
import axios from "axios";
import FeedBack from "./FeedBack";

const MentorSessions = () => {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchSessions = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("User not logged in");

      const response = await axios.get(
        "http://localhost:5116/api/MentorshipSessions/mentor",
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setSessions(response.data || []);
      setError(""); // clear any previous error
    } catch (err) {
      if (err.response?.status === 404) {
        // ✅ Gracefully handle "not found" (no sessions yet)
        console.warn("No sessions found for this mentor.");
        setSessions([]);
        setError(""); // don't show scary error message
      } else {
        console.error("Error fetching sessions:", err);
        setError(err.response?.data || "Failed to fetch sessions");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSessions();
  }, []);
  if (loading)
    return <p className="text-center text-gray-500">Loading sessions...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <div className="max-w-4xl h-screen mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        My Mentor Sessions
      </h2>

      {sessions.length === 0 ? (
        <p className="text-gray-600">No sessions found.</p>
      ) : (
        <div className="overflow-y-auto h-[500px] mr-10 md:mr-0">
          <div className="grid gap-6">
            {sessions.map((session) => (
              <div
                key={session.id}
                className="p-4 bg-white rounded-2xl shadow hover:shadow-lg transition"
              >
                <p className="text-lg font-semibold text-indigo-600">
                  Mentee: {session.menteeName}
                </p>
                <p className="text-gray-700">Status: {session.status}</p>
                <p className="text-gray-700">
                  Notes: {session.notes || "No notes"}
                </p>
                <p className="text-gray-500 text-sm">
                  Scheduled At: {new Date(session.scheduledAt).toLocaleString()}
                </p>

                {/* Display feedback if exists */}
                {session.feedbackText ? (
                  <div className="mt-2 p-2 bg-gray-100 rounded">
                    <p className="text-gray-700">
                      Feedback: {session.feedbackText}
                    </p>
                    <p className="text-gray-500 text-sm">
                      Rating: {session.feedbackRating} / 5
                    </p>
                  </div>
                ) : (
                  <div className="mt-2">
                    <FeedBack
                      sessionId={session.id}
                      onSuccess={fetchSessions} // refresh sessions after submitting feedback
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MentorSessions;
