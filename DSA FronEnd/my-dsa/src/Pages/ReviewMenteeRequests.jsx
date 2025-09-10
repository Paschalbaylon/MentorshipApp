import { useState, useEffect } from "react";
import { getSendRequests } from "../api/auth";

const ReviewMenteeRequests = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const loadRequests = async () => {
      try {
        setLoading(true);
        const data = await getSendRequests();
        console.log("Sent requests:", data);
        setRequests(data);
      } catch (err) {
        console.error("Failed to load requests:", err);

        // 👇 Check for 404 (mentee not created yet)
        if (err.response && err.response.status === 404) {
          setError("Create a mentee profile.");
        } else {
          setError("Failed to load sent requests. Please try again later.");
        }
      } finally {
        setLoading(false);
      }
    };
    loadRequests();
  }, []);

  return (
    <div className="p-4 max-w-2xl mx-auto mt-4">
      <div className="bg-gray-200 shadow rounded p-4 w-[440px]">
        <h2 className="text-xl font-bold mb-4">Your Sent Requests</h2>

        {loading && <p className="text-gray-600">Loading requests...</p>}

        {!loading && error && (
          <p className="text-red-600 mb-3 text-2xl ">{error}</p>
        )}

        {!loading && !error && requests.length === 0 && (
          <p className="text-gray-600">You haven’t sent any requests yet.</p>
        )}

        {!loading && !error && requests.length > 0 && (
          <ul className="divide-y divide-gray-200 max-h-64 overflow-y-auto pr-2">
            {requests.map((req, index) => (
              <li key={req.id || `req-${index}`} className="py-3">
                <div className="flex justify-between items-start ">
                  <div>
                    <p className="text-sm text-gray-700">
                      <span className="font-medium">Message:</span>{" "}
                      {req.message}
                    </p>
                    <p className="text-xs text-gray-500">
                      Sent on{" "}
                      {req.requestedAt
                        ? new Date(req.requestedAt).toLocaleString("en-NG", {
                            dateStyle: "medium",
                            timeStyle: "medium",
                            timeZone: "Africa/Lagos",
                          })
                        : "Unknown time"}
                    </p>
                  </div>
                  <span className="text-xs bg-blue-200 text-blue-800 px-2 py-1 rounded">
                    Request #{req.id ?? index + 1}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ReviewMenteeRequests;
