// Enhanced version of the payment component with a more styled layout using Tailwind CSS
"use client";

import { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { MdCheckBox } from "react-icons/md";

export default function Payment() {
  const [paymentMethod, setPaymentMethod] = useState("credit-card");
  const [isProcessing, setIsProcessing] = useState(false);
  const [booking, setBooking] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const paymentSchema = Yup.object().shape({
    cardholderName: Yup.string().when("paymentMethod", {
      is: "credit-card",
      then: () => Yup.string().required("Cardholder name is required"),
    }),
    cardNumber: Yup.string().when("paymentMethod", {
      is: "credit-card",
      then: () => Yup.string().required("Card number is required"),
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
      then: () => Yup.string().required("Required"),
    }),
    terms: Yup.boolean().oneOf([true], "You must accept the terms"),
  });

  useEffect(() => {
    try {
      const data = localStorage.getItem("carRentalBooking");
      if (data) {
        const parsed = JSON.parse(data);
        if (parsed.pickupDate) parsed.pickupDate = new Date(parsed.pickupDate);
        if (parsed.returnDate) parsed.returnDate = new Date(parsed.returnDate);

        setBooking({
          carName: parsed.car?.name || "Unknown Car",
          carCategory: parsed.car?.category || "Unknown Category",
          carImage: parsed.car?.image || "/placeholder.svg",
          pickupLocation: parsed.pickupLocation || "-",
          dropoffLocation: parsed.dropoffLocation || "-",
          pickupDate: parsed.pickupDate,
          returnDate: parsed.returnDate,
          rentalDetails: parsed.rentalDetails || { days: 0, totalPrice: 0 },
          taxes: parsed.taxes || 0,
          totalPrice:
            (parsed.rentalDetails?.totalPrice || 0) + (parsed.taxes || 0),
        });
      }
    } catch (err) {
      console.error("Error loading booking data", err);
    }
  }, []);

  const formatCardNumber = (val) =>
    val
      .replace(/\D/g, "")
      .replace(/(\d{4})(?=\d)/g, "$1 ")
      .slice(0, 19);
  const formatDate = (date) =>
    date ? new Date(date).toLocaleDateString() : "-";

  const handleSubmit = (values, { setSubmitting }) => {
    setIsProcessing(true);
    console.log("Submitting payment:", values);

    setTimeout(() => {
      setIsProcessing(false);
      setShowSuccess(true);
      setSubmitting(false);
      setTimeout(() => alert("Payment successful"), 1500);
    }, 1500);
  };

  if (!booking) {
    return (
      <div className="min-h-screen bg-secondary text-white">
        <Navbar />
        <div className="flex items-center justify-center py-16">
          Loading booking info...
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary text-white">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left section: booking & payment */}
          <div className="lg:col-span-2">
            <h1 className="text-3xl font-bold mb-2">Complete Your Payment</h1>
            <p className="text-gray-400 mb-6">
              Please review your booking and enter your payment details.
            </p>

            <div className="bg-[#111] border border-gray-700 rounded-lg p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">Booking Summary</h2>
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={booking.carImage}
                  alt={booking.carName}
                  className="h-20 w-32 object-cover rounded"
                />
                <div>
                  <h3 className="text-lg font-medium">{booking.carName}</h3>
                  <p className="text-sm text-gray-400">{booking.carCategory}</p>
                </div>
              </div>
              <div className="text-sm text-gray-300 space-y-1">
                <p>Pickup: {formatDate(booking.pickupDate)}</p>
                <p>Drop-off: {formatDate(booking.returnDate)}</p>
              </div>
            </div>

            <div className="bg-[#111] border border-gray-700 rounded-lg p-6">
              <div className="mb-4 flex border-b border-gray-700">
                <button
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
                  onClick={() => setPaymentMethod("cash")}
                  className={`py-2 px-4 font-medium ${
                    paymentMethod === "cash"
                      ? "border-b-2 border-blue-400 text-blue-400"
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
                  terms: false,
                }}
                validationSchema={paymentSchema}
                onSubmit={handleSubmit}
                enableReinitialize
              >
                {({ setFieldValue, isSubmitting }) => (
                  <Form className="space-y-4">
                    {paymentMethod === "credit-card" && (
                      <>
                        <div>
                          <Field
                            name="cardholderName"
                            placeholder="Cardholder Name"
                            className="w-full px-4 py-2 rounded bg-gray-800 text-white border border-gray-600"
                          />
                          <ErrorMessage
                            name="cardholderName"
                            component="div"
                            className="text-red-400 text-sm"
                          />
                        </div>
                        <div>
                          <Field
                            name="cardNumber"
                            placeholder="Card Number"
                            maxLength={19}
                            className="w-full px-4 py-2 rounded bg-gray-800 text-white border border-gray-600"
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
                            className="text-red-400 text-sm"
                          />
                        </div>
                        <div className="flex gap-4">
                          <div className="w-1/2">
                            <Field
                              as="select"
                              name="expiryMonth"
                              className="w-full px-4 py-2 rounded bg-gray-800 text-white border border-gray-600"
                            >
                              <option value="">Month</option>
                              {[...Array(12)].map((_, i) => (
                                <option key={i}>
                                  {String(i + 1).padStart(2, "0")}
                                </option>
                              ))}
                            </Field>
                            <ErrorMessage
                              name="expiryMonth"
                              component="div"
                              className="text-red-400 text-sm"
                            />
                          </div>
                          <div className="w-1/2">
                            <Field
                              as="select"
                              name="expiryYear"
                              className="w-full px-4 py-2 rounded bg-gray-800 text-white border border-gray-600"
                            >
                              <option value="">Year</option>
                              {[...Array(10)].map((_, i) => (
                                <option key={i}>{2025 + i}</option>
                              ))}
                            </Field>
                            <ErrorMessage
                              name="expiryYear"
                              component="div"
                              className="text-red-400 text-sm"
                            />
                          </div>
                        </div>

                        <div>
                          <Field
                            name="cvc"
                            placeholder="CVC"
                            className="w-full px-4 py-2 rounded bg-gray-800 text-white border border-gray-600"
                            maxLength={4}
                          />
                          <ErrorMessage
                            name="cvc"
                            component="div"
                            className="text-red-400 text-sm"
                          />
                        </div>
                      </>
                    )}

                    {paymentMethod === "cash" && (
                      <p className="text-gray-300">
                        You'll pay in cash when you pick up the car.
                      </p>
                    )}

                    <div className="flex items-start space-x-3">
                      <Field
                        type="checkbox"
                        id="terms"
                        name="terms"
                        className="mt-1 h-4 w-4 rounded border-gray-600 text-blue-500 focus:ring-blue-500 focus:ring-offset-gray-900"
                      />
                      <div>
                        <label
                          htmlFor="terms"
                          className="text-sm font-medium text-white"
                        >
                          I agree to the terms and conditions
                        </label>
                        <p className="text-xs text-gray-400 mt-1">
                          By checking this box, you agree to our{" "}
                          <span>Terms of Service</span> and{" "}
                          <span>Privacy Policy</span>.
                        </p>
                      </div>
                    </div>
                    <ErrorMessage
                      name="terms"
                      component="div"
                      className="text-red-400 text-sm"
                    />

                    <button
                      type="submit"
                      disabled={isSubmitting || isProcessing}
                      className="w-full py-2 rounded bg-blue-500 hover:bg-blue-600 text-white font-medium"
                    >
                      {isProcessing
                        ? "Processing..."
                        : `Pay $${booking.totalPrice.toFixed(2)}`}
                    </button>
                  </Form>
                )}
              </Formik>
            </div>

            {showSuccess && (
              <div className="mt-4 text-green-400">Payment successful!</div>
            )}
          </div>

          {/*price summary */}
          <div>
            <div className="bg-[#111] border border-gray-700 rounded-lg p-6 lg:mt-[90px]">
              <h2 className="text-lg font-bold mb-4">Price Details</h2>
              <div className="text-sm space-y-2">
                <div className="flex justify-between text-gray-300">
                  <span>Base rate ({booking.rentalDetails.days} days)</span>
                  <span>${booking.rentalDetails.totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>Taxes & fees</span>
                  <span>${booking.taxes.toFixed(2)}</span>
                </div>
                <div className="border-t border-gray-700 pt-2 flex justify-between font-medium">
                  <span className="text-white">Total</span>
                  <span className="text-white">
                    ${booking.totalPrice.toFixed(2)}
                  </span>
                </div>
                <div className="mt-4 text-xs text-gray-400 bg-gray-800 p-3 rounded">
                  <p className="mb-1 font-semibold text-white">
                    Free Cancellation
                  </p>
                  Cancel anytime up to 24 hours before pickup for a full refund.
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
