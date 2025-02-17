import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  MdAdminPanelSettings,
  MdAnalytics,
  MdDashboard,
  MdRateReview,
  MdReport,
  MdReviews,
} from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { IoMdAddCircle } from "react-icons/io";
import { AiFillProduct } from "react-icons/ai";
import { RiCoupon2Fill } from "react-icons/ri";
import { AuthContext } from "@/context/AuthProvider";
import useRole from "@/hooks/useRole";

const Sidebar = ({ isSidebarOpen }) => {
  const [role, isLoading] = useRole();
  const { signOut } = useContext(AuthContext);
  return (
    <aside
      className={`fixed inset-y-0 left-0 bg-white shadow-md max-h-screen w-64 mt-20 transition-transform transform ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      } md:translate-x-0`}
    >
      <div className="flex flex-col justify-between h-full">
        <div className="flex-grow">
          <div className="px-4 py-6 text-center">
            <h1 className="text-xl font-bold leading-none">
              <span className="text-slate-800">ProductHunt</span>{" "}
              <span className="text-blue-600">App</span>
            </h1>
          </div>
          <div className="p-4">
            <ul className="space-y-1">
              {role?.role === "admin" && (
                <li>
                  <NavLink
                    to="/dashboard"
                    end
                    className={({ isActive }) =>
                      `flex items-center py-2 px-3 text-sm rounded-lg hover:bg-slate-100 ${
                        isActive
                          ? "text-blue-600 bg-slate-100"
                          : "text-slate-600"
                      }`
                    }
                  >
                    <MdDashboard className="mr-2 text-lg" />
                    Dashboard
                  </NavLink>
                </li>
              )}

              {role?.role === "user" && (
                <>
                  <li>
                    <NavLink
                      to="/dashboard/user/my-profile"
                      className={({ isActive }) =>
                        `flex items-center py-2 px-3 text-sm rounded-lg hover:bg-slate-100 ${
                          isActive
                            ? "text-blue-600 bg-slate-100"
                            : "text-slate-600"
                        }`
                      }
                    >
                      <FaUser className="mr-2 text-lg" />
                      My Profile
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/dashboard/user/add-product"
                      className={({ isActive }) =>
                        `flex items-center py-2 px-3 text-sm rounded-lg hover:bg-slate-100 ${
                          isActive
                            ? "text-blue-600 bg-slate-100"
                            : "text-slate-600"
                        }`
                      }
                    >
                      <IoMdAddCircle className="mr-2 text-lg" />
                      Add Product
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/dashboard/user/my-product"
                      className={({ isActive }) =>
                        `flex items-center py-2 px-3 text-sm rounded-lg hover:bg-slate-100 ${
                          isActive
                            ? "text-blue-600 bg-slate-100"
                            : "text-slate-600"
                        }`
                      }
                    >
                      <AiFillProduct className="mr-2 text-lg" />
                      My Product
                    </NavLink>
                  </li>
                </>
              )}

              {role?.role === "moderator" && (
                <>
                  <li>
                    <NavLink
                      to="/dashboard/user/my-profile"
                      className={({ isActive }) =>
                        `flex items-center py-2 px-3 text-sm rounded-lg hover:bg-slate-100 ${
                          isActive
                            ? "text-blue-600 bg-slate-100"
                            : "text-slate-600"
                        }`
                      }
                    >
                      <FaUser className="mr-2 text-lg" />
                      My Profile
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/dashboard/moderator/product-review"
                      className={({ isActive }) =>
                        `flex items-center py-2 px-3 text-sm rounded-lg hover:bg-slate-100 ${
                          isActive
                            ? "text-blue-600 bg-slate-100"
                            : "text-slate-600"
                        }`
                      }
                    >
                      <MdRateReview className="mr-2 text-lg" />
                      Product Review
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/dashboard/moderator/reported-contents"
                      className={({ isActive }) =>
                        `flex items-center py-2 px-3 text-sm rounded-lg hover:bg-slate-100 ${
                          isActive
                            ? "text-blue-600 bg-slate-100"
                            : "text-slate-600"
                        }`
                      }
                    >
                      <MdReport className="mr-2 text-lg" />
                      Reported Contents
                    </NavLink>
                  </li>
                </>
              )}

              {role?.role === "admin" && (
                <>
                  <li>
                    <NavLink
                      to="/dashboard/user/my-profile"
                      className={({ isActive }) =>
                        `flex items-center py-2 px-3 text-sm rounded-lg hover:bg-slate-100 ${
                          isActive
                            ? "text-blue-600 bg-slate-100"
                            : "text-slate-600"
                        }`
                      }
                    >
                      <FaUser className="mr-2 text-lg" />
                      My Profile
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/dashboard/admin/statistics"
                      className={({ isActive }) =>
                        `flex items-center py-2 px-3 text-sm rounded-lg hover:bg-slate-100 ${
                          isActive
                            ? "text-blue-600 bg-slate-100"
                            : "text-slate-600"
                        }`
                      }
                    >
                      <MdAnalytics className="mr-2 text-lg" />
                      Statistics
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/dashboard/admin/manage-users"
                      className={({ isActive }) =>
                        `flex items-center py-2 px-3 text-sm rounded-lg hover:bg-slate-100 ${
                          isActive
                            ? "text-blue-600 bg-slate-100"
                            : "text-slate-600"
                        }`
                      }
                    >
                      <MdAdminPanelSettings className="mr-2 text-lg" />
                      Manage Users
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/dashboard/admin/manage-coupons"
                      className={({ isActive }) =>
                        `flex items-center py-2 px-3 text-sm rounded-lg hover:bg-slate-100 ${
                          isActive
                            ? "text-blue-600 bg-slate-100"
                            : "text-slate-600"
                        }`
                      }
                    >
                      <RiCoupon2Fill className="mr-2 text-lg" />
                      Manage Coupons
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/dashboard/admin/manage-reviews"
                      className={({ isActive }) =>
                        `flex items-center py-2 px-3 text-sm rounded-lg hover:bg-slate-100 ${
                          isActive
                            ? "text-blue-600 bg-slate-100"
                            : "text-slate-600"
                        }`
                      }
                    >
                      <MdReviews className="mr-2 text-lg" />
                      Manage Reviews
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
        <div className="p-4 cursor-pointer" onClick={signOut}>
          <Link to={"/"}>
            <button
              type="button"
              className="inline-flex items-center justify-center h-9 px-4 rounded-xl bg-red-600 text-slate-100 hover:text-white text-sm font-semibold transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M12 1a1 1 0 0 1 1 1v13h1.5a.5.5 0 0 1 0 1h-13a.5.5 0 0 1 0-1H3V2a1 1 0 0 1 1-1h8zm-2 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
              </svg>
              <span className="font-bold text-sm ml-2">Logout</span>
            </button>
          </Link>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
