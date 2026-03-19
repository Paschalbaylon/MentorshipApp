import axiosInstance from "./axiosInstance";

// ==========================
// AUTH
// ==========================

// Register new user
export async function registerUser(userData) {
  try {
    const response = await axiosInstance.post("/auth/Create-User", userData);
    return response.data;
  } catch (error) {
    console.error(
      "Failed to register user",
      error.response?.data || error.message
    );
    throw error;
  }
}

// Login user
export async function loginUser(credentials) {
  try {
    const response = await axiosInstance.post("/auth/Login", credentials);
    return response.data;
  } catch (error) {
    console.error("Failed to login", error.response?.data || error.message);
    throw error;
  }
}

// ==========================
// ADMIN
// ==========================

export async function admin() {
  try {
    // const response = await axiosInstance.get("/../admin/User");
    const response = await axiosInstance.get("/admin/User");
    return response.data;
  } catch (error) {
    console.error(
      "Failed to fetch admin data",
      error.response?.data || error.message
    );
    throw error;
  }
}

// ==========================
// USER PROFILE
// ==========================

export async function getMyProfile() {
  try {
    const response = await axiosInstance.get("/User/me");
    return response.data;
  } catch (error) {
    console.error(
      "Failed to fetch my profile",
      error.response?.data || error.message
    );
    throw error;
  }
}

export async function getUserById(id) {
  try {
    const response = await axiosInstance.get(`/User/${id}`);
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching user by ID:",
      error.response?.data || error.message
    );
    throw error;
  }
}

export async function updateMyProfile(updateData) {
  try {
    const response = await axiosInstance.put("/User/me/profile", updateData);
    return response.data;
  } catch (error) {
    console.error(
      "Error updating profile:",
      error.response?.data || error.message
    );
    throw error;
  }
}

// ==========================
// MENTOR PROFILE
// ==========================

export async function createMentorProfile(profileData) {
  try {
    const response = await axiosInstance.post(
      "/MentorshipRequest/Create",
      profileData
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error creating mentor profile:",
      error.response?.data || error.message
    );
    throw error;
  }
}

export async function updateMentorProfile(data) {
  try {
    const response = await axiosInstance.put("/MentorshipRequest/Update", {
      bio: data.bio,
      skill: data.skill,
      availability: data.availability,
    });
    return response.data;
  } catch (err) {
    console.error(
      "Error updating mentor profile:",
      err.response?.data || err.message
    );
    throw err;
  }
}

// ==========================
// MENTEE PROFILE
// ==========================

export async function createMenteeProfile(profileData) {
  try {
    const response = await axiosInstance.post(
      "/MentorshipRequest/create-mentee",
      profileData
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error creating mentee profile:",
      error.response?.data || error.message
    );
    throw error;
  }
}

export async function updateMenteeProfile(profileData) {
  try {
    const response = await axiosInstance.put(
      "/MentorshipRequest/Update-mentee",
      profileData
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error updating mentee profile:",
      error.response?.data || error.message
    );
    throw error;
  }
}

// ==========================
// MENTORSHIP REQUESTS
// ==========================

export async function sendMentorRequest(mentorId, message) {
  try {
    const response = await axiosInstance.post(
      "/MentorshipRequest/SendRequest",
      {
        mentorId,
        message,
      }
    );
    return response.data;
  } catch (error) {
    console.error(
      "Failed to send mentorship request:",
      error.response?.data || error.message
    );
    throw error;
  }
}

export async function getSendRequests() {
  try {
    const response = await axiosInstance.get("/MentorshipRequest/Sent");
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching sent requests:",
      error.response?.data || error.message
    );
    throw error;
  }
}

export async function getReceivedRequests() {
  try {
    const response = await axiosInstance.get("/MentorshipRequest/Received");
    return response.data;
  } catch (error) {
    if (error.response?.status === 404) {
      return [];
    }
    throw new Error("Could not load requests at the moment. Please try again.");
  }
}

export async function updateRequestStatus(requestId, status) {
  try {
    const response = await axiosInstance.put(
      `/MentorshipRequest/${requestId}`,
      { status }
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error updating request status:",
      error.response?.data || error.message
    );
    throw error;
  }
}

export async function getAvailableMentors() {
  try {
    const response = await axiosInstance.get(
      "/MentorshipRequest/AvailableMentors"
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching available mentors:",
      error.response?.data || error.message
    );
    throw error;
  }
}

// ==========================
// SESSIONS
// ==========================

export async function scheduleSession(sessionData) {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user?.id;

    const payload = {
      RequestId: Number(sessionData.RequestId),
      MentorId: sessionData.MentorId ?? userId,
      MenteeId: sessionData.MenteeId,
      Status: sessionData.Status || "Scheduled",
      Notes: sessionData.Notes || "",
      ScheduledAt: new Date().toISOString(),
    };

    const response = await axiosInstance.post("/MentorshipSessions", payload);
    return response.data;
  } catch (error) {
    console.error(
      "Error scheduling session:",
      error.response?.data || error.message
    );
    throw error;
  }
}

export async function getMentorSessions() {
  try {
    const response = await axiosInstance.get("/MentorshipSessions/mentor");
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching mentor sessions:",
      error.response?.data || error.message
    );
    throw error;
  }
}
