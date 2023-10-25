import React from "react";
import Moment from "react-moment";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const MyBlogsPage = () => {
  const { user } = useSelector((state) => state.profile);
  const { blogs } = useSelector((state) => state.blog);

  return (
    <div className={` sm:px-16 px-6 flex justify-center items-start`}>
      <div className={`xl:max-w-[1280px] w-full`}>
        <div
          className={`w-full grid sm:grid-cols-2 md:grid-cols-3 grid-cols-1 gap-[30px] my-[40px]`}
        >
          {blogs
            ?.filter((blog) => blog?.author?._id === user?._id)
            .map((item, index) => (
              <div key={index} className={`flex flex-col`}>
                <Link to={`/blog/${item?._id}`}>
                  <div
                    className={`w-full h-[400px] overflow-hidden rounded-xl`}
                  >
                    <img
                      src={item?.blogCover}
                      alt="poster"
                      className={`w-[100%] h-[100%] hover:scale-110 transition duration-500 cursor-pointer object-cover`}
                    />
                  </div>
                </Link>
                <div className={`py-1 px-3 bg-gray-200 rounded mt-5 w-fit`}>
                  <span
                    className={`font-poppins text-[16px] text-gray-500 font-medium`}
                  >
                    {item?.blogCategory}
                  </span>
                </div>
                <Link to={`/blog/${item?._id}`}>
                  <h2
                    className={`font-poppins text-[28px] font-semibold leading-[33px] mt-3 hover:text-gray-700 transition duration-500`}
                  >
                    {item?.blogTitle}
                  </h2>
                </Link>
                <p
                  className={`font-poppins text-[16px] font-bold text-gray-400 mt-5`}
                >
                  <Moment format="MMMM Do YYYY">{item?.createdAt}</Moment>
                </p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default MyBlogsPage;
