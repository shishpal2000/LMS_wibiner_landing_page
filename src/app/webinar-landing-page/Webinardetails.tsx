import Image, { StaticImageData } from "next/image";
import React from "react";
import banner from "../../../public/courselandingpagebanner.png";

// Define interface for component props
interface WebinarDetailsProps {
  image: StaticImageData | string; // Handle both static images and URLs
  description: string;
  instructor_title_text: string;
}
// interface WhyChooseUsMobileProps {
//   data?: any; // Marking data as optional with ?
// }

// const WhyChooseUsMobile: React.FC<WhyChooseUsMobileProps> = ({ data = {} }) => {
//   const [activeTab, setActiveTab] = useState(null);

const Webinardetails: React.FC<WebinarDetailsProps> = ({
  image = banner, // Default static image if none is provided
  description = "No description available", // Default description
  instructor_title_text = "Instructor", // Default instructor title
}) => {
  // Determine if the image is a static import or URL
  const isStaticImage = typeof image !== "string";

  return (
    <div className="container">
      <div className="w-full bg-white flex flex-col gap-2 items-center">
        <p className="text-3xl lg:text-4xl xl:text-5xl font-semibold">
          {instructor_title_text}
        </p>
      </div>

      <div className="w-full flex flex-col md:flex-row-reverse rounded-md text-black gap-5 md:py-[3%]">
        {/* Text Content */}
        <div className="w-full md:w-1/2 flex flex-col gap-10">
          <div className="w-full h-full bg-opacity-10 rounded-md px-[2%]">
            <p className="py-2 text-xl">{description}</p>
          </div>
        </div>

        {/* Image */}
        <div className="w-full md:w-1/2 flex flex-col gap-5">
          <div className="w-full flex flex-col">
            {isStaticImage ? (
              <Image
                src={image} // Use next/image's Image component
                alt="Course Landing Page Banner"
                className="w-full object-cover"
              />
            ) : (
              <img
                src={image as string} // Use regular img tag for external URLs
                alt="Course Landing Page Banner"
                className="w-full object-cover"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Webinardetails;
