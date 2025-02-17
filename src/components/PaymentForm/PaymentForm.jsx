import React, { useContext, useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import toast from "react-hot-toast";
import useRole from "@/hooks/useRole";
import { AuthContext } from "@/context/AuthProvider";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY); // Replace with your Stripe publishable key

const PaymentForm = ({ amount }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [coupon, setCoupon] = useState("");
  const [discountedAmount, setDiscountedAmount] = useState(120);
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const [clientSecret, setClientSecret] = useState("");
  const { setLoading } = useContext(AuthContext);

  const [error, setError] = useState("");

  const { user } = useContext(AuthContext);
  const [role] = useRole();

  const handleCouponApply = async () => {
    try {
      if (coupon === "") {
        setError("Please enter a coupon code.");

        return;
      }
      // Simulate API call
      const response = await fetch(
        `${import.meta.env.VITE_BackendURL}/api/admin/coupons/validate-coupon`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ coupon, amount: discountedAmount }),
        }
      );
      const data = await response.json();

      console.log(data);

      if (data.valid) {
        setError("");
        toast.success(`Discount Price: ${data?.discountPrice}`);
        setDiscountedAmount(data?.discountPrice);
        setClientSecret(data?.clientSecret);
      } else {
        toast.error("Invalid Coupon Code");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (clientSecret === "") {
      setError("You can't proceed without a payment.");
      return;
    }

    setPaymentProcessing(true);

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const { error, paymentIntent } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: user?.displayName,
            email: user?.email,
          },
        },
      }
    );

    if (paymentIntent?.status === "succeeded") {
      setLoading(true);
      setError("");
      const response = await fetch(
        `${import.meta.env.VITE_BackendURL}/api/users/${role?.user?._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            subscription: true,
            productAddLimit: 90000,
          }),
        }
      );
      const data = await response.json();
      console.log(data);

      if (response.ok) {
        setLoading(false);
        setPaymentProcessing(false);
        document.getElementById("paymentModel").close();
        toast.success("Payment successful!");
        return;
      }

      setLoading(false);
      setPaymentProcessing(false);
      document.getElementById("paymentModel").close();
      return;
    }
    if (error) {
      console.error(error);
      setPaymentProcessing(false);
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className=" max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Payment Now</h2>
      <label className="block mb-4">
        <span className="text-gray-700">
          Coupon Code:{" "}
          <small className="text-red-500">{error ? error : ""}</small>
        </span>
        <div className="flex">
          <input
            type="text"
            value={coupon}
            onChange={(e) => setCoupon(e.target.value)}
            className="block w-full border rounded-l-lg border-gray-300 focus:border-slate-800 focus:ring focus:ring-slate-200 p-2"
            placeholder="Enter coupon code"
          />
          <button
            type="button"
            onClick={handleCouponApply}
            className="bg-slate-800 text-white px-4 py-2 rounded-r-lg hover:bg-slate-600 focus:outline-none focus:ring focus:ring-slate-300"
          >
            Apply
          </button>
        </div>
      </label>
      <label className="block mb-4">
        <span className="text-gray-700">Card Details:</span>
        <CardElement className="block w-full border border-slate-300 p-2 rounded-md focus:border-slate-500 focus:ring focus:ring-slate-200" />
      </label>
      <button
        type="submit"
        disabled={!stripe || paymentProcessing}
        className="bg-slate-800 text-white w-full py-3 rounded-md hover:bg-slate-600 focus:outline-none focus:ring focus:ring-slate-300"
      >
        Pay ${discountedAmount}
      </button>
    </form>
  );
};

const WrappedPaymentForm = () => (
  <Elements stripe={stripePromise}>
    <PaymentForm
      user={{ displayName: "User Name", email: "user@example.com" }}
    />
  </Elements>
);

export default WrappedPaymentForm;
