import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { AuthContext } from "@/context/AuthProvider";
import { GrTransaction } from "react-icons/gr";
import swal from "sweetalert";
import { Helmet } from "react-helmet";

const ProductReview = () => {
  const [products, setProducts] = useState([]);
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleDropdown = (productId) => {
    setOpenDropdown(openDropdown === productId ? null : productId);
  };
  const navigate = useNavigate();
  const { setLoading } = useContext(AuthContext);

  useEffect(() => {
    // Fetch all products for review (mocked here)
    const fetchProducts = async () => {
      const response = await fetch(
        `${
          import.meta.env.VITE_BackendURL
        }/api/products?all=true&limit=${1000000}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = await response.json();

      if (response.ok) {
        setProducts(data.data);
      }
    };

    fetchProducts();
  }, []);

  console.log(products);

  const handleViewDetails = (productId) => {
    navigate(`/dashboard/moderator/product-details/${productId}`);
  };

  const handelUpdateStatus = async (productId, status, value) => {
    setLoading(true);
    const statusValue = {
      [status]: value, // Dynamically set the status key with its corresponding value
    };

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BackendURL}/api/products/${productId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json", // Ensure Content-Type is JSON
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(statusValue), // Directly stringify the dynamic object
        }
      );

      if (!response.ok) {
        setLoading(false);
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();

      setLoading(false);
      // Additional handling if needed
    } catch (error) {
      console.error("Failed to update status:", error);
      // Handle error (e.g., show a notification)
    }
  };

  const handleMakeFeatured = async (productId) => {
    try {
      swal({
        title: "Are you sure?",
        text: "Do want to Make this Product Featured",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          const featured = true;
          handelUpdateStatus(productId, "featured", featured);
          swal("Product marked as featured!", {
            icon: "success",
          });
        } else {
          swal("Product not marked as featured!", {
            icon: "error",
          });
        }
      });
      // setLoading(false);
    } catch (error) {
      console.error("Error marking product as featured:", error);
      toast.error("Failed to mark product as featured. Please try again.");
    }
  };

  const handleRemoveFeatured = async (productId) => {
    try {
      swal({
        title: "Are you sure?",
        text: "Do want to Remove this Product Featured",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          const featured = false;
          handelUpdateStatus(productId, "featured", featured);
          swal("Product marked as featured!", {
            icon: "success",
          });
        } else {
          swal("Product not marked as featured!", {
            icon: "error",
          });
        }
      });
    } catch (error) {
      console.error("Error marking product as featured:", error);
      toast.error("Failed to mark product as featured. Please try again.");
    }
  };

  const handleAccept = (productId) => {
    handelUpdateStatus(productId, "status", "accepted");
    setProducts(
      products.map((product) =>
        product.id === productId ? { ...product, status: "accepted" } : product
      )
    );
    toast.success("Product accepted!");
    // Add actual API call here
  };

  const handleReject = (productId) => {
    handelUpdateStatus(productId, "status", "rejected");
    setProducts(
      products.map((product) =>
        product.id === productId ? { ...product, status: "rejected" } : product
      )
    );
    toast.error("Product rejected!");
    // Add actual API call here
  };

  return (
    <div className="ml-0 md:ml-64 py-16 h-screen overflow-auto bg-gray-50">
      <Helmet>
        <title> Product Review - Product Hunt</title>
      </Helmet>
      <div className="w-11/12 mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
        <h2 className="text-3xl font-semibold text-center text-gray-900 mb-6">
          Product Review Queue
        </h2>

        {/* Table format for larger screens */}
        <div className="hidden md:block overflow-x-auto rounded-lg">
          <table className="min-w-full bg-white rounded-lg">
            <thead>
              <tr>
                <th className="py-4 px-6 text-left text-lg font-medium">
                  Product Image
                </th>
                <th className="py-4 px-6 text-left text-lg font-medium">
                  Product Name
                </th>
                <th className="py-4 px-6 text-left text-lg font-medium">
                  Featured Status
                </th>
                <th className="py-4 px-6 text-left text-lg font-medium">
                  Status
                </th>
                <th className="py-4 px-6 text-center text-lg font-medium">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="overflow-hidden">
              {products?.map((product) => (
                <tr
                  key={product._id}
                  className="border-b hover:bg-gray-50 relative"
                >
                  <td className="py-3 px-6 text-gray-800 font-medium">
                    <img
                      src={product.productImage}
                      className="w-12 h-12 rounded-md"
                      alt="Product"
                    />
                  </td>
                  <td className="py-3 px-6 text-gray-800 font-medium capitalize">
                    {product.productName}
                  </td>
                  <td
                    className={`py-3 px-6 font-bold ${
                      product.featured ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {product.featured ? "Featured" : "Not Featured"}
                  </td>
                  <td
                    className={`text-base text-gray-800 font-semibold py-4 px-5 flex justify-center mt-6 text-center capitalize badge badge-lg ${
                      product.status === "pending"
                        ? "text-yellow-500 bg-yellow-500/10"
                        : product.status.toLowerCase() === "accepted"
                        ? "text-green-500 bg-green-500/10"
                        : product.status === "rejected"
                        ? "text-red-500 bg-red-500/10"
                        : ""
                    }`}
                  >
                    {product.status}
                  </td>

                  <td className="py-3 px-6 text-center relative">
                    <button
                      onClick={() => toggleDropdown(product._id)}
                      className="bg-slate-800 text-white py-2 px-3 rounded-xl text-sm hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-300 transition"
                    >
                      <span className="flex items-center gap-x-1">
                        <GrTransaction /> Actions
                      </span>
                    </button>
                    {openDropdown === product._id && (
                      <div className="absolute right-0 font-bold mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-[1000]">
                        <ul className="py-1">
                          <li>
                            <Link
                              className="block px-4 py-2 btn-sm text-gray-800 hover:bg-gray-100 transition"
                              to={`/product/${product.slug}`}
                            >
                              View Product
                            </Link>
                          </li>
                          {product.featured ? (
                            <li>
                              <button
                                onClick={() =>
                                  handleRemoveFeatured(product._id)
                                }
                                className="w-full btn-sm block px-4 py-2 text-blue-800 hover:bg-gray-100 transition"
                              >
                                Remove Featured
                              </button>
                            </li>
                          ) : (
                            <li>
                              <button
                                onClick={() => handleMakeFeatured(product._id)}
                                className="w-full btn-sm block px-4 py-2 text-blue-600 hover:bg-gray-100 transition"
                              >
                                Mark as Featured
                              </button>
                            </li>
                          )}
                          <li>
                            <button
                              onClick={() => handleAccept(product._id)}
                              disabled={
                                product.status !== "pending" &&
                                product.status !== "rejected"
                              }
                              className={`w-full  block btn-sm  px-4 py-2 text-green-600 hover:bg-gray-100 transition ${
                                product.status !== "pending" &&
                                product.status !== "rejected"
                                  ? "opacity-50 cursor-not-allowed"
                                  : ""
                              }`}
                            >
                              Accept
                            </button>
                          </li>

                          <li>
                            <button
                              onClick={() => handleReject(product._id)}
                              disabled={
                                product.status !== "accepted" &&
                                product.status !== "pending"
                              }
                              className={`w-full btn-sm block px-4 py-2 text-red-600 hover:bg-gray-100 transition ${
                                product.status !== "accepted" &&
                                product.status !== "pending"
                                  ? "opacity-50 cursor-not-allowed"
                                  : ""
                              }`}
                            >
                              Reject
                            </button>
                          </li>
                        </ul>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Card format for smaller screens */}
        <div className="md:hidden grid grid-cols-1 gap-4 font-bold">
          {products?.map((product) => (
            <div
              key={product._id}
              className="bg-white p-4 shadow-md rounded-lg"
            >
              <div className="flex items-start space-x-4">
                <img
                  src={product.productImage}
                  className="w-16 h-16 rounded-md"
                  alt="Product"
                />
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 capitalize">
                    {product.productName}
                  </h3>
                  <p
                    className={`font-bold ${
                      product.featured ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {product.featured ? "Featured" : "Not Featured"}
                  </p>
                  <p
                    className={`text-sm text-gray-800 capitalize ${
                      product.status !== "pending"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    Status: {product.status}
                  </p>
                </div>
              </div>
              <div className="mt-4 flex justify-between items-center">
                <button
                  onClick={() => toggleDropdown(product._id)}
                  className="bg-slate-800 text-white py-2 px-3 rounded-xl text-sm hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-300 transition"
                >
                  <span className="flex items-center gap-x-1">
                    <GrTransaction /> Actions
                  </span>
                </button>
                {openDropdown === product._id && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-[1000]">
                    <ul className="py-1">
                      <li>
                        <Link
                          className="block px-4 py-2 text-gray-800 hover:bg-gray-100 transition"
                          to={`/product/${product.slug}`}
                        >
                          View Product
                        </Link>
                      </li>
                      {product.featured ? (
                        <li>
                          <button
                            onClick={() => handleRemoveFeatured(product._id)}
                            className="w-full text-left block px-4 py-2 text-gray-800 hover:bg-gray-100 transition"
                          >
                            Remove Featured
                          </button>
                        </li>
                      ) : (
                        <li>
                          <button
                            onClick={() => handleMakeFeatured(product._id)}
                            className="w-full text-left block px-4 py-2 text-gray-800 hover:bg-gray-100 transition"
                          >
                            Mark as Featured
                          </button>
                        </li>
                      )}
                      <li>
                        <button
                          onClick={() => handleAccept(product._id)}
                          disabled={product.status !== "pending"}
                          className={`w-full text-left block px-4 py-2 text-gray-800 hover:bg-gray-100 transition ${
                            product.status !== "pending"
                              ? "opacity-50 cursor-not-allowed"
                              : ""
                          }`}
                        >
                          Accept
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => handleReject(product._id)}
                          disabled={product.status !== "pending"}
                          className={`w-full text-left block px-4 py-2 text-gray-800 hover:bg-gray-100 transition ${
                            product.status !== "pending"
                              ? "opacity-50 cursor-not-allowed"
                              : ""
                          }`}
                        >
                          Reject
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductReview;
