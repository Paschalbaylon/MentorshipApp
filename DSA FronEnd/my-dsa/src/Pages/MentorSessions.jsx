import React, { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import FeedBack from "./FeedBack";

const MentorSessions = () => {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchSessions = async () => {
    try {
      const response = await axiosInstance.get("/MentorshipSessions/mentor");
      setSessions(response.data || []);
      setError("");
    } catch (err) {
      if (err.response?.status === 404) {
        console.warn("No sessions found for this mentor.");
        setSessions([]);
        setError("");
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

  // Loading State
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mb-4"></div>
          <p className="text-gray-600 text-sm sm:text-base">Loading sessions...</p>
        </div>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8 max-w-md w-full text-center">
          <div className="text-red-500 mb-4">
            <svg className="h-12 w-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Error</h3>
          <p className="text-gray-600 text-sm sm:text-base mb-4">{error}</p>
          <button
            onClick={fetchSessions}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg transition duration-200 text-sm sm:text-base"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-4 sm:py-6 lg:py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800">
              My Mentor Sessions
            </h1>
            <p className="text-sm sm:text-base text-gray-600 mt-1">
              Manage and track all your mentorship sessions
            </p>
          </div>
          
          {/* Session Stats */}
          <div className="flex gap-3 sm:gap-4">
            <div className="bg-indigo-50 rounded-lg px-3 sm:px-4 py-2 text-center">
              <span className="block text-xl sm:text-2xl font-bold text-indigo-600">
                {sessions.length}
              </span>
              <span className="text-xs sm:text-sm text-gray-600">Total</span>
            </div>
            <div className="bg-green-50 rounded-lg px-3 sm:px-4 py-2 text-center">
              <span className="block text-xl sm:text-2xl font-bold text-green-600">
                {sessions.filter(s => s.status === "Completed").length}
              </span>
              <span className="text-xs sm:text-sm text-gray-600">Completed</span>
            </div>
          </div>
        </div>

        {/* Sessions List */}
        {sessions.length === 0 ? (
          <div className="bg-white rounded-lg shadow-lg p-8 sm:p-12 text-center">
            <div className="text-gray-400 mb-4">
              <svg className="h-16 w-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-gray-700 mb-2">No Sessions Found</h3>
            <p className="text-sm sm:text-base text-gray-500">
              You don't have any mentorship sessions scheduled yet.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {sessions.map((session) => (
              <div
                key={session.id}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col h-full"
              >
                {/* Session Header */}
                <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 px-4 sm:px-6 py-3 sm:py-4">
                  <div className="flex justify-between items-start">
                    <h3 className="text-base sm:text-lg font-semibold text-white truncate flex-1">
                      {session.menteeName}
                    </h3>
                    <span className={`ml-2 px-2 py-1 rounded-full text-xs font-semibold whitespace-nowrap
                      ${session.status === 'Completed' ? 'bg-green-200 text-green-800' :
                        session.status === 'Scheduled' ? 'bg-yellow-200 text-yellow-800' :
                        'bg-blue-200 text-blue-800'}`}>
                      {session.status}
                    </span>
                  </div>
                </div>

                {/* Session Details */}
                <div className="p-4 sm:p-6 flex-1">
                  <div className="space-y-3">
                    {/* Date & Time */}
                    <div className="flex items-start gap-2">
                      <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <div>
                        <p className="text-xs text-gray-500">Scheduled At</p>
                        <p className="text-sm text-gray-700">
                          {new Date(session.scheduledAt).toLocaleDateString(undefined, {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </p>
                        <p className="text-xs text-gray-500">
                          {new Date(session.scheduledAt).toLocaleTimeString(undefined, {
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </p>
                      </div>
                    </div>

                    {/* Notes */}
                    <div className="flex items-start gap-2">
                      <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <div>
                        <p className="text-xs text-gray-500">Notes</p>
                        <p className="text-sm text-gray-700 line-clamp-2">
                          {session.notes || "No notes provided"}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Feedback Section */}
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    {session.feedbackText ? (
                      <div className="space-y-2">
                        <div className="flex items-center gap-1">
                          <p className="text-xs text-gray-500">Rating:</p>
                          <div className="flex gap-0.5">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <svg
                                key={star}
                                className={`w-3 h-3 sm:w-4 sm:h-4 ${
                                  star <= session.feedbackRating
                                    ? 'text-yellow-400'
                                    : 'text-gray-300'
                                }`}
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                          </div>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Feedback:</p>
                          <p className="text-sm text-gray-700 bg-gray-50 p-2 rounded-lg">
                            {session.feedbackText}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="bg-gray-50 rounded-lg p-3">
                        <p className="text-xs text-gray-500 mb-2">No feedback yet</p>
                        <FeedBack
                          sessionId={session.id}
                          onSuccess={fetchSessions}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MentorSessions;