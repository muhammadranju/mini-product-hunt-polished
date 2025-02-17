import DashboardRoot from "@/layout/DashboardRoot";
import Root from "@/layout/Root";
import Login from "@/pages/Auth/Login";
import Signup from "@/pages/Auth/Signup";
import ManageCoupons from "@/pages/Dashboard/Admin/ManageCoupons";
import ManageUsers from "@/pages/Dashboard/Admin/ManageUsers";
import Statistics from "@/pages/Dashboard/Admin/Statistics";
import Dashboard from "@/pages/Dashboard/Dashboard";
import ProductReview from "@/pages/Dashboard/Moderator/ProductReview";
import ReportedContents from "@/pages/Dashboard/Moderator/ReportedContents";
import AddProduct from "@/pages/Dashboard/User/AddProduct";
import MyProduct from "@/pages/Dashboard/User/MyProduct";
import MyProfile from "@/pages/Dashboard/User/MyProfile";
import Home from "@/pages/Home/Home";
import NotFound from "@/pages/NotFound/NotFound";
import ProductDetails from "@/pages/Product/ProductDetails";
import Products from "@/pages/Product/products";
import { createBrowserRouter } from "react-router-dom";
import PrivateRoutes from "./PrivateRoute";
import IsAdmin from "./IsAdmin";
import ManageReviews from "@/pages/Dashboard/Admin/ManageReviews";
import IsModerator from "./IsModerator";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "products",
        element: <Products />,
      },
      {
        path: "product/:id",
        element: (
          <PrivateRoutes>
            <ProductDetails />
          </PrivateRoutes>
        ),
      },
      {
        path: "auth/login",
        element: <Login />,
      },
      {
        path: "auth/signup",
        element: <Signup />,
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoutes>
        <DashboardRoot />
      </PrivateRoutes>
    ),
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      // User Dashboard
      {
        path: "user/product/details/:id",
        element: <MyProfile />,
      },
      {
        path: "user/my-profile",
        element: <MyProfile />,
      },
      {
        path: "user/add-product",
        element: <AddProduct />,
      },
      {
        path: "user/my-product",
        element: <MyProduct />,
      },
      // Moderator Dashboard
      {
        path: "moderator/product-review",

        element: (
          <IsModerator>
            <ProductReview />
          </IsModerator>
        ),
      },
      {
        path: "moderator/reported-contents",
        element: (
          <IsModerator>
            <ReportedContents />
          </IsModerator>
        ),
      },
      // Admin Dashboard
      {
        path: "admin/statistics",

        element: (
          <IsAdmin>
            <Statistics />
          </IsAdmin>
        ),
      },
      {
        path: "admin/manage-users",
        element: (
          <IsAdmin>
            <ManageUsers />
          </IsAdmin>
        ),
      },
      {
        path: "admin/manage-coupons",
        element: (
          <IsAdmin>
            <ManageCoupons />
          </IsAdmin>
        ),
      },
      {
        path: "admin/manage-reviews",
        element: (
          <IsAdmin>
            <ManageReviews />
          </IsAdmin>
        ),
      },
    ],
  },
]);

export default router;
