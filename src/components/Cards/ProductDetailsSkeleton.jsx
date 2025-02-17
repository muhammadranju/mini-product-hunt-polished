const ProductDetailsSkeleton = () => {
  return (
    <div className="w-11/12 mx-auto bg-white p-8 shadow-lg rounded-lg">
      {/* Product Details Section */}
      <div className="mb-8">
        <div className="flex items-center space-x-4 mb-4">
          <div className="w-10 h-10 rounded-full bg-gray-300 animate-pulse"></div>
          <div className="w-24 h-6 bg-gray-300 rounded-lg animate-pulse"></div>
        </div>

        <div className="w-full h-[600px] bg-gray-300 animate-pulse mb-4 rounded-md"></div>

        <div className="w-48 h-8 bg-gray-300 rounded-lg animate-pulse mb-4"></div>
        <div className="w-full h-6 bg-gray-300 animate-pulse mb-4 rounded-lg"></div>

        <div className="flex items-center gap-4 mb-6">
          {/* Skeleton for Tags */}
          <div className="flex items-center space-x-2 space-y-1 flex-wrap my-4">
            <div className="w-20 h-6 bg-gray-300 rounded-full animate-pulse"></div>
            <div className="w-20 h-6 bg-gray-300 rounded-full animate-pulse"></div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="w-24 h-8 bg-gray-300 rounded-lg animate-pulse"></div>
          <div className="w-24 h-8 bg-gray-300 rounded-lg animate-pulse"></div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="flex lg:flex-row flex-col-reverse justify-center gap-5">
        <div className="lg:w-[65%]">
          <div className="w-32 h-6 bg-gray-300 rounded-lg animate-pulse mb-4"></div>

          <div className="space-y-4">
            {/* Skeleton for Reviews */}
            <div className="p-4 bg-gray-50 rounded-lg shadow animate-pulse">
              <div className="flex items-center gap-4 mb-2">
                <div className="w-12 h-12 rounded-full bg-gray-300 animate-pulse"></div>
                <div>
                  <div className="w-32 h-6 bg-gray-300 rounded-lg animate-pulse mb-2"></div>
                  <div className="w-24 h-6 bg-gray-300 rounded-lg animate-pulse"></div>
                </div>
              </div>
              <div className="w-full h-4 bg-gray-300 animate-pulse"></div>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg shadow animate-pulse">
              <div className="flex items-center gap-4 mb-2">
                <div className="w-12 h-12 rounded-full bg-gray-300 animate-pulse"></div>
                <div>
                  <div className="w-32 h-6 bg-gray-300 rounded-lg animate-pulse mb-2"></div>
                  <div className="w-24 h-6 bg-gray-300 rounded-lg animate-pulse"></div>
                </div>
              </div>
              <div className="w-full h-4 bg-gray-300 animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Post Review Section */}
        <div className="lg:w-[35%]">
          <div className="w-32 h-6 bg-gray-300 rounded-lg animate-pulse mb-4"></div>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gray-300 animate-pulse"></div>
              <div className="w-24 h-6 bg-gray-300 rounded-lg animate-pulse"></div>
            </div>
            <div>
              <div className="w-full h-12 bg-gray-300 animate-pulse rounded-lg mb-4"></div>
              <div className="w-full h-12 bg-gray-300 animate-pulse rounded-lg mb-4"></div>
            </div>
            <div className="w-full h-12 bg-gray-300 animate-pulse rounded-lg"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsSkeleton;
