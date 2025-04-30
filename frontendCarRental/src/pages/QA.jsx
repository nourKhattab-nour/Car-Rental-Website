import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { FaPlusCircle, FaMinusCircle } from "react-icons/fa";

const QA = () => {
  const [activeQuestion, setActiveQuestion] = useState(null);

  const questions = [
    {
      id: 1,
      question: "How do I get a refund?",
      answer:
        "You can get a refund by contacting our customer service team at 1-800-123-4567",
    },
    {
      id: 2,
      question: "What is the minimum age to rent a car?",
      answer: "The minimum age to rent a car is 21 years old",
    },
    {
      id: 3,
      question: "Do you offer car insurance?",
      answer: "Yes, we offer car insurance for an additional fee",
    },
    {
      id: 4,
      question: "Do you offer car delivery?",
      answer: "Yes, we offer car delivery for an additional fee",
    },
    {
      id: 5,
      question: "What is the maximum number of passengers allowed in a car?",
      answer: "The maximum number of passengers allowed in a car is 5",
    },
  ];

  const toggleQuestion = (index) => {
    setActiveQuestion(activeQuestion === index ? null : index);
  };

  return (
    <>
      <Navbar />
      <div className="w-screen min-h-screen bg-secondary flex flex-col items-center py-10">
        <div className="w-[89%] m-auto max-w-[1400px] bg-[#111111] p-5 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold text-center mb-5 text-white">
            Frequently Asked Questions
          </h1>
          {questions.map((q, index) => (
            <div key={q.id} className="mb-4 last:mb-0">
              <button
                className="w-full text-left text-xl focus:outline-none p-4 bg-[#111111] rounded-lg shadow-md flex justify-between items-center text-white"
                onClick={() => toggleQuestion(index)}
              >
                {q.question}
                {activeQuestion === index ? (
                  <FaMinusCircle className="text-[#4d9fff]" />
                ) : (
                  <FaPlusCircle className="text-[#4d9fff]" />
                )}
              </button>
              <AnimatePresence>
                {activeQuestion === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="p-4 bg-[#1a2234] rounded-lg shadow-md mt-2 text-gray-300"
                  >
                    {q.answer}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default QA;
