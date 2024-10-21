import React from "react";

interface Feedback {
  name: string;
  feedback: string;
  date: string;
  _id: string; // Unique identifier for the lesson
}

interface ElementaSchoolProps {
  description: string;
  feedbacks: Feedback[];
  join_now_text: string;
  join_now_url: string;
  title: string;
}

const ElementaSchool: React.FC<ElementaSchoolProps> = ({
  title,
  description,
  // join_now_text,
  join_now_url,
  feedbacks,
}) => {
  // console.log("feedback", {
  //   title,
  //   description,
  //   join_now_text,
  //   join_now_url,
  //   feedbacks,
  // });
  return (
    <div className="container">
      <div className="w-full flex flex-col md:grid grid-cols-3 gap-4 bg-gradient-to-br from-purple-100 via-orange-100 to-purple-100 rounded-2xl px-[5%] py-[10%] md:py-[5%]">
        <div className="w-full h-full flex flex-col justify-center items-center md:items-start gap-5">
          <p className="text-3xl lg:text-3xl xl:text-4xl font-semibold text-center md:text-start">
            {title}
          </p>
          <p className="text-gray-700 font-light text-xs lg:text-sm xl:text-base w-[80%] md:w-full text-center md:text-start">
            {description}
          </p>
          <a
            href={join_now_url}
            className="bg-[#525FE1] w-fit px-4 py-1.5 text-white lg:text-xs xl:text-sm rounded-md"
          >
            {/* {join_now_text} */}
            Join Now
          </a>
        </div>

        <div className="w-full h-full flex flex-col pt-6 gap-3">
          {feedbacks.slice(0, 3).map((feedback) => (
            <div
              key={feedback._id} // Use unique ID for keys
              className="w-full h-fit p-[5%] rounded-lg bg-white flex flex-col gap-2"
            >
              <p className="text-sm lg:text-base xl:text-lg font-medium">
                {feedback.name}
              </p>
              <p className="text-[10px] lg:text-xs xl:text-sm font-light text-gray-700">
                {feedback.feedback}
              </p>
            </div>
          ))}
        </div>

        <div className="hidden w-full h-full md:flex md:flex-col pb-6 overflow-hidden gap-3">
          {feedbacks.slice(3).map((feedback) => (
            <div
              key={feedback._id} // Use unique ID for keys
              className="w-full h-fit p-[5%] rounded-lg bg-white flex flex-col gap-2"
            >
              <p className="text-xs md:text-sm lg:text-base xl:text-lg font-medium">
                {feedback.name}
              </p>
              <p className="text-[8px] md:text-[10px] lg:text-xs xl:text-sm font-light text-gray-700">
                {feedback.feedback}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ElementaSchool;
