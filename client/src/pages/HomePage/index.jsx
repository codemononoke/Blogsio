import React from "react";
import Hero from "../../components/Hero";
import ImageCarousel from "../../components/ImageCarousel";
import Latest from "../../components/Latest";

const HomePage = () => {
  return (
    <>
      <div className={` flex justify-center items-start border-b-2 mb-[104px]`}>
        <div className={`xl:max-w-[1280px] w-full`}>
          <Hero />
        </div>
      </div>
      <div className={`sm:px-16 px-6 flex justify-center items-start`}>
        <div className={`xl:max-w-[1280px] w-full`}>
          <ImageCarousel title="Self-Discovery" viewBtn="View Self-Discovery" />
          <ImageCarousel
            title="Work-Life Balance"
            viewBtn="View Work-Life Balance"
          />
          <ImageCarousel
            title="Mindset Mastery"
            viewBtn="View Mindset Mastery"
          />
          <Latest />
        </div>
      </div>
    </>
  );
};

export default HomePage;
