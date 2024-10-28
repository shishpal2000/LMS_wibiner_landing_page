import React from "react";
import ReasonCard from "./ReasonCard";

// Define the structure of a single "for whom" item
interface WhoseItForProps {
  for_whom_title: string;
  for_whom_text: string;
  for_whom: { tags: string; _id: string }[]; // Updated to match the expected structure
}

const WhoseItFor: React.FC<WhoseItForProps> = ({
  for_whom_title,
  for_whom_text,
  for_whom,
}) => {
  console.log("whose", {
    for_whom_title,
    for_whom_text,
    for_whom,
  });
  return (
    <div className="container text-gray-700">
      <div className="w-full bg-white flex flex-col gap-5 items-center">
        <p className="text-3xl lg:text-4xl xl:text-5xl font-semibold">
          {for_whom_title}
        </p>
        <p className="text-xs md:text-sm lg:text-base xl:text-lg text-gray-600 text-center md:w-[50%]">
          {for_whom_text}
        </p>
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-x-8 lg:gap-x-10 xl:gap-x-12 lg:gap-y-16 xl:gap-y-[72px] mt-5">
          {for_whom?.map((reason, index) => (
            <ReasonCard
              heading={reason.tags} // Access the title of the reason
              info={""}
              key={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default WhoseItFor;
