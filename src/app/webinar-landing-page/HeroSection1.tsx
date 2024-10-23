import Image from "next/image";
import banner from "../../../public/courselandingpagebanner.png";
import group from "../../../public/Group.png";
import { MdKeyboardArrowRight } from "react-icons/md";
import Link from "next/link";

// Define the structure of the item
interface HeroItem {
  event_id: {
    _id: string;
    is_paid: boolean;
    event_id?: string;
    price: {
      amount: number;
    }
  };
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
}

interface HeroSection1Props {
  data: HeroItem[];
}

const HeroSection1: React.FC<HeroSection1Props> = ({ data }) => {
  const formatDate = (dateString: string) => {
    // Check if dateString is valid
    if (!dateString) {
      console.error("Invalid date string:", dateString);
      return "Invalid date"; // Handle the case for invalid dates
    }

    const eventDate = new Date(dateString);
    
    // Check if the date is valid
    if (isNaN(eventDate.getTime())) {
      console.error("Invalid date value:", dateString);
      return "Invalid date"; // Handle the case for invalid dates
    }

    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long", 
      day: "numeric",
    }).format(eventDate);
  };

  return (
    <div className="container">
      {Array.isArray(data) &&
        data?.map((item, index) => {
          return (
            <div key={index} className="w-full relative">
              <Image
                src={banner}
                alt=""
                className="w-full h-96 md:h-full object-cover"
              />
              <div className="w-full h-full absolute top-0 left-0 flex pb-[10%]">
                <div className="w-full md:w-[56%] flex flex-col px-[5%] py-[2%] items-center md:items-start pt-[7%] mm:pt-[5%] md:pt-0 justify-center">
                  <img
                    src={item.event_logo}
                    alt=""
                    className="w-[140px] md:w-[80px] lg:w-[100px] xl:w-[130px] object-cover"
                  />
                  <p className="text-3xl md:text-4xl lg:text-5xl xl:text-7xl font-semibold mb-0 mt-[6%] text-center md:text-start">
                    {item.tag_line}
                  </p>
                  <Image
                    src={group}
                    alt=""
                    className="w-6 md:w-10 lg:w-16 xl:w-28 object-cover mt-[2%]"
                  />
                
                  <p className=" text-gray-700 text-[11px] mm:text-xs md:text-sm lg:text-base xl:text-xl mt-[3%] font-semibold text-center md:text-start lg:pb-16 xl:pb-20">
                    {item.title}
                    <br/>
                    <p className=" text-xl mb-2">₹ {item?.event_id.price.amount}</p>
                  </p>
                
                </div>
               
                <div className={`hidden md:block absolute bottom-0 left-0 w-full p-[5%] `}>
                  <div className="w-full bg-[#525FE1] flex px-[5%] py-[2%] lg:rounded-2xl xl:rounded-[32px] 2xl:rounded-[48px] 2xl:mt-10 justify-between items-center">
                    <div className="w-fit h-fit flex flex-col md:flex-row gap-4 md:gap-4 lg:gap-8 xl:gap-6 items-start md:items-center">
                      <div className="w-fit flex flex-col lg:gap-2 xl:gap-3 2xl:gap-5 px-4 md:px-6 lg:px-8 xl:pl-4 border-r-2 border-white">
                        <p className="text-white text-sm md:text-base lg:text-xl xl:text-2xl 2xl:text-4xl font-medium">
                          {formatDate(item.application_deadline_date)}
                        </p>
                        <p className="text-gray-300 text-[8px] md:text-sm lg:text-base xl:text-xl 2xl:text-xl">
                          {item.application_deadline_text}
                        </p>
                      </div>
                      <div className="w-fit flex flex-col lg:gap-2 xl:gap-3 2xl:gap-5 px-4 md:px-6 lg:px-8 xl:pl-1 border-r-2 border-white">
                        <p className="text-white text-sm md:text-base lg:text-xl xl:text-2xl 2xl:text-4xl font-medium">
                          {formatDate(item.event_date)}
                        </p>
                        <p className="text-gray-300 text-[8px] md:text-sm lg:text-base xl:text-lg 2xl:text-xl">
                          {item.event_time}
                        </p>
                      </div>
                      <div className="w-fit flex flex-col lg:gap-2 xl:gap-3 2xl:gap-5">
                        <p className="text-white text-sm md:text-base lg:text-xl xl:text-xl 2xl:text-4xl font-medium">
                          {item.instructor_intro_text}
                        </p>
                        <p className="text-gray-300 text-[8px] md:text-sm lg:text-base xl:text-lg 2xl:text-xl">
                          {item.instructor_name}
                        </p>
                      </div>
                    </div>
                    <Link
                      href={`/loginpage?event_id=${item.event_id?._id}&price=${item.event_id?.price?.amount}&is_paid=${item.event_id?.is_paid}&icon_url=${item.event_logo}`}
                      className="w-fit h-fit p-1.5 md:p-2 lg:p-2.5 xl:p-3 gap-3 md:gap-4 lg:gap-5 xl:gap-6 flex items-center rounded-full bg-white text-black justify-between"
                    >
                      <p className="ml-2 text-xs lg:text-base xl:text-xl 2xl:text-3xl font-medium">
                        Book Now
                      </p>
                      <MdKeyboardArrowRight className="lg:w-10 xl:w-12 2xl:w-14 lg:h-10 xl:h-12 2xl:h-14 bg-black text-white lg:p-2 xl:p-3 2xl:p-4 rounded-full" />
                    </Link>
                  </div>
                </div>
               
                <div className="hidden md:block w-[44%] overflow-hidden">
                  <img
                    src={item.image}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default HeroSection1;
