import { AuthContext } from "@/context/AuthProvider";
import React, { useContext } from "react";
import { FaProductHunt } from "react-icons/fa";
import { IoIosLogOut, IoMdLogIn } from "react-icons/io";
import { NavLink } from "react-router-dom";
import { LiaSignInAltSolid } from "react-icons/lia";

const Navbar = () => {
  const { user, signOut } = useContext(AuthContext);
  return (
    <div className="shadow sticky top-0 z-50 backdrop-blur-md bg-opacity-70 bg-white/70">
      <div className="navbar w-11/12 md:w-11/12 lg:w-11/12 xl:container mx-auto">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <NavLink to={"/"}>Home</NavLink>
              </li>
              <li>
                <NavLink to={"/products"}>Products</NavLink>
              </li>
            </ul>
          </div>
          <NavLink
            to={"/"}
            className="btn btn-ghost text-xl flex items-center hover:bg-transparent bg-transparent"
          >
            <span className="text-blue-600 font-bold text-4xl">
              <FaProductHunt />
            </span>{" "}
            <span className="text-slate-800 font-bold text-3xl -ml-2">
              hunt
            </span>
          </NavLink>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <NavLink
                className={({ isActive }) =>
                  `flex items-center py-2 px-3 text-sm rounded-lg hover:text-blue-600 hover:bg-transparent ${
                    isActive ? "text-blue-600 font-bold" : "text-slate-600"
                  }`
                }
                to={"/"}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) =>
                  `flex items-center py-2 px-3 text-sm rounded-lg hover:text-blue-600 hover:bg-transparent ${
                    isActive ? "text-blue-600 font-bold" : "text-slate-600"
                  }`
                }
                to={"/products"}
              >
                Products
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) =>
                  `flex items-center py-2 px-3 text-sm rounded-lg hover:text-blue-600 hover:bg-transparent ${
                    isActive ? "text-blue-600 font-bold" : "text-slate-600"
                  }`
                }
                to={"/products"}
              >
                Discount's
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) =>
                  `flex items-center py-2 px-3 text-sm rounded-lg hover:text-blue-600 hover:bg-transparent ${
                    isActive ? "text-blue-600 font-bold" : "text-slate-600"
                  }`
                }
                to={"/products"}
              >
                About Us
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) =>
                  `flex items-center py-2 px-3 text-sm rounded-lg hover:text-blue-600 hover:bg-transparent ${
                    isActive ? "text-blue-600 font-bold" : "text-slate-600"
                  }`
                }
                to={"/products"}
              >
                Contact Us
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="navbar-end">
          {!user && (
            <div className="flex gap-x-2">
              <NavLink
                to={"/auth/login"}
                className="px-4 py-3 flex items-center text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-slate-800 rounded-lg hover:bg-slate-700 focus:outline-none focus:ring focus:ring-slate-300 focus:ring-opacity-50"
              >
                <IoMdLogIn className="text-xl" /> Sign In
              </NavLink>
              <NavLink
                to={"/auth/signup"}
                className="px-6 py-3 lg:flex hidden text-sm font-medium tracking-wide text-white capitalize rounded-lg transition-colors duration-300 transform  bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring focus:ring-slate-300 focus:ring-opacity-50"
              >
                Sign Up
              </NavLink>
            </div>
          )}
          {user && (
            <details className="dropdown">
              <summary className="btn m-1 bg-transparent border-none hover:bg-transparent shadow-none">
                <div className="flex items-center justify-start space-x-1">
                  <div
                    className="dropdown bg-white/70 rounded-full  border-2 tooltip tooltip-bottom"
                    data-tooltip-id="my-tooltip"
                  >
                    <img
                      src={
                        user?.photoURL ||
                        "https://avatars.githubusercontent.com/u/80270685?v=4"
                      }
                      className="lg:w-12 w-14  rounded-full    p-1"
                      alt=""
                    />
                  </div>
                  <div className="text-start lg:flex flex-col hidden">
                    <p className="text-base ">{user?.displayName}</p>
                    <span className="text-xs">My Account</span>
                  </div>
                </div>
              </summary>
              <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] lg:-ml-10 -ml-12 lg:w-44 p-2 shadow">
                <li className="text-lg font-semibold ml-4 text-slate-800">
                  {user?.displayName}
                </li>
                <li className="text-lg text-slate-800">
                  <NavLink to={"/dashboard/user/my-profile"}>Dashboard</NavLink>
                </li>
                <li>
                  <button
                    onClick={signOut}
                    className="btn mt-1 bg-red-600 text-white hover:bg-red-700 "
                  >
                    <IoIosLogOut className="text-xl font-bold" />
                    Log Out
                  </button>
                </li>
              </ul>
            </details>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
