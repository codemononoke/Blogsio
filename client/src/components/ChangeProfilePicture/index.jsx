import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FiUpload } from "react-icons/fi";
import toast from "react-hot-toast";
import { apiConnector } from "../../api/apiConnector";
import { settingEndpoints } from "../../api/apis";
import { setUser } from "../../redux/profileSlice";

const ChangeProfilePicture = () => {
  const dispatch = useDispatch();
  const { access_token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);

  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const fileInputRef = useRef(null);

    useEffect(() => {
      if (imageFile) {
        previewFile(imageFile);
      }
    }, [imageFile]);

  const handleClick = () => {
    fileInputRef.current.click();
  };
  
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    console.log(file);
    if (file) {
      setImageFile(file);
      previewFile(file);
    }
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewImage(reader.result);
    };
  };

  const handleFileUpload = async () => {
    try {
      console.log("Uploading...");
      setLoading(true);

      const formData = new FormData();
      formData.append("displayPicture", imageFile);
      const toastId = toast.loading("Loading...");
      try {
        const response = await apiConnector(
          "PUT",
          settingEndpoints.UPDATE_DISPLAY_PICTURE_API,
          formData,
          {
            "Content-Type": "multipart/form/data",
            Authorization: `Bearer ${access_token}`,
          }
        );

        if (!response.data.success) {
          throw new Error(response.data.msg);
        }

        toast.success("Display Picture Updated Successfully");
        dispatch(setUser(response.data.data));
      } catch (error) {
        console.log("UPDATE_DISPLAY_PICTURE_API API ERROR.........", error);
        toast.error("Could Not Update Display Picture");
      }
      toast.dismiss(toastId);
      setLoading(false);
    } catch (error) {
      console.log("ERROR MESSAGE: ", error.message);
    }
  };

  return (
    <div
      className={`flex items-center justify-between rounded-md border-[1px] border-gray-300 bg-gray-100 py-8 px-12`}
    >
      <div className={`flex items-center gap-x-4`}>
        <img
          src={previewImage || user?.profileImage}
          alt={`profile-${user?.name}`}
          className={`aspect-square w-[78px] rounded-full object-cover`}
        />
        <div className={`space-y-2`}>
          <p className={`font-poppins text-[16px] font-normal text-gray-900`}>
            Change Profile Picture
          </p>
          <div className={`flex flex-row gap-3`}>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className={`hidden`}
              accept="image/png, image/gif, image/jpeg, image/jpg"
            />
            <button
              disabled={loading}
              className={`cursor-pointer rounded-md bg-gray-900 py-2 px-5 font-poppins font-semibold text-white`}
              onClick={handleClick}
            >
              Select
            </button>
            <button
              className={`cursor-pointer rounded-md bg-yellow-400 py-2 px-5 font-poppins font-semibold text-gray-900 flex gap-x-1 items-center`}
              onClick={handleFileUpload}
            >
              {loading ? "Uploading..." : "Upload"}
              {!loading && <FiUpload className={`text-lg text-gray-900`} />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangeProfilePicture;
