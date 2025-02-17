import { AuthContext } from "@/context/AuthProvider";
import React, { useState, useEffect, useContext } from "react";
import toast from "react-hot-toast";
import swal from "sweetalert";
import ReactStars from "react-rating-stars-component";
import { MdDelete } from "react-icons/md";
import { Helmet } from "react-helmet";

const ManageReviews = () => {
  const [users, setUsers] = useState([]);
  const { setLoading, user } = useContext(AuthContext);

  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    // Fetch users (mocked here)
    const fetchProducts = async () => {
      const response = await fetch(
        `${import.meta.env.VITE_BackendURL}/api/reviews`,
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
        setReviews(data.data);
      }
    };

    fetchProducts();
  }, []);

  console.log(reviews);
  const handleDeleteReview = async (reviewId) => {
    try {
      swal({
        title: "Are you sure?",
        text: "Do want to delete this Review?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then(async (willDelete) => {
        if (willDelete) {
          await fetch(
            `${import.meta.env.VITE_BackendURL}/api/reviews/${reviewId}`,
            {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
          swal("Review deleted!", {
            icon: "success",
          });
          setReviews(reviews.filter((review) => review._id !== reviewId));
          toast.success("Review deleted!");
        } else {
          swal("Review not deleted!", {
            icon: "error",
          });
        }
      });
    } catch (error) {
      console.error("Error deleting review:", error);
    }
  };
  return (
    <div className="ml-0 md:ml-64 py-16 h-screen overflow-auto bg-gray-50">
      <Helmet>
        <title> Manage Reviews - Product Hunt</title>
      </Helmet>
      <div className="w-11/12 mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-semibold text-center mb-6">
          Manage Reviews
        </h2>
        <div className="hidden md:block">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Image</th>
                <th className="py-2 px-4 border-b">Name</th>
                <th className="py-2 px-4 border-b">Review's</th>
                <th className="py-2 px-4 border-b">Rating's</th>
                <th className="py-2 px-4 border-b">Email</th>
                <th className="py-2 px-4 border-b text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {reviews?.map((review) => (
                <tr key={review._id}>
                  <td className="py-2 px-4 border-b">
                    <img
                      src={review.reviewer.image}
                      className="w-12 h-12 rounded-md"
                      alt="review"
                    />
                  </td>
                  <td className="py-2 px-4 border-b text-center">
                    {review.reviewer.name}
                  </td>
                  <td className="py-2 px-4 text-xs border-b text-center">
                    {review.reviewText}
                  </td>
                  <td className="py-2 px-4 border-b text-center">
                    <span className="flex items-center justify-center gap-x-2">
                      <ReactStars
                        count={review?.rating}
                        size={24}
                        edit={false}
                        activeColor="#ffd700"
                        color={"#ffd700"}
                      />
                    </span>
                  </td>
                  <td className="py-2 px-4 border-b text-center">
                    {review.reviewer.email}
                  </td>

                  <td className="py-2 px-4 border-b capitalize font-medium  text-center">
                    <button
                      onClick={() => handleDeleteReview(review._id)}
                      className="text-slate-100 bg-red-600 p-2 rounded-xl px-3  flex items-center gap-x-1 hover:bg-red-700"
                    >
                      Remove <MdDelete />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="block md:hidden ">
          {reviews?.map((review) => (
            <div
              key={review._id}
              className="p-4 mb-4 border rounded-lg bg-white"
            >
              <div className="flex items-center mb-4">
                <img
                  src={review.reviewer.image}
                  className="w-12 h-12 rounded-md mr-4"
                  alt="review"
                />
                <div>
                  <h3 className="text-lg font-semibold">
                    {review.reviewer.name}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {review.reviewer.email}
                  </p>
                  <p className="text-sm text-gray-600">
                    <ReactStars
                      count={review?.rating}
                      size={24}
                      edit={false}
                      activeColor="#ffd700"
                      color={"#ffd700"}
                    />
                  </p>
                </div>
              </div>
              <div className="text-sm mb-2 w-full overflow-hidden">
                <span className="font-semibold mr-1">Review:</span>
                <p className="whitespace-normal break-words">
                  {review.reviewText}
                </p>
              </div>

              <div className="text-sm mb-2  ">
                <button
                  onClick={() => handleDeleteReview(review._id)}
                  className="text-slate-100 bg-red-600 p-2 rounded-xl px-3  flex items-center gap-x-1 hover:bg-red-700"
                >
                  Remove <MdDelete />
                </button>
              </div>

              {/* <div className="text-center">
                <button
                  className={`bg-blue-600 text-white py-1 px-3 rounded-lg mr-2 hover:bg-blue-700 ${
                    review.role === "Moderator" && "opacity-50 cursor-not-allowed"
                  }`}
                  onClick={() => handleMakeModerator(review.email)}
                  disabled={review.role === "Moderator"}
                >
                  Moderator
                </button>
                <button
                  className={`bg-slate-800 text-white py-1 px-3 rounded-lg hover:bg-slate-700 ${
                    review.role === "Admin" && "opacity-50 cursor-not-allowed"
                  }`}
                  onClick={() => handleMakeAdmin(review.email)}
                  disabled={review.role === "Admin"}
                >
                  Admin
                </button>
              </div> */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ManageReviews;
