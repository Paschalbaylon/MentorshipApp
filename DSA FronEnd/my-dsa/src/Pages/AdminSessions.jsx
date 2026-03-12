import React, { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";

const AdminSessions = () => {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [mentorId, setMentorId] = useState("");
  const [menteeId, setMenteeId] = useState("");
  const [selectedSession, setSelectedSession] = useState(null);

  const fetchSessions = async () => {
    try {
      const response = await axiosInstance.get("/sessions");
      setSessions(response.data);
    } catch (err) {
      setError(err.response?.data || "Failed to load sessions");
    } finally {
      setLoading(false);
    }
  };

  const handleAssign = async (sessionId) => {
    try {
      await axiosInstance.put(
        `/sessions/${sessionId}/assign?mentorId=${mentorId}&menteeId=${menteeId}`,
        {}
      );
      alert("Mentor assigned successfully!");
      setMentorId("");
      setMenteeId("");
      setSelectedSession(null);
      fetchSessions();
    } catch (err) {
      alert(err.response?.data || "Failed to assign mentor");
    }
  };

  useEffect(() => {
    fetchSessions();
  }, []);

  if (loading)
    return <p className="text-center text-gray-500">Loading sessions...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white shadow-lg rounded-2xl h-screen ">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        All Sessions (Admin)
      </h2>

      {sessions.length === 0 ? (
        <p className="text-gray-600">No sessions found.</p>
      ) : (
        <div className="space-y-4 overflow-y-auto h-[480px] ">
          {sessions.map((session) => (
            <div
              key={session.id}
              className="p-4 border rounded-xl shadow-sm hover:shadow-md transition"
            >
              <p className="font-semibold text-indigo-700">
                Session ID: {session.id}
              </p>
              <p className="text-gray-700">
                Mentor ID: {session.mentorId || "Unassigned"}
              </p>
              <p className="text-gray-700">
                Mentee ID: {session.menteeId || "Unassigned"}
              </p>
              <p className="text-gray-500 text-sm">
                Scheduled At: {new Date(session.scheduledAt).toLocaleString()}
              </p>

              {selectedSession === session.id ? (
                <div className="mt-4 space-y-2">
                  <input
                    type="number"
                    placeholder="Enter Mentor ID"
                    value={mentorId}
                    onChange={(e) => setMentorId(e.target.value)}
                    className="w-full border rounded px-3 py-2"
                  />
                  <input
                    type="number"
                    placeholder="Enter Mentee ID"
                    value={menteeId}
                    onChange={(e) => setMenteeId(e.target.value)}
                    className="w-full border rounded px-3 py-2"
                  />
                  <button
                    onClick={() => handleAssign(session.id)}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 cursor-pointer"
                  >
                    Assign
                  </button>
                  <button
                    onClick={() => setSelectedSession(null)}
                    className="ml-2 bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setSelectedSession(session.id)}
                  className="mt-3 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 cursor-pointer"
                >
                  Assign Mentor & Mentee
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminSessions;
