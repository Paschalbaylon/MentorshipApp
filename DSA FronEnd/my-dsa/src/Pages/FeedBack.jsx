import React, { useState } from "react";
import axios from "axios";

const FeedBack = ({ sessionId, onSuccess, onError }) => {
  const [rating, setRating] = useState(5);
  const [feedbackText, setFeedbackText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("User not logged in");

      await axios.put(
        `http://localhost:5116/api/MentorshipSessions/${sessionId}/feedback`,
        {
          FeedbackText: feedbackText,
          FeedbackRating: rating,
          FeedbackSubmittedAt: new Date().toISOString(),
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (onSuccess) onSuccess();
      setFeedbackText("");
      setRating(5);
    } catch (err) {
      if (onError) {
        onError(err); // send error to parent (MenteeSessions)
      } else {
        setError(err.response?.data || err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2">
      {error && <span className="text-red-500 text-sm">{error}</span>}

      <select
        value={rating}
        onChange={(e) => setRating(Number(e.target.value))}
        className="border rounded px-2 py-1 text-sm"
      >
        {[1, 2, 3, 4, 5].map((r) => (
          <option key={r} value={r}>
            {r}
          </option>
        ))}
      </select>

      <input
        type="text"
        value={feedbackText}
        onChange={(e) => setFeedbackText(e.target.value)}
        placeholder="Feedback..."
        className="border rounded px-2 py-1 flex-1 text-sm"
      />

      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 cursor-pointer"
      >
        {loading ? "..." : "Send"}
      </button>
    </form>
  );
};

export default FeedBack;
