import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <div className="bg-green-500 ">
      <div className="p-4 flex justify-between">
        <div>
          <h1 className="text-3xl font-bold">BayLon</h1>
        </div>
        <div className="flex">
          <ul className="hidden  space-x-6 mt-2 md:flex">
            <li className="font-semibold">
              <Link to="/">HOME</Link>{" "}
            </li>
            <li className="font-semibold">
              <a href="">ABOUT</a>{" "}
            </li>
            <li className="font-semibold">
              <a href="">MENTORS</a>{" "}
            </li>
            <li className="font-semibold">
              <a href="">CONTACT</a>{" "}
            </li>
            <li className="font-semibold border-2 px-2 py-0.5 bg-amber-900 text-amber-100 rounded-[6px]">
              <Link to="/Login/Sign_Up">Sign Up</Link>
            </li>
          </ul>
          <div className="block md:hidden mt-2">
            <i className="fas fa-bars text-2xl"></i>
          </div>
        </div>
      </div>
    </div>
  );
};
export default NavBar;
