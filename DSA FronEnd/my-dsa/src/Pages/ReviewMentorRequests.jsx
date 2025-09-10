import React, { useEffect, useState } from "react";
import {
  getReceivedRequests,
  updateRequestStatus,
  scheduleSession,
} from "../api/auth";

const ReviewMentorRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionError, setActionError] = useState(null); // ✅ For inline action errors
  const [successMessage, setSuccessMessage] = useState(null); // ✅ For inline success messages
  const [selectedReq, setSelectedReq] = useState(null);
  const [sessionDate, setSessionDate] = useState("");

  // Fetch received requests
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const data = await getReceivedRequests();
        console.log("Received requests:", data);
        setRequests(Array.isArray(data) ? data : data?.data ?? []);
      } catch (err) {
        if (
          err.response?.status === 404 ||
          err.response?.data?.includes("Mentor profile not found")
        ) {
          setError(
            "You don't have a mentor profile yet. Create one to start receiving requests."
          );
          setRequests([]);
        } else {
          console.error("Unexpected error fetching requests:", err);
          setError("Something went wrong while loading requests.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  // Handle status update
  const handleUpdateStatus = async (id, status) => {
    setActionError(null);
    setSuccessMessage(null);
    try {
      await updateRequestStatus(id, status);
      setRequests((prev) =>
        prev.map((req) => (req.id === id ? { ...req, status } : req))
      );
      setSuccessMessage(`Request ${status.toLowerCase()} successfully!`);
    } catch (err) {
      console.error("Failed to update status:", err);
      setActionError("Failed to update status. Please try again.");
    }
  };

  // Handle scheduling session
  const handleSchedule = async (req) => {
    setActionError(null);
    setSuccessMessage(null);

    if (!sessionDate) {
      setActionError("Please select a date and time.");
      return;
    }

    try {
      await scheduleSession({
        RequestId: req.id,
        Status: "Scheduled",
        Notes: "Kickoff meeting",
        ScheduledAt: sessionDate,
      });

      setSuccessMessage("Session scheduled successfully!");
      setSelectedReq(null);
      setSessionDate("");
    } catch (err) {
      console.error("Failed to schedule session:", err);
      setActionError(err?.response?.data || "Failed to schedule session.");
    }
  };

  if (loading) return <p className="text-gray-500">Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  const total = requests.length;
  const accepted = requests.filter((r) => r.status === "Accepted").length;
  const rejected = requests.filter((r) => r.status === "Rejected").length;

  return (
    <>
      <div className="hidden md:block max-w-4xl h-screen mx-auto p-4 md:p-6 bg-gray-100 shadow-md rounded-lg">
        <h2 className="text-2xl font-bold mb-6">Mentorship Requests</h2>

        {/* ✅ Feedback Messages */}
        {actionError && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
            {actionError}
          </div>
        )}
        {successMessage && (
          <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">
            {successMessage}
          </div>
        )}

        {/* ✅ Stats Section */}
        <div className="flex gap-4 mb-6">
          <div className="flex-1 bg-blue-100 text-blue-800 p-4 rounded-lg shadow">
            <p className="text-lg font-bold">{total}</p>
            <p className="text-sm">Total Requests</p>
          </div>
          <div className="flex-1 bg-green-100 text-green-800 p-4 rounded-lg shadow">
            <p className="text-lg font-bold">{accepted}</p>
            <p className="text-sm">Accepted</p>
          </div>
          <div className="flex-1 bg-red-100 text-red-800 p-4 rounded-lg shadow">
            <p className="text-lg font-bold">{rejected}</p>
            <p className="text-sm">Rejected</p>
          </div>
        </div>

        {requests.length === 0 ? (
          <p>No requests found.</p>
        ) : (
          <ul className="space-y-4 overflow-y-auto h-[370px]">
            {requests.map((req) => (
              <li
                key={req.id}
                className="border p-4 rounded-lg hover:shadow transition"
              >
                <p>
                  <strong>Message:</strong> {req.message}
                </p>
                <p>
                  <strong>Status:</strong>{" "}
                  <span
                    className={`font-semibold ${
                      req.status === "Accepted"
                        ? "text-green-600"
                        : req.status === "Rejected"
                        ? "text-red-600"
                        : "text-yellow-600"
                    }`}
                  >
                    {req.status}
                  </span>
                </p>
                <p>
                  <strong>Requested At:</strong>{" "}
                  {new Date(req.requestedAt).toLocaleString()}
                </p>

                {/* ✅ If pending, allow Accept/Reject */}
                {req.status === "Pending" && (
                  <div className="flex gap-2 mt-3">
                    <button
                      onClick={() => handleUpdateStatus(req.id, "Accepted")}
                      className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 cursor-pointer"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => handleUpdateStatus(req.id, "Rejected")}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 cursor-pointer"
                    >
                      Reject
                    </button>
                  </div>
                )}

                {/* ✅ If accepted, allow scheduling */}
                {req.status === "Accepted" && (
                  <div className="mt-3">
                    {selectedReq === req.id ? (
                      <div className="flex items-center gap-2">
                        <input
                          type="datetime-local"
                          value={sessionDate}
                          onChange={(e) => setSessionDate(e.target.value)}
                          className="border rounded px-2 py-1 text-sm cursor-pointer"
                        />
                        <button
                          onClick={() => handleSchedule(req)}
                          className="bg-green-600 text-white px-3 py-1 rounded text-sm cursor-pointer"
                        >
                          Confirm
                        </button>
                        <button
                          onClick={() => {
                            setSelectedReq(null);
                            setSessionDate("");
                          }}
                          className="bg-gray-400 text-white px-3 py-1 rounded text-sm cursor-pointer"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setSelectedReq(req.id)}
                        className="bg-blue-600 text-white px-3 py-1 rounded text-sm cursor-pointer"
                      >
                        Schedule a session
                      </button>
                    )}
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default ReviewMentorRequests;
