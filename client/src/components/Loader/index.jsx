import React from "react";
import PuffLoader from "react-spinners/PuffLoader";

const Loader = () => {
  return (
    <div
      className={`w-full h-[calc(100vh-85.6667px)] flex items-center justify-center`}
    >
      <PuffLoader color="#000" size={100} />
    </div>
  );
};

export default Loader;
