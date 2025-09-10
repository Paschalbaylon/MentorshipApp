import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const MenteePage = () => {
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
    <>
      <div className=" bg-gradient-to-r from-teal-400 via-blue-500 to-indigo-600 h-screen overflow-hidden">
        <div className="mx-auto max-w-3xl">
          <div className="mt-7 p-4 ">
            <div className="hidden md:block">
              <h2 className="text-center text-2xl font-bold font-serif text-amber-200">
                WelCome Mentee
              </h2>

              <h3 className="mt-10 text-amber-50 text-md font-semibold">
                Logged in as{" "}
                <span className="font-semibold text-amber-100">
                  {userEmail}
                </span>
              </h3>
            </div>
            <div className="p-4 mt-4 border-none bg-amber-100 h-[250px] hidden md:block md:w-full rounded-[8px]">
              <div className=" py-5">
                <Link
                  to="/mentee/profile"
                  className=" bg-amber-700 text-amber-50 font-semibold  px-4 py-2 rounded-[8px] cursor-pointer hover:bg-amber-800 transition duration-200 ease-in"
                >
                  View Profile
                </Link>
                <div className=" my-7  flex flex-col md:flex-row justify-between   ">
                  <div>
                    <Link
                      to="/mentee/configure-mentee-profile"
                      className="block w-40 h-[65px] text-sm bg-amber-700 text-amber-50 font-semibold  px-4 py-2 rounded-[8px] cursor-pointer hover:bg-amber-800 transition duration-200 ease-in"
                    >
                      Configure mentee <br /> Profile
                    </Link>
                  </div>
                  <div className=" ">
                    <Link
                      to="/mentee/send-mentor-request"
                      className="block w-40 h-[65px] text-sm bg-amber-700 text-amber-50 font-semibold  px-4 py-2 rounded-[8px] cursor-pointer hover:bg-amber-800 transition duration-200 ease-in"
                    >
                      Send Mentor <br /> Request
                    </Link>
                  </div>
                  <div>
                    <Link
                      to="/mentee/Review-mentee-requests"
                      className="block w-40 h-[65px] text-sm bg-amber-700 text-amber-50 font-semibold  px-4 py-2 rounded-[8px] cursor-pointer hover:bg-amber-800 transition duration-200 ease-in"
                    >
                      Review mentee <br /> requests
                    </Link>
                  </div>

                  <div>
                    <Link
                      to="/mentee/Schedule-Session"
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

        <div className=" md:hidden mx-auto place-items-center ">
          <h2 className="text-center -mt-8 text-2xl font-bold font-serif text-amber-200">
            WelCome Mentee
          </h2>
          <h3 className=" text-amber-100 text-sm mt-2">
            Logged in as{" "}
            <span className="font-semibold text-amber-50">{userEmail}</span>
          </h3>
          <div className=" mt-6">
            <Link
              to="/mentee/profile"
              className=" bg-amber-700 text-amber-50 font-semibold  px-4 py-2 rounded-[8px] cursor-pointer hover:bg-amber-800 transition duration-200 ease-in"
            >
              View Profile
            </Link>

            <div className=" mt-6 grid grid-cols-2 gap-2 mx-auto mr-[22px] ">
              <Link
                to="/mentee/send-mentor-request"
                className="  text-amber-50 "
              >
                <div className="bg-amber-700 w-[200px]  h-[200px] p-2 font-semibold rounded-[8px] cursor-pointer hover:bg-amber-800 transition duration-200 ease-in">
                  <h2 className="mt-16 text-center">
                    View or manage your Sessions
                  </h2>
                </div>
              </Link>
              <Link
                to="/mentee/Review-mentee-requests"
                className=" text-amber-50 "
              >
                <div className="bg-amber-700 w-[200px] h-[200px] p-2 font-semibold rounded-[8px] cursor-pointer hover:bg-amber-800 transition duration-200 ease-in">
                  <h2 className="mt-16 text-center">Review mentee requests</h2>
                </div>
              </Link>
              <Link
                to="/mentee/configure-mentee-profile"
                className=" text-amber-50"
              >
                <div className="bg-amber-700 w-[200px] h-[200px] p-2 font-semibold rounded-[8px] cursor-pointer hover:bg-amber-800 transition duration-200 ease-in">
                  <h2 className="mt-16 text-center">
                    Leave feedback on sessions
                  </h2>
                </div>
              </Link>
              <Link to="/mentee/Schedule-Session" className=" text-amber-50 ">
                <div className="bg-amber-700 w-[200px] h-[200px] p-2 font-semibold rounded-[8px] cursor-pointer hover:bg-amber-800 transition duration-200 ease-in">
                  <h2 className="mt-16 text-center">Sessions</h2>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default MenteePage;
