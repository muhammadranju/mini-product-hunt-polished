export default function Stats() {
  return (
    <>
      <div className="xl:px-20 px-6 py-20 xl:mx-auto xl:container">
        <h1 className="xl:text-5xl md:text-4xl text-2xl font-semibold leading-tight text-center text-gray-800 sm:mb-0 mb-12">
          More than 2 Years of Empowering
          <br className="md:block hidden" />
          Tech Innovation
        </h1>
        <div className="md:mt-14 mt-4 relative sm:flex items-center justify-center">
          <img
            src="./map-min.png"
            alt="world map image"
            className="w-full xl:h-full h-96 object-cover object-fill sm:block hidden"
          />
          <img
            src="/map-bg-min.png"
            alt="mobile-image"
            className="sm:hidden -mt-10 block w-full h-96 object-cover object-fill absolute z-0"
          />
          <div className="shadow-lg xl:p-6 p-4 sm:w-auto w-full bg-white sm:absolute relative z-20 sm:mt-0 mt-4 left-0 xl:ml-56 sm:ml-12 xl:-mt-40 sm:-mt-12">
            <p className="text-3xl font-semibold text-gray-800">20K+</p>
            <p className="text-base leading-4 xl:mt-4 mt-2 text-gray-600">
              Recently Property Listed
            </p>
          </div>
          <div className="shadow-lg xl:p-6 p-4 w-48 sm:w-auto w-full bg-white sm:absolute relative z-20 sm:mt-0 mt-4 xl:mt-80 sm:mt-56 xl:-ml-0 sm:-ml-12">
            <p className="text-3xl font-semibold text-gray-800">8K+</p>
            <p className="text-base leading-4 xl:mt-4 mt-2 text-gray-600">
              Active Users
            </p>
          </div>
          <div className="shadow-lg xl:p-6 p-4 sm:w-auto w-full bg-white sm:absolute relative z-20 md:mt-0 sm:-mt-5 mt-4 right-0 xl:mr-56 sm:mr-24">
            <p className="text-3xl font-semibold text-gray-800">15K+</p>
            <p className="text-base leading-4 xl:mt-4 mt-2 text-gray-600">
              Recently Added Products
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
