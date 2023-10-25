import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { setAccessToken } from "../../redux/authSlice";
import { apiConnector } from "../../api/apiConnector";
import { authEndpoints } from "../../api/apis";
import { setUser, setLoading } from "../../redux/profileSlice";

const SignInPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { access_token } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  useEffect(() => {
    if (access_token && access_token !== null) {
      navigate("/");
    }
  }, [access_token, navigate]);

  const handleChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const toastId = toast.loading("checking...");
    dispatch(setLoading(true));

    try {
      const response = await apiConnector("POST", authEndpoints.SIGNIN_API, {
        email,
        password,
      });

      console.log("LOGIN API RESPONSE........", response);

      if (!response.data.success) {
        throw new Error(response.data.msg);
      }

      toast.success("Login Successful");
      dispatch(setAccessToken(response.data.access_token));
      const userProfileImage = response?.data?.user?.profileImage
        ? response?.data?.user?.profileImage
        : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.name}`;
      dispatch(
        setUser({ ...response.data.user, profileImage: userProfileImage })
      );

      localStorage.setItem(
        "access_token",
        JSON.stringify(response.data.access_token)
      );
      localStorage.setItem("user", JSON.stringify(response.data.user));
      navigate("/");
    } catch (error) {
      console.log("LOGIN API ERROR........", error);
      toast.error("Login Failed");
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };

  return (
    <div
      className={` sm:px-16 px-6 h-[100%] mt-[40px] mb-[109px] flex justify-center items-center`}
    >
      <form
        className={`flex flex-col items-center w-full max-w-[500px]`}
        onSubmit={handleSubmit}
      >
        <h1
          className={`font-poppins text-[40px] font-bold text-gray-900 mb-[40px]`}
        >
          Sign In
        </h1>

        <div className={`flex flex-col w-[100%] gap-[12px] mb-[24px]`}>
          <label
            className={`font-poppins text-[16x] text-gray-900 font-normal`}
          >
            Your Email Address
          </label>
          <input
            className={`font-poppins py-[20px] px-[28px] rounded-full text-[16px] text-gray-900 border-none outline-none bg-gray-200`}
            type="email"
            placeholder="John@example.com"
            name="email"
            value={email}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className={`flex flex-col w-[100%] gap-[12px] mb-[24px]`}>
          <label
            className={`font-poppins text-[16x] text-gray-900 font-normal`}
          >
            Your Password
          </label>
          <input
            className={`font-poppins py-[20px] px-[28px] rounded-full text-[16px] text-gray-900 border-none outline-none bg-gray-200`}
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={(e) => handleChange(e)}
          />
        </div>

        <button
          className={`bg-gray-900 w-full py-[20px] rounded-full text-white font-poppins text-[16px] font-bold`}
        >
          Sign In
        </button>
        <div className={`flex flex-row mt-5  gap-2`}>
          <p className={`font-poppins text-[16px] text-gray-500`}>
            Don't have an account?
          </p>
          <Link to="/sign-up">
            <span className={`text-gray-900 font-bold font-poppins`}>
              Sign Up
            </span>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default SignInPage;
