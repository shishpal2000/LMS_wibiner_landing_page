"use client";
import React, { useState } from "react";
import { MdOutlineWatchLater } from "react-icons/md";
import { RxCross2, RxPlus } from "react-icons/rx";

interface Lesson {
  title: string; // Title of the lesson
  lesson_no: string; // Lesson number as string
  time: string; // Time duration
  _id: string; // Unique identifier for the lesson
}

interface SyllabusCardProps {
  section: {
    title: string; // Title of the section (ensure this is present)
    _id: string; // Unique identifier for the section
    heading: Lesson[]; // Array of lessons
  };
}

const SyllabusCard: React.FC<SyllabusCardProps> = ({ section }) => {
  const [expand, setExpand] = useState<boolean>(false);

  console.log("section", section); // Debugging statement

  return (
    <div className="w-full flex flex-col gap-5 col-span-1 bg-white p-[5%] h-fit rounded-lg">
      <div className="w-full flex justify-between items-center">
        <p className="text-sm md:text-base lg:text-lg xl:text-xl font-medium">
          {section.title} {/* Corrected to access section.title directly */}
        </p>
        <div
          className="p-1 text-xl bg-purple-100 rounded-lg cursor-pointer"
          onClick={() => setExpand(!expand)}
        >
          {expand ? <RxCross2 /> : <RxPlus />}
        </div>
      </div>
      {expand &&
        section.heading.length > 0 &&
        section.heading.map((topic) => (
          <div
            className="w-full flex justify-between items-center border border-gray-400 rounded-md p-[3%]"
            key={topic._id} // Assuming each lesson has a unique identifier
          >
            <div className="w-fit flex flex-col gap-1">
              <p className="text-[10px] md:text-xs lg:text-sm xl:text-base font-medium w-fit">
                {topic.title} {/* Accessing the title of the lesson */}
              </p>
              <p className="text-[8px] md:text-[10px] lg:text-xs xl:text-sm font-light w-fit">
                Lesson Number: {topic.lesson_no}{" "}
                {/* Displaying the lesson number */}
              </p>
            </div>
            <div className="w-fit flex p-2 rounded-md gap-2 items-center bg-gray-100">
              <MdOutlineWatchLater />
              <p className="text-[8px] md:text-[10px] lg:text-xs xl:text-sm font-light">
                {topic.time} {/* Displaying the time duration of the lesson */}
              </p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default SyllabusCard;
