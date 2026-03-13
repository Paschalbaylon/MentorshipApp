import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/auth";

const SignInPage = () => {
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role")?.toLowerCase();
    if (token && role) {
      if (role === "mentee") {
        navigate("/mentee");
      } else if (role === "mentor") {
        navigate("/mentor");
      } else if (role === "admin") {
        navigate("/admin");
      }
    }
  }, [navigate]);

  const validate = () => {
    const newErrors = {};

    if (!credentials.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(credentials.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!credentials.password) {
      newErrors.password = "Password is required";
    } else if (credentials.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    
    try {
      const response = await loginUser(credentials);
      console.log("Login Successfull", response);

      const userRole = response.role.toLowerCase();
      // Store token or login status
      localStorage.setItem("token", response.token); // adjust based on API
      localStorage.setItem("role", userRole);

      alert("Login Successful");

      if (userRole === "mentee") {
        navigate("/mentee");
      } else if (userRole === "mentor") {
        navigate("/mentor");
      } else if (userRole === "admin") {
        navigate("/admin");
      } else {
        alert("Unknown role: " + userRole);
      }
    } catch (error) {
      console.error("Login failed", error);
      alert("Invalid email or password");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-amber-100 py-4 sm:py-6 md:py-8 px-4 sm:px-6 flex items-center">
      <div className="max-w-7xl mx-auto w-full">
        <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8 md:p-10 max-w-md sm:max-w-lg md:max-w-2xl mx-auto">
          <div className="mb-6 sm:mb-8">
            <h2 className="text-center font-semibold text-2xl sm:text-3xl md:text-4xl font-serif text-amber-900">
              LOGIN HERE
            </h2>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
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
                  name="email"
                  id="email"
                  value={credentials.email}
                  onChange={handleChange}
                  placeholder="Enter Your Email"
                  className={`w-full border rounded-lg px-3 sm:px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.email && (
                  <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.email}</p>
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
                  name="password"
                  id="password"
                  value={credentials.password}
                  onChange={handleChange}
                  placeholder="Enter Your Password"
                  className={`w-full border rounded-lg px-3 sm:px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                    errors.password ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.password && (
                  <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.password}</p>
                )}
              </div>
            </div>

            {/* Forgot Password Link */}
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => navigate("/forgot-password")}
                className="text-sm text-amber-700 hover:text-amber-800 hover:underline font-medium"
              >
                Forgot Password?
              </button>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center mt-6 sm:mt-8">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-96 py-2 sm:py-3 border rounded-lg bg-green-700 hover:bg-green-800 text-amber-100 font-semibold transition duration-200 ease-in-out cursor-pointer font-serif disabled:opacity-50 disabled:cursor-not-allowed text-base sm:text-lg"
              >
                {isSubmitting ? "LOGGING IN..." : "LOGIN"}
              </button>
            </div>

            {/* Sign Up Link */}
            <div className="text-center mt-4">
              <p className="text-sm sm:text-base text-gray-600">
                Don't have an account?{" "}
                <button
                  type="button"
                  onClick={() => navigate("/signup")}
                  className="text-amber-700 hover:text-amber-800 hover:underline font-semibold"
                >
                  Sign Up
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;