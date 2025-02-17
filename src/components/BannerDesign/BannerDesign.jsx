import { AuthContext } from "@/context/AuthProvider";
import React, { useContext } from "react";
import { Link } from "react-router-dom";

const BannerDesign = () => {
  const { user } = useContext(AuthContext);
  return (
    <div className="mx-auto t-10">
      <div className="relative h-[500px] w-full ">
        <div
          className="absolute inset-0 bg-cover bg-center "
          style={{
            backgroundImage: "url(/bg-image.jpg)",
          }}
        ></div>
        <div className="absolute inset-0 bg-slate-900 bg-opacity-80 flex flex-col items-center justify-center">
          <h2 className="text-white text-xl md:text-4xl font-bold mb-4">
            Let's explore your journey right now!
          </h2>
          <p className="text-white text-center mb-6 max-w-lg px-4">
            Embark on an exciting adventure today! Let’s explore your journey
            right now and discover the endless possibilities that await.
          </p>

          {user ? (
            <>
              {" "}
              <Link to={"/about"}>
                <button className="bg-slate-900 border-[1px] border-slate-600 text-slate-50 py-2 px-6 rounded-full text-lg font-semibold hover:bg-slate-800 transition">
                  About Us
                </button>
              </Link>
            </>
          ) : (
            <>
              <Link to={"/auth/login"}>
                <button className=" text-slate-50 py-2 px-6 rounded-full text-lg font-semibold   transition-colors duration-300 transform  bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring focus:ring-slate-300 focus:ring-opacity-50">
                  Join Now
                </button>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default BannerDesign;
