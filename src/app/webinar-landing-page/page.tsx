"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import SyllabusCurriculum from "../course-landing-page/SyllabusCurriculum";
import WhoseItFor from "../course-landing-page/WhoseItFor";
import ElementaSchool from "../course-landing-page/ElementaSchool";
import FAQs from "../course-landing-page/FAQs";
import Advantages from "./Advantages";
import Tools from "../components/Tools/Tools";
import GetCertified from "../components/GetCerftified/GetCertified";
import Webinardetails from "./Webinardetails";
import Skills from "./Skills";
import HeroSection1 from "./HeroSection1";

// Define interfaces for the API response structure
interface FAQItem {
  title: string;
  description: string;
  content: Array<{ question: string; answer: string }>;
}

interface Programming {
  title: string;
  description: string;
  points: Array<{ title: string; description: string; image_icon: string }>;
}

// Define the structure for a lesson
interface Lesson {
  title: string;
  lesson_no: string;
  time: string;
  _id: string;
}

// Define the structure for a detailed syllabus entry
interface DetailedDescription {
  title: string;
  _id: string;
  heading: Lesson[];
}

// Define the structure for the syllabus
interface Syllabus {
  title: string;
  description: string;
  detailed_description: DetailedDescription[];
}

// Define the structure for a tool
interface Tool {
  image_icon: string;
}

// Define the structure for the Tools section
interface ToolsProps {
  title: string;
  image: Tool[];
}

// Define structure for Feedback
interface Feedback {
  name: string;
  feedback: string;
  date: string;
  _id: string;
}

interface FeedbackSection {
  description: string;
  feedbacks: Feedback[];
  join_now_text: string;
  join_now_url: string;
  title: string;
}

// Define the structure for Skills
interface SkillsLearn {
  title: string;
  tags: any[];
}

// Define the structure for Instructor details
interface InstructorDetails {
  image: string;
  description: string;
  instructor_title_text: string;
}

// WebinarData Structure
interface WebinarData {
  event_logo: string;
  tag_line: string;
  title: string;
  image: string;
  event_date: string;
  event_time: string;
  instructor_name: string;
  instructor_intro_text: string;
  application_deadline_date: string;
  application_deadline_text: string;
  certificate_image: string;
  certification_details: any[];
  certification_heading: string;
  certification_title: string;
  certification_question: string;
  download_syllabus_link: string;
  faq: FAQItem;
  pro: Programming;
  for_whom_text: string;
  for_whom_title: string;
  for_whom: any[];
  instructor_details: InstructorDetails;
  feedbacks: FeedbackSection;
  skills_learn: SkillsLearn;
  slug: string;
  syllabus: Syllabus;
  tools: ToolsProps;
  updatedAt: string;
}

const Page: React.FC = () => {
  const [data, setData] = useState<WebinarData[] | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://lms-v1-xi.vercel.app/api/landing-page/webinar/?is_active=true`
      );
      console.log("Full API Response:", response.data);

      if (response.data && response.data.data) {
        setData(response.data.data);
      } else {
        console.error("Data structure is not as expected", response.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!data || data.length === 0) {
    return <div>No data available</div>;
  }

  // Extracting relevant information from the first webinar
  const firstWebinar = data[0];
  const faq = firstWebinar?.faq;
  const pro = firstWebinar?.pro;
  const syllabus = firstWebinar?.syllabus;
  const tools = firstWebinar?.tools;
  const feedbacks = firstWebinar?.feedbacks;
  const skills_learn = firstWebinar?.skills_learn;
  const instructor_details = firstWebinar?.instructor_details;

  return (
    <div className="container">
      <div className="w-full flex flex-col pb-[55px] overflow-hidden relative gap-10 md:gap-14 xl:gap-16 mb-[60px] md:mb-0">
        {/* Pass the first item in the data array to HeroSection1 */}
        <HeroSection1 data={data || {}} />
        <WhoseItFor
          for_whom_title={firstWebinar?.for_whom_title || "No title available"}
          for_whom_text={
            firstWebinar?.for_whom_text || "No description available"
          }
          for_whom={firstWebinar?.for_whom || []}
        />

        <SyllabusCurriculum
          title={syllabus?.title || "No title available"}
          description={syllabus?.description || "No description available"}
          detailed_description={syllabus?.detailed_description || []}
        />

        <Webinardetails
          image={instructor_details?.image || ""}
          description={
            instructor_details?.description || "No description available"
          }
          instructor_title_text={
            instructor_details?.instructor_title_text || "Instructor Details"
          }
        />
        <Advantages
          title={pro?.title || "No title available"}
          description={pro?.description || "No description available"}
          points={pro?.points || []}
        />
        <Skills
          title={skills_learn?.title || "No title available"}
          tags={skills_learn?.tags || []}
        />
        <Tools
          title={tools?.title || "No title available"}
          image={tools?.image || []}
        />
        <GetCertified data={data || {}} />
        <ElementaSchool
          title={feedbacks?.title || "No title available"}
          description={feedbacks?.description || "No description available"}
          join_now_text={feedbacks?.join_now_text || "Join now"}
          join_now_url={feedbacks?.join_now_url || "#"}
          feedbacks={feedbacks?.feedbacks || []}
        />
        <FAQs
          title={faq?.title || "No title available"}
          description={faq?.description || "No description available"}
          content={faq?.content || []}
        />
        <div className="fixed bottom-0 left-0 w-full h-fit bg-gradient-to-tr from-purple-100 via-orange-100 to-purple-100 flex mm:hidden p-[5%] items-center">
          <div className="w-1/2 flex flex-col">
            <div className="flex items-end gap-1.5 w-[90%]">
              <p className="text-2xl text-[#525FE1] font-semibold">
                ₹499{" "}
                <span className="line-through text-base text-[#525FE1]">
                  ₹3999
                </span>{" "}
                <span className="text-sm text-[#525FE1] mb-0">85% OFF</span>
              </p>
            </div>
            <div className="text-sm">Deadline September 26, 2024</div>
          </div>
          <div className="w-1/2">
            <button className="bg-[#525FE1] text-white text-sm w-full py-4 rounded-md">
              Book Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
