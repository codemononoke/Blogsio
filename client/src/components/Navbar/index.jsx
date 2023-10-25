import React, { useState } from "react";
import { BiSearch } from "react-icons/bi";
import { HiMenuAlt3 } from "react-icons/hi";
import { MdOutlineClose } from "react-icons/md";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ProfileDropdown from "../ProfileDropdown";
import { HashLink } from "react-router-hash-link";

const Navbar = () => {
  const [toggle, setToggle] = useState(false);
  const { access_token } = useSelector((state) => state.auth);

  const scrollWidthOffset = (el) => {
    const yCoordinate = el.getBoundingClientRect().top + window.pageYOffset;
    const yOffset = -110;
    window.scrollTo({ top: yCoordinate + yOffset, behavior: "smooth" });
  };

  return (
    <div className={`w-full flex py-6 justify-between items-center`}>
      <Link to="/">
        <span
          className={`font-poppins cursor-pointer text-[24px] font-bold text-black`}
        >
          Blogsio
        </span>
      </Link>
      <div className={`flex items-center`}>
        <ul
          className={`list-none sm:flex hidden justify-end items-center flex-1`}
        >
          <li
            className={`font-poppins font-normal cursor-pointer text-[16px] text-black mr-5`}
          >
            <HashLink
              smooth
              to="/#selfDiscovery"
              scroll={(el) => scrollWidthOffset(el)}
            >
              Self-Discovery
            </HashLink>
          </li>
          <li
            className={`font-poppins font-normal cursor-pointer text-[16px] text-black mr-5`}
          >
            <HashLink
              smooth
              to="/#workLifeBalance"
              scroll={(el) => scrollWidthOffset(el)}
            >
              Work-Life Balance
            </HashLink>
          </li>
          <li
            className={`font-poppins font-normal cursor-pointer text-[16px] text-black mr-5`}
          >
            <HashLink
              smooth
              to="/#mindsetMastery"
              scroll={(el) => scrollWidthOffset(el)}
            >
              Mindset Mastery
            </HashLink>
          </li>
          <li className={` w-[1.5px] h-6 bg-gray-300 mr-5`}></li>
        </ul>
        <button
          className={`w-[30px] h-[30px] bg-gray-200 flex justify-center items-center rounded-full mr-5`}
        >
          <BiSearch size={20} />
        </button>
        {access_token === null && (
          <Link to="/sign-up">
            <button
              className={`h-[30px] bg-gray-900 text-white px-4 text-[16px] rounded-2xl`}
            >
              Sign Up
            </button>
          </Link>
        )}
        {access_token !== null && <ProfileDropdown />}
        <div className={`sm:hidden flex flex-1 justify-end items-center `}>
          <button
            className={`bg-transparent border-none outline-none ml-5`}
            onClick={() => setToggle((prev) => !prev)}
          >
            {toggle ? <MdOutlineClose size={28} /> : <HiMenuAlt3 size={28} />}
          </button>
          <div
            className={`${
              toggle ? "flex" : "hidden"
            } p-6 bg-gray-200 box-shadow absolute top-20 right-0 mx-4 my2 min-w-[140px] rounded-xl sidebar`}
          >
            <ul
              className={`list-none flex flex-col justify-end items-center flex-1`}
            >
              <li
                className={`font-poppins font-normal cursor-pointer text-[16px] text-black mb-5`}
              >
                <HashLink
                  smooth
                  to="/#selfDiscovery"
                  scroll={(el) => scrollWidthOffset(el)}
                  onClick={() => setToggle((prev) => !prev)}
                >
                  Self-Discovery
                </HashLink>
              </li>
              <li
                className={`font-poppins font-normal cursor-pointer text-[16px] text-black mb-5`}
              >
                <HashLink
                  smooth
                  to="/#workLifeBalance"
                  scroll={(el) => scrollWidthOffset(el)}
                  onClick={() => setToggle((prev) => !prev)}
                >
                  Work-Life Balance
                </HashLink>
              </li>
              <li
                className={`font-poppins font-normal cursor-pointer text-[16px] text-black`}
              >
                <HashLink
                  smooth
                  to="/#mindsetMastery"
                  scroll={(el) => scrollWidthOffset(el)}
                  onClick={() => setToggle((prev) => !prev)}
                >
                  Mindset Mastery
                </HashLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
