import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://mentorshipapp-m2k1.onrender.com", // 👈 backend URL goes here
});

// Add token to every request automatically
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
