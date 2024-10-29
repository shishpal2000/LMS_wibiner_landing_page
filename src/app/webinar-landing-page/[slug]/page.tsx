"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import SyllabusCurriculum from "../../course-landing-page/SyllabusCurriculum";
import WhoseItFor from "../../course-landing-page/WhoseItFor";
import ElementaSchool from "../../course-landing-page/ElementaSchool";
import FAQs from "../../course-landing-page/FAQs";
import Advantages from "../Advantages";
import Tools from "../../components/Tools/Tools";
import GetCertified from "../../components/GetCerftified/GetCertified";
import Webinardetails from "../Webinardetails";
import Skills from "../Skills";
import HeroSection1 from "../HeroSection1";
import Loder from "../../loder/Loder";
import Link from "next/link";

// Define interfaces for the API response structure
interface Content {
  question: string;
  answers: string;
}
interface FAQItem {
  title: string;
  description: string;
  is_deleted: boolean;
  content: Content[];
}

interface Programming {
  title: string;
  description: string;
  points: Array<{ title: string; description: string; image_icon: string }>;
}

interface Lesson {
  title: string;
  lesson_no: string;
  _id: string;
  time: string; // Duration of the lesson in minutes
}

interface details {
  title: string;
  _id: string;
  heading: Lesson[];
}
// Interface for course modules

// Interface for the entire syllabus
interface Syllabus {
  _id: string; // Unique identifier for the syllabus
  title: string; // Title of the course
  description: string; // Short description of the syllabus
  detailed_description: details[]; // Array of modules
  download_syllabus_link: string; // Link to download the full syllabus
  download_syllabus_link_text: string; // Text for the download link
}

interface Tool {
  image_icon: string;
}

interface ToolsProps {
  title: string;
  image: Tool[];
}

interface Feedback {
  name: string;
  feedback: string;
  date: string;
  _id: string;
}
interface HeroSection {
  application_deadline_date: string;
  application_deadline_text: string;
  date: string;
  event_id: string;
  image: string;
  instructor_intro_text: string;
  instructor_name: string;
  is_deleted: boolean;
  logo_image: string;
  reservation_text: string;
  tag_line: string;
  time: string;
  title: string;
  type: string;
  _id: string;
}

interface FeedbackSection {
  description: string;
  feedbacks: Feedback[];
  join_now_text: string;
  join_now_url: string;
  title: string;
}
interface Tags {
  tags: string;
  _id: string;
}
interface SkillsLearn {
  title: string;
  tags: string[];
}

interface InstructorDetails {
  image: string;
  description: string;
  instructor_title_text: string;
}

interface EventId {
  title: string;
  is_paid_event: boolean;
  _id: string;
  price: { currency: string; amount: number };
}
interface WebinarData {
  hero_section: HeroSection;
  for_whom_text: string;
  for_whom_title: string;
  for_whom: Tags[];
  instructor_details: InstructorDetails;
  feedbacks: FeedbackSection;
  skills_learn: SkillsLearn;
  syllabus: Syllabus;
  event_id: EventId;
}
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

interface EventDetail {
  landing_page_id: string;
  meta_description: string;
  meta_keywords: string;
  meta_title: string;
  seo_url: string;
  faq: FAQItem[];
  certificate: Certificate;
  pro: Programming;
  tools: ToolsProps;
}

interface APIResponse {
  data: WebinarData[];
  eventDetails: EventDetail[];
}

const Page: React.FC = () => {
  const [data, setData] = useState<WebinarData[] | null>(null);
  const [eventDetails, setEventDetails] = useState<EventDetail[] | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://lms-v1-xi.vercel.app/api/landing-page/webinar/?is_active=true`
      );
      const apiResponse = response.data as APIResponse;

      console.log("Full API Response:", apiResponse);

      if (apiResponse.data) {
        setData(apiResponse.data);
      } else {
        console.error("Data structure is not as expected");
      }

      if (apiResponse.eventDetails) {
        setEventDetails(apiResponse.eventDetails);
      } else {
        console.error("EventDetails structure is not as expected");
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

  const firstEventDetail = eventDetails ? eventDetails[0] : null;
  const faq = firstEventDetail?.faq;
  const pro = firstEventDetail?.pro;
  const certificate = firstEventDetail?.certificate;
  console.log("eventDetails:", certificate);
  const tools = firstEventDetail?.tools;

  const firstWebinar = data[0];
  const hero_section = firstWebinar?.hero_section;
  const event_id = firstWebinar?.event_id;
  const skills_learn = firstWebinar?.skills_learn;
  const syllabus = firstWebinar?.syllabus;
  const feedbacks = firstWebinar?.feedbacks;
  const instructor_details = firstWebinar?.instructor_details;

  // function

  const formatDate = (dateString: string) => {
    if (!dateString) {
      console.error("Invalid date string:", dateString);
      return "Invalid date";
    }
    const eventDate = new Date(dateString);
    if (isNaN(eventDate.getTime())) {
      console.error("Invalid date value:", dateString);
      return "Invalid date";
    }
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(eventDate);
  };

  return (
    <>
      {loading ? (
        <div className="loading-component">
          <Loder />
        </div>
      ) : !Array.isArray(data) || !data || !data.length ? (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
          <div className="max-w-md w-full text-center p-10 bg-white rounded-xl shadow-lg">
            <h2 className="text-3xl font-extrabold text-gray-900">
              Data not found
            </h2>
          </div>
        </div>
      ) : (
        <div className="container">
          <div className="w-full flex flex-col pb-[55px] overflow-hidden relative gap-10 md:gap-14 xl:gap-16 mb-[60px] md:mb-0">
            {/* Pass the first item in the data array to HeroSection1 */}
            <HeroSection1 data={[hero_section]} event_id={event_id} />
            <WhoseItFor
              for_whom_title={
                firstWebinar?.for_whom_title || "No title available"
              }
              for_whom_text={
                firstWebinar?.for_whom_text || "No description available"
              }
              for_whom={firstWebinar?.for_whom || []}
            />

            <SyllabusCurriculum
              title={syllabus?.title || "No title available"}
              download_syllabus_link={
                syllabus?.download_syllabus_link || "No description available"
              }
              download_syllabus_link_text={
                syllabus?.download_syllabus_link_text ||
                "No description available"
              }
              description={syllabus?.description || "No description available"}
              detailed_description={syllabus?.detailed_description || []}
            />
            <Webinardetails
              image={instructor_details?.image || ""}
              description={
                instructor_details?.description || "No description available"
              }
              instructor_title_text={
                instructor_details?.instructor_title_text ||
                "Instructor Details"
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
            <GetCertified
              data={
                certificate
                  ? certificate
                  : {
                      certificate_image: "",
                      certification_heading: "",
                      certification_title: "",
                      text_displayed_on_frontend: "",
                      certification_details: [],
                    }
              }
            />
            <ElementaSchool
              title={feedbacks?.title || "No title available"}
              description={feedbacks?.description || "No description available"}
              join_now_text={feedbacks?.join_now_text || "Join now"}
              join_now_url={feedbacks?.join_now_url || "#"}
              feedbacks={feedbacks?.feedbacks || []}
            />
            <FAQs
              faqs={faq ? [faq] : []}

              // ... previous code remains the same
            />

            <div className="fixed bottom-0 text-gray-700 left-0 w-full h-fit bg-gradient-to-tr from-purple-100 via-orange-100 to-purple-100 flex md:hidden p-[5%] items-center">
              <div className="w-1/2 flex flex-col gap-4">
                <div className="flex flex-col">
                  <p className="text-base font-medium">
                    {" "}
                    {formatDate(hero_section?.application_deadline_date)}
                  </p>
                  <p className="text-xs">
                    {" "}
                    {hero_section?.application_deadline_text}
                  </p>
                </div>
                <div className="flex flex-col">
                  <p className="text-base font-medium">
                    {" "}
                    {formatDate(hero_section?.date)}
                  </p>
                  <p className="text-xs"> {hero_section?.time}</p>
                </div>
                <div className="flex flex-col">
                  <p className="text-base font-medium">
                    {" "}
                    {hero_section.instructor_intro_text}
                  </p>
                  <p className="text-xs"> {hero_section.instructor_name}</p>
                </div>
              </div>
              <div className="w-1/2">
                <Link
                  href={`/loginpage?event_id=${event_id?._id}&price=${
                    event_id?.price?.amount
                  }&is_paid=${
                    event_id?.is_paid_event !== true ? "true" : "false"
                  }&icon_url=${hero_section.logo_image}`}
                >
                  <button className="bg-[#525FE1] text-white text-sm w-full py-4 rounded-md">
                    Book now
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Page;
