"use client";
import React, { useState } from "react";
import { GoPlus } from "react-icons/go";
import { HiMinusSmall } from "react-icons/hi2";

interface FAQsProps {
  title: string;
  description: string;
  content: Array<{ question: string; answer: string }>;
}

const FAQs: React.FC<FAQsProps> = ({ title, description, content }) => {
  // console.log("FAQs Component - Received data:", {
  //   title,
  //   description,
  //   content,
  // });
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
 

  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  return (
    <div className="container">
      <div className="w-full flex flex-col items-center gap-5">
        <p className="text-3xl lg:text-4xl xl:text-5xl font-semibold text-center md:text-start">
          {title}
        </p>
        <p className="text-xs md:text-sm lg:text-base xl:text-lg text-gray-600 text-center md:w-[50%]">
          {description}
        </p>
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-5 mt-5">
          {content.length > 0 ? (
            content.map((item, index) => (
              <div key={index} className="flex flex-col gap-2">
                <div className="w-full p-[5%] bg-gray-100 rounded-md flex justify-between">
                  <div className="w-[80%] flex flex-col gap-5">
                    <p className="text-sm lg:text-base xl:text-xl">
                      {item.question}
                    </p>
                    {openFAQ === index && (
                      <p className="text-gray-400 text-[10px] lg:text-xs xl:text-sm">
                        {item.answer}
                      </p>
                    )}
                  </div>
                  <div
                    className={`lg:text-xl xl:text-2xl p-1 h-fit rounded-full ${
                      openFAQ === index
                        ? "bg-[#525FE1] text-white"
                        : "bg-purple-100"
                    }`}
                    onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                  >
                    {openFAQ === index ? <HiMinusSmall /> : <GoPlus />}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div>No FAQ content available</div>
          )}

<div className="w-full md:w-[100%] flex flex-col p-[3%] gap-3 bg-gray-100 rounded-md h-fit">
            <p className="font-semibold text-base xl:text-xl py-2">
              ASK YOUR QUESTION
            </p>
            <hr />
            <div className="w-full flex flex-col gap-1">
              <p className="text-xs lg:text-sm xl:text-base">Name</p>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name ..."
                className="p-3 text-[10px] lg:text-xs xl:text-sm"
              />
            </div>
            <div className="w-full flex flex-col gap-1">
              <p className="text-xs lg:text-xs xl:text-sm">Email</p>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email ..."
                className="p-3 text-[10px] lg:text-xs xl:text-sm"
              />
            </div>
            <div className="w-full flex flex-col gap-1">
              <p className="text-xs lg:text-xs xl:text-sm">Mobile Number</p>
              <input
                type="text"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                placeholder="Enter your mobile number ..."
                className="p-3 text-[10px] lg:text-xs xl:text-sm"
              />
            </div>
            <p className="text-sm md:text-base text-gray-400">
              By clicking Submit, I authorize Vstudyonline Team to Call me,
              receive SMS/Messages about its products & offers. This consent
              will override any registration for DNC/ NDNC
            </p>
            <button className="w-full rounded bg-[#525FE1] text-white py-2 xl:py-3 text-xs mt-1">
              SUBMIT
            </button>
          </div>

          
        </div>
       
      </div>
    </div>
  );
};

export default FAQs;
