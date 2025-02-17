import PaymentForm from "@/components/PaymentForm/PaymentForm";
import { AuthContext } from "@/context/AuthProvider";
import useRole from "@/hooks/useRole";
import React, { useContext, useState } from "react";
import { Helmet } from "react-helmet";
import toast from "react-hot-toast";

const MyProfile = () => {
  const { user, signOut } = useContext(AuthContext);
  const [role] = useRole();
  console.log(role);
  const [verified, setVerified] = useState(role?.user?.subscription);
  const amount = 120;

  const handleSubscribe = () => {
    document.getElementById("paymentModel").showModal();

    // toast.success("Subscription successful!");
  };

  return (
    <div className="ml-0 md:ml-64 py-16 h-screen overflow-auto pt-36 bg-gradient-to-br from-gray-50 to-gray-100">
      <Helmet>
        <title>My Profile - Product Hunt</title>
      </Helmet>
      <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-2xl rounded-lg">
        <div className="flex flex-col items-center">
          <img
            src={user?.photoURL}
            alt={user?.displayName}
            className="w-32 h-32 rounded-full shadow-lg border-4 border-indigo-500"
          />
          <h2 className="text-2xl font-bold mt-4 text-gray-800">
            {user?.displayName}
          </h2>
          <p className="text-gray-500">{user?.email}</p>
          <p className="text-gray-800 font-semi bold capitalize">
            Role: {role?.user?.role}
          </p>
          {role?.role === "admin" || role?.role === "moderator" ? null : (
            <>
              {!role?.user?.subscription ? (
                <button
                  onClick={handleSubscribe}
                  className="mt-6 w-full text-center px-5 py-3 text-base font-medium tracking-wide text-white  rounded-full bg-slate-800 hover:bg-slate-700 focus:outline-none focus:ring-4 focus:ring-slate-300"
                >
                  Subscribe for ${amount}
                </button>
              ) : (
                <div className="mt-6 flex items-center gap-x-3">
                  <p className="text-green-600 font-semibold text-lg">
                    Membership Status:
                  </p>
                  <p className="text-white px-4 py-2 bg-green-600 rounded-full">
                    Verified
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <dialog id="paymentModel" className="modal">
        <div className="modal-box w-11/12 flex flex-col items-center">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <PaymentForm amount={amount}></PaymentForm>
        </div>
      </dialog>
    </div>
  );
};

export default MyProfile;
