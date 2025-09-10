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

  const validate = () => {
    const newErrors = {};

    if (!form.email) {
      newErrors.email = "Email is required";
    } else if (!/\S@\S+\.\S+/.test(form.email)) {
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
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const FoundErrors = validate();

    if (Object.keys(FoundErrors).length > 0) {
      setErrors(FoundErrors);
      return;
    }

    setSubmitting(true);
    try {
      const result = await registerUser(form);
      console.log("Registered", result);
      alert("User created successfully");

      // console.log("Navigating to SignIn page");
      navigate("/Login/Sign_In");
      setForm({
        email: "",
        password: "",
        fullname: "",
        bio: "",
        skill: "",
        availability: "",
        role: "",
      });
    } catch (error) {
      console.error(error);
      alert("Failed to submit form", error);
    } finally {
      setSubmitting(false); // always reset Submitting
    }
  };

  return (
    <div className="bg-amber-50 h-screen">
      <div className="mx-auto max-w-2xl ">
        <div className="p-4">
          <div className="mt-4">
            <h2 className="text-center text-2xl font-semibold font-serif">
              REGISTER HERE
            </h2>
          </div>
          <form onSubmit={handleRegister} className="mt-2">
            <div className="px-2 md:px-5">
              <div>
                <label htmlFor="email" className="text-[25px] font-semibold">
                  Email:{" "}
                </label>
                <input
                  type="text"
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                  className="mt-4 border rounded-[7px] px-4 py-1 ml-4 w-[285px] md:w-[493px]"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
                {Errors.email && (
                  <p className="text-red-500 text-sm">{Errors.email}</p>
                )}
              </div>
              <div>
                <label htmlFor="password" className="text-[25px] font-semibold">
                  Password:{" "}
                </label>
                <input
                  type="text"
                  id="password"
                  name="password"
                  placeholder="Enter Your Password"
                  className="mt-4 border rounded-[7px] px-4 py-1 ml-4 w-[238px] md:w-[452px]"
                  value={form.password}
                  onChange={handleChange}
                  required
                />
                {Errors.password && (
                  <p className="text-red-500 text-sm">{Errors.password}</p>
                )}
              </div>
              <div>
                <label htmlFor="fullname" className="text-[25px] font-semibold">
                  Full Name:{" "}
                </label>
                <input
                  type="text"
                  id="fullname"
                  name="fullname"
                  placeholder="Enter your full name"
                  className="mt-4 border rounded-[7px] px-4 py-1 ml-4 w-[230px] md:w-[446px]"
                  value={form.fullname}
                  onChange={handleChange}
                  required
                />
                {Errors.fullname && (
                  <p className="text-red-500 text-sm">{Errors.fullname}</p>
                )}
              </div>
              <div>
                <label htmlFor="bio" className="text-[25px] font-semibold">
                  Bio:{" "}
                </label>
                <textarea
                  type="text"
                  id="bio"
                  name="bio"
                  placeholder="Enter your bio"
                  className="mt-4 border rounded-[7px] px-4 py-1 ml-4 w-[313px] md:w-[524px]"
                  value={form.bio}
                  onChange={handleChange}
                  required
                ></textarea>
                {Errors.bio && (
                  <p className="text-red-500 text-sm">{Errors.bio}</p>
                )}
              </div>
              <div>
                <label htmlFor="skill" className="text-[25px] font-semibold">
                  Skill:{" "}
                </label>
                <input
                  type="text"
                  id="skill"
                  name="skill"
                  placeholder="Enter your skill"
                  className="mt-4 border rounded-[7px] px-4 py-1 ml-4 w-[305px] md:w-[515px]"
                  value={form.skill}
                  onChange={handleChange}
                  required
                />
                {Errors.skill && (
                  <p className="text-red-500 text-sm">{Errors.skill}</p>
                )}
              </div>
              <div>
                <label
                  htmlFor="availability"
                  className="text-[25px] font-semibold"
                >
                  Availability:{" "}
                </label>
                <input
                  type="text"
                  id="availability"
                  name="availability"
                  placeholder="Enter days of availability"
                  className="my-4 border rounded-[7px] px-4 py-1 ml-4 w-[230px] md:w-[440px]"
                  value={form.availability}
                  onChange={handleChange}
                  required
                />
                {Errors.availability && (
                  <p className="text-red-500 text-sm">{Errors.availability}</p>
                )}
              </div>
              <div>
                <label htmlFor="role" className="text-[25px] font-semibold">
                  Role:{" "}
                </label>
                <select
                  name="role"
                  value={form.role}
                  onChange={handleChange}
                  className="px-4 border ml-4 rounded-[7px] py-1 focus:outline-none shadow-sm"
                  required
                >
                  <option value="Admin">Admin</option>
                  <option value="Mentor">Mentor</option>
                  <option value="Mentee">Mentee</option>
                </select>
                {Errors.role && (
                  <p className="text-red-500 text-sm">{Errors.role}</p>
                )}
              </div>
            </div>
            <div className="px-4 md:ml-[130px] ">
              <button
                type="submit"
                disabled={Submitting}
                className="mt-7 py-2 border w-full md:w-[400px] rounded-[10px] bg-amber-800 hover:bg-amber-900 text-amber-100 font-semibold transition duration-200 ease-in-out cursor-pointer font-serif disabled:opacity-50"
              >
                {Submitting ? "Submitting..." : "REGISTER"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default SignUpPage;
