import { AuthContext } from "@/context/AuthProvider";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { LuExternalLink } from "react-icons/lu";
import { IoMdArrowRoundBack } from "react-icons/io";
import { FaChevronUp, FaCommentDots, FaRegCommentDots } from "react-icons/fa";
import toast from "react-hot-toast";
import useRole from "@/hooks/useRole";
import ReactStars from "react-rating-stars-component";
import { Helmet } from "react-helmet";
import ProductDetailsSkeleton from "@/components/Cards/ProductDetailsSkeleton";

const ProductDetails = () => {
  const [product, setProducts] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [reason, setReason] = useState("");
  const { user, setLoading } = useContext(AuthContext);
  const [isLiked, setIsLiked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [role] = useRole();
  // console.log(role.user.email);
  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    setIsLoading(true);
    const fetchProducts = async () => {
      const response = await fetch(
        `${import.meta.env.VITE_BackendURL}/api/products/${id}`,
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
        setIsLoading(false);
      }
    };
    fetchProducts();
    // setIsLoading(false);
  }, []);

  useEffect(() => {
    async function getReviews() {
      // setIsLoading(true);
      const reviewResponse = await fetch(
        `${import.meta.env.VITE_BackendURL}/api/reviews/${product?._id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const reviewData = await reviewResponse.json();
      setReviews(reviewData.data);
    }
    // setIsLoading(false);
    getReviews();
  }, [product]);

  const handelReviewSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const reviewDescription = e.target.reviewDescription.value;
    const rating = Number(e.target.rating.value);

    const response = await fetch(
      `${import.meta.env.VITE_BackendURL}/api/reviews`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          reviewText: reviewDescription,
          rating,
          productId: product?._id,
          name: user.displayName,
          image: user?.photoURL,
          email: user?.email,
        }),
      }
    );
    const data = await response.json();
    console.log(data);
    if (response.ok) {
      setLoading(false);
      toast.success("Review submitted successfully!");
    }
    setLoading(false);
  };
  const handleUpvote = async (productId, ownerId) => {
    if (!user) {
      navigate("/auth/login");
      return;
    }
    if (role?.user?.email === ownerId) {
      alert("You cannot upvote your own product.");
      return;
    }

    const response = await fetch(
      `${import.meta.env.VITE_BackendURL}/api/products/${productId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          upvotes: product?.upvotes + 1,
          productId: product?._id,
          userEmail: role?.user?.email,
        }),
      }
    );

    const data = await response.json();
    if (data.status === 200 || data.message.includes("Upvote successful")) {
      setIsLiked(true);
      toast.success("Upvote successful");
    }
    if (
      data.status === 400 ||
      data.message.includes("You already upvoted this product")
    ) {
      toast.error("You already upvoted this product");
    }
    console.log(data);
  };

  const handleReportReason = (response) => {
    document.getElementById("reportModal").showModal();
    setReason(response.target.value);
  };

  const handleReport = async (productId) => {
    // if (reason === "") {
    //   toast.error("Please provide a reason for reporting the product.");
    //   return;
    // }

    const response = await fetch(
      `${import.meta.env.VITE_BackendURL}/api/products/report/${productId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          productId: productId,
          reporterEmail: user.email,
          reason: reason,
        }),
      }
    );
    const data = await response.json();
    console.log(data);

    if (response.ok) {
      toast.success("Product reported successfully!");
      document.getElementById("reportModal").close();
    }

    if (
      data.status === 400 ||
      data.message.includes("You have already reported this product.")
    ) {
      toast.error("You already reported this product.");
      document.getElementById("reportModal").close();
    }
  };

  return (
    <div className="w-11/12 md:w-11/12 lg:w-11/12  xl:container mx-auto  mb-10">
      <Helmet>
        <title> Product Details - Product Hunt</title>
      </Helmet>
      <div className="min-h-screen mt-10">
        {isLoading ? (
          <ProductDetailsSkeleton />
        ) : (
          <div className="w-11/12  mx-auto bg-white p-8 shadow-lg rounded-lg">
            {/* Product Details Section */}
            <div className="mb-8">
              <button
                onClick={() => navigate(-1)}
                className="flex items-center p-2 px-3 bg-slate-800 rounded-2xl font-semibold text-gray-100 mb-4"
              >
                <IoMdArrowRoundBack />
                Back
              </button>
              <img
                src={product?.productImage}
                alt={product?.productName}
                className="w-full lg:h-[600px] rounded-md mb-4 object-cover"
              />
              <h2 className="text-3xl capitalize font-semibold text-gray-800 mb-4">
                {product?.productName}
              </h2>
              <p className="text-gray-700 text-lg mb-4">
                {product?.description}
              </p>
              <div className="flex items-center gap-4 mb-6">
                {/* <span className="bg-blue-100 text-blue-800 py-1 px-3 rounded-full text-sm">
                {product?.tags.map}
              </span> */}
                <div className="flex items-center space-x-2 space-y-1 flex-wrap my-4">
                  {product?.tags?.map((tag) => (
                    <div key={tag} className="badge badge-ghost text-sm">
                      {tag}
                    </div>
                  ))}
                </div>

                <a
                  href={product?.externalLinks}
                  target="_blank"
                  className="text-blue-500 hover:underline flex items-center gap-2"
                >
                  <LuExternalLink />
                  <button> Visit Product</button>
                </a>
              </div>
              <div className="flex items-center gap-4">
                <button
                  disabled={role?.user?.email === product?.owner?.ownerEmail}
                  className={`bg-slate-800 flex items-center text-white py-2 px-3 rounded-lg text-sm hover:bg-slate-700 transition  ${
                    user && role?.user?.email === product?.owner?.ownerEmail
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:bg-slate-600"
                  }`}
                  onClick={() =>
                    handleUpvote(product?._id, product?.owner?.ownerEmail)
                  }
                >
                  <FaChevronUp className="mr-1" />{" "}
                  {isLiked
                    ? `Upvote ${product?.upvotes + 1}`
                    : `  Upvote ${product?.upvotes}`}
                </button>
                <button
                  className="bg-red-500 text-white py-2 px-6 rounded-lg text-sm hover:bg-red-600 transition"
                  onClick={handleReportReason}
                >
                  Report
                </button>
              </div>
            </div>

            <div className="flex lg:flex-row flex-col-reverse  justify-center gap-5">
              {/* Reviews Section */}
              <div className=" lg:w-[65%]">
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                  Reviews
                </h3>
                {reviews?.length === 0 && (
                  <p className="text-center text-slate-800 text-2xl font-semibold">
                    No reviews yet.
                  </p>
                )}
                <div className="space-y-4">
                  {reviews?.map((review) => (
                    <div
                      key={review?._id}
                      className="p-4 bg-gray-50 rounded-lg shadow"
                    >
                      <div className="flex items-center gap-4 mb-2">
                        <img
                          src={review?.reviewer?.image}
                          alt={review?.reviewer?.name}
                          className="w-10 h-10 rounded-full"
                        />
                        <div>
                          <h4 className="text-gray-800 font-medium">
                            {review?.reviewer?.name}
                          </h4>
                          <p className="text-sm text-gray-500 flex items-center gap-x-2">
                            <ReactStars
                              count={review?.rating}
                              // onChange={ratingChanged}
                              size={24}
                              edit={false}
                              activeColor="#ffd700"
                              color={"#ffd700"}
                            />
                          </p>
                          <span className="text-gray-500 text-sm  ">
                            {new Date(review?.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      <p className="text-gray-700">{review?.reviewText}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Post Review Section */}
              <div className="lg:w-[35%]">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  Post a Review
                </h3>
                <form onSubmit={handelReviewSubmit} className="space-y-4">
                  <div className="flex items-center gap-4">
                    <img
                      src={user?.photoURL}
                      alt={user?.displayName}
                      className="w-12 h-12 rounded-full"
                    />
                    <div>
                      <p className="text-gray-800 font-medium">
                        {user?.displayName}
                      </p>
                      <input
                        type="hidden"
                        value={user?.displayName}
                        name="reviewerName"
                      />
                      <input
                        type="hidden"
                        value={user?.photoURL}
                        name="reviewerImage"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-1">
                      Review Description
                    </label>
                    <textarea
                      name="reviewDescription"
                      className="w-full p-3 border rounded-lg shadow-sm focus:ring focus:ring-blue-300"
                      rows="4"
                      required
                    ></textarea>
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-1">
                      Rating
                    </label>
                    <select
                      name="rating"
                      className="w-full p-3 border rounded-lg shadow-sm focus:ring focus:ring-blue-300"
                      required
                    >
                      <option value="">Select a Rating</option>
                      <option value="1">1 Star</option>
                      <option value="2">2 Stars</option>
                      <option value="3">3 Stars</option>
                      <option value="4">4 Stars</option>
                      <option value="5">5 Stars</option>
                    </select>
                  </div>
                  <button
                    type="submit"
                    className="bg-slate-800 w-full flex items-center gap-x-2 text-center justify-center  text-white py-3 px-6 rounded-lg  hover:bg-slate-700 transition"
                  >
                    Post Review <FaRegCommentDots />
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>

      <dialog id="reportModal" className="modal">
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg">Report Product</h3>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Reason
            </label>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Reason"
              required
            />
            <small className="text-red-500 font-semibold">
              {reason === "" ? "Please provide a reason." : ""}
            </small>
          </div>
          <button
            type="submit"
            onClick={() => handleReport(product?._id)}
            className="px-4 py-2 w-full mt-2 bg-blue-600 text-white rounded"
          >
            Report Product
          </button>
        </div>
      </dialog>
    </div>
  );
};

export default ProductDetails;
