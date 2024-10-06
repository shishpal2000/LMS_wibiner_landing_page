"use client";
import React, { useState } from "react";
import icon1 from "../../../public/Component 3 (1).png";
import icon2 from "../../../public/Component 3.png";
import icon3 from "../../../public/Frame 34.png";
import Image from "next/image";

const Advantages = () => {
  const [active, setActive] = useState<number>(1);
  const advantages = [
    [
      icon1,
      "Best Tutors",
      "Bring your design vision to life in clean, semantic HTML5",
    ],
    [
      icon3,
      "Flexible",
      "Connect your marketing tools with built-in integrations",
    ],
    [
      icon2,
      "Easy Access",
      "Connect your marketing tools with built-in integrations",
    ],
  ];
  return (
    <div className="container">
      <div className="w-full  flex flex-col md:flex-row gap-5 md:gap-0  md:justify-between">
        <div className="w-full md:w-[35%] flex flex-col justify-between">
          <p className="text-3xl lg:text-4xl xl:text-5xl font-semibold text-center md:text-start" onClick={()=>setActive(1)}>
            Advantages of <br /> the Webinar
          </p>
          <p className="text-gray-700 font-light md:text-sm lg:text-base xl:text-lg w-full md:w-[80%] text-center md:text-start">
            We provide various special features for all of you
          </p>
          <div className="hidden w-1/2 md:flex gap-2">
            <div
              className={`h-2 bg-[#525FE1] rounded-full ${
                active === 0 ? "w-[50%]" : "w-[25%]"
              }`}
            ></div>
            <div
              className={`h-2 bg-[#525FE1] rounded-full ${
                active === 1 ? "w-[50%]" : "w-[25%]"
              }`}
            ></div>
            <div
              className={`h-2 bg-[#525FE1] rounded-full ${
                active === 2 ? "w-[50%]" : "w-[25%]"
              }`}
            ></div>
          </div>
        </div>
        <div className="w-full md:w-[55%] flex flex-col md:flex-row gap-2">
          {advantages.map((advantage, index) => (
            <div key={index}
              className={`w-full md:w-1/3 p-[5%] gap-3 md:gap-5 flex flex-col ${
                active === index ? "bg-[#525FE1] text-white" : "bg-gray-200"
              }`}
            >
              {/* <Image src={} alt="" className="w-8 md:w-16 object-cover" />
            <p className="text-base lg:text-lg xl:text-xl font-medium"></p> */}
              <div className="flex flex-row md:flex-col gap-4">
                <Image
                  src={advantage[0]}
                  alt=""
                  className="w-10 lg:w-12 xl:w-14 h-10 lg:h-12 xl:h-14 aspect-auto object-cover"
                />
                <p className="text-xl xl:text-2xl 2xl:text-3xl font-medium">
                  {typeof advantage[1] === "string" && advantage[1]}
                </p>
              </div>
              <p className="text-[10px] lg:text-xs xl:text-sm font-light ">
                {typeof advantage[2] === "string" && advantage[2]}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Advantages;
