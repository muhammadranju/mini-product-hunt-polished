import Cards from "@/components/Cards/Cards";
import CardSkeleton from "@/components/Cards/CardSkeleton";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit, setLimit] = useState(6);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const response = await fetch(
        `${
          import.meta.env.VITE_BackendURL
        }/api/products?page=${currentPage}&limit=${limit}&search=${search}&sort=true&status=accepted`,
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
        setLoading(false);
        setProducts(data.data);
        setTotalPages(data.pagination.totalPages);
      }
    };
    setLoading(false);
    fetchProducts();
  }, [currentPage, limit, search]);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <>
      <div className="w-11/12 md:w-11/12  lg:w-11/12 xl:container mx-auto my-20">
        <Helmet>
          <title>Products - Product Hunt</title>
        </Helmet>
        <div className="max-w-[40%] mx-auto my-2">
          <label
            htmlFor="username"
            className="block text-lg font-semibold text-center text-gray-800 dark:text-gray-300"
          >
            Search Product
          </label>
          <input
            type="text"
            placeholder="Search your product with tags..."
            className="block mt-2 w-full placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="grid lg:grid-cols-3 grid-cols-1 gap-5 mt-16">
          {loading ? (
            <>
              <CardSkeleton />
              <CardSkeleton />
              <CardSkeleton />
              <CardSkeleton />
              <CardSkeleton />
              <CardSkeleton />
            </>
          ) : (
            products
              ?.reverse()
              ?.map((product) => <Cards key={product._id} product={product} />)
          )}
        </div>
        {products?.length === 0 && (
          <div className="flex justify-center items-center my-64">
            <p className="text-center flex text-5xl font-semibold items-center justify-center text-gray-800 dark:text-gray-300">
              No products found.
            </p>
          </div>
        )}

        <div className="flex justify-center mt-5">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className="mx-1 px-4 py-2 border rounded bg-white text-slate-800"
          >
            Prev
          </button>
          <span className="mx-2 px-4 py-2 border rounded bg-slate-500 text-white">
            {currentPage}
          </span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="mx-1 px-4 py-2 border rounded bg-white text-slate-800"
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default Products;
