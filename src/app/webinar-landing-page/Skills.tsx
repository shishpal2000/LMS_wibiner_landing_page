import React from "react";

// Define the interface for the props
interface SkillsProps {
  title: string;
  tags: string[];
}

const Skills: React.FC<SkillsProps> = ({ title, tags }) => {
  return (
    <div className="container text-gray-700">
      <div className="w-full flex flex-col items-center gap-5">
        <p className="text-4xl md:text-5xl lg:text-6xl font-semibold">
          {title}
        </p>
        <div className="flex flex-wrap w-full gap-2 justify-center">
          {tags.map((skill, index: number) => (
            <p
              key={index}
              className="py-2 md:py-3 px-4 md:px-8 bg-primary bg-opacity-20 rounded-md text-base font-semibold"
            >
              {skill}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Skills;
