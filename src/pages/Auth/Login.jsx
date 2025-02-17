import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "@/context/AuthProvider";
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import toast from "react-hot-toast";
import { auth } from "@/firebase/firebase.config";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const Login = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { setLoading, user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const { email, password } = formData;

    if (!email || !password) {
      toast.error("All fields are required!");
      setIsSubmitting(false);
      return;
    }
    try {
      const isUser = await signInWithEmailAndPassword(auth, email, password);
      console.log(isUser);
      if (isUser) {
        const userData = await fetch(
          `${import.meta.env.VITE_BackendURL}/api/auth/login`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: email,
              name: isUser?.user.displayName,
              photoURL: isUser?.user.photoURL,
            }),
          }
        );
        const user = await userData.json();

        console.log(user);

        // Check if token already exists
        if (!localStorage.getItem("token")) {
          localStorage.setItem("token", user?.token);
        }

        navigate(location.state ? location.state : "/");
      }
      setLoading(false);
      toast.success("User login Successfully!");
      navigate(location.state ? location.state : "/");
    } catch (error) {
      console.error("Login error", error);
      toast.error("Login failed! Please check your credentials and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handelGoogleLogin = async () => {
    const googleProvider = new GoogleAuthProvider();
    try {
      const googleUser = await signInWithPopup(auth, googleProvider);
      const { email, displayName, photoURL } = googleUser.user;
      if (googleUser) {
        const userData = await fetch(
          `${import.meta.env.VITE_BackendURL}/api/auth/login`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: email,
              name: displayName,
              photoURL: photoURL,
            }),
          }
        );
        const user = await userData.json();

        console.log(user);

        // Check if token already exists
        if (!localStorage.getItem("token")) {
          localStorage.setItem("token", user?.token);
        }

        navigate(location.state ? location.state : "/");
      }
      navigate("/", { replace: true });
    } catch (error) {
      console.error("Google login error", error);
      toast.error("Login Failed! Please try again.");
    }
  };

  return (
    <div className="flex w-full max-w-md my-20 mx-auto overflow-hidden rounded-lg shadow-lg lg:max-w-5xl">
      <div
        className="hidden bg-cover lg:block lg:w-1/2"
        style={{
          backgroundImage: 'url("/Sign-in.png")',
        }}
      />
      <div className="w-full px-6 py-8 md:px-8 lg:w-1/2">
        <p className="mt-3 font-bold text-2xl text-center text-slate-600 dark:text-slate-200">
          Welcome back!
        </p>
        <button
          onClick={handelGoogleLogin}
          className="flex items-center w-full justify-center mt-4 text-slate-600 transition-colors duration-300 transform border rounded-lg dark:border-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-600"
        >
          <div className="px-4 py-2">
            <svg className="w-6 h-6" viewBox="0 0 40 40">
              <path
                d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.045 27.2142 24.3525 30 20 30C14.4775 30 10 25.5225 10 20C10 14.4775 14.4775 9.99999 20 9.99999C22.5492 9.99999 24.8683 10.9617 26.6342 12.5325L31.3483 7.81833C28.3717 5.04416 24.39 3.33333 20 3.33333C10.7958 3.33333 3.33335 10.7958 3.33335 20C3.33335 29.2042 10.7958 36.6667 20 36.6667C29.2042 36.6667 36.6667 29.2042 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                fill="#FFC107"
              />
              <path
                d="M5.25497 12.2425L10.7308 16.2583C12.2125 12.59 15.8008 9.99999 20 9.99999C22.5491 9.99999 24.8683 10.9617 26.6341 12.5325L31.3483 7.81833C28.3716 5.04416 24.39 3.33333 20 3.33333C13.5983 3.33333 8.04663 6.94749 5.25497 12.2425Z"
                fill="#FF3D00"
              />
              <path
                d="M20 36.6667C24.305 36.6667 28.2167 35.0192 31.1742 32.34L26.0159 27.975C24.3425 29.2425 22.2625 30 20 30C15.665 30 11.9842 27.2359 10.5975 23.3784L5.16254 27.5659C7.92087 32.9634 13.5225 36.6667 20 36.6667Z"
                fill="#4CAF50"
              />
              <path
                d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.7592 25.1975 27.56 26.805 26.0133 27.9758C26.0142 27.975 26.015 27.975 26.0158 27.9742L31.1742 32.3392C30.8092 32.6708 36.6667 28.3333 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                fill="#1976D2"
              />
            </svg>
          </div>
          <span className="w-5/6 px-4 py-3 font-bold text-center">
            Sign in with Google
          </span>
        </button>

        <div className="flex items-center justify-between mt-4">
          <span className="w-1/5 border-b dark:border-slate-600 lg:w-1/4" />
          <a
            href="#"
            className="text-xs text-center text-slate-500 uppercase dark:text-slate-400 hover:underline"
          >
            or login with email
          </a>
          <span className="w-1/5 border-b dark:border-slate-400 lg:w-1/4" />
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mt-4">
            <label
              className="block mb-2 text-sm font-medium text-slate-600 dark:text-slate-200"
              htmlFor="email" // Correct id
            >
              Email Address
            </label>
            <input
              id="email" // Match this id with formData key
              className="block w-full px-4 py-2 text-slate-700 bg-white border rounded-lg dark:bg-slat-900 dark:text-slate-300 dark:border-slate-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
              type="email"
              value={formData.email}
              placeholder="Enter your email"
              onChange={handleChange}
            />
          </div>
          <div className="mt-4 relative">
            <div className="flex justify-between">
              <label
                className="block mb-2 text-sm font-medium text-slate-600 dark:text-slate-200"
                htmlFor="password" // Correct id
              >
                Password
              </label>
              <a
                href="#"
                className="text-xs text-slate-500 dark:text-slate-300 hover:underline"
              >
                Forget Password?
              </a>
            </div>
            <input
              id="password" // Match this id with formData key
              className="block w-full px-4 py-2 text-slate-700 bg-white border rounded-lg dark:bg-slate-800 dark:text-slate-300 dark:border-slate-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
              type={passwordVisible ? "text" : "password"}
              value={formData.password}
              placeholder="Enter your password"
              onChange={handleChange}
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 right-3 top-6 flex items-center text-gray-500 hover:text-blue-600"
            >
              {passwordVisible ? <FaRegEye /> : <FaRegEyeSlash />}
            </button>
          </div>
          <div className="mt-6">
            <button
              type="submit"
              className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-slate-800 rounded-lg hover:bg-slate-700 focus:outline-none focus:ring focus:ring-slate-300 focus:ring-opacity-50"
            >
              Sign In
            </button>
          </div>
        </form>

        <div className="flex items-center justify-between mt-4">
          <span className="w-1/5 border-b dark:border-slate-600 md:w-1/4" />
          <Link
            to="/auth/signup"
            className="text-xs text-slate-500 uppercase dark:text-slate-400 hover:underline"
          >
            don't have an account?
          </Link>
          <span className="w-1/5 border-b dark:border-slate-600 md:w-1/4" />
        </div>
      </div>
    </div>
  );
};

export default Login;
