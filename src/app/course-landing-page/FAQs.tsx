"use client";
import React, { useState } from "react";
import { GoPlus } from "react-icons/go";
import { HiMinusSmall } from "react-icons/hi2";
import Loder from "../loder/Loder";
import { show_notification } from "../apiCollection/notification";
import { postData } from "../apiCollection/apiCalling";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

interface FAQsProps {
  title: string;
  description: string;
  content: Array<{ question: string; answer: string }>;
  course_id: string; // New prop to include course_id
}

const FAQs: React.FC<FAQsProps> = ({ title, description, content, course_id }) => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // Validation schema for form
  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email address").required("Email is required"),
    number: Yup.string()
      .matches(/^[0-9]+$/, "Mobile number must be digits")
      .required("Mobile number is required"),
    query: Yup.string().required("Query is required"),
  });

  // Form submission handler
  const handleSubmit = async (values: { name: string; email: string; number: string; query: string }, { resetForm }: { resetForm: () => void }) => {
    setLoading(true);
    try {
      const payload = {
        name: values.name,
        email: values.email,
        phone: values.number,
        query: values.query,
        course_id,
      };

  

      const response = await postData("connect-with-us/submit", payload);

      if (response.success) {
        show_notification("Query submitted successfully", "success");
        resetForm(); 
      } else {
        show_notification("Failed to submit query", "error");
      }
    } catch (error) {
      show_notification("Error submitting query", "error");
    } finally {
      setLoading(false);
      
    }
  };

  return (
    <div className="container">
      <div className="w-full flex flex-col items-center gap-5">
        <p className="text-3xl lg:text-4xl xl:text-5xl font-semibold text-center md:text-start">
          {title}
        </p>
        <p className="text-xs md:text-sm lg:text-base xl:text-lg text-gray-600 text-center md:w-[50%]">
          {description}
        </p>
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-5 mt-5">
          {content.length > 0 ? (
            content.map((item, index) => (
              <div key={index} className="flex flex-col gap-2">
                <div className="w-full p-[5%] bg-gray-100 rounded-md flex justify-between">
                  <div className="w-[80%] flex flex-col gap-5">
                    <p className="text-sm lg:text-base xl:text-xl">
                      {item.question}
                    </p>
                    {openFAQ === index && (
                      <p className="text-gray-400 text-[10px] lg:text-xs xl:text-sm">
                        {item.answer}
                      </p>
                    )}
                  </div>
                  <div
                    className={`lg:text-xl xl:text-2xl p-1 h-fit rounded-full ${
                      openFAQ === index ? "bg-[#525FE1] text-white" : "bg-purple-100"
                    }`}
                    onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                  >
                    {openFAQ === index ? <HiMinusSmall /> : <GoPlus />}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div>No FAQ content available</div>
          )}

          {/* Formik form for query submission */}
          <Formik
            initialValues={{ name: "", email: "", number: "", query: "" }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="w-full md:w-[100%] flex flex-col p-[3%] gap-3 bg-gray-100 rounded-md h-fit mb-24 md:md-10 lg:mb-0">
                <p className="font-semibold text-base xl:text-xl py-2">
                  ASK YOUR QUESTION
                </p>
                <hr />
                <div className="w-full flex flex-col gap-1">
                  <p className="text-xs lg:text-sm xl:text-base">Name</p>
                  <Field
                    name="name"
                    type="text"
                    placeholder="Enter your name ..."
                    className="p-3 text-[10px] lg:text-xs xl:text-sm"
                  />
                  <ErrorMessage name="name" component="div" className="text-red-500 text-xs" />
                </div>
                <div className="w-full flex flex-col gap-1">
                  <p className="text-xs lg:text-xs xl:text-sm">Email</p>
                  <Field
                    name="email"
                    type="text"
                    placeholder="Enter your email ..."
                    className="p-3 text-[10px] lg:text-xs xl:text-sm"
                  />
                  <ErrorMessage name="email" component="div" className="text-red-500 text-xs" />
                </div>
                <div className="w-full flex flex-col gap-1">
                  <p className="text-xs lg:text-xs xl:text-sm">Mobile Number</p>
                  <Field
                    name="number"
                    type="text"
                    placeholder="Enter your mobile number ..."
                    className="p-3 text-[10px] lg:text-xs xl:text-sm"
                  />
                  <ErrorMessage name="number" component="div" className="text-red-500 text-xs" />
                </div>
                <div className="w-full flex flex-col gap-1">
                  <p className="text-xs lg:text-xs xl:text-sm">Enter Your Query</p>
                  <Field
                    name="query"
                    type="text"
                    placeholder="Enter your query at least 10 characters"
                    className="p-3 text-[10px] lg:text-xs xl:text-sm"
                  />
                  <ErrorMessage name="query" component="div" className="text-red-500 text-xs" />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || loading}
                  className="w-full rounded bg-[#525FE1] text-white py-2 xl:py-3 text-xs mt-1"
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
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default FAQs;
