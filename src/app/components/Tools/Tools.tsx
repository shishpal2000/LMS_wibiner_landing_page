import React from "react";

// Define the structure for each tool image
interface ToolImage {
  image_icon: string; // Source of the image
}

// Define the props interface for the Tools component
interface ToolsProps {
  title?: string; // Optional title
  image: ToolImage[]; // Array of tool images
}

const Tools: React.FC<ToolsProps> = ({ title, image }) => {
  // console.log("image", image);
  return (
    <div className="container">
      <div className="w-full flex flex-col gap-5 items-center">
        {title && ( // Render title only if it exists
          <p className="text-4xl md:text-5xl lg:text-6xl font-semibold">
            {title}
          </p>
        )}
        <div className="w-full flex gap-8 flex-wrap">
          {image?.map((tool, index) => (
            <img
              key={index}
              src={tool.image_icon}
              alt={tool.image_icon}
              loading="lazy"
              className="w-[100px] h-auto object-cover"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tools;
