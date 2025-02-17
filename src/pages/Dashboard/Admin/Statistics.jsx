import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
} from "chart.js";
import { Helmet } from "react-helmet";

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale);

const Statistics = () => {
  const [statistics, setStatistics] = useState({
    totalProducts: { accepted: 0, pending: 0, all: 0 },
    totalReviews: 0,
    totalUsers: 0,
  });

  useEffect(() => {
    // Fetching mock data for statistics (replace with actual API call)

    const fetchStatistics = async () => {
      const mockData = {
        totalProducts: { accepted: 120, pending: 40, all: 160 },
        totalReviews: 320,
        totalUsers: 250,
      };
      // setStatistics(mockData);

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
      const chartData = {
        totalProducts: {
          accepted: data.data.products.accepted,
          pending: data.data.products.pending,
          all: data.data.products.total,
        },
        totalReviews: data.data.reviews,
        totalUsers: data.data.users.total,
      };
      setStatistics(chartData);
      // if (response.ok) {
      //   setUsers(data.data);
      // }
    };

    fetchStatistics();
  }, []);

  // Pie chart data
  const chartData = {
    labels: [
      "Accepted Products",
      "Pending Products",
      "All Products",
      "Reviews",
      "Users",
    ],
    datasets: [
      {
        label: "Admin Statistics",
        data: [
          statistics.totalProducts.accepted,
          statistics.totalProducts.pending,
          statistics.totalProducts.all,
          statistics.totalReviews,
          statistics.totalUsers,
        ],
        backgroundColor: [
          "rgba(54, 162, 235, 0.6)", // Accepted Products
          "rgba(255, 159, 64, 0.6)", // Pending Products
          "rgba(75, 192, 192, 0.6)", // All Products
          "rgba(153, 102, 255, 0.6)", // Reviews
          "rgba(255, 99, 132, 0.6)", // Users
        ],
        borderColor: [
          "rgba(54, 162, 235, 1)",
          "rgba(255, 159, 64, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 99, 132, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="ml-0 md:ml-64 py-16 max-h-screen overflow-auto bg-gray-50">
      <Helmet>
        <title> Admin Statistics - Product Hunt</title>
      </Helmet>
      <div className="max-w-6xl mx-auto mt-10 p-6 rounded-lg">
        <h2 className="text-2xl font-semibold text-center mb-6">
          Admin Statistics
        </h2>
        <div className="flex justify-center">
          <div className="w-full lg:w-2/3">
            <Pie data={chartData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
