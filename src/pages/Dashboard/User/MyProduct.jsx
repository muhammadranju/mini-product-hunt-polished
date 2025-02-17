import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { AuthContext } from "@/context/AuthProvider";
import { TagsInput } from "react-tag-input-component";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Helmet } from "react-helmet";

const MyProduct = () => {
  const [products, setProducts] = useState([]);
  const [updateProduct, setUpdateProduct] = useState({
    id: "",
    productName: "",
    productImage: "",
    description: "",
    tags: [],
    externalLinks: "",
  });

  const navigate = useNavigate();
  const { user, setLoading } = useContext(AuthContext);

  useEffect(() => {
    // Fetch user's products from the database (mocked here)
    const fetchProducts = async () => {
      const response = await fetch(
        `${import.meta.env.VITE_BackendURL}/api/products?email=${user.email}`,
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

  const handelFindProduct = async (id) => {
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
      setUpdateProduct({
        id: data.data._id,
        productName: data.data.productName,
        productImage: data.data.productImage,
        description: data.data.description,
        tags: data.data.tags,
        externalLinks: data.data.externalLinks,
      });
      console.log(data.data);
    }
    document.getElementById("updateProduct").showModal();
  };

  const handleUpdate = async (product) => {
    setLoading(true);
    const response = await fetch(
      `${import.meta.env.VITE_BackendURL}/api/products/${product.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(product),
      }
    );
    const data = await response.json();
    console.log(data);
    if (response.ok) {
      setLoading(false);

      toast.success("Product updated successfully!");
    }
    if (
      data.status === 400 ||
      data.message.includes(
        "You have reached the limit of products you can add"
      )
    ) {
      toast.error("You have reached the limit of products you can add.");
    }
    if (
      data.status === 401 &&
      data.message === "Please provide a valid token."
    ) {
      toast.error("Please login to update a product.");
      signOut();
      navigate("/auth/login", { replace: true });
    }
  };

  const handleDelete = async (productId) => {
    swal({
      title: "Are you sure?",
      text: "Do want to delete this Product?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (willModerator) => {
      if (willModerator) {
        await fetch(
          `${import.meta.env.VITE_BackendURL}/api/products/${productId}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        swal("Product deleted!", {
          icon: "success",
        });

        setProducts(products.filter((product) => product._id !== productId));
        toast.success("Product deleted!");
        setLoading(false);
      } else {
        swal("Product not deleted!", {
          icon: "error",
        });
      }
    });
  };

  return (
    <div className="ml-0 md:ml-64 py-16 mt-5 h-screen overflow-auto bg-gray-50">
      <Helmet>
        <title>My Products - Product Hunt</title>
      </Helmet>
      <div className=" w-11/12 mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl sm:text-3xl font-semibold text-center mb-6 text-gray-800">
          My Products
        </h2>

        {/* Table */}
        <div className="overflow-x-auto  rounded-lg">
          <table className="min-w-full bg-white">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-3 px-4 border-b text-left text-gray-600">
                  Product Image
                </th>
                <th className="py-3 px-4 border-b text-left text-gray-600">
                  Product Name
                </th>
                <th className="py-3 px-4 border-b text-left text-gray-600">
                  Votes
                </th>
                <th className="py-3 px-4 border-b text-left text-gray-600">
                  Status
                </th>
                <th className="py-3 px-4 border-b text-left text-gray-600">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {products?.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="py-3 px-4 border-b text-gray-800">
                    <img
                      src={product.productImage}
                      className="w-12 h-12 rounded-md"
                    />
                  </td>
                  <td className="py-3 px-4 border-b text-gray-800">
                    <Link to={`/product/${product.slug}`}>
                      {product.productName}
                    </Link>
                  </td>
                  <td className="py-3 px-4 border-b text-center text-gray-700">
                    {product.upvotes}
                  </td>
                  <td className="py-3 px-4 border-b text-center">
                    <span
                      className={`${
                        product.status === "accepted"
                          ? "bg-green-200 text-green-800"
                          : product.status === "rejected"
                          ? "bg-red-200 text-red-800"
                          : "bg-yellow-200 text-yellow-800"
                      } py-1 px-3 rounded-full text-sm capitalize`}
                    >
                      {product.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 border-b text-center">
                    <div className="flex justify-center gap-x-3">
                      <button
                        className="px-4 flex items-center gap-x-2 py-2 bg-slate-800 text-white rounded-lg text-sm hover:bg-slate-700 transition-colors"
                        onClick={() => handelFindProduct(product.slug)}
                      >
                        <FaEdit />
                      </button>
                      <button
                        className="px-4 py-2 flex items-center gap-x-2  bg-red-600 text-white rounded-lg text-sm hover:bg-red-700 transition-colors"
                        onClick={() => handleDelete(product._id)}
                      >
                        <MdDelete />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {products.length === 0 && (
            <div className="flex justify-center items-center my-64 ">
              <p className="text-center flex text-5xl font-semibold items-center justify-center text-gray-800 dark:text-gray-300">
                No products found.
              </p>
            </div>
          )}
        </div>
      </div>

      <dialog id="updateProduct" className="modal">
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg">Update Product</h3>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Product Name
            </label>
            <input
              type="text"
              placeholder="Product Name"
              className="p-2 border border-gray-300 rounded w-full"
              value={updateProduct.productName}
              onChange={(e) =>
                setUpdateProduct({
                  ...updateProduct,
                  productName: e.target.value,
                })
              }
              required
            />

            <label className="block text-sm font-medium text-gray-700">
              Product Image
            </label>
            <input
              type="text"
              placeholder="Product Image"
              className="p-2 border border-gray-300 rounded w-full"
              value={updateProduct.productImage}
              onChange={(e) =>
                setUpdateProduct({
                  ...updateProduct,
                  productImage: e.target.value,
                })
              }
              required
            />

            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              placeholder="Description"
              className="p-2 border border-gray-300 rounded w-full"
              value={updateProduct.description}
              onChange={(e) =>
                setUpdateProduct({
                  ...updateProduct,
                  description: e.target.value,
                })
              }
              required
            />

            <label className="block text-sm font-medium text-gray-700">
              Tags
            </label>
            <TagsInput
              value={updateProduct.tags}
              onChange={(tags) => setUpdateProduct({ ...updateProduct, tags })}
              className="p-2 border border-gray-300 rounded w-full"
              placeHolder="Tags"
            />

            <label className="block text-sm font-medium text-gray-700">
              External Link
            </label>
            <input
              type="url"
              placeholder="External Link"
              className="p-2 border border-gray-300 rounded w-full"
              value={updateProduct.externalLinks}
              onChange={(e) =>
                setUpdateProduct({
                  ...updateProduct,
                  externalLinks: e.target.value,
                })
              }
              required
            />
          </div>
          <button
            type="submit"
            onClick={() => handleUpdate(updateProduct)}
            className="px-4 py-2 w-full bg-slate-800 mt-2  text-white rounded-lg"
          >
            Update Product
          </button>
        </div>
      </dialog>
    </div>
  );
};

export default MyProduct;
