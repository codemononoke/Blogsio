import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AddBlogPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();

  const {access_token} = useSelector(state => state.auth);

  return (
    <div
      className={`sm:px-16 px-6 h-[100%] mt-[40px] flex justify-center items-center flex-col`}
    >
      <h1
        className={`font-poppins text-[40px] font-bold text-gray-900 mb-[40px]`}
      >
        Add Blog
      </h1>
      <div className={`w-full max-w-4xl`}>
        <form
          className={`space-y-8 rounded-md border-[1px] border-gray-300 bg-gray-100 p-6`}
        >
          <div className={`flex flex-col space-y-2`}>
            <label
              className={`text-[16px] font-poppins text-gray-900`}
              htmlFor="blogTitle"
            >
              Blog Title <sup className={`text-red-600`}>*</sup>
            </label>
            <input
              type="text"
              id="blogTitle"
              placeholder="Enter Blog Title"
              className={`rounded-lg bg-white p-3 text-[16px] leading-[24px] text-gray-900 shadow-[0_1px_0_0] shadow-white/50 placeholder:text-grey-400 focus:outline-none w-full`}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBlogPage;
