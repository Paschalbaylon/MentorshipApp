import React, { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import FeedBack from "./FeedBack";

const MenteeSessions = () => {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [feedbackError, setFeedbackError] = useState("");

  const fetchSessions = async () => {
    try {
      const response = await axiosInstance.get("/MentorshipSessions/mentee");
      setSessions(response.data);
      setError("");
    } catch (err) {
      if (err.response?.status === 404) {
        setSessions([]);
        setError("You don't have any sessions yet. Once your mentor schedules one, it will appear here.");
      } else {
        setError("Failed to load sessions. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Handle feedback submission errors (403 from backend)
  const handleFeedbackError = (err) => {
    if (err.response?.status === 403) {
      setFeedbackError(
        err.response.data || "You are not allowed to submit feedback."
      );
    } else {
      setFeedbackError("Something went wrong while submitting feedback.");
    }
  };

  useEffect(() => {
    fetchSessions();
  }, []);

  if (loading)
    return <p className="text-center text-gray-500">Loading sessions...</p>;

  return (
    <div className="max-w-4xl h-screen mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        My Mentee Sessions
      </h2>

      {error && (
        <div className="p-4 mb-4 bg-yellow-100 border border-yellow-300 rounded-lg text-yellow-800">
          {error}
        </div>
      )}

      {feedbackError && (
        <div className="p-4 mb-4 bg-red-100 border border-red-300 rounded-lg text-red-800">
          {feedbackError}
        </div>
      )}

      {sessions.length === 0 && !error ? (
        <p className="text-gray-600">No sessions found.</p>
      ) : (
        <div className="overflow-y-auto h-[500px] mr-6 md:mr-0">
          <div className="grid gap-4">
            {sessions.map((session) => (
              <div
                key={session.id}
                className="p-4 bg-white rounded-2xl shadow hover:shadow-lg transition"
              >
                <p className="text-lg font-semibold text-indigo-600">
                  Mentor: {session.mentorName}
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
                  // Show feedback form if no feedback yet
                  <div className="mt-2">
                    <FeedBack
                      sessionId={session.id}
                      onSuccess={fetchSessions}
                      onError={handleFeedbackError} // 👈 catch backend errors
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

export default MenteeSessions;
