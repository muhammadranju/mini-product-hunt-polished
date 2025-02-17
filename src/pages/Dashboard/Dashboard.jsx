import React, { useState, useEffect } from "react";
import {
  FaUsers,
  FaProductHunt,
  FaRegThumbsUp,
  FaChartBar,
} from "react-icons/fa";
import { MdDashboard, MdRateReview } from "react-icons/md";
import { AiOutlineFileText } from "react-icons/ai";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

// Mock data for statistics (can be fetched from your server)
// const statisticsData = {
//   totalProducts: 1500,
//   acceptedProducts: 1300,
//   pendingProducts: 200,
//   totalReviews: 2500,
//   totalUsers: 500,
// };
const Dashboard = () => {
  const [productStatus, setProductStatus] = useState("pending");

  const [statisticsData, setStatisticsData] = useState({
    totalProducts: 0,
    acceptedProducts: 0,
    pendingProducts: 0,
    totalReviews: 0,
    totalUsers: 0,
  });

  useEffect(() => {
    // Fetching mock data for statistics (replace with actual API call)

    const fetchStatistics = async () => {
      const response = await fetch(
        `${import.meta.env.VITE_BackendURL}/api/products/statistics`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = await response.json();
      console.log(data.data);
      const statData = {
        totalProducts: data.data.products.total,
        acceptedProducts: data.data.products.accepted,
        pendingProducts: data.data.products.pending,
        totalReviews: data.data.reviews,
        totalUsers: data.data.users.total,
      };
      setStatisticsData(statData);
    };

    fetchStatistics();
  }, []);

  return (
    <>
      <main className="ml-0 md:ml-64 py-16 max-h-screen overflow-auto">
        <Helmet>
          <title>Dashboard - Product Hunt</title>
        </Helmet>
        <div className="min-h-screen bg-gray-50">
          <div className="container mx-auto py-10 px-5">
            {/* Dashboard Title */}
            <h1 className="text-4xl font-semibold text-gray-800 mb-10 text-center">
              Welcome to Your Dashboard
            </h1>

            {/* Statistics Section */}
            <div className="grid md:grid-cols-3 gap-10 mb-12 bg-gray-20 p-5 rounded-lg">
              <div className="p-6 border-2 border-white bg-gray-100  rounded-lg shadow text-gray-700  font-bold">
                <div className="flex items-center">
                  <FaProductHunt className="text-4xl mr-4 text-blue-600" />
                  <div>
                    <h3 className="text-lg font-semibold">Total Products</h3>
                    <p className="text-3xl font-bold">
                      {statisticsData.totalProducts}
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-6 border-2 border-white  bg-gray-100 rounded-lg shadow text-gray-700  font-bold">
                <div className="flex items-center">
                  <FaRegThumbsUp className="text-4xl mr-4 text-teal-500" />
                  <div>
                    <h3 className="text-lg font-semibold">Accepted Products</h3>
                    <p className="text-3xl font-bold">
                      {statisticsData.acceptedProducts}
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-6 border-2  border-white bg-gray-100  rounded-lg shadow text-gray-700  font-bold">
                <div className="flex items-center">
                  <FaUsers className="text-4xl mr-4 text-yellow-500" />
                  <div>
                    <h3 className="text-lg font-semibold">Total Users</h3>
                    <p className="text-3xl font-bold">
                      {statisticsData.totalUsers}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Product Status Section */}
            <div className="bg-white/10 p-6 rounded-lg shadow-lg mb-10">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                Product Status
              </h2>

              <div className="flex lg:flex-row flex-col justify-center items-center  gap-5">
                {/* Table for Product Reviews */}
                <div className="p-6 border-2 w-full border-white  bg-gray-100 rounded-lg shadow text-gray-700  font-bold">
                  <div className="flex items-center">
                    <MdRateReview className="text-4xl mr-4" />
                    <div>
                      <h3 className="text-lg font-semibold">
                        Total Padding Products
                      </h3>
                      <p className="text-3xl font-bold">
                        {statisticsData.pendingProducts}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="p-6 border-2 w-full border-white  bg-gray-100 rounded-lg shadow text-gray-700  font-bold">
                  <div className="flex items-center">
                    <AiOutlineFileText className="text-4xl  mr-4" />
                    <div>
                      <h3 className="text-lg">Total Reviews</h3>
                      <p className="text-3xl font-bold">
                        {statisticsData.totalReviews}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid md:grid-cols-3 gap-6">
              <div className="p-6 border-2  border-white bg-gray-100  rounded-lg shadow text-gray-700  font-bold">
                <Link to={"/dashboard/admin/statistics"}>
                  <div className="flex items-center">
                    <MdDashboard className="text-4xl mr-4" />
                    <div>
                      <h3 className="text-lg font-semibold">Statistics</h3>
                      <p className="text-sm">View statistics</p>
                    </div>
                  </div>
                </Link>
              </div>

              <div className="p-6 border-2  border-white bg-gray-100  rounded-lg shadow text-gray-700  font-bold">
                <Link to={"/dashboard/admin/manage-users"}>
                  <div className="flex items-center">
                    <FaChartBar className="text-4xl mr-4" />
                    <div>
                      <h3 className="text-lg font-semibold">Users </h3>
                      <p className="text-sm">Manage Users</p>
                    </div>
                  </div>
                </Link>
              </div>

              <div className="p-6 border-2  border-white bg-gray-100  rounded-lg shadow text-gray-700  font-bold">
                <Link to={"/dashboard/admin/manage-coupons"}>
                  <div className="flex items-center">
                    <MdRateReview className="text-4xl mr-4" />
                    <div>
                      <h3 className="text-lg font-semibold">Coupons</h3>
                      <p className="text-sm">Manage Coupons</p>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Dashboard;
