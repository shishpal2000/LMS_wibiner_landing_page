import Image from "next/image";
import React from "react";
import { BsClockHistory } from "react-icons/bs";
import { CiClock2 } from "react-icons/ci";
import { FiTv } from "react-icons/fi";
import { IoCalendarOutline } from "react-icons/io5";
import person from "../../../public/bohemian-man-with-his-arms-crossed-Photoroom.png";

const Webinardetails = () => {
  return (
    <div className="container">
      <div className="w-full flex flex-col md:flex-row-reverse bg-black p-[5%] py-[10%] rounded-md text-white gap-5 mt-[10%]">
        <div className="w-full md:w-1/2 flex flex-col gap-10">
          <div className="w-full h-full bg-white bg-opacity-10 rounded-md grid grid-cols-2 gap-2 p-[5%]">
            <div className="flex gap-2 items-center py-2 px-2 bg-white bg-opacity-15 rounded-md justify-center">
              <CiClock2 />
              <p>3 hours</p>
            </div>
            <div className="flex gap-2 items-center py-2 px-2 bg-white bg-opacity-15 rounded-md justify-center">
              <FiTv />
              <p>Live sessions</p>
            </div>
            <div className="flex gap-2 items-center py-2 px-2 bg-white bg-opacity-15 rounded-md justify-center">
              <IoCalendarOutline />
              <p>6th Oct, 2024</p>
            </div>
            <div className="flex gap-2 items-center py-2 px-2 bg-white bg-opacity-15 rounded-md justify-center">
              <BsClockHistory />
              <p>11 AM - 2 PM</p>
            </div>
          </div>
          <div className="w-full bg-white bg-opacity-10 rounded-md flex flex-col items-center gap-2 p-[5%] relative">
            <p className="absolute top-0 left-[50%] translate-x-[-50%] translate-y-[-50%] py-1 px-2 bg-white bg-opacity-15 rounded-md">
              Instructed by
            </p>
            <p className="text-3xl font-semibold">Utsav aggarwal</p>
            <p className="text-xs md:text-base">CEO & Co-Founder @ Evalfyn</p>
            <p className="textlg md:text-xl">
              Ex Uber <span>Glovo</span>
            </p>
          </div>
        </div>
        <div className="w-full md:w-1/2 flex flex-col gap-5">
          <div className="w-full flex flex-col bg-primary p-[5%] rounded-lg">
            <p>Learn e-commerce strategies</p>
            <div className="flex gap-2">
              <div className="w-1/2 flex flex-col justify-center">
                <p className="text-xl font-semibold">Utsav aggarwal</p>
                <p className="text-xs md:text-base">
                  CEO & Co-Founder @ Evalfyn
                </p>
                <p className="textlg md:text-xl">
                  Ex Uber <span>Glovo</span>
                </p>
              </div>
              <div className="w-1/2">
                <Image src={person} alt="" className="w-full object-cover" />
              </div>
            </div>
          </div>
          <div className="w-full bg-primary p-[3%] rounded-lg">
            <p className="text-xl font-semibold w-full text-center">
              Reserve seat for 499{" "}
              <span className="text-xs line-through">3999</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Webinardetails;
