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

  // Validation schema using Yup
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
          .matches(
            /^[\\d\\s]{13,19}$/,
            "Card number must be between 13-19 digits"
          )
          .test("test-number", "Credit card number is invalid", (value) =>
            value ? value.replace(/\s/g, "").length >= 13 : true
          ),
    }),
    expiryMonth: Yup.string().when("paymentMethod", {
      is: "credit-card",
      then: () => Yup.string().required("Expiry month is required"),
    }),
    expiryYear: Yup.string().when("paymentMethod", {
      is: "credit-card",
      then: () =>
        Yup.string()
          .required("Expiry year is required")
          .test("expiry-date", "Card has expired", function (value) {
            const { expiryMonth } = this.parent;
            if (!expiryMonth || !value) return true;

            const currentDate = new Date();
            const currentYear = currentDate.getFullYear();
            const currentMonth = currentDate.getMonth() + 1;

            const selectedYear = Number.parseInt(value);
            const selectedMonth = Number.parseInt(expiryMonth);

            if (selectedYear < currentYear) return false;
            if (selectedYear === currentYear && selectedMonth < currentMonth)
              return false;

            return true;
          }),
    }),
    cvc: Yup.string().when("paymentMethod", {
      is: "credit-card",
      then: () =>
        Yup.string()
          .required("CVC is required")
          .matches(/^\\d{3,4}$/, "CVC must be 3 or 4 digits"),
    }),
    billingAddress: Yup.string().when("paymentMethod", {
      is: "credit-card",
      then: () => Yup.string().required("Billing address is required"),
    }),
    city: Yup.string().when("paymentMethod", {
      is: "credit-card",
      then: () => Yup.string().required("City is required"),
    }),
    zipCode: Yup.string().when("paymentMethod", {
      is: "credit-card",
      then: () =>
        Yup.string()
          .required("ZIP code is required")
          .matches(
            /^\\d{5}(-\\d{4})?$/,
            "ZIP code must be valid (e.g., 12345 or 12345-6789)"
          ),
    }),
    terms: Yup.boolean().oneOf(
      [true],
      "You must accept the terms and conditions"
    ),
  });

  // Simulate fetching booking details from previous step
  useEffect(() => {
    // Simple function to get booking data from localStorage
    const getBookingDetails = () => {
      try {
        // Get data from localStorage
        const storedBooking = localStorage.getItem("carRentalBooking");
        console.log("Raw booking data from localStorage:", storedBooking);

        if (storedBooking) {
          const bookingData = JSON.parse(storedBooking);
          console.log("Parsed booking data:", bookingData);

          // Convert string dates back to Date objects
          if (bookingData.pickupDate)
            bookingData.pickupDate = new Date(bookingData.pickupDate);
          if (bookingData.returnDate)
            bookingData.returnDate = new Date(bookingData.returnDate);

          return bookingData;
        }
      } catch (error) {
        console.error("Error loading booking details:", error);
      }

      // Return default data if no booking found
      return {
        carName: "No car selected",
        carCategory: "Please return to booking",
        carImage: "/placeholder.svg",
        pickupLocation: "not-selected",
        dropoffLocation: "not-selected",
        pickupDate: new Date(),
        returnDate: new Date(new Date().setDate(new Date().getDate() + 3)),
        days: 3,
        basePrice: 0,
        insurance: 0,
        taxes: 0,
        totalPrice: 0,
      };
    };

    setBookingDetails(getBookingDetails());
  }, []);

  // Clear localStorage when running in development mode
  useEffect(() => {
    // Uncomment this if you want to clear localStorage during development
    // if (process.env.NODE_ENV === "development") {
    //   localStorage.removeItem("bookingDetails");
    // }
  }, []);

  const formatCardNumber = (value) => {
    // Remove non-digit characters
    const digits = value.replace(/\\D/g, "");

    // Add space after every 4 digits
    const formatted = digits.replace(/(\\d{4})(?=\\d)/g, "$1 ");

    // Limit to 19 characters (16 digits + 3 spaces)
    return formatted.slice(0, 19);
  };

  // Update the handleSubmitPayment function to include validation feedback
  const handleSubmitPayment = (values, { setSubmitting, setErrors }) => {
    setIsProcessing(true);

    // Validate expiry date
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;

    const selectedYear = Number.parseInt(values.expiryYear);
    const selectedMonth = Number.parseInt(values.expiryMonth);

    if (
      values.paymentMethod === "credit-card" &&
      selectedYear &&
      selectedMonth &&
      (selectedYear < currentYear ||
        (selectedYear === currentYear && selectedMonth < currentMonth))
    ) {
      setErrors({ expiryYear: "Card has expired" });
      setIsProcessing(false);
      setSubmitting(false);
      return;
    }

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setShowPaymentSuccess(true);
      setSubmitting(false);

      // Redirect after showing the success message
      setTimeout(() => {
        window.location.href = "/confirmation";
      }, 3000);
    }, 2000);
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

  const handleBackToBooking = () => {
    // Simply redirect back to booking page
    window.location.href = "/booking";
  };

  if (!bookingDetails) {
    return (
      <div className="min-h-screen bg-black">
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
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      {/* Payment Success Modal */}
      {showPaymentSuccess && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-black rounded-lg p-8 max-w-md w-full shadow-xl border border-gray-700">
            <div className="text-center">
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
              <p className="text-sm text-gray-400 mb-4">
                Your payment of ${bookingDetails.totalPrice.toFixed(2)} has been
                processed successfully.
              </p>
              <p className="text-sm text-gray-400">
                You will be redirected to the confirmation page shortly...
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">
            Complete Your Payment
          </h1>
          <p className="text-gray-300">
            Please review your booking details and complete payment
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="bg-black border border-gray-700 rounded-lg overflow-hidden shadow-sm mb-6">
              <div className="p-6 border-b border-gray-700">
                <h2 className="text-xl font-semibold text-white">
                  Booking Summary
                </h2>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-4 mb-6">
                  <div className="relative h-24 w-40 overflow-hidden rounded-md">
                    <img
                      src={bookingDetails.carImage || "/placeholder.svg"}
                      alt={bookingDetails.carName}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">
                      {bookingDetails.carName}
                    </h3>
                    <p className="text-sm text-gray-300">
                      {bookingDetails.carCategory}
                    </p>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 mb-6">
                  <div>
                    <p className="text-sm text-gray-300 mb-1">
                      Pickup Location
                    </p>
                    <p className="font-medium text-white">
                      {getLocationName(bookingDetails.pickupLocation)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-300 mb-1">
                      Drop-off Location
                    </p>
                    <p className="font-medium text-white">
                      {getLocationName(bookingDetails.dropoffLocation)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-300 mb-1">Pickup Date</p>
                    <p className="font-medium text-white">
                      {formatDate(bookingDetails.pickupDate)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-300 mb-1">Return Date</p>
                    <p className="font-medium text-white">
                      {formatDate(bookingDetails.returnDate)}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-black border border-gray-700 rounded-lg overflow-hidden shadow-sm">
              <div className="p-6 border-b border-gray-700">
                <h2 className="text-xl font-semibold text-white">
                  Payment Method
                </h2>
              </div>
              <div className="p-6">
                <div className="flex border-b border-gray-700 mb-6">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("credit-card")}
                    className={`py-2 px-4 font-medium ${
                      paymentMethod === "credit-card"
                        ? "border-b-2 border-blue-400 text-blue-400"
                        : "text-gray-400 hover:text-gray-300"
                    }`}
                  >
                    Credit Card
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("paypal")}
                    className={`py-2 px-4 font-medium ${
                      paymentMethod === "paypal"
                        ? "border-b-2 border-blue-400 text-blue-400"
                        : "text-gray-400 hover:text-gray-300"
                    }`}
                  >
                    PayPal
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("apple-pay")}
                    className={`py-2 px-4 font-medium ${
                      paymentMethod === "apple-pay"
                        ? "border-b-2 border-blue-400 text-blue-400"
                        : "text-gray-400 hover:text-gray-300"
                    }`}
                  >
                    Apple Pay
                  </button>
                </div>

                <Formik
                  initialValues={{
                    paymentMethod: paymentMethod,
                    cardholderName: "",
                    cardNumber: "",
                    expiryMonth: "",
                    expiryYear: "",
                    cvc: "",
                    billingAddress: "",
                    city: "",
                    zipCode: "",
                    saveCard: false,
                    terms: false,
                  }}
                  validationSchema={paymentSchema}
                  onSubmit={handleSubmitPayment}
                  enableReinitialize
                >
                  {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    setFieldValue,
                    isSubmitting,
                  }) => {
                    // Count validation errors for credit card form
                    const errorCount =
                      paymentMethod === "credit-card"
                        ? Object.keys(errors).filter(
                            (key) => key !== "terms" && touched[key]
                          ).length
                        : 0;

                    return (
                      <Form>
                        {paymentMethod === "credit-card" && errorCount > 0 && (
                          <div className="mb-6 p-3 bg-red-900 border border-red-700 rounded-md">
                            <p className="text-sm text-white font-medium">
                              Please correct the following {errorCount}{" "}
                              {errorCount === 1 ? "error" : "errors"} to
                              proceed:
                            </p>
                            <ul className="mt-1 text-xs text-red-200 list-disc list-inside">
                              {Object.entries(errors).map(([field, message]) =>
                                touched[field] && field !== "terms" ? (
                                  <li key={field}>{message}</li>
                                ) : null
                              )}
                            </ul>
                          </div>
                        )}
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
                                className={`w-full px-3 py-2 border ${
                                  errors.cardholderName &&
                                  touched.cardholderName
                                    ? "border-red-500"
                                    : "border-gray-600"
                                } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-800 text-white`}
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
                              <div className="relative">
                                <Field
                                  type="text"
                                  id="cardNumber"
                                  name="cardNumber"
                                  placeholder="1234 5678 9012 3456"
                                  maxLength={19}
                                  className={`w-full px-3 py-2 border ${
                                    errors.cardNumber && touched.cardNumber
                                      ? "border-red-500"
                                      : "border-gray-600"
                                  } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 pr-10 bg-gray-800 text-white`}
                                  onChange={(e) => {
                                    const formatted = formatCardNumber(
                                      e.target.value
                                    );
                                    setFieldValue("cardNumber", formatted);
                                  }}
                                />
                                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  >
                                    <rect
                                      x="1"
                                      y="4"
                                      width="22"
                                      height="16"
                                      rx="2"
                                      ry="2"
                                    ></rect>
                                    <line x1="1" y1="10" x2="23" y2="10"></line>
                                  </svg>
                                </div>
                              </div>
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
                                  Expiry Month
                                </label>
                                <Field
                                  as="select"
                                  id="expiryMonth"
                                  name="expiryMonth"
                                  className={`w-full px-3 py-2 border ${
                                    errors.expiryMonth && touched.expiryMonth
                                      ? "border-red-500"
                                      : "border-gray-600"
                                  } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-800 text-white`}
                                >
                                  <option value="">Month</option>
                                  {Array.from({ length: 12 }, (_, i) => (
                                    <option
                                      key={i + 1}
                                      value={(i + 1)
                                        .toString()
                                        .padStart(2, "0")}
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
                                  Expiry Year
                                </label>
                                <Field
                                  as="select"
                                  id="expiryYear"
                                  name="expiryYear"
                                  className={`w-full px-3 py-2 border ${
                                    errors.expiryYear && touched.expiryYear
                                      ? "border-red-500"
                                      : "border-gray-600"
                                  } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-800 text-white`}
                                >
                                  <option value="">Year</option>
                                  {Array.from({ length: 10 }, (_, i) => (
                                    <option
                                      key={i}
                                      value={(2025 + i).toString()}
                                    >
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
                                  className={`w-full px-3 py-2 border ${
                                    errors.cvc && touched.cvc
                                      ? "border-red-500"
                                      : "border-gray-600"
                                  } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-800 text-white`}
                                />
                                <ErrorMessage
                                  name="cvc"
                                  component="div"
                                  className="text-red-400 text-xs mt-1"
                                />
                              </div>
                            </div>

                            <div className="space-y-4 mt-6">
                              <h3 className="font-medium text-gray-300">
                                Billing Information
                              </h3>

                              <div>
                                <label
                                  htmlFor="billingAddress"
                                  className="block text-sm font-medium text-gray-300 mb-1"
                                >
                                  Billing Address
                                </label>
                                <Field
                                  type="text"
                                  id="billingAddress"
                                  name="billingAddress"
                                  placeholder="123 Main St"
                                  className={`w-full px-3 py-2 border ${
                                    errors.billingAddress &&
                                    touched.billingAddress
                                      ? "border-red-500"
                                      : "border-gray-600"
                                  } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-800 text-white`}
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
                                    className={`w-full px-3 py-2 border ${
                                      errors.city && touched.city
                                        ? "border-red-500"
                                        : "border-gray-600"
                                    } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-800 text-white`}
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
                                    className={`w-full px-3 py-2 border ${
                                      errors.zipCode && touched.zipCode
                                        ? "border-red-500"
                                        : "border-gray-600"
                                    } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-800 text-white`}
                                  />
                                  <ErrorMessage
                                    name="zipCode"
                                    component="div"
                                    className="text-red-400 text-xs mt-1"
                                  />
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center mt-4">
                              <Field
                                type="checkbox"
                                id="saveCard"
                                name="saveCard"
                                className="h-4 w-4 text-blue-400 focus:ring-blue-400 border-gray-600 rounded"
                              />
                              <label
                                htmlFor="saveCard"
                                className="ml-2 block text-sm text-gray-300"
                              >
                                Save card for future bookings
                              </label>
                            </div>
                          </div>
                        )}

                        {paymentMethod === "paypal" && (
                          <div className="flex flex-col items-center justify-center py-8 text-center">
                            <img
                              src="/placeholder.svg?height=60&width=120"
                              alt="PayPal"
                              className="mb-4"
                            />
                            <p className="text-sm text-gray-400 mb-4">
                              You will be redirected to PayPal to complete your
                              payment
                            </p>
                            <button
                              type="button"
                              className="bg-[#0070ba] hover:bg-[#005ea6] text-white font-medium py-2 px-6 rounded-md w-full max-w-xs"
                            >
                              Continue with PayPal
                            </button>
                          </div>
                        )}

                        {paymentMethod === "apple-pay" && (
                          <div className="flex flex-col items-center justify-center py-8 text-center">
                            <img
                              src="/placeholder.svg?height=60&width=120"
                              alt="Apple Pay"
                              className="mb-4"
                            />
                            <p className="text-sm text-gray-400 mb-4">
                              Complete your payment using Apple Pay
                            </p>
                            <button
                              type="button"
                              className="bg-black hover:bg-gray-800 text-white font-medium py-2 px-6 rounded-md w-full max-w-xs border border-white"
                            >
                              Pay with Apple Pay
                            </button>
                          </div>
                        )}

                        {/* Terms and Conditions */}
                        <div className="mt-6 flex items-center">
                          <Field
                            type="checkbox"
                            id="terms"
                            name="terms"
                            className={`h-4 w-4 text-blue-400 focus:ring-blue-400 border-gray-600 rounded ${
                              errors.terms && touched.terms
                                ? "border-red-500"
                                : ""
                            }`}
                          />
                          <label
                            htmlFor="terms"
                            className="ml-2 block text-sm text-gray-300"
                          >
                            I agree to the{" "}
                            <a
                              href="#"
                              className="text-blue-400 hover:underline"
                            >
                              Terms and Conditions
                            </a>{" "}
                            and{" "}
                            <a
                              href="#"
                              className="text-blue-400 hover:underline"
                            >
                              Privacy Policy
                            </a>
                          </label>
                        </div>
                        <ErrorMessage
                          name="terms"
                          component="div"
                          className="text-red-400 text-xs mt-1"
                        />

                        <div className="mt-6 flex flex-col sm:flex-row gap-4">
                          <button
                            type="button"
                            onClick={handleBackToBooking}
                            className="px-4 py-2 border border-gray-600 rounded-md text-white bg-gray-800 hover:bg-gray-700"
                          >
                            Back to Booking
                          </button>
                          <button
                            type="submit"
                            disabled={isProcessing || isSubmitting}
                            className={`flex-1 py-2 px-4 rounded-md font-medium text-white ${
                              isProcessing || isSubmitting
                                ? "bg-gray-600 cursor-not-allowed"
                                : "bg-blue-400 hover:bg-blue-500"
                            }`}
                          >
                            {isProcessing || isSubmitting
                              ? "Processing..."
                              : `Pay $${bookingDetails.totalPrice?.toFixed(2)}`}
                          </button>
                        </div>

                        <div className="mt-4 flex items-center justify-center text-xs text-gray-400">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="mr-1"
                          >
                            <rect
                              x="3"
                              y="11"
                              width="18"
                              height="11"
                              rx="2"
                              ry="2"
                            ></rect>
                            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                          </svg>
                          Secure payment processed with 256-bit SSL encryption
                        </div>
                      </Form>
                    );
                  }}
                </Formik>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div>
            <div className="sticky top-10">
              <div className="bg-black border border-gray-700 rounded-lg overflow-hidden shadow-sm">
                <div className="p-6 border-b border-gray-700">
                  <h2 className="text-lg font-bold text-white">
                    Price Details
                  </h2>
                </div>
                <div className="p-6 space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-300">
                        Base rate ({bookingDetails.rentalDetails.days} days)
                      </span>
                      <span className="text-white">
                        ${bookingDetails.rentalDetails.totalPrice?.toFixed(2)}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-gray-300">Taxes & fees</span>
                      <span className="text-white">
                        ${bookingDetails.taxes?.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <div className="border-t border-gray-700 pt-4">
                    <div className="flex justify-between font-medium">
                      <span className="text-white">Total</span>
                      <span className="text-white">
                        $
                        {(
                          bookingDetails.rentalDetails.totalPrice +
                          bookingDetails.taxes
                        )?.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <div className="rounded-lg bg-gray-800 p-4">
                    <div className="flex items-start gap-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mt-0.5 text-blue-400"
                      >
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                        <polyline points="22 4 12 14.01 9 11.01"></polyline>
                      </svg>
                      <div className="space-y-1">
                        <h4 className="font-medium text-white">
                          Free Cancellation
                        </h4>
                        <p className="text-xs text-gray-300">
                          Cancel for free up to 24 hours before pickup
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="text-xs text-gray-400">
                    <p>
                      By completing this booking, you agree to the car rental
                      terms and conditions, privacy policy, and to receive
                      emails from our company.
                    </p>
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
