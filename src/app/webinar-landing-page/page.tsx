import React from "react";
import SyllabusCurriculum from "../course-landing-page/SyllabusCurriculum";
import WhoseItFor from "../course-landing-page/WhoseItFor";
import ElementaSchool from "../course-landing-page/ElementaSchool";
import FAQs from "../course-landing-page/FAQs";
import Advantages from "./Advantages";
import HeroSection from "./HeroSection";
import Tools from "../components/Tools/Tools";
import GetCertified from "../components/GetCerftified/GetCertified";
import Webinardetails from "./Webinardetails";
import Skills from "./Skills";

const Page = () => {
  return (
    <div className="container">
      <div className="w-full flex flex-col pb-[55px] overflow-hidden relative gap-10 md:gap-14 xl:gap-16 mb-[60px] md:mb-0">
        <HeroSection />
        <Webinardetails />
        <Skills />
        <Advantages />
        <SyllabusCurriculum />
        <WhoseItFor />
        <GetCertified />
        <Tools />
        <ElementaSchool />
        <FAQs />
        <div className="fixed bottom-0 left-0 w-full h-fit bg-gradient-to-tr from-purple-100 via-orange-100 to-purple-100 flex mm:hidden p-[5%] items-center">
          <div className="w-1/2 flex flex-col">
            <div className="flex items-end gap-1.5 w-[90%]">
              <p className="text-2xl text-[#525FE1] font-semibold">
                ₹499{" "}
                <span className="line-through text-base text-[#525FE1]">
                  ₹3999
                </span>{" "}
                <span className="text-sm text-[#525FE1] mb-0">85% OFF</span>
              </p>
            </div>
            <div className="text-sm">DeadLine September 26, 2024</div>
          </div>
          <div className="w-1/2">
            <button className="bg-[#525FE1] text-white text-sm w-full py-4 rounded-md">
              Book Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
