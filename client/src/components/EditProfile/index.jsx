import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { apiConnector } from "../../api/apiConnector";
import { settingEndpoints } from "../../api/apis";
import { setUser } from "../../redux/profileSlice";

const EditProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.profile);
  const { access_token } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submitProfileForm = async (data) => {
    try {
      const toastId = toast.loading("Updating...");
      try {
        const response = await apiConnector(
          "PUT",
          settingEndpoints.UPDATE_PROFILE_API,
          data,
          {
            Authorization: `Bearer ${access_token}`,
          }
        );

        if (!response.data.success) {
          throw new Error(response.data.msg);
        }

        const userProfileImage = response.data.updatedUserDetails
          ? response.data.updatedUserDetails?.profileImage
          : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.updatedUserDetails.name}`;

        dispatch(
          setUser({
            ...response.data.updatedUserDetails,
            profileImage: userProfileImage,
          })
        );
        toast.success("Profile Updated Successfully");
      } catch (error) {
        console.log("UPDATED_PROFILE_API API ERROR.........", error);
        toast.error("Could Not Update Profile");
      }
      toast.dismiss(toastId);
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(submitProfileForm)}>
      <div
        className={`my-10 flex flex-col gap-y-6 rounded-md border-[1px] border-gray-300 bg-gray-100 py-8 px-12`}
      >
        <h2 className={`text-[18px] font-semibold font-poppins text-gray-900`}>
          Profile Information
        </h2>
        <div className={`flex flex-col gap-5 lg:flex-row`}>
          <div className={`flex flex-col gap-2 lg:w-[48%]`}>
            <label
              htmlFor="name"
              className={` font-poppins text-[16px] font-normal text-gray-900`}
            >
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Enter Name"
              className={`rounded-lg bg-white p-3 text-[16px] leading-[24px] text-gray-900 shadow-[0_1px_0_0] shadow-white/50 placeholder:text-grey-400 focus:outline-none`}
              {...register("name", { required: true })}
              defaultValue={user?.name}
            />
            {errors.name && (
              <span className={`-mt-1 text-[12px] text-red-600`}>
                Please enter your name
              </span>
            )}
          </div>
          <div className={`flex flex-col gap-2 lg:w-[48%]`}>
            <label
              htmlFor="dateOfBirth"
              className={` font-poppins text-[16px] font-normal text-gray-900`}
            >
              Data Of Birth
            </label>
            <input
              type="date"
              name="dateOfBirth"
              id="dateOfBirth"
              className={`rounded-lg bg-white p-3 text-[16px] leading-[24px] text-gray-900 shadow-[0_1px_0_0] shadow-white/50 placeholder:text-grey-400 focus:outline-none`}
              {...register("dateOfBirth", {
                required: {
                  value: true,
                  message: "Please enter your Date of Birth.",
                },
                max: {
                  value: new Date().toISOString().split("T")[0],
                  message: "Date of Birth cannot be in the future.",
                },
              })}
              defaultValue={user?.additionalDetails?.dateOfBirth}
            />
            {errors.dateOfBirth && (
              <span className={`-mt-1 text-[12px] text-red-600`}>
                {errors.dateOfBirth.message}
              </span>
            )}
          </div>
        </div>
        <div className={`flex flex-col gap-5 lg:flex-row`}>
          <div className={`flex flex-col gap-2 lg:w-[48%]`}>
            <label
              htmlFor="gender"
              className={` font-poppins text-[16px] font-normal text-gray-900`}
            >
              Gender
            </label>
            <select
              type="text"
              name="gender"
              id="gender"
              className={`rounded-lg bg-white p-3 text-[16px] leading-[24px] text-gray-900 shadow-[0_1px_0_0] shadow-white/50 placeholder:text-grey-400 focus:outline-none`}
              {...register("gender", { required: true })}
              defaultValue={user?.additionalDetails?.gender}
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="NonBinary">Non-Binary</option>
              <option value="PreferNotToSay">Prefer not to say</option>
              <option value="other">Other</option>
            </select>
            {errors.gender && (
              <span className={`-mt-1 text-[12px] text-red-600`}>
                Please enter your gender
              </span>
            )}
          </div>
          <div className={`flex flex-col gap-2 lg:w-[48%]`}>
            <label
              htmlFor="contactNumber"
              className={` font-poppins text-[16px] font-normal text-gray-900`}
            >
              Contact Number
            </label>
            <input
              type="tel"
              name="contactNumber"
              id="contactNumber"
              placeholder="Enter Contact Number"
              className={`rounded-lg bg-white p-3 text-[16px] leading-[24px] text-gray-900 shadow-[0_1px_0_0] shadow-white/50 placeholder:text-grey-400 focus:outline-none`}
              {...register("contactNumber", {
                required: {
                  value: true,
                  message: "Please enter your contact number.",
                },
                maxLength: { value: 12, message: "Invalid Contact Number" },
                minLength: { value: 10, message: "Invalid Contact Number" },
              })}
              defaultValue={user?.additionalDetails?.contactNumber}
            />
            {errors.contactNumber && (
              <span className={`-mt-1 text-[12px] text-red-600`}>
                {errors.contactNumber.message}
              </span>
            )}
          </div>
        </div>
        <div className={`flex flex-col gap-2 w-full`}>
          <label
            htmlFor="about"
            className={` font-poppins text-[16px] font-normal text-gray-900`}
          >
            About
          </label>
          <input
            type="text"
            name="about"
            id="about"
            placeholder="Enter Bio Details"
            className={`rounded-lg bg-white p-3 text-[16px] leading-[24px] text-gray-900 shadow-[0_1px_0_0] shadow-white/50 placeholder:text-grey-400 focus:outline-none`}
            {...register("about", { required: true })}
            defaultValue={user?.additionalDetails?.about}
          />
          {errors.about && (
            <span className={`-mt-1 text-[12px] text-red-600`}>
              Please enter your About.
            </span>
          )}
        </div>
      </div>
      <div className={`flex justify-end gap-2`}>
        <button
          className={`cursor-pointer rounded-md bg-gray-900 py-2 px-5 font-poppins font-semibold text-white`}
          onClick={() => navigate("/profile")}
        >
          Cancel
        </button>
        <button
          className={`cursor-pointer rounded-md bg-yellow-400 py-2 px-5 font-poppins font-semibold text-gray-900 flex gap-x-1 items-center`}
          type="submit"
        >
          Save
        </button>
      </div>
    </form>
  );
};

export default EditProfile;
