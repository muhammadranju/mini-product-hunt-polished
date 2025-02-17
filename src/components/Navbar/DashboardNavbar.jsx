import { AuthContext } from "@/context/AuthProvider";
import React, { useContext } from "react";
import { FaProductHunt } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const DashboardNavbar = ({ toggleSidebar }) => {
  const { user } = useContext(AuthContext);
  return (
    <header className="fixed right-0 top-0 left-0 bg-white shadow py-4 px-4 h-20 z-10">
      <div className="max-w-screen-2xl mx-auto flex items-center justify-between">
        <button
          type="button"
          onClick={toggleSidebar}
          className="text-gray-600 hover:text-yellow-600 focus:outline-none md:hidden"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            className="bi bi-list"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M2.5 12a.5.5 0 0 1 0-1h11a.5.5 0 0 1 0 1h-11zm0-4a.5.5 0 0 1 0-1h11a.5.5 0 0 1 0 1h-11zm0-4a.5.5 0 0 1 0-1h11a.5.5 0 0 1 0 1h-11z"
            />
          </svg>
        </button>
        <div className="text-lg font-bold pb-5 ">
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
        <div>
          <div className="flex items-center justify-start space-x-1 mb-6">
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
        </div>
      </div>
    </header>
  );
};

export default DashboardNavbar;
