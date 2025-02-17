import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { RotatingLines } from "react-loader-spinner";
import { AuthContext } from "../context/AuthProvider";

/* eslint-disable react/prop-types */
const PrivateRoutes = ({ children }) => {
  const { user, loading, signOut } = useContext(AuthContext);
  const location = useLocation();

  const token = localStorage.getItem("token");
  if (loading)
    return (
      <div className="flex justify-center items-center mt-72">
        <RotatingLines
          visible={true}
          height="50"
          width="50"
          strokeColor="#3b82f6"
          strokeWidth="5"
          animationDuration="0.75"
          ariaLabel="rotating-lines-loading"
          wrapperStyle={{}}
        />
      </div>
    );

  //   if (!token) {
  //     signOut();
  //   }

  if (!user) {
    return (
      <Navigate state={location.pathname} to="/auth/login" replace={true} />
    );
  }

  return <div>{children}</div>;
};

export default PrivateRoutes;
