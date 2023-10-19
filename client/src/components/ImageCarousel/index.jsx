import React from "react";
import "react-multi-carousel/lib/styles.css";
import demoData from "../../data/domeData.json";
import { Swiper, SwiperSlide } from "swiper/react";
import { FaArrowRight } from "react-icons/fa";

import "swiper/css";

const ImageCarousel = ({ title, viewBtn }) => {
  return (
    <div className={` flex flex-col justify-center items-start mb-[96px]`}>
      <div className={`w-full flex justify-between items-center mb-6`}>
        <h2 className={` font-poppins text-[32px] font-bold`}>{title}</h2>
        <button
          className={`sm:flex hidden items-center font-poppins text-[15px] font-bold text-gray-500`}
        >
          {viewBtn} <FaArrowRight size={15} className={`ml-1`} />
        </button>
      </div>

      <div className={`w-full h-[100%]`}>
        <Swiper
          spaceBetween={50}
          slidesPerView={4}
          onSlideChange={() => console.log("slide change")}
          onSwiper={(swiper) => console.log(swiper)}
        >
          {demoData.map((data, index) => (
            <SwiperSlide>
              <div key={index} className={`flex flex-col items-start p`}>
                <div className={`w-[100%] h-[100%] overflow-hidden rounded-xl`}>
                  <img
                    src={data.poster}
                    alt="poster"
                    className={`w-[100%] h-[100%] hover:scale-110 transition duration-500 cursor-pointer object-cover`}
                  />
                </div>
                <div className={`py-1 px-3 bg-gray-200 rounded mt-5`}>
                  <span
                    className={`font-poppins text-[16px] text-gray-500 font-medium`}
                  >
                    {data.category}
                  </span>
                </div>
                <h2
                  className={`font-poppins text-[28px] font-semibold leading-[33px] mt-3`}
                >
                  {data.title}
                </h2>
                <p
                  className={`font-poppins text-[16px] font-bold text-gray-400 mt-5`}
                >
                  {data.time}
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
