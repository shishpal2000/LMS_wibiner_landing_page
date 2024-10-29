import React from "react";
import SyllabusCard from "./SyllabusCard";

interface Lesson {
  title: string; // Title of the lesson
  lesson_no: string; // Lesson number as string
  time: string; // Time duration
  _id: string; // Unique identifier for the lesson
}

interface DetailedDescription {
  title: string; // Title of the section
  _id: string; // Unique identifier for the section
  heading: Lesson[]; // Array of lessons
}

interface SyllabusCurriculumProps {
  title: string; // Title of the syllabus
  description: string; // Description of the syllabus
  detailed_description: DetailedDescription[]; // Detailed descriptions of sections
  download_syllabus_link_text: string;
  download_syllabus_link: string;
}

const SyllabusCurriculum: React.FC<SyllabusCurriculumProps> = ({
  title,
  description,
  detailed_description,
  download_syllabus_link,
  download_syllabus_link_text,
}) => {
  const handleDownload = (data: string) => {
    const link = document.createElement("a");
    link.href = data;
    link.target = "_blank";
    link.download = "Syllabus.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="container text-gray-700">
      <div className="w-full bg-gradient-to-tr from-purple-100 via-orange-100 to-purple-100 flex flex-col items-center gap-5 px-[5%] py-[10%] md:py-[5%] rounded-2xl">
        <p className="text-3xl lg:text-4xl xl:text-5xl font-semibold">
          {title}
        </p>
        <p className="text-xs md:text-sm lg:text-base xl:text-lg text-gray-600 text-center md:w-[60%] lg:w-[50%]">
          {description}
        </p>
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
          {detailed_description?.map((section) => (
            <SyllabusCard section={section} key={section._id} />
          ))}
        </div>
        <a
          type="button"
          className="w-fit bg-[#525FE1] text-white rounded py-3 px-5 mt-3"
          onClick={() => handleDownload(download_syllabus_link)}
        >
          {/* Download Syllabus */}
          {download_syllabus_link_text}
        </a>
      </div>
    </div>
  );
};

export default SyllabusCurriculum;
