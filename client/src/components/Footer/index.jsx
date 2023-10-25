import React from "react";
import { HashLink } from "react-router-hash-link";
import { BiCopyright } from "react-icons/bi";

const Footer = () => {
  const scrollWidthOffset = (el) => {
    const yCoordinate = el.getBoundingClientRect().top + window.pageYOffset;
    const yOffset = -110;
    window.scrollTo({ top: yCoordinate + yOffset, behavior: "smooth" });
  };

  return (
    <div
      className={`w-full flex py-6 sm:flex-row flex-col justify-between items-center`}
    >
      <div className={`flex items-center gap-1`}>
        <BiCopyright size={20} className={` text-gray-500`} />
        <span className={`font-poppins text-[16px] text-gray-500`}>
          2023 Blogsio™. All Rights Reserved.{" "}
        </span>
      </div>
      <ul className={`list-none flex justify-end items-center flex-1`}>
        <li
          className={`font-poppins font-normal cursor-pointer text-[16px] text-gray-500 mr-5`}
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
          className={`font-poppins font-normal cursor-pointer text-[16px] text-gray-500 mr-5`}
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
          className={`font-poppins font-normal cursor-pointer text-[16px] text-gray-500`}
        >
          <HashLink
            smooth
            to="/#mindsetMastery"
            scroll={(el) => scrollWidthOffset(el)}
          >
            Mindset Mastery
          </HashLink>
        </li>
      </ul>
    </div>
  );
};

export default Footer;
