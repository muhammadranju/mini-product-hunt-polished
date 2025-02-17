import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/swiper-bundle.min.css";
import "swiper/css";
import toast from "react-hot-toast";
import CouponSkeleton from "../Cards/CouponSkeleton";

const CouponDisplay = ({ coupons }) => {
  //   const [coupons, setCoupons] = useState([]);
  const [isCopied, setIsCopied] = useState(false);
  useEffect(() => {
    // Optional: Initialize any additional swiper features or customizations if needed
  }, []);

  const handleCopyCode = (code) => {
    navigator.clipboard.writeText(code);
    setIsCopied(true);
    toast.success(`${code} copied successfully!`);
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  return (
    <section className="mt-10">
      <div className="mx-auto">
        <h2 className="text-3xl font-semibold text-center  text-gray-800">
          Limited Time Offers
        </h2>
        <p className="text-center mb-10">
          Get a Offers & discount on your first Subscription
        </p>

        <Swiper
          spaceBetween={30}
          slidesPerView={1}
          loop={true}
          pagination={{ clickable: true }}
          navigation
          autoplay={{
            delay: 3000, // Autoplay every 3 seconds
            disableOnInteraction: false, // Allow autoplay to continue after user interaction
          }}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
          }}
        >
          {coupons.length === 0 &&
            Array.from({ length: 6 }, (_, i) => i + 1).map((coupon) => (
              <SwiperSlide key={coupon}>
                <CouponSkeleton />
              </SwiperSlide>
            ))}

          {coupons?.map((coupon) => (
            <SwiperSlide key={coupon._id}>
              <div className="rounded-lg p-6 mb-">
                <div className="bg-gradient-to-br h-[230px]  from-blue-400 to-blue-800 text-white text-center py-10 lg:px-10 px-5 rounded-lg shadow-md relative">
                  <h3 className="lg:text-2xl font-semibold mb-4">
                    {coupon.description}
                  </h3>
                  <div className="flex items-center justify-center  mb-6">
                    <span
                      id="cpnCode"
                      className="border-dashed border text-white px-3 py-2 rounded-l"
                    >
                      {coupon.code}
                    </span>
                    <span
                      onClick={() => handleCopyCode(coupon.code)}
                      id="cpnBtn"
                      className=" bg-slate-900 text-slate-50 px-2 py-[9px] rounded-r cursor-pointer"
                    >
                      Copy Code
                    </span>
                  </div>
                  <p className="text-sm">
                    Valid Till:{" "}
                    {new Date(coupon.expiryDate).toLocaleDateString()}
                  </p>
                  <div className="w-12 h-12 bg-white rounded-full absolute top-1/2 transform -translate-y-1/2 left-0 -ml-6" />
                  <div className="w-12 h-12 bg-white rounded-full absolute top-1/2 transform -translate-y-1/2 right-0 -mr-6" />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default CouponDisplay;
