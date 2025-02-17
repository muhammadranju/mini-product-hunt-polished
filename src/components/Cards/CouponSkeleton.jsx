import React from "react";

const CouponSkeleton = () => {
  return (
    <div className="rounded-lg p-6 mb-6">
      <div className="bg-gradient-to-br h-[230px] from-gray-300 to-gray-400 text-center py-10 lg:px-10 px-5 rounded-lg shadow-md relative animate-pulse">
        {/* Placeholder for Coupon Description */}
        <div className="w-3/4 h-6 bg-gray-500 rounded-lg mx-auto mb-4"></div>

        {/* Placeholder for Code and Copy Button */}
        <div className="flex items-center justify-center mb-6">
          <div className="border-dashed border bg-gray-500 text-white w-24 h-8 rounded-l"></div>
          <div className="bg-gray-600 w-16 h-8 rounded-r"></div>
        </div>

        {/* Placeholder for Expiry Date */}
        <div className="w-1/2 h-4 bg-gray-500 rounded-lg mx-auto"></div>

        {/* Placeholder for Decorative Circles */}
        <div className="w-12 h-12 bg-white rounded-full absolute top-1/2 transform -translate-y-1/2 left-0 -ml-6"></div>
        <div className="w-12 h-12 bg-white rounded-full absolute top-1/2 transform -translate-y-1/2 right-0 -mr-6"></div>
      </div>
    </div>
  );
};

export default CouponSkeleton;
