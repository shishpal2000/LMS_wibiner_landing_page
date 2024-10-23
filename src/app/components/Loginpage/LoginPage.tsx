"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { postData } from "../../apiCollection/apiCalling";
import { show_notification } from "../../apiCollection/notification";
import { useRouter } from "next/navigation"; 
import { useSearchParams } from "next/navigation";
import Loder from "../../loder/Loder";

interface LoginPageProps {
  eventId: string;
  eventPrice: number;
}

interface DataSend {
  event_id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
}

interface OtpType {
  event_id: string;
  otp: string;
  is_paid_event: boolean;
}

interface RazorpayResponse {
  razorpay_payment_id: string | null;
  razorpay_order_id : string | null;
  razorpay_signature: string | null;
}

interface OtpInformation {
  razorpay_order_id : string | null;
  event_purchase:string | null;
}

// Extend the Window interface for Razorpay
declare global {
  interface Window {
    Razorpay: any; // You can specify a more detailed type if known
  }
}

export default function LoginForm (){
  const searchParams = useSearchParams();

  const id = searchParams.get("event_id");
  const price = searchParams.get("price");
  const is_paid= searchParams.get("is_paid");
  const icon_url= searchParams.get("icon_url");
 
  const [eventId, setEventId] = useState<string>("");
  const [eventPrice, setEventPrice] = useState<number>(0);
  const [icon_Logo, setIconLogo] = useState<string>("");
  const [isPaidEvent, setIsPaidEvent] = useState<boolean>(false);
 
  useEffect(() => {
    if (id) {
      setEventId(id);
    }
    if (price) {
      const parsedPrice = Number(price);
      setEventPrice(parsedPrice);
    }
    if (is_paid) {
      const eventBoolean = is_paid.toLowerCase() === 'true'; 
      setIsPaidEvent(eventBoolean);
    }
    if(icon_url){
      setIconLogo(icon_url);
    }
  }, [id, price, is_paid]);


  const [name, setName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [otp, setOtp] = useState<string>("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [loading,setLoading]=useState(false);
  const router = useRouter(); 

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true)

    // Ensure required fields are not empty
    if (!name.trim() || !email.trim() || !phoneNumber.trim()) {
      show_notification("Please fill in all fields.", "error");
      return;
    }

    const payload: DataSend = {
      event_id: eventId,
      first_name: name,
      last_name: lastName,
      email: email,
      phone: phoneNumber,
    };

    try {
      const apiCall = await postData("event/enroll/guest/event", payload);

      if (apiCall) {
        if (apiCall.success) {
          setIsOtpSent(true);
          localStorage.setItem("token", apiCall.data.token);
          show_notification("Registration successful! Please check your email for OTP.", "success");
        } else {
          show_notification(apiCall.error || "Unknown error occurred.", "error",);
        }
      }

      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.error("Error submitting form:", error);
      show_notification("Error", "An unexpected error occurred.");
    }
    setLoading(false)
  };

  const handleOtpSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true)

    if (!otp.trim()) {
      show_notification("Please enter the OTP.", "error");
      return;
    }

    const payload: OtpType = {
      event_id: eventId,
      otp: otp,
      is_paid_event : isPaidEvent
    };

    try {
      const apiCall = await postData("event/enroll/guest/verify", payload);

      if (apiCall) {
        if (apiCall.success) {
          localStorage.setItem("token", apiCall.data.token);
          show_notification("OTP verification successful!", "success");

          if (isPaidEvent) {
            const otpInformation: OtpInformation = {
              razorpay_order_id: apiCall.data.razorpay_order_id,
              event_purchase: apiCall.data.event_purchase,
            };
            initiatePayment(otpInformation); // Initiate payment with the verified data
          } else {
            show_notification("Your registration is successful!", "success");
          }

         
        } else {
          show_notification(apiCall.error ?? "Unknown error occurred.", 'error');
        }
      }
      setLoading(false)
    } catch (err) {
      let errorMessage = "Unknown error occurred.";
      setLoading(false)
      // Type guard to check if `err` is an object and has the expected properties
      if (typeof err === "object" && err !== null && "response" in err) {
        const errorResponse = (err as { response: { data: { error: string } } }).response;
        errorMessage = errorResponse?.data?.error ?? errorMessage;
      }
    
      show_notification(errorMessage, 'error');
      
    }
    setLoading(false)
  };

  const initiatePayment = (data: OtpInformation) => {
    
    const options = {
      key: process.env.PAYERPAY_KEY,
      amount: eventPrice * 100,
      currency: "INR",
      name: "VstudyOnline",
      description: "Payment for Webinar",
      order_id: data?.razorpay_order_id,
      theme: {
        color: "#F37254",
      },
      handler: async function (response: RazorpayResponse) {
      
        if (response.razorpay_payment_id) {
          
          const query = new URLSearchParams({
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id || "",
            razorpay_signature: response.razorpay_signature || "",
            event_purchase_id: data?.event_purchase || "",
            event_id: eventId || "", 
          }).toString();
  
        
          router.push(`/paymentsuccessfull?${query}`);
        } else {
         
          router.push("/paymentFail");
        }
      },
      modal: {
        ondismiss: function () {
          router.push("/paymentFail");
        },
      },
    };
  
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };
  
  

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-2xl w-full space-y-8 p-10 bg-white rounded-xl shadow-lg">
        <div className="flex justify-between items-center">
          <div>
            <img
              src={icon_Logo}
              alt="Company Logo"
              className="h-10 w-30"
            />
          </div>
          <Link
            href={`/`}
            className="flex items-center text-gray-600 hover:text-gray-900 transition-colors duration-200"
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            <span>Back</span>
          </Link>
        </div>
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">
            Registration for webinar{" "}
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={isOtpSent ? handleOtpSubmit : handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                First Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                placeholder="Your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Last Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                placeholder="Your full name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="email-address"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                placeholder="your.email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="phone-number"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Phone number
              </label>
              <input
                id="phone-number"
                name="phoneNumber"
                type="tel"
                autoComplete="tel"
                required
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                placeholder="Your phone number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>

            {isOtpSent && (
              <div>
                <label
                  htmlFor="otp"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  OTP
                </label>
                <input
                  id="otp"
                  name="otp"
                  type="tel"
                  autoComplete="tel"
                  required
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                  placeholder="Your OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
              </div>
            )}
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition duration-150 ease-in-out"
            >
              {loading ? (
                            <div className="spinner">
                              <Loder />
                              <span>Submitting...</span>
                            </div>
                          ) : (
                            "submit"
                          )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

