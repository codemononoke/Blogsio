import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setLoading, setSignUpData } from "../../redux/authSlice";
import { apiConnector } from "../../api/apiConnector";
import { authEndpoints } from "../../api/apis";

const SignUpPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { access_token } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { name, email, password, confirmPassword } = formData;

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

    if (password !== confirmPassword) {
      toast.error("Passwords Do Not Match");
      return;
    }

    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("POST", authEndpoints.SIGNUP_API, {
        name,
        email,
        password,
        confirmPassword,
      });

      console.log(`SIGNUP API RESPONSE.......`, response);

      if (!response.data.success) {
        throw new Error(response.data.msg);
      }
      dispatch(setSignUpData(response.data.user));
      toast.success("SignUp Successfully");
      navigate("/sign-in");
    } catch (error) {
      console.log("SIGNUP API ERROR.......", error);
      toast.error("SignUp Failed");
      navigate("/sign-up");
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };

  return (
    <div
      className={` sm:px-16 px-6 h-[100%] my-[40px] flex justify-center items-center`}
    >
      <form
        className={`flex flex-col items-center w-full max-w-[500px]`}
        onSubmit={handleSubmit}
      >
        <h1
          className={`font-poppins text-[40px] font-bold text-gray-900 mb-[40px]`}
        >
          Create Account
        </h1>
        <div className={`flex flex-col w-[100%] gap-[12px] mb-[24px]`}>
          <label
            className={`font-poppins text-[16x] text-gray-900 font-normal`}
          >
            Your Name
          </label>
          <input
            className={`font-poppins py-[20px] px-[28px] rounded-full text-[16px] text-gray-900 border-none outline-none bg-gray-200`}
            type="text"
            placeholder="John Deo"
            name="name"
            value={name}
            onChange={(e) => handleChange(e)}
          />
        </div>
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
        <div className={`flex flex-col w-[100%] gap-[12px] mb-[24px]`}>
          <label
            className={`font-poppins text-[16x] text-gray-900 font-normal`}
          >
            Confirm Password
          </label>
          <input
            className={`font-poppins py-[20px] px-[28px] rounded-full text-[16px] text-gray-900 border-none outline-none bg-gray-200`}
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <button
          className={`bg-gray-900 w-full py-[20px] rounded-full text-white font-poppins text-[16px] font-bold`}
          type="submit"
        >
          Sign Up
        </button>
        <div className={`flex flex-row mt-5  gap-2`}>
          <p className={`font-poppins text-[16px] text-gray-500`}>
            Already have an account?
          </p>
          <Link to="/sign-in">
            <span className={`text-gray-900 font-bold font-poppins`}>
              Sign In
            </span>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default SignUpPage;
