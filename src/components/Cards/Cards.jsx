import { AuthContext } from "@/context/AuthProvider";
import useRole from "@/hooks/useRole";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { FaChevronUp } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import InteractiveHoverButton from "../ui/interactive-hover-button";

const Cards = ({ product }) => {
  const { user } = useContext(AuthContext);
  const [isLiked, setIsLiked] = useState(false);
  const [role] = useRole();
  const navigate = useNavigate();

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
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
      <Link to={`/product/${product?.slug}`}>
        <img
          className="w-full h-64 object-cover rounded-md mb-4"
          src={product?.productImage}
          alt={`Trending Product `}
        />
      </Link>
      <Link to={`/product/${product?.slug}`}>
        <h4 className="text-xl cursor-pointer font-semibold mb-2 capitalize">
          {product?.productName}
        </h4>
      </Link>
      <p className="text-slate-600 mb-4">
        {product?.description.length > 80
          ? product?.description.slice(0, 50) + "..."
          : product?.description}
      </p>
      <div className="flex items-center space-x-2 space-y-1 flex-wrap my-4">
        {product?.tags.map((tag) => (
          <div key={tag} className="badge badge-ghost">
            {tag}
          </div>
        ))}
      </div>
      {/* <div className="flex items-center space-x-2">
        <button className="bg-slate-800 text-slate-50 py-2 px-4 rounded-lg flex items-center space-x-2">
          <FaChevronUp className="mr-1" />
          Upvote {product?.upvotes}
        </button>
      </div> */}

      <div className="flex items-center space-x-2">
        <button
          disabled={role?.user?.email === product?.owner?.ownerEmail}
          onClick={() => handleUpvote(product?._id, product?.owner?.ownerEmail)}
          className={`bg-slate-800 text-slate-50 py-2 px-4 rounded-lg flex items-center space-x-2  ${
            user && role?.user?.email === product?.owner?.ownerEmail
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-slate-600"
          }`}
        >
          <FaChevronUp className="mr-1" />
          {isLiked
            ? `Upvote ${product?.upvotes + 1}`
            : `  Upvote ${product?.upvotes}`}
        </button>
      </div>
    </div>
  );
};

export default Cards;
