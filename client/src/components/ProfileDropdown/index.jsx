import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AiOutlineCaretDown } from "react-icons/ai";
import { setAccessToken } from "../../redux/authSlice";
import { setUser } from "../../redux/profileSlice";
import toast from "react-hot-toast";
import { Menu, MenuItem } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";
import { setEditBlog } from "../../redux/blogSlice";

const ProfileDropdown = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.profile);

  if (!user) return null;

  const logout = () => {
    dispatch(setAccessToken(null));
    dispatch(setUser(null));
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");
    toast.success("Logged Out");
    navigate("/");
  };

  return (
    <>
      <Menu
        menuStyle={{
          marginTop: 15,
          borderRadius: 10,
        }}
        menuButton={
          <button className={`relative`}>
            <div className={` flex items-center gap-x-1`}>
              <img
                src={user?.profileImage}
                alt={`profile=${user?.name}`}
                className={` aspect-square w-[30px] rounded-full object-cover`}
              />
              <AiOutlineCaretDown className={`text-sm text-gray-700`} />
            </div>
          </button>
        }
        transition
      >
        <MenuItem
          onClick={() => {
            dispatch(setEditBlog(false));
            navigate("/add-blog");
          }}
        >
          Add Blog
        </MenuItem>
        <MenuItem onClick={() => navigate("/my-blogs")}>My Blogs</MenuItem>
        <MenuItem onClick={() => navigate("/profile")}>Profile</MenuItem>
        <MenuItem onClick={logout}>Logout</MenuItem>
      </Menu>
    </>
  );
};

export default ProfileDropdown;
