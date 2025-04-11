
import React from "react"
import { Formik, Form, Field, ErrorMessage } from "formik"
import { object, string, number } from "yup"
import { Star } from "lucide-react"

const BannerImg = {
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  width: "100%",
  minHeight: "300px",
}

const Subscribe = () => {
  const [submitted, setSubmitted] = React.useState(false)

  // Validation schema using Yup
  const validationSchema = object().shape({
    name: string().required("Name is required"),
    email: string().email("Invalid email address").required("Email is required"),
    rating: number().min(1, "Please select a rating").required("Rating is required"),
    comment: string().required("Please write your review").min(10, "Review must be at least 10 characters"),
  })

  const handleSubmit = (values, { resetForm, setSubmitting }) => {
    // Create review object with timestamp and ID
    const newReview = {
      ...values,
      timestamp: new Date().toISOString(),
      id: Date.now(),
    }

    // Get existing reviews from localStorage
    const existingReviews = JSON.parse(localStorage.getItem("customerReviews") || "[]")

    // Add new review
    const updatedReviews = [...existingReviews, newReview]

    // Save to localStorage
    localStorage.setItem("customerReviews", JSON.stringify(updatedReviews))

    // Trigger storage event for other components to detect the change
    window.dispatchEvent(new Event("storage"))

    // Show success message
    setSubmitted(true)
    setSubmitting(false)
    resetForm()

    // Reset success message after 3 seconds
    setTimeout(() => {
      setSubmitted(false)
    }, 3000)
  }

  return (
    <div data-aos="zoom-in" className="mb-20 text-white bg-blue-500" style={BannerImg}>
      <div className="container py-20 flex flex-col items-center justify-center backdrop-blur-lg">
        <div className="space-y-6 max-w-xl text-center">
          <h1 className="text-2xl sm:text-4xl font-semibold">Enjoyed the Ride? Leave Us a Note!</h1>

          {submitted ? (
            <div className="bg-green-500 text-white p-4 rounded-md">
              Thank you for your review! It has been submitted successfully.
            </div>
          ) : (
            <Formik
              initialValues={{
                name: "",
                email: "",
                rating: 0,
                comment: "",
              }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ values, setFieldValue, isSubmitting }) => (
                <Form className="space-y-4 w-full">
                  <div>
                    <Field
                      type="text"
                      name="name"
                      placeholder="Your Name"
                      className="w-full p-3 text-black border border-gray-300 rounded-md"
                    />
                    <ErrorMessage name="name" component="div" className="text-red-400 text-sm mt-1 text-left" />
                  </div>

                  <div>
                    <Field
                      type="email"
                      name="email"
                      placeholder="Your Email"
                      className="w-full p-3 text-black border border-gray-300 rounded-md"
                    />
                    <ErrorMessage name="email" component="div" className="text-red-400 text-sm mt-1 text-left" />
                  </div>

                  <div>
                    <div className="flex justify-center space-x-2 my-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setFieldValue("rating", star)}
                          className="focus:outline-none"
                        >
                          <Star
                            className={`h-6 w-6 ${
                              values.rating >= star ? "text-yellow-400 fill-yellow-400" : "text-gray-200"
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                    <ErrorMessage name="rating" component="div" className="text-red-400 text-sm mt-1 text-center" />
                  </div>

                  <div>
                    <Field
                      as="textarea"
                      name="comment"
                      placeholder="Write your review"
                      className="w-full p-3 text-black border border-gray-300 rounded-md"
                      rows="3"
                    />
                    <ErrorMessage name="comment" component="div" className="text-red-400 text-sm mt-1 text-left" />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full ${
                      isSubmitting ? "bg-gray-500" : "bg-blue-600 hover:bg-blue-700"
                    } text-white font-medium py-2 px-4 rounded-md transition duration-300`}
                  >
                    {isSubmitting ? "Submitting..." : "Submit Review"}
                  </button>
                </Form>
              )}
            </Formik>
          )}
        </div>
      </div>
    </div>
  )
}

export default Subscribe
