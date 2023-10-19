import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const ProfilePage = () => {
  const { user } = useSelector((state) => state.profile);

  return (
    <div
      className={`sm:px-16 px-6 h-[100%] mt-[40px] flex justify-center items-center flex-col`}
    >
      <h1
        className={`font-poppins text-[40px] font-bold text-gray-900 mb-[40px]`}
      >
        Profile
      </h1>
      <div className={`w-full max-w-4xl`}>
        <div
          className={` flex items-center justify-between rounded-md border-[1px] border-gray-300 bg-gray-100 py-8 px-12`}
        >
          <div className={`flex items-center gap-x-4`}>
            <img
              src={user?.profileImage}
              alt={`profile-${user?.name}`}
              className={`aspect-square w-[78px] rounded-full object-cover`}
            />
            <div className={`space-y-1`}>
              <p
                className={`font-poppins text-[18px] font-semibold text-gray-900`}
              >
                {user?.name}
              </p>
              <p
                className={`font-poppins text-[16px] font-normal text-gray-500`}
              >
                {user?.email}
              </p>
            </div>
          </div>
          <Link to="/setting">
            <button
              className={`bg-gray-900 py-2 px-6 font-poppins font-bold text-[16px] text-white rounded-lg`}
            >
              Edit
            </button>
          </Link>
        </div>
        <div
          className={`my-10 flex flex-col gap-y-10 rounded-md border-[1px] border-gray-300 bg-gray-100 py-8 px-12`}
        >
          <div className={`flex w-full items-center justify-between`}>
            <p
              className={`font-poppins text-[18px] font-semibold text-gray-900`}
            >
              About
            </p>
            <button
              className={`bg-gray-900 py-2 px-6 font-poppins font-bold text-[16px] text-white rounded-lg`}
            >
              Edit
            </button>
          </div>
          <p
            className={`${
              user?.additionalDetails?.about ? "text-gray-600" : "text-gray-400"
            } font-poppins text-[16px] font-normal`}
          >
            {user?.additionalDetails?.about ?? "Write Something About Yourself"}
          </p>
        </div>
        <div
          className={`my-10 flex flex-col gap-y-10 rounded-md border-[1px] border-gray-300 bg-gray-100 py-8 px-12`}
        >
          <div className={`flex w-full items-center justify-between`}>
            <p
              className={`font-poppins text-[18px] font-semibold text-gray-900`}
            >
              Personal Details
            </p>
            <button
              className={`bg-gray-900 py-2 px-6 font-poppins font-bold text-[16px] text-white rounded-lg`}
            >
              Edit
            </button>
          </div>
          <div className={`flex max-w-[500px] justify-between`}>
            <div className={`flex flex-col gap-y-5`}>
              <div>
                <p className={`mb-2 font-poppins text-[16px] text-gray-500`}>
                  Name
                </p>
                <p className={`font-poppins text-[16px] text-gray-900`}>
                  {user?.name}
                </p>
              </div>
              <div>
                <p className={`mb-2 font-poppins text-[16px] text-gray-500`}>
                  Email
                </p>
                <p className={`font-poppins text-[16px] text-gray-900`}>
                  {user?.email}
                </p>
              </div>
              <div>
                <p className={`mb-2 font-poppins text-[16px] text-gray-500`}>
                  Gender
                </p>
                <p className={`font-poppins text-[16px] text-gray-900`}>
                  {user?.additionalDetails?.gender ?? "Add Gender"}
                </p>
              </div>
            </div>
            <div className={`flex flex-col gap-y-5`}>
              <div>
                <p className={`mb-2 font-poppins text-[16px] text-gray-500`}>
                  Contact Number
                </p>
                <p className={`font-poppins text-[16px] text-gray-900`}>
                  {user?.additionalDetails?.contactNumber ??
                    "Add Contact Number"}
                </p>
              </div>
              <div>
                <p className={`mb-2 font-poppins text-[16px] text-gray-500`}>
                  Date Of Birth
                </p>
                <p className={`font-poppins text-[16px] text-gray-900`}>
                  {user?.additionalDetails?.dateOfBirth ?? "Add Date Of Birth"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
