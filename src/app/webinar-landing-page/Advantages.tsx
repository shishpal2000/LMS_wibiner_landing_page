"use client";
import React from "react";
import Image from "next/image";
import placeholder1 from "../../../public/Placeholder.png";
import placeholder2 from "../../../public/Placeholder (1).png";
import placeholder3 from "../../../public/Placeholder (2).png";
import placeholder4 from "../../../public/Placeholder (3).png";

interface Point {
  title: string;
  description: string;
}

interface AdvantagesProps {
  title: string;
  description: string;
  points: Point[];
}

const Advantages: React.FC<AdvantagesProps> = ({
  title,
  description,
  points,
}) => {
  // Array of placeholders for images
  const placeholderImages = [
    placeholder1,
    placeholder2,
    placeholder3,
    placeholder4,
  ];

  return (
    <div className="container text-gray-700">
      <div className="w-full">
        <div className="w-full flex flex-col items-center gap-8">
          <p className="text-3xl lg:text-4xl xl:text-5xl font-semibold text-center">
            {title}
          </p>
          <p className="text-xs md:text-sm lg:text-base xl:text-lg md:w-[60%] lg:w-[50%] text-gray-400 text-center">
            {description}
          </p>
          <div className="w-full flex flex-col md:flex-row gap-4 xl:gap-6 2xl:gap-8">
            {/* Map through the points array */}
            {points.map((point, index) => (
              <div
                key={index}
                className="flex-1 flex flex-col p-6 bg-gray-100 gap-6 w-full"
              >
                <div className="flex flex-row md:flex-col gap-4">
                  {/* Dynamically use placeholder images in a loop */}
                  <Image
                    src={placeholderImages[index % placeholderImages.length]} // Cycle through placeholders
                    alt={point.title}
                    className="w-10 lg:w-12 xl:w-14 h-10 lg:h-12 xl:h-14 aspect-square object-cover"
                  />
                  <p className="text-xl xl:text-2xl 2xl:text-3xl font-medium">
                    {point.title}
                  </p>
                </div>
                <p className="text-sm xl:text-base 2xl:text-lg text-gray-400">
                  {point.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Advantages;
