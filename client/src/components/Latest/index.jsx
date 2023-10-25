import React from "react";
import { useSelector } from "react-redux";
import Moment from "react-moment";
import { Link } from "react-router-dom";

const Latest = () => {
  const { blogs } = useSelector((state) => state.blog);

  return (
    <div className={`flex flex-col mb-[96px]`}>
      <h2 className={` font-poppins text-[32px] font-bold mb-6`}>Latest</h2>
      <div className={`grid sm:grid-cols-2 grid-cols-1`}>
        {blogs.map((blog, index) => (
          <div
            key={index}
            className={`flex flex-row max-h-[250px] gap-5 border-b-2 pb-8 mb-8`}
          >
            <Link
              to={`/blog/${blog?._id}`}
              className={`flex flex-1 overflow-hidden rounded-xl`}
            >
              <img
                src={blog?.blogCover}
                alt="poster"
                className={`w-[100%] h-[100%] hover:scale-110 transition duration-500 cursor-pointer object-cover`}
              />
            </Link>
            <div className={`flex flex-1 flex-col items-start h-[100%]`}>
              <div className={`py-1 px-3 bg-gray-200 rounded`}>
                <span
                  className={`font-poppins text-[16px] text-gray-500 font-medium`}
                >
                  {blog?.blogCategory}
                </span>
              </div>
              <Link to={`/blog/${blog?._id}`}>
                <h2
                  className={`font-poppins text-[22px] text-gray-900 hover:text-gray-700 transition duration-500 font-semibold leading-[30px] mt-3`}
                >
                  {blog?.blogTitle}
                </h2>
              </Link>
              <p
                className={`font-poppins text-[16px] font-bold text-gray-400 mt-5 h-[100%] flex items-end`}
              >
                <Moment format="MMMM Do YYYY">{blog?.createdAt}</Moment>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Latest;
