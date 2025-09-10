import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/auth";

const SignInPage = () => {
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({
      ...prev,
      [name]: value,
    }));
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

  const handleSubmit = async (e) => {
    e.preventDefault();
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
        alert("Unknown role" + userRole);
      }
    } catch (error) {
      console.error("Login failed", error);
      alert("Invalid email or password");
    }
  };
  return (
    <div className="bg-amber-100 h-screen">
      <div className="mx-auto max-w-2xl p-4">
        <div className="mt-30">
          <h2 className="text-center font-semibold text-2xl font-serif">
            LOGIN HERE
          </h2>
          <div className="mt-5">
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email" className="text-[25px] font-semibold">
                  Email:{" "}
                </label>
                <input
                  type="text"
                  name="email"
                  id="email"
                  value={credentials.email}
                  onChange={handleChange}
                  placeholder="Enter Your Email"
                  className=" border rounded-[7px] px-4 py-1 ml-4 w-[320px] md:w-[524px]"
                />
              </div>
              <div className="mt-5">
                <label htmlFor="password" className="text-[25px] font-semibold">
                  Password
                </label>
                <input
                  type="text"
                  name="password"
                  id="password"
                  value={credentials.password}
                  onChange={handleChange}
                  placeholder="Enter Your Password"
                  className=" border rounded-[7px] px-4 py-1 ml-4 w-[285px] md:w-[493px]"
                />
              </div>
              <div className="px-4 md:ml-[130px] mt-5">
                <button
                  type="submit"
                  className="mt-3 py-1 border w-full md:w-[400px] rounded-[10px] bg-green-700 hover:bg-green-800 text-amber-100 font-semibold transition duration-200 ease-in-out cursor-pointer font-serif"
                >
                  LOGIN
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SignInPage;
