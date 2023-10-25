import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Navbar";
import Footer from "../Footer";

const Layout = () => {
  return (
    <>
      <div
        className={`sm:px-16 px-6 flex justify-center items-center border-b-2 sticky top-0 z-10 bg-white`}
      >
        <div className={` xl:max-w-[1280px] w-full`}>
          <Navbar />
        </div>
      </div>
      <Outlet />
      <div
        className={`sm:px-16 px-6 flex justify-center items-center bg-gray-200`}
      >
        <div className={` xl:max-w-[1280px] w-full`}>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Layout;
