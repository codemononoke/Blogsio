import React from "react";
import ChangeProfilePicture from "../../components/ChangeProfilePicture";
import EditProfile from "../../components/EditProfile";

const SettingPage = () => {
  return (
    <div
      className={`sm:px-16 px-6 h-[100%] mt-[40px] flex justify-center items-center flex-col`}
    >
      <h1
        className={`font-poppins text-[40px] font-bold text-gray-900 mb-[40px]`}
      >
        Edit Profile
      </h1>
      <div className={`w-full max-w-4xl mb-10`}>
        <ChangeProfilePicture />
        <EditProfile />
      </div>
    </div>
  );
};

export default SettingPage;
