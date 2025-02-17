import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar/Navbar";
import ScrollToTop from "@/utils/ScrollToTop";
import { Outlet } from "react-router-dom";

const Root = () => {
  return (
    <div>
      <ScrollToTop />
      <Navbar />
      <div className="min-h-[calc(100vh-304px)] ">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Root;
