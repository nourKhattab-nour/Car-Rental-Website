import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { object, string, number } from "yup";
import { Star } from "lucide-react";
import axios from "axios";

const Subscribe = () => {
  const [submitted, setSubmitted] = React.useState(false);

  const validationSchema = object().shape({
    name: string().required("Name is required"),
    email: string()
      .email("Invalid email address")
      .required("Email is required"),
    rating: number()
      .min(1, "Please select a rating")
      .required("Rating is required"),
    comment: string()
      .min(10, "Review must be at least 10 characters")
      .required("Please write your review"),
  });

  const handleSubmit = (values, { resetForm, setSubmitting }) => {
    const newReview = {
      ...values,
      timestamp: new Date().toISOString(),
      id: Date.now(),
    };
    console.log("New review:", newReview);
    
    axios.post("http://127.0.0.1:3000/api/review/SubmitReview", newReview).then((response) => {
      console.log("Review submitted successfully:", response.data);
    }).catch((error) => {
      console.error("Error submitting review:", error);
    });

    const existingReviews = JSON.parse(
      localStorage.getItem("customerReviews") || "[]"
    );
    const updatedReviews = [...existingReviews, newReview];

    localStorage.setItem("customerReviews", JSON.stringify(updatedReviews));
    window.dispatchEvent(new Event("storage"));

    setSubmitted(true);
    setSubmitting(false);
    resetForm();

    setTimeout(() => {
      setSubmitted(false);
    }, 3000);
  };

  return (
    <div className="w-full   text-white py-10 px-4">
      <div className="container mx-auto max-w-xl backdrop-blur-lg bg-black/40 p-8 rounded-xl">
        <h1 className="text-3xl font-bold text-center mb-6">
          Enjoyed the Ride? Leave Us a Note!
        </h1>

        {submitted ? (
          <div className="bg-green-500 text-white p-4 rounded-md text-center">
            Thank you for your review! It has been submitted successfully.
          </div>
        ) : (
          <Formik
            initialValues={{ name: "", email: "", rating: 0, comment: "" }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ values, setFieldValue, isSubmitting }) => (
              <Form className="space-y-6">
                {/* Name Field */}
                <div>
                  <Field
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    className="w-full p-3 bg-white/10 text-white placeholder-white border border-gray-300 rounded-md"
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-red-300 text-sm mt-1"
                  />
                </div>

                {/* Email Field */}
                <div>
                  <Field
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    className="w-full p-3 bg-white/10 text-white placeholder-white border border-gray-300 rounded-md"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-300 text-sm mt-1"
                  />
                </div>

                {/* Star Rating */}
                <div>
                  <div className="flex justify-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setFieldValue("rating", star)}
                        className="focus:outline-none"
                      >
                        <Star
                          className={`w-6 h-6 transition ${
                            values.rating >= star
                              ? "text-yellow-400 fill-yellow-400"
                              : "text-white"
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                  <ErrorMessage
                    name="rating"
                    component="div"
                    className="text-red-300 text-sm mt-1 text-center"
                  />
                </div>

                {/* Comment Field */}
                <div>
                  <Field
                    as="textarea"
                    name="comment"
                    placeholder="Write your review..."
                    className="w-full p-3 bg-white/10 text-white placeholder-white border border-gray-300 rounded-md"
                    rows="4"
                  />
                  <ErrorMessage
                    name="comment"
                    component="div"
                    className="text-red-300 text-sm mt-1"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-3 rounded-md font-semibold transition ${
                    isSubmitting
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-primary text-black"
                  }`}
                >
                  {isSubmitting ? "Submitting..." : "Submit Review"}
                </button>
              </Form>
            )}
          </Formik>
        )}
      </div>
    </div>
  );
};

export default Subscribe;
