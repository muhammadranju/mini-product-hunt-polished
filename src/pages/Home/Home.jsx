import BannerDesign from "@/components/BannerDesign/BannerDesign";
import Brands from "@/components/Brands/Brands";
import Cards from "@/components/Cards/Cards";
import CardSkeleton from "@/components/Cards/CardSkeleton";
import CouponDisplay from "@/components/CouponDisplay/CouponDisplay";
import FeaturedProductsSection from "@/components/FeaturedProductsSection/FeaturedProductsSection";
import Partners from "@/components/Partners/Partners";
import Stats from "@/components/Stats/Stats";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const response = await fetch(
        `${import.meta.env.VITE_BackendURL}/api/products`,
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
        setLoading(false);
        setProducts(data.data);
      }
    };

    setLoading(false);
    fetchProducts();
  }, []);

  useEffect(() => {
    const fetchCoupons = async () => {
      setLoading(true);
      const response = await fetch(
        `${
          import.meta.env.VITE_BackendURL
        }/api/admin/coupons?isValidCoupon=true`,
        {
          method: "GET",
        }
      ); // Replace with your API endpoint
      setLoading(false);
      const data = await response.json();
      setCoupons(data.data); // Set fetched coupons to state
    };

    setLoading(false);
    fetchCoupons();
  }, []);
  return (
    <>
      <section className="relative w-full h-80 mt-10 bg-slate-900 text-white flex items-center justify-center">
        <Helmet>
          <title>Home - Product Hunt</title>
        </Helmet>
        <div className="relative h-[400px] w-full ">
          <div
            className="absolute inset-0 bg-cover bg-center "
            style={{
              backgroundImage: "url(/banner-image.jpg)",
            }}
          ></div>
          <div className="absolute inset-0 bg-blue-900 bg-opacity-85 flex flex-col items-center justify-center">
            <h2 className="text-white text-xl md:text-4xl text-center font-bold mb-4">
              Discover and Share Innovative Tech Products
            </h2>
            <p className="text-white text-center mb-6 lg:max-w-2xl px-4">
              At Mini Product Hunt, we make it easy for you to explore and share
              the latest tech innovations. Whether you're a creator launching a
              new product or a tech enthusiast looking.
            </p>
            <Link to={"products"}>
              <button className="text-slate-50 py-2 px-6 rounded-full text-lg font-semibold   transition-colors duration-300 transform  bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring focus:ring-slate-300 focus:ring-opacity-50">
                Explore Products
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Banner Section */}

      {/* Featured Products Section */}
      <FeaturedProductsSection />
      <CouponDisplay coupons={coupons} />
      <div className="w-11/12 md:w-11/12 lg:w-11/12 xl:container mx-auto">
        {/* Trending Products Section */}
        <section className="py-16 ">
          <div className=" mx-auto px-4 sm:px-6 lg:px-8">
            <h3 className="text-3xl font-bold text-gray-900 mb-8">
              Trending Products
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Product Cards */}
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
                  ?.slice(0, 6)

                  .map((product, idx) => <Cards key={idx} product={product} />)
              )}
              {}
            </div>
            <div className="flex justify-center items-center mt-5">
              <Link to={"/products"}>
                <button className="px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50">
                  Show All Products
                </button>
              </Link>
            </div>
          </div>
        </section>
      </div>
      <Partners />
      <Stats />
      <Brands />
      <BannerDesign />
    </>
  );
};

export default Home;
