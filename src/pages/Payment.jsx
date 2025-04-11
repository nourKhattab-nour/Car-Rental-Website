import { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Payment() {
  const [paymentMethod, setPaymentMethod] = useState("credit-card");
  const [isProcessing, setIsProcessing] = useState(false);
  const [bookingDetails, setBookingDetails] = useState(null);
  const [showPaymentSuccess, setShowPaymentSuccess] = useState(false);

  const paymentSchema = Yup.object().shape({
    cardholderName: Yup.string().when("paymentMethod", {
      is: "credit-card",
      then: () =>
        Yup.string()
          .required("Cardholder name is required")
          .min(3, "Name must be at least 3 characters"),
    }),
    cardNumber: Yup.string().when("paymentMethod", {
      is: "credit-card",
      then: () =>
        Yup.string()
          .required("Card number is required")
          .matches(/^[\d\s]{13,19}$/, "Invalid card number"),
    }),
    expiryMonth: Yup.string().when("paymentMethod", {
      is: "credit-card",
      then: () => Yup.string().required("Required"),
    }),
    expiryYear: Yup.string().when("paymentMethod", {
      is: "credit-card",
      then: () => Yup.string().required("Required"),
    }),
    cvc: Yup.string().when("paymentMethod", {
      is: "credit-card",
      then: () =>
        Yup.string()
          .required("Required")
          .matches(/^\d{3,4}$/, "3-4 digits"),
    }),
    billingAddress: Yup.string().when("paymentMethod", {
      is: "credit-card",
      then: () => Yup.string().required("Required"),
    }),
    city: Yup.string().when("paymentMethod", {
      is: "credit-card",
      then: () => Yup.string().required("Required"),
    }),
    zipCode: Yup.string().when("paymentMethod", {
      is: "credit-card",
      then: () =>
        Yup.string()
          .required("Required")
          .matches(/^\d{5}(-\d{4})?$/, "Valid ZIP required"),
    }),
    terms: Yup.boolean().oneOf([true], "You must accept the terms"),
  });

  useEffect(() => {
    try {
      const storedBooking = localStorage.getItem("carRentalBooking");
      if (storedBooking) {
        const bookingData = JSON.parse(storedBooking);

        if (bookingData.pickupDate)
          bookingData.pickupDate = new Date(bookingData.pickupDate);
        if (bookingData.returnDate)
          bookingData.returnDate = new Date(bookingData.returnDate);

        setBookingDetails({
          carName: bookingData.car?.name || "No car selected",
          carCategory: bookingData.car?.category || "Please return to booking",
          carImage: bookingData.car?.image || "/placeholder.svg",
          pickupLocation: bookingData.pickupLocation || "not-selected",
          dropoffLocation: bookingData.dropoffLocation || "not-selected",
          pickupDate: bookingData.pickupDate,
          returnDate: bookingData.returnDate,
          rentalDetails: bookingData.rentalDetails || {
            days: 0,
            dailyRate: 0,
            totalPrice: 0,
          },
          taxes: bookingData.taxes || 0,
          totalPrice:
            (bookingData.rentalDetails?.totalPrice || 0) +
            (bookingData.taxes || 0),
        });
      } else {
        setBookingDetails({
          carName: "No car selected",
          carCategory: "Please return to booking",
          carImage: "/placeholder.svg",
          pickupLocation: "not-selected",
          dropoffLocation: "not-selected",
          pickupDate: new Date(),
          returnDate: new Date(new Date().setDate(new Date().getDate() + 3)),
          rentalDetails: { days: 3, dailyRate: 0, totalPrice: 0 },
          taxes: 0,
          totalPrice: 0,
        });
      }
    } catch (error) {
      console.error("Error loading booking details:", error);
    }
  }, []);

  const formatCardNumber = (value) => {
    return value
      .replace(/\D/g, "")
      .replace(/(\d{4})(?=\d)/g, "$1 ")
      .slice(0, 19);
  };

  const handleSubmitPayment = (values, { setSubmitting }) => {
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      setShowPaymentSuccess(true);
      setSubmitting(false);

      setTimeout(() => {
        alert("Payment successful");

        setShowPaymentSuccess(false);
      }, 2000);
    }, 1500);
  };

  const formatDate = (date) => {
    if (!date) return "";
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getLocationName = (code) => {
    const locations = {
      "cairo-airport": "Cairo International Airport",
      "cairo-downtown": "Cairo Downtown",
      alexandria: "Alexandria",
      sharm: "Sharm El Sheikh",
      hurghada: "Hurghada",
    };
    return locations[code] || code;
  };

  if (!bookingDetails) {
    return (
      <div className="min-h-screen bg-secondary">
        <Navbar />
        <div className="container mx-auto px-4 py-16 text-center">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mx-auto mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/4 mx-auto"></div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary text-white">
      <Navbar />

      {/* Payment Successful */}
      {showPaymentSuccess && (
        <div className="fixed inset-0 bg-secondary bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-[#111111] rounded-lg p-6 max-w-md w-full shadow-xl border border-gray-700 text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
              <svg
                className="h-6 w-6 text-green-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-white mb-2">
              Payment Successful!
            </h3>
            <p className="text-sm text-gray-400">
              Redirecting to confirmation page...
            </p>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-white mb-2">
          Complete Your Payment
        </h1>
        <p className="text-gray-300 mb-6">
          Please review your booking details and complete payment
        </p>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            {/* Booking Summary */}
            <div className="bg-[#111111] border border-gray-700 rounded-lg shadow-sm mb-6">
              <div className="p-4 border-b border-gray-700">
                <h2 className="text-xl font-semibold text-white">
                  Booking Summary
                </h2>
              </div>
              <div className="p-4">
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={bookingDetails.carImage || "/placeholder.svg"}
                    alt={bookingDetails.carName}
                    className="h-20 w-32 object-cover rounded-md"
                  />
                  <div>
                    <h3 className="font-semibold text-white">
                      {bookingDetails.carName}
                    </h3>
                    <p className="text-sm text-gray-300">
                      {bookingDetails.carCategory}
                    </p>
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <div>
                    <p className="text-sm text-gray-300">Pickup Location</p>
                    <p className="font-medium text-white">
                      {getLocationName(bookingDetails.pickupLocation)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-300">Drop-off Location</p>
                    <p className="font-medium text-white">
                      {getLocationName(bookingDetails.dropoffLocation)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-300">Pickup Date</p>
                    <p className="font-medium text-white">
                      {formatDate(bookingDetails.pickupDate)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-300">Return Date</p>
                    <p className="font-medium text-white">
                      {formatDate(bookingDetails.returnDate)}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-[#111111] border border-gray-700 rounded-lg shadow-sm">
              <div className="p-4 border-b border-gray-700">
                <h2 className="text-xl font-semibold text-white">
                  Payment Method
                </h2>
              </div>
              <div className="p-4">
                <div className="flex border-b border-gray-700 mb-4">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("credit-card")}
                    className={`py-2 px-4 font-medium ${
                      paymentMethod === "credit-card"
                        ? "border-b-2 border-[#4d9fff] text-[#4d9fff]"
                        : "text-gray-400 hover:text-gray-300"
                    }`}
                  >
                    Credit Card
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("cash")}
                    className={`py-2 px-4 font-medium ${
                      paymentMethod === "cash"
                        ? "border-b-2 border-[#4d9fff] text-[#4d9fff]"
                        : "text-gray-400 hover:text-gray-300"
                    }`}
                  >
                    Cash
                  </button>
                </div>

                <Formik
                  initialValues={{
                    paymentMethod,
                    cardholderName: "",
                    cardNumber: "",
                    expiryMonth: "",
                    expiryYear: "",
                    cvc: "",
                    billingAddress: "",
                    city: "",
                    zipCode: "",
                    terms: false,
                  }}
                  validationSchema={paymentSchema}
                  onSubmit={handleSubmitPayment}
                  enableReinitialize
                >
                  {({ setFieldValue, isSubmitting }) => (
                    <Form>
                      {paymentMethod === "credit-card" && (
                        <div className="space-y-4">
                          <div>
                            <label
                              htmlFor="cardholderName"
                              className="block text-sm font-medium text-gray-300 mb-1"
                            >
                              Cardholder Name
                            </label>
                            <Field
                              type="text"
                              id="cardholderName"
                              name="cardholderName"
                              placeholder="John Smith"
                              className="w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-800 text-white"
                            />
                            <ErrorMessage
                              name="cardholderName"
                              component="div"
                              className="text-red-400 text-xs mt-1"
                            />
                          </div>

                          <div>
                            <label
                              htmlFor="cardNumber"
                              className="block text-sm font-medium text-gray-300 mb-1"
                            >
                              Card Number
                            </label>
                            <Field
                              type="text"
                              id="cardNumber"
                              name="cardNumber"
                              placeholder="1234 5678 9012 3456"
                              maxLength={19}
                              className="w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-800 text-white"
                              onChange={(e) =>
                                setFieldValue(
                                  "cardNumber",
                                  formatCardNumber(e.target.value)
                                )
                              }
                            />
                            <ErrorMessage
                              name="cardNumber"
                              component="div"
                              className="text-red-400 text-xs mt-1"
                            />
                          </div>

                          <div className="grid grid-cols-3 gap-4">
                            <div>
                              <label
                                htmlFor="expiryMonth"
                                className="block text-sm font-medium text-gray-300 mb-1"
                              >
                                Month
                              </label>
                              <Field
                                as="select"
                                id="expiryMonth"
                                name="expiryMonth"
                                className="w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-800 text-white"
                              >
                                <option value="">Month</option>
                                {Array.from({ length: 12 }, (_, i) => (
                                  <option
                                    key={i + 1}
                                    value={(i + 1).toString().padStart(2, "0")}
                                  >
                                    {(i + 1).toString().padStart(2, "0")}
                                  </option>
                                ))}
                              </Field>
                              <ErrorMessage
                                name="expiryMonth"
                                component="div"
                                className="text-red-400 text-xs mt-1"
                              />
                            </div>

                            <div>
                              <label
                                htmlFor="expiryYear"
                                className="block text-sm font-medium text-gray-300 mb-1"
                              >
                                Year
                              </label>
                              <Field
                                as="select"
                                id="expiryYear"
                                name="expiryYear"
                                className="w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-800 text-white"
                              >
                                <option value="">Year</option>
                                {Array.from({ length: 10 }, (_, i) => (
                                  <option key={i} value={(2025 + i).toString()}>
                                    {2025 + i}
                                  </option>
                                ))}
                              </Field>
                              <ErrorMessage
                                name="expiryYear"
                                component="div"
                                className="text-red-400 text-xs mt-1"
                              />
                            </div>

                            <div>
                              <label
                                htmlFor="cvc"
                                className="block text-sm font-medium text-gray-300 mb-1"
                              >
                                CVC
                              </label>
                              <Field
                                type="text"
                                id="cvc"
                                name="cvc"
                                placeholder="123"
                                maxLength={4}
                                className="w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-800 text-white"
                              />
                              <ErrorMessage
                                name="cvc"
                                component="div"
                                className="text-red-400 text-xs mt-1"
                              />
                            </div>
                          </div>

                          <div>
                            <h3 className="font-medium text-gray-300 mb-2">
                              Billing Information
                            </h3>
                            <div className="space-y-4">
                              <div>
                                <label
                                  htmlFor="billingAddress"
                                  className="block text-sm font-medium text-gray-300 mb-1"
                                >
                                  Address
                                </label>
                                <Field
                                  type="text"
                                  id="billingAddress"
                                  name="billingAddress"
                                  placeholder="123 Main St"
                                  className="w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-800 text-white"
                                />
                                <ErrorMessage
                                  name="billingAddress"
                                  component="div"
                                  className="text-red-400 text-xs mt-1"
                                />
                              </div>

                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <label
                                    htmlFor="city"
                                    className="block text-sm font-medium text-gray-300 mb-1"
                                  >
                                    City
                                  </label>
                                  <Field
                                    type="text"
                                    id="city"
                                    name="city"
                                    placeholder="New York"
                                    className="w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-800 text-white"
                                  />
                                  <ErrorMessage
                                    name="city"
                                    component="div"
                                    className="text-red-400 text-xs mt-1"
                                  />
                                </div>

                                <div>
                                  <label
                                    htmlFor="zipCode"
                                    className="block text-sm font-medium text-gray-300 mb-1"
                                  >
                                    ZIP Code
                                  </label>
                                  <Field
                                    type="text"
                                    id="zipCode"
                                    name="zipCode"
                                    placeholder="10001"
                                    className="w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-800 text-white"
                                  />
                                  <ErrorMessage
                                    name="zipCode"
                                    component="div"
                                    className="text-red-400 text-xs mt-1"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {paymentMethod === "cash" && (
                        <div className="py-4 text-center">
                          <div className="mb-4 p-3 rounded-full bg-gray-800 inline-block">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="32"
                              height="32"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="text-[#4d9fff]"
                            >
                              <rect
                                x="2"
                                y="6"
                                width="20"
                                height="12"
                                rx="2"
                              ></rect>
                              <circle cx="12" cy="12" r="2"></circle>
                              <path d="M6 12h.01M18 12h.01"></path>
                            </svg>
                          </div>
                          <p className="text-gray-300 mb-4">
                            Pay in cash at the time of pickup
                          </p>
                          <p className="text-sm text-gray-400 bg-gray-800 p-3 rounded-md">
                            A valid credit card is required at pickup for
                            security deposit.
                          </p>
                        </div>
                      )}

                      {/* Terms and Conditions */}
                      <div className="mt-4 flex items-center">
                        <Field
                          type="checkbox"
                          id="terms"
                          name="terms"
                          className="h-4 w-4 text-[#4d9fff] border-gray-600 rounded"
                        />
                        <label
                          htmlFor="terms"
                          className="ml-2 block text-sm text-gray-300"
                        >
                          I agree to the{" "}
                          <a
                            href="#"
                            className="text-[#4d9fff] hover:underline"
                          >
                            Terms and Conditions
                          </a>
                        </label>
                      </div>
                      <ErrorMessage
                        name="terms"
                        component="div"
                        className="text-red-400 text-xs mt-1"
                      />

                      <div className="mt-4 flex gap-4">
                        <button
                          type="button"
                          onClick={() => (window.location.href = "/booking")}
                          className="px-4 py-2 border border-gray-600 rounded-md text-white bg-gray-800"
                        >
                          Back
                        </button>
                        <button
                          type="submit"
                          disabled={isProcessing || isSubmitting}
                          className={`flex-1 py-2 px-4 rounded-md font-medium text-white ${
                            isProcessing || isSubmitting
                              ? "bg-gray-600"
                              : "bg-[#4d9fff] hover:bg-[#3a8aee]"
                          }`}
                        >
                          {isProcessing || isSubmitting
                            ? "Processing..."
                            : `Pay $${bookingDetails.totalPrice.toFixed(2)}`}
                        </button>
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          </div>

          {/* Price Summary */}
          <div>
            <div className="sticky top-10">
              <div className="bg-[#111111] border border-gray-700 rounded-lg shadow-sm">
                <div className="p-4 border-b border-gray-700">
                  <h2 className="text-lg font-bold text-white">
                    Price Details
                  </h2>
                </div>
                <div className="p-4 space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-300">
                        Base rate ({bookingDetails.rentalDetails.days} days)
                      </span>
                      <span className="text-white">
                        ${bookingDetails.rentalDetails.totalPrice.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Taxes & fees</span>
                      <span className="text-white">
                        ${bookingDetails.taxes.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <div className="border-t border-gray-700 pt-4">
                    <div className="flex justify-between font-medium">
                      <span className="text-white">Total</span>
                      <span className="text-white">
                        ${bookingDetails.totalPrice.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <div className="bg-gray-800 p-3 rounded-md flex items-start gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mt-0.5 text-[#4d9fff]"
                    >
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                      <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                    <div>
                      <h4 className="font-medium text-white text-sm">
                        Free Cancellation
                      </h4>
                      <p className="text-xs text-gray-300">
                        Cancel for free up to 24 hours before pickup
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
