import React, { useEffect } from "react";
import Hero from "../../components/Hero";
import ImageCarousel from "../../components/ImageCarousel";
import Latest from "../../components/Latest";
import { apiConnector } from "../../api/apiConnector";
import { blogEndpoints } from "../../api/apis";
import { useDispatch } from "react-redux";
import { setBlogs } from "../../redux/blogSlice";

const HomePage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const getAllBlogs = async () => {
      const response = await apiConnector(
        "GET",
        blogEndpoints.GET_ALL_BLOGS_API
      );
      dispatch(setBlogs(response?.data?.data));
    };
    getAllBlogs();
  }, []);

  return (
    <>
      <div className={` flex justify-center items-start border-b-2 mb-[104px]`}>
        <div className={`xl:max-w-[1280px] w-full`}>
          <Hero />
        </div>
      </div>
      <div className={`sm:px-16 px-6 flex justify-center items-start`}>
        <div className={`xl:max-w-[1280px] w-full`}>
          <ImageCarousel title="Self-Discovery" id="selfDiscovery" />
          <ImageCarousel title="Work-Life Balance" id="workLifeBalance" />
          <ImageCarousel title="Mindset Mastery" id="mindsetMastery" />
          <Latest />
        </div>
      </div>
    </>
  );
};

export default HomePage;
