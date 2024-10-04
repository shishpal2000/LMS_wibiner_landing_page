import Image from "next/image";
import React from "react";
import logo from "../../../public/NavbarBrand.png";
import group from "../../../public/Group.png";
import banner from "../../../public/courselandingpagebanner.png";
import heroImage from "../../../public/Pexels Photo by Italo Melo.png";

const HeroSection = () => {
  return (
    <div className="w-full relative overflow-hidden">
      <Image src={banner} alt="" className="w-full h-full object-cover" />
      <div className="w-full h-full absolute top-0 left-0 flex">
        <div className="w-[55%] flex flex-col px-[5%] py-[2%]">
          <Image
            src={logo}
            alt=""
            className="w-[75px] lg:w-[100px] xl:w-[150px] object-cover"
          />
          <p className="text-xl mm:text-3xl md:text-4xl xlg:text-5xl lg:text-6xl xl:text-7xl font-semibold mb-0 mt-[6%]">
            Improve your skills by study with coding
          </p>
          <Image
            src={group}
            alt=""
            className="w-10 lg:w-16 xl:w-28 object-cover mt-[2%]"
          />
          <button className="px-4 py-2 bg-[#525FE1] text-white w-fit rounded text-xs md:text-base z-20 text-nowrap">
            Reserve seat for ₹499 <span className="line-through">₹3999</span>
          </button>
        </div>
        <div className="w-[45%] flex justify-center items-end relative overflow-visible">
          <div className="w-[150%] h-[100%] bg-gradient-to-tr from-purple-100 via-orange-100 to-purple-100 -skew-x-12 absolute bottom-0 right-0 translate-x-[25%] z-10"></div>
          <Image
            src={heroImage}
            alt=""
            className="w-full h-full object-cover z-20"
          />
        </div>
      </div>
      <div className="hidden w-[75%] md:flex absolute bottom-[5%] right-[5%] z-30 rounded-lg overflow-hidden justify-between gap-2 bg-black  px-5">
        <div className="flex flex-col gap-5 py-5">
          <p className="text-lg lg:text-xl xl:text-2xl font-semibold text-white">
            Thomas Wilson
          </p>
          <p className="text-xs lg:text-sm xl:text-base text-gray-200 ">
            Instructor Name
          </p>
        </div>
        <div className="w-[60%] lg:w-[50%] flex justify-between items-center">
          <div className="flex flex-col gap-5 py-5">
            <p className="text-lg lg:text-xl xl:text-2xl font-semibold text-white">
              24 August, 2024
            </p>
            <p className="text-xs lg:text-sm xl:text-base text-gray-200 ">
              Date
            </p>
          </div>
          <div className="w-0.5 h-20 bg-white"></div>
          <div className="flex flex-col gap-5 py-5">
            <p className="text-lg lg:text-xl xl:text-2xl font-semibold text-white ">
              5 PM - 8 PM IST
            </p>
            <p className="text-xs lg:text-sm xl:text-base text-gray-200 ">
              Time
            </p>
          </div>
        </div>
        {/* <div className="w-[65%] bg-black text-white skew-x-12 flex flex-col gap-5 pl-[10%] py-5 translate-x-[-10px] rounded-md">
          <p className="lg:text-xl xl:text-2xl -skew-x-12">
            Thomas Wilson
          </p>
          <p className="lg:text-sm xl:text-base -skew-x-12">
            Instructor Name
          </p>
        </div>
        <div className="w-[5%] bg-black text-white skew-x-12 flex flex-col gap-5 z-30 translate-x-[10px] rounded-md"></div>
        <div className="w-[7%] bg-black text-white skew-x-12 flex flex-col gap-5 z-30 translate-x-[10px] rounded-md"></div>
        <div className="w-[150%] bg-black text-white skew-x-12 flex gap-5 pl-[5%] translate-x-[10px] py-5 rounded-md">
          <div className="flex flex-col gap-5">
            <p className="lg:text-xl xl:text-2xl -skew-x-12">
              Thomas Wilson
            </p>
            <p className="lg:text-sm xl:text-base -skew-x-12">
              Instructor Name
            </p>
          </div>
          <div className="w-0.5 h-full bg-white -skew-x-12"></div>
          <div className="flex flex-col gap-5">
            <p className="lg:text-xl xl:text-2xl -skew-x-12">
              Thomas Wilson
            </p>
            <p className="lg:text-sm xl:text-base -skew-x-12">
              Instructor Name
            </p>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default HeroSection;
