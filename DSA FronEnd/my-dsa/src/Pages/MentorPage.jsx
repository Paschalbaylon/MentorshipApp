import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const MentorPage = () => {
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);

        const email =
          decoded[
            "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"
          ];

        setUserEmail(email || "Unknown Email");
      } catch (error) {
        console.error("Error decoding token:", error);
        setUserEmail("Invalid Token");
      }
    } else {
      setUserEmail("No Token Found");
    }
  }, []);
  return (
    <div className=" bg-gradient-to-r from-green-800 via-green-500 to-blue-400 h-screen overflow-hidden ">
      <div className="mx-auto max-w-3xl">
        <div className="mt-7 p-4 ">
          <div className="hidden md:block">
            <h2 className="text-center text-2xl font-bold font-serif text-amber-200">
              WelCome Mentor
            </h2>

            <h3 className="mt-10 text-amber-100 text-sm">
              Logged in as{" "}
              <span className="font-semibold text-amber-50">{userEmail}</span>
            </h3>
          </div>
          <div className="p-4 mt-4 border-none bg-amber-100 h-[250px] hidden md:block md:w-full rounded-[8px]">
            <div className=" py-5">
              <Link
                to="/mentor/profile"
                className=" bg-amber-700 text-amber-50 font-semibold  px-4 py-2 rounded-[8px] cursor-pointer hover:bg-amber-800 transition duration-200 ease-in"
              >
                View Profile
              </Link>
              <div className=" my-7  flex flex-col md:flex-row justify-between   ">
                <div className=" ">
                  <Link
                    to="/mentor/create-mentor"
                    className="block w-40 h-[65px] text-sm bg-amber-700 text-amber-50 font-semibold  px-4 py-2 rounded-[8px] cursor-pointer hover:bg-amber-800 transition duration-200 ease-in"
                  >
                    Configure Mentor <br /> Profile
                  </Link>
                </div>
                <div>
                  <Link
                    to="/mentor/Review-mentor-requests"
                    className="block w-40 h-[65px] text-sm bg-amber-700 text-amber-50 font-semibold  px-4 py-2 rounded-[8px] cursor-pointer hover:bg-amber-800 transition duration-200 ease-in"
                  >
                    Review mentor <br /> requests
                  </Link>
                </div>
                {/* <div>
                  <Link
                    to="/mentor/Feedback"
                    className="block w-40 h-[65px] text-sm bg-amber-700 text-amber-50 font-semibold  px-4 py-2 rounded-[8px] cursor-pointer hover:bg-amber-800 transition duration-200 ease-in"
                  >
                    Leave feedback <br /> on sessions
                  </Link>
                </div> */}
                <div>
                  <Link
                    to="/mentor/Schedule-Session"
                    className="block w-40 h-[65px] text-sm bg-amber-700 text-amber-50 font-semibold  px-4 py-2 rounded-[8px] cursor-pointer hover:bg-amber-800 transition duration-200 ease-in"
                  >
                    Sessions
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className=" mt-4 md:hidden mx-auto place-items-center ">
        <h2 className="text-center -mt-14 text-2xl font-bold font-serif text-amber-200">
          WelCome Mentor
        </h2>
        <div className="mr-8 ">
          <h3 className=" text-amber-100 text-sm mt-2">
            Logged in as{" "}
            <span className="font-semibold text-amber-50">{userEmail}</span>
          </h3>
          <div className=" mt-6 ">
            <Link
              to="/mentor/profile"
              className=" bg-amber-700 text-amber-50 font-semibold  px-4 py-2 rounded-[8px] cursor-pointer hover:bg-amber-800 transition duration-200 ease-in"
            >
              View Profile
            </Link>

            <div className="mt-6 grid grid-cols-2 gap-4 mx-auto ">
              <Link to="/mentor/create-mentor" className="  text-amber-50 ">
                <div className="bg-amber-700 w-[180px]  h-[200px] p-2 font-semibold rounded-[8px] cursor-pointer hover:bg-amber-800 transition duration-200 ease-in">
                  <h2 className="mt-16 text-center">
                    Configure Mentor Profile
                  </h2>
                </div>
              </Link>
              <Link
                to="/mentor/Review-mentor-requests"
                className=" text-amber-50 "
              >
                <div className="bg-amber-700 w-[180px] h-[200px] p-2 font-semibold rounded-[8px] cursor-pointer hover:bg-amber-800 transition duration-200 ease-in">
                  <h2 className="mt-16 text-center">Review mentor requests</h2>
                </div>
              </Link>
              {/* <Link to="/mentor/Feedback" className=" text-amber-50">
              <div className="bg-amber-700 w-[200px] h-[200px] p-2 font-semibold rounded-[8px] cursor-pointer hover:bg-amber-800 transition duration-200 ease-in">
                Leave feedback on sessions
              </div>
            </Link> */}
              <Link to="/mentor/Schedule-Session" className=" text-amber-50 ">
                <div className="bg-amber-700 w-[180px] h-[200px] p-2 font-semibold rounded-[8px] cursor-pointer hover:bg-amber-800 transition duration-200 ease-in">
                  <h2 className="mt-16 text-center">Sessions</h2>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default MentorPage;
