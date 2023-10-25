import React, { useEffect, useState } from "react";
import "react-multi-carousel/lib/styles.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { FaArrowRight } from "react-icons/fa";
import "swiper/css";
import { useSelector } from "react-redux";
import Moment from "react-moment";
import { Link } from "react-router-dom";

const ImageCarousel = ({ title, id }) => {
  const { blogs } = useSelector((state) => state.blog);
  const [filteredBlog, setFilteredBlog] = useState([]);

  useEffect(() => {
    const filtered = blogs.filter((blog) => blog?.blogCategory === title);
    setFilteredBlog(filtered);
  }, [blogs, title]);

  return (
    <div
      className={` flex flex-col justify-center items-start mb-[96px]`}
      id={id}
    >
      <div className={`w-full flex justify-between items-center mb-6`}>
        <h2 className={` font-poppins ss:text-[32px] text-[28px] ss:font-bold font-semibold`}>{title}</h2>
        <button
          className={`sm:flex hidden items-center font-poppins text-[15px] font-bold text-gray-500`}
        >
          {`View ${title}`} <FaArrowRight size={15} className={`ml-1`} />
        </button>
      </div>

      <div className={`w-full h-[100%]`}>
        <Swiper
          slidesPerView={1}
          spaceBetween={10}
          breakpoints={{
            768: {
              slidesPerView: 2,
              spaceBetween: 40,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 50,
            },
          }}
          onSlideChange={() => console.log("slide change")}
          onSwiper={(swiper) => console.log(swiper)}
        >
          {filteredBlog.map((blog, index) => (
            <SwiperSlide>
              <div key={index} className={`flex flex-col items-start p`}>
                <Link to={`/blog/${blog?._id}`}>
                  <div
                    className={`w-[100%] h-[500px] overflow-hidden rounded-xl`}
                  >
                    <img
                      src={blog?.blogCover}
                      alt="poster"
                      className={`w-[100%] h-[100%] hover:scale-110 transition duration-500 cursor-pointer object-cover`}
                    />
                  </div>
                </Link>
                <div className={`py-[6px] px-[12px] bg-gray-200 rounded mt-5 flex items-center justify-center`}>
                  <span
                    className={`font-poppins ss:text-[16px] text-[11px] text-gray-500 font-medium`}
                  >
                    {blog?.blogCategory}
                  </span>
                </div>
                <Link to={`/blog/${blog?._id}`}>
                  <h2
                    className={`font-poppins ss:text-[28px] text-[24px] font-semibold leading-[33px] mt-3 hover:text-gray-700 transition duration-500`}
                  >
                    {blog?.blogTitle}
                  </h2>
                </Link>
                <p
                  className={`font-poppins ss:text-[16px] text-[14px] ss:font-bold font-semibold text-gray-400 mt-3`}
                >
                  <Moment format="MMMM Do YYYY">{blog?.createdAt}</Moment>
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default ImageCarousel;
