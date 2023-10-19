import React from "react";
import demoData from "../../data/domeData.json";

const Latest = () => {
  return (
    <div className={`flex flex-col`}>
        <h2 className={` font-poppins text-[32px] font-bold mb-6`}>Latest</h2>
      <div className={`grid grid-cols-2`}>
        {demoData.map((data, index) => (
          <div key={index} className={`flex flex-row max-h-[250px] gap-5 border-b-2 pb-8 mb-8`}>
            <div className={`flex flex-1 overflow-hidden rounded-xl`}>
              <img
                src="https://spotlight-primary.highfivethemes.com/content/images/size/w500/format/webp/2023/06/demo-image-00002.webp"
                alt="poster"
                className={`w-[100%] h-[100%] hover:scale-110 transition duration-500 cursor-pointer object-cover`}
              />
            </div>
            <div className={`flex flex-1 flex-col items-start h-[100%]`}>
              <div className={`py-1 px-3 bg-gray-200 rounded`}>
                <span
                  className={`font-poppins text-[16px] text-gray-500 font-medium`}
                >
                  Work-Life Balance
                </span>
              </div>
              <h2
                className={`font-poppins text-[22px] font-semibold leading-[30px] mt-3`}
              >
                Pursue Passion Projects: Nurture Creativity
              </h2>
              <p
                className={`font-poppins text-[16px] font-bold text-gray-400 mt-5 h-[100%] flex items-end`}
              >
                Updated on Jun 20, 2023
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Latest;
