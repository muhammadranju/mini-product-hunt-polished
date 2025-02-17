import useRole from "@/hooks/useRole";
import { RotatingLines } from "react-loader-spinner";
import { Navigate, useLocation } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const IsAdmin = ({ children }) => {
  const [role, isLoading] = useRole();
  const location = useLocation();
  console.log(role);
  if (isLoading)
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
  if (role?.role === "admin") return children;
  return <Navigate state={location.pathname} to="/" replace="true" />;
};

export default IsAdmin;
