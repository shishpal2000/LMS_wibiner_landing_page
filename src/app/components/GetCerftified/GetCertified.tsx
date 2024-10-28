import React from "react";
import { TiStarburst } from "react-icons/ti";
// import certificate from "../../../../public/certfifcate.png";
import { IoArrowRedoSharp, IoPerson } from "react-icons/io5";

// Define the structure for certification details
interface CertificationDetail {
  title: string;
  description: string;
}

interface Certificate {
  certificate_image: string;
  certification_heading: string;
  certification_title: string;
  text_displayed_on_frontend: string;
  certification_details: CertificationDetail[];
}

interface GetCertifiedProps {
  data: Certificate; // Expect a single Certificate object, not an array
}

// Array of static certification details (with icons)
const certificationDetails = [
  {
    icon: <TiStarburst />,
  },
  {
    icon: <IoArrowRedoSharp />,
  },
  {
    icon: <IoPerson />,
  },
];

const GetCertified: React.FC<GetCertifiedProps> = ({ data }) => {
  const {
    certificate_image,
    certification_details,
    certification_heading,
    certification_title,
  } = data; // Destructure here since data is an object
  return (
    <div className="container text-gray-700">
      <div className="w-full flex flex-col items-center gap-5 md:py-0 text-gray-700`">
        <p className="text-2xl md:text-4xl lg:text-6xl font-semibold">
          {certification_title}
        </p>
        <p className="text-base md:text-lg lg:text-xl xl:text-2xl font-normal text-center">
          {certification_heading}
        </p>
        <div className="w-full flex flex-col gap-5 md:gap-0 md:flex-row-reverse md:justify-between">
          <div className="w-full md:w-[45%]">
            <img
              src={certificate_image}
              alt="Certificate"
              className="w-full object-cover"
            />
          </div>
          <div className="w-full md:w-[45%] flex flex-col gap-3 justify-center">
            {certification_details?.map((detail, i) => (
              <div key={i} className="w-full flex gap-2">
                <div className="w-fit p-1 bg-primary bg-opacity-40 text-primary text-2xl md:text-3xl lg:text-4xl h-fit rounded-md">
                  {/* Repeat the icons using modulus operator */}
                  {certificationDetails[i % certificationDetails.length]?.icon}
                </div>
                <div className="w-full flex flex-col">
                  <p className="text-xl font-medium text-primary">
                    {detail.title} {/* Dynamic title */}
                  </p>
                  <p>
                    {detail.description} {/* Dynamic description */}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetCertified;
