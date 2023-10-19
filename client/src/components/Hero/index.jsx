import React from "react";

const Hero = () => {
  return (
    <section id="home" className={`flex md:flex-row flex-col `}>
      <div
        className={`flex-1 flex justify-center sm:items-start items-center flex-col xl:px-0 sm:px-16 px-6 sm:py-16 py-6`}
      >
        <h1
          className={`font-poppins font-semibold sm:text-[64px] text-[32px] text-black sm:leading-[70px] leading-[40px] sm:text-left text-center`}
        >
          Inspire, Transform and Conquer: Journey to Personal Excellence
        </h1>
        <p
          className={` font-poppins font-normal text-gray-500 text-[18px] leading-[30.8px] max-w-[470px] mt-5 sm:text-left text-center`}
        >
          In this captivating blog, embark on a transformative journey to
          unravel the mysteries of self-inspiration and empowerment.
        </p>
        <button className={`w-[150px] h-[60px] bg-gray-900 text-white font-poppins text-[18px] rounded-full mt-5`}>Subscribe</button>
      </div>
      <div className={`flex-1 flex justify-center items-center`}>
        <img
          src="https://res.cloudinary.com/dmhfkaawt/image/upload/v1697000343/Frame_1_2_ote5th.png"
          alt="hero"
          className={`w-[100%] h-[100%] relative z-[5]`}
        />
      </div>
    </section>
  );
};

export default Hero;
