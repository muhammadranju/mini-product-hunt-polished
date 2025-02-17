import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { MdDelete } from "react-icons/md";
import swal from "sweetalert";
import { Helmet } from "react-helmet";

const ReportedContents = () => {
  const [reportedProducts, setReportedProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch reported products (mocked here)
    const fetchReportedProducts = async () => {
      const response = await fetch(
        `${import.meta.env.VITE_BackendURL}/api/products/report/all`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = await response.json();
      // console.log(data);
      if (response.ok) {
        setReportedProducts(data.data);
      }
    };

    fetchReportedProducts();
  }, []);

  const handleDelete = async (productId) => {
    swal({
      title: "Are you sure?",
      text: "Do want to delete this Reported Content?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        await fetch(
          `${import.meta.env.VITE_BackendURL}/api/products/report/${productId}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setReportedProducts(
          reportedProducts.filter((product) => product._id !== productId)
        );
        toast.success("Reported Content deleted!");
        swal("Reported Content deleted!", {
          icon: "success",
        });
      } else {
        swal("Reported Content not deleted!", {
          icon: "error",
        });
      }
    });
  };
  return (
    <div className="ml-0 md:ml-64 py-16 h-screen overflow-auto bg-gray-50">
      <Helmet>
        <title> Reported Contents - Product Hunt</title>
      </Helmet>
      <div className="w-11/12 mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-semibold text-center mb-6">
          Reported Contents
        </h2>

        {/* Table format for larger screens */}
        <div className="hidden md:block">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Product Image</th>
                <th className="py-2 px-4 border-b">Product Name</th>
                <th className="py-2 px-4 border-b">User Email</th>
                <th className="py-2 px-4 border-b">Reason</th>
                <th className="py-2 px-4 border-b text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {reportedProducts.map((product) => (
                <tr key={product._id}>
                  <td className="py-2 px-4 border-b text-center">
                    <img
                      src={product?.productId?.productImage}
                      className="w-12 h-12 rounded-md"
                      alt="Product"
                    />
                  </td>
                  <td className="py-2 px-4 border-b text-center">
                    {product?.productId?.productName}
                  </td>
                  <td className="py-2 px-4 border-b text-xs text-center">
                    {product?.reporterEmail}
                  </td>
                  <td className="py-2 px-4 border-b text-center">
                    {product?.reason}
                  </td>
                  <td className="py-2 px-4 border-b text-center">
                    <button
                      className="bg-slate-800 text-white text-sm py-2 px-3 rounded-lg mr-2 hover:bg-slate-700"
                      onClick={() =>
                        navigate(`/product/${product?.productId?.slug}`)
                      }
                    >
                      View
                    </button>
                    <button
                      className="bg-red-500 text-white text-sm py-2 px-3 rounded-lg hover:bg-red-700"
                      onClick={() => handleDelete(product._id)}
                    >
                      <span className="flex items-center gap-x-1">
                        Delete <MdDelete />
                      </span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Card format for smaller screens */}
        <div className="md:hidden grid grid-cols-1 gap-4">
          {reportedProducts.map((product) => (
            <div key={product._id} className="bg-white p-4 shadow rounded-lg">
              <div className="flex items-center space-x-4">
                <img
                  src={product?.productId?.productImage}
                  className="w-16 h-16 rounded-md"
                  alt="Product"
                />
                <div>
                  <h3 className="text-lg font-semibold">
                    {product?.productId?.productName}
                  </h3>
                  <p className="text-xs text-gray-500">
                    {product?.reporterEmail}
                  </p>
                  <p className="text-sm text-gray-700 mt-1">
                    Reason: {product?.reason}
                  </p>
                </div>
              </div>
              <div className="flex justify-end space-x-2 mt-4">
                <button
                  className="bg-slate-800 text-white text-sm py-2 px-3 rounded-lg hover:bg-slate-700"
                  onClick={() =>
                    navigate(`/product/${product?.productId?.slug}`)
                  }
                >
                  View
                </button>
                <button
                  className="bg-red-500 text-white text-sm py-2 px-3 rounded-lg hover:bg-red-700"
                  onClick={() => handleDelete(product._id)}
                >
                  <span className="flex items-center gap-x-1">
                    Delete <MdDelete />
                  </span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReportedContents;
