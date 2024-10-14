"use client";
import Link from "next/link";

import { useState } from "react";
import { ArrowLeft } from "lucide-react";

type QuestionType = "multiple-choice" | "short-answer" | "long-answer";

interface Question {
  text: string;
  type: QuestionType;
  isRequired: boolean;
  answers: string[];
}

const staticQuestions: Question[] = [
  {
    text: "What is your favorite color?",
    type: "multiple-choice",
    isRequired: true,
    answers: ["Red", "Blue", "Green", "Yellow"],
  },
  {
    text: "Describe your ideal vacation in a few words.",
    type: "short-answer",
    isRequired: false,
    answers: [],
  },
  {
    text: "What are your long-term career goals?",
    type: "long-answer",
    isRequired: true,
    answers: [],
  },
];

export default function LoginForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
  });

  const [answers, setAnswers] = useState<string[]>(["", "", ""]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAnswerChange = (index: number, value: string) => {
    setAnswers((prevAnswers) => {
      const newAnswers = [...prevAnswers];
      newAnswers[index] = value;
      return newAnswers;
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted:", { ...formData, answers });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-2xl w-full space-y-8 p-10 bg-white rounded-xl shadow-lg">
        <div className="flex justify-between items-center">
          <div>
            <img
              src="/placeholder.svg?height=40&width=120"
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
          <h2 className="text-3xl font-extrabold text-gray-900">Login</h2>
          <p className="mt-2 text-sm text-gray-600">
            Please fill in your information and answer the questions
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                placeholder="Your full name"
                value={formData.name}
                onChange={handleChange}
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
                value={formData.email}
                onChange={handleChange}
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
                value={formData.phoneNumber}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-600">Questions</h3>
            {staticQuestions.map((question, index) => (
              <div
                key={index}
                className="p-4 border border-gray-200 rounded-md"
              >
                <h4 className="text-md font-medium text-gray-500 mb-2">
                  Question {index + 1}
                  {question.isRequired && (
                    <span className="text-red-500 ml-1">*</span>
                  )}
                </h4>
                <p className="mb-2 text-gray-950">{question.text}</p>
                {question.type === "multiple-choice" ? (
                  <select
                    value={answers[index]}
                    onChange={(e) => handleAnswerChange(index, e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-md"
                    required={question.isRequired}
                  >
                    <option value="">Select an option</option>
                    {question.answers.map((answer, answerIndex) => (
                      <option key={answerIndex} value={answer}>
                        {answer}
                      </option>
                    ))}
                  </select>
                ) : question.type === "short-answer" ? (
                  <input
                    type="text"
                    value={answers[index]}
                    onChange={(e) => handleAnswerChange(index, e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required={question.isRequired}
                  />
                ) : (
                  <textarea
                    value={answers[index]}
                    onChange={(e) => handleAnswerChange(index, e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    rows={4}
                    required={question.isRequired}
                  />
                )}
              </div>
            ))}
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition duration-150 ease-in-out"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
