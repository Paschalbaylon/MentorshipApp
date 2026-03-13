import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../api/auth";

const SignUpPage = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
    fullname: "",
    bio: "",
    skill: "",
    availability: "",
    role: "",
  });

  const [Errors, setErrors] = useState({});
  const [Submitting, setSubmitting] = useState(false);
  const [apiError, setApiError] = useState("");
  const [successMessage, setSuccessMessage] = useState(""); // New state for success message

  const validate = () => {
    const newErrors = {};

    if (!form.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) { // Fixed regex
      newErrors.email = "Invalid Email";
    }

    if (!form.password) {
      newErrors.password = "Password is required";
    } else if (form.password.length < 6) {
      newErrors.password = "Password shouldn't be less than 6 characters";
    }

    if (!form.fullname) {
      newErrors.fullname = "Full name is required";
    }

    if (!form.bio) {
      newErrors.bio = "Bio is required";
    }

    if (!form.skill) {
      newErrors.skill = "Skill is required";
    }

    if (!form.availability) {
      newErrors.availability = "Enter your days of availability";
    }

    if (!form.role) {
      newErrors.role = "Role field is required";
    }

    return newErrors;
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

    //resetting errors filed
    if (Errors[e.target.name]) {
      setErrors({ ...Errors, [e.target.name]: "" });
    }
    
    // Clear messages when user starts typing
    if (apiError) {
      setApiError("");
    }
    if (successMessage) {
      setSuccessMessage("");
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const FoundErrors = validate();

    if (Object.keys(FoundErrors).length > 0) {
      setErrors(FoundErrors);
      return;
    }

    setSubmitting(true);
    setApiError(""); // Clear any previous API errors
    setSuccessMessage(""); // Clear any previous success messages
    
    try {
      const result = await registerUser(form);
      console.log("Registered", result);
      
      // Show success message instead of alert
      setSuccessMessage("User created successfully! Redirecting to login...");
      
      // Clear form
      setForm({
        email: "",
        password: "",
        fullname: "",
        bio: "",
        skill: "",
        availability: "",
        role: "",
      });
      
      // Redirect after a short delay
      setTimeout(() => {
        navigate("/Login/Sign_In");
      }, 2000);
      
    } catch (error) {
      console.error("Registration error:", error);
      
      // Set API error message based on the error response
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        const errorMessage = error.response.data?.message || 
                            error.response.data?.error || 
                            `Server error: ${error.response.status}`;
        setApiError(errorMessage);
      } else if (error.request) {
        // The request was made but no response was received
        setApiError("No response from server. Please check your connection.");
      } else {
        // Something happened in setting up the request that triggered an Error
        setApiError(error.message || "Failed to submit form. Please try again.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-amber-50 py-4 sm:py-6 md:py-8 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 md:p-8">
          {/* Header with Title and Login Button */}
          <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row justify-between items-center gap-4">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold font-serif text-amber-900">
              REGISTER HERE
            </h2>
            
            {/* Login Button */}
            <button
              onClick={() => navigate("/Login/Sign_In")}
              className="w-full sm:w-auto px-6 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition duration-200 ease-in-out transform hover:scale-105 shadow-md hover:shadow-lg flex items-center justify-center gap-2"
            >
              <svg 
                className="w-5 h-5" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="2" 
                  d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" 
                />
              </svg>
              Already have an account? Login
            </button>
          </div>

          {/* Success Message Display */}
          {successMessage && (
            <div className="mb-6 p-4 bg-green-50 border-l-4 border-green-500 rounded-r-lg animate-pulse">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-green-700 font-medium">
                    {successMessage}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* API Error Message Display */}
          {apiError && (
            <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-r-lg">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700 font-medium">
                    {apiError}
                  </p>
                </div>
              </div>
              {/* Optional: Add a retry button for network errors */}
              {apiError.includes("No response from server") && (
                <button
                  onClick={handleRegister}
                  className="mt-2 text-sm text-red-600 hover:text-red-800 font-medium underline"
                >
                  Try again
                </button>
              )}
            </div>
          )}
          
          <form onSubmit={handleRegister} className="space-y-4 sm:space-y-6">
            {/* Email Field */}
            <div className="flex flex-col sm:flex-row sm:items-start gap-2">
              <label 
                htmlFor="email" 
                className="text-base sm:text-lg md:text-xl font-semibold min-w-[100px] sm:text-right"
              >
                Email:
              </label>
              <div className="flex-1 w-full">
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                  className={`w-full border rounded-lg px-3 sm:px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                    Errors.email ? "border-red-500" : "border-gray-300"
                  }`}
                  value={form.email}
                  onChange={handleChange}
                  required
                />
                {Errors.email && (
                  <p className="text-red-500 text-xs sm:text-sm mt-1">{Errors.email}</p>
                )}
              </div>
            </div>

            {/* Password Field */}
            <div className="flex flex-col sm:flex-row sm:items-start gap-2">
              <label 
                htmlFor="password" 
                className="text-base sm:text-lg md:text-xl font-semibold min-w-[100px] sm:text-right"
              >
                Password:
              </label>
              <div className="flex-1 w-full">
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Enter Your Password"
                  className={`w-full border rounded-lg px-3 sm:px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                    Errors.password ? "border-red-500" : "border-gray-300"
                  }`}
                  value={form.password}
                  onChange={handleChange}
                  required
                />
                {Errors.password && (
                  <p className="text-red-500 text-xs sm:text-sm mt-1">{Errors.password}</p>
                )}
              </div>
            </div>

            {/* Full Name Field */}
            <div className="flex flex-col sm:flex-row sm:items-start gap-2">
              <label 
                htmlFor="fullname" 
                className="text-base sm:text-lg md:text-xl font-semibold min-w-[100px] sm:text-right"
              >
                Full Name:
              </label>
              <div className="flex-1 w-full">
                <input
                  type="text"
                  id="fullname"
                  name="fullname"
                  placeholder="Enter your full name"
                  className={`w-full border rounded-lg px-3 sm:px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                    Errors.fullname ? "border-red-500" : "border-gray-300"
                  }`}
                  value={form.fullname}
                  onChange={handleChange}
                  required
                />
                {Errors.fullname && (
                  <p className="text-red-500 text-xs sm:text-sm mt-1">{Errors.fullname}</p>
                )}
              </div>
            </div>

            {/* Bio Field */}
            <div className="flex flex-col sm:flex-row sm:items-start gap-2">
              <label 
                htmlFor="bio" 
                className="text-base sm:text-lg md:text-xl font-semibold min-w-[100px] sm:text-right"
              >
                Bio:
              </label>
              <div className="flex-1 w-full">
                <textarea
                  id="bio"
                  name="bio"
                  placeholder="Enter your bio"
                  rows="3"
                  className={`w-full border rounded-lg px-3 sm:px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500 resize-y ${
                    Errors.bio ? "border-red-500" : "border-gray-300"
                  }`}
                  value={form.bio}
                  onChange={handleChange}
                  required
                />
                {Errors.bio && (
                  <p className="text-red-500 text-xs sm:text-sm mt-1">{Errors.bio}</p>
                )}
              </div>
            </div>

            {/* Skill Field */}
            <div className="flex flex-col sm:flex-row sm:items-start gap-2">
              <label 
                htmlFor="skill" 
                className="text-base sm:text-lg md:text-xl font-semibold min-w-[100px] sm:text-right"
              >
                Skill:
              </label>
              <div className="flex-1 w-full">
                <input
                  type="text"
                  id="skill"
                  name="skill"
                  placeholder="Enter your skill"
                  className={`w-full border rounded-lg px-3 sm:px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                    Errors.skill ? "border-red-500" : "border-gray-300"
                  }`}
                  value={form.skill}
                  onChange={handleChange}
                  required
                />
                {Errors.skill && (
                  <p className="text-red-500 text-xs sm:text-sm mt-1">{Errors.skill}</p>
                )}
              </div>
            </div>

            {/* Availability Field */}
            <div className="flex flex-col sm:flex-row sm:items-start gap-2">
              <label 
                htmlFor="availability" 
                className="text-base sm:text-lg md:text-xl font-semibold min-w-[100px] sm:text-right"
              >
                Availability:
              </label>
              <div className="flex-1 w-full">
                <input
                  type="text"
                  id="availability"
                  name="availability"
                  placeholder="Enter days of availability"
                  className={`w-full border rounded-lg px-3 sm:px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                    Errors.availability ? "border-red-500" : "border-gray-300"
                  }`}
                  value={form.availability}
                  onChange={handleChange}
                  required
                />
                {Errors.availability && (
                  <p className="text-red-500 text-xs sm:text-sm mt-1">{Errors.availability}</p>
                )}
              </div>
            </div>

            {/* Role Field */}
            <div className="flex flex-col sm:flex-row sm:items-start gap-2">
              <label 
                htmlFor="role" 
                className="text-base sm:text-lg md:text-xl font-semibold min-w-[100px] sm:text-right"
              >
                Role:
              </label>
              <div className="flex-1 w-full">
                <select
                  name="role"
                  value={form.role}
                  onChange={handleChange}
                  className={`w-full border rounded-lg px-3 sm:px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white ${
                    Errors.role ? "border-red-500" : "border-gray-300"
                  }`}
                  required
                >
                  <option value="" disabled>Select a role</option>
                  <option value="Admin">Admin</option>
                  <option value="Mentor">Mentor</option>
                  <option value="Mentee">Mentee</option>
                </select>
                {Errors.role && (
                  <p className="text-red-500 text-xs sm:text-sm mt-1">{Errors.role}</p>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center mt-6 sm:mt-8">
              <button
                type="submit"
                disabled={Submitting}
                className="w-full sm:w-96 py-2 sm:py-3 border rounded-lg bg-amber-800 hover:bg-amber-900 text-amber-100 font-semibold transition duration-200 ease-in-out cursor-pointer font-serif disabled:opacity-50 disabled:cursor-not-allowed text-base sm:text-lg"
              >
                {Submitting ? "Submitting..." : "REGISTER"}
              </button>
            </div>

            {/* Alternative Login Link for Mobile */}
            <div className="text-center sm:hidden mt-4 pt-4 border-t border-gray-200">
              <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => navigate("/Login/Sign_In")}
                  className="text-green-600 hover:text-green-700 font-semibold hover:underline"
                >
                  Login here
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;