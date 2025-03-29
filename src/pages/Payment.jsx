"use client";

import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Payment() {
  const [rentalDuration, setRentalDuration] = useState("daily");
  const [activeAccordion, setActiveAccordion] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  const toggleAccordion = (id) => {
    setActiveAccordion(activeAccordion === id ? null : id);
  };

  const handleSelectCategory = (category) => {
    setSelectedCategory(category);
    setShowPopup(true);

    // Hide popup after 3 seconds
    setTimeout(() => {
      setShowPopup(false);
    }, 3000);
  };

  const handleContactUs = () => {
    // Redirect to contact page
    window.location.href = "/contactus";
  };

  const pricingMultiplier = {
    daily: 1,
    weekly: 6, // 7 days for the price of 6
    monthly: 22,
  };

  const carCategories = [
    {
      name: "Economy",
      image: "src/assets/Images/newcar3.png",
      description: "Compact and fuel-efficient cars",
      price: 39.99,
      popular: false,
      features: [
        "Seats 4 passengers",
        "2 small bags",
        "Automatic transmission",
        "Air conditioning",
        "30+ MPG fuel efficiency",
      ],
      examples: "Kia Rio, Nissan Versa, or similar",
    },
    {
      name: "Standard",
      image: "src/assets/Images/newcar1png.png",
      description: "Comfortable midsize sedans",
      price: 49.99,
      popular: true,
      features: [
        "Seats 5 passengers",
        "3 bags",
        "Automatic transmission",
        "Air conditioning",
        "Cruise control",
        "Bluetooth connectivity",
      ],
      examples: "Toyota Camry, Honda Accord, or similar",
    },
    {
      name: "SUV",
      image: "src/assets/Images/newcar4.png",
      description: "Spacious vehicles for families",
      price: 69.99,
      popular: false,
      features: [
        "Seats 7 passengers",
        "4 bags",
        "Automatic transmission",
        "Air conditioning",
        "Cruise control",
        "Bluetooth connectivity",
        "Backup camera",
      ],
      examples: "Toyota RAV4, Honda CR-V, or similar",
    },
    {
      name: "Premium",
      image: "src/assets/Images/newcar2.png",
      description: "Luxury vehicles for a premium experience",
      price: 99.99,
      popular: false,
      features: [
        "Seats 5 passengers",
        "4 bags",
        "Automatic transmission",
        "Climate control",
        "Leather seats",
        "Premium sound system",
        "Navigation system",
        "Parking sensors",
      ],
      examples: "BMW 3 Series, Mercedes C-Class, or similar",
    },
  ];

  return (
    <div>
      <Navbar />

      {/* Popup notification */}
      {showPopup && selectedCategory && (
        <div className="fixed top-20 right-4 bg-white border border-gray-200 shadow-lg rounded-lg p-4 z-50 max-w-xs animate-fade-in">
          <div className="flex items-start">
            <div className="flex-shrink-0 bg-blue-100 rounded-full p-2 mr-3">
              <svg
                className="h-6 w-6 text-blue-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <div>
              <h4 className="font-medium text-gray-900">Selection Confirmed</h4>
              <p className="text-sm text-gray-600 mt-1">
                You've selected the {selectedCategory.name} option at $
                {(
                  selectedCategory.price * pricingMultiplier[rentalDuration]
                ).toFixed(2)}
                /
                {rentalDuration === "daily"
                  ? "day"
                  : rentalDuration === "weekly"
                  ? "week"
                  : "month"}
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto py-10 px-4 md:px-6">
        <div className="text-center space-y-4 mb-10">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-gray-500 max-w-3xl mx-auto">
            Choose the perfect vehicle for your journey with our competitive
            rates and no hidden fees
          </p>
        </div>
        {/* Duration Tabs */}
        <div className="flex justify-center mb-10">
          <div className="w-full max-w-md">
            <div className="flex rounded-md overflow-hidden border border-gray-200">
              <button
                onClick={() => setRentalDuration("daily")}
                className={`flex-1 py-2 px-4 text-center ${
                  rentalDuration === "daily"
                    ? "bg-blue-600 text-white font-medium"
                    : "bg-white text-gray-700 hover:bg-gray-50"
                }`}
              >
                Daily
              </button>
              <button
                onClick={() => setRentalDuration("weekly")}
                className={`flex-1 py-2 px-4 text-center ${
                  rentalDuration === "weekly"
                    ? "bg-blue-600 text-white font-medium"
                    : "bg-white text-gray-700 hover:bg-gray-50"
                }`}
              >
                Weekly
              </button>
              <button
                onClick={() => setRentalDuration("monthly")}
                className={`flex-1 py-2 px-4 text-center ${
                  rentalDuration === "monthly"
                    ? "bg-blue-600 text-white font-medium"
                    : "bg-white text-gray-700 hover:bg-gray-50"
                }`}
              >
                Monthly
              </button>
            </div>
            <p className="text-center text-sm text-gray-500 mt-2">
              {rentalDuration === "weekly"
                ? "7 days for the price of 6"
                : rentalDuration === "monthly"
                ? "30 days for the price of 22"
                : "Best for short trips"}
            </p>
          </div>
        </div>
        {/* Pricing Cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {carCategories.map((category) => (
            <div
              key={category.name}
              className={`flex flex-col bg-white rounded-lg overflow-hidden shadow-md ${
                selectedCategory?.name === category.name
                  ? "border-2 border-blue-500 ring-2 ring-blue-300"
                  : category.popular && !selectedCategory
                  ? "border-2 border-blue-500"
                  : "border border-gray-200"
              }`}
            >
              <div className="p-6">
                <div className="relative w-full mb-4">
                  <img
                    src={category.image || "/placeholder.svg"}
                    alt={category.name}
                    className="object-contain w-full h-full"
                  />
                </div>
                <h3 className="text-lg font-semibold">{category.name}</h3>
                <p className="text-sm text-gray-500">{category.description}</p>
              </div>
              <div className="p-6 pt-0 flex-grow">
                <div className="mb-6">
                  <p className="text-3xl font-bold">
                    $
                    {(
                      category.price * pricingMultiplier[rentalDuration]
                    ).toFixed(2)}
                    <span className="text-sm font-normal text-gray-500">
                      /
                      {rentalDuration === "daily"
                        ? "day"
                        : rentalDuration === "weekly"
                        ? "week"
                        : "month"}
                    </span>
                  </p>
                  <p className="text-sm text-gray-500">{category.examples}</p>
                </div>
                <div className="border-t border-gray-200 my-4"></div>
                <ul className="space-y-2">
                  {category.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <svg
                        className="h-5 w-5 text-blue-500 shrink-0 mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-6 pt-0">
                <button
                  onClick={() => handleSelectCategory(category)}
                  className={`w-full py-2 px-4 rounded-md font-medium ${
                    selectedCategory?.name === category.name
                      ? "bg-blue-600 hover:bg-blue-700 text-white"
                      : category.popular && !selectedCategory
                      ? "bg-blue-600 hover:bg-blue-700 text-white"
                      : "bg-gray-100 hover:bg-gray-200 text-gray-900"
                  }`}
                >
                  {selectedCategory?.name === category.name
                    ? "Selected"
                    : `Select ${category.name}`}
                </button>
              </div>
            </div>
          ))}
        </div>
        {/* Comparison Table */}
        <div className="mt-16 space-y-10">
          <div className="text-center space-y-4">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Compare Car Categories
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Find the perfect vehicle for your needs with our detailed
              comparison
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-4 px-4 font-medium">Features</th>
                  {carCategories.map((category) => (
                    <th
                      key={category.name}
                      className="text-center py-4 px-4 font-medium"
                    >
                      {category.name}
                      {(category.popular && !selectedCategory) ||
                      selectedCategory?.name === category.name ? (
                        <span
                          className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            selectedCategory?.name === category.name
                              ? "border border-blue-500 bg-blue-100 text-blue-800"
                              : "border border-blue-500 text-blue-500"
                          }`}
                        >
                          {selectedCategory?.name === category.name
                            ? "Selected"
                            : "Popular"}
                        </span>
                      ) : null}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-200">
                  <td className="py-4 px-4 font-medium">Base Price</td>
                  {carCategories.map((category) => (
                    <td key={category.name} className="text-center py-4 px-4">
                      ${category.price.toFixed(2)}/day
                    </td>
                  ))}
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-4 px-4 font-medium">Passengers</td>
                  {carCategories.map((category, index) => (
                    <td key={index} className="text-center py-4 px-4">
                      {index === 0
                        ? "4"
                        : index === 1
                        ? "5"
                        : index === 2
                        ? "7"
                        : "5"}
                    </td>
                  ))}
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-4 px-4 font-medium">Luggage Capacity</td>
                  {carCategories.map((category, index) => (
                    <td key={index} className="text-center py-4 px-4">
                      {index === 0
                        ? "2 Small"
                        : index === 1
                        ? "3 Medium"
                        : "4 Large"}
                    </td>
                  ))}
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-4 px-4 font-medium">
                    <div className="flex items-center group relative">
                      Fuel Efficiency
                      <svg
                        className="h-4 w-4 text-gray-400 ml-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <div className="absolute bottom-full left-0 mb-2 hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2 w-48 z-10">
                        Estimated miles per gallon for city/highway driving
                      </div>
                    </div>
                  </td>
                  {carCategories.map((category, index) => (
                    <td key={index} className="text-center py-4 px-4">
                      {index === 0
                        ? "30+ MPG"
                        : index === 1
                        ? "25-30 MPG"
                        : index === 2
                        ? "20-25 MPG"
                        : "18-24 MPG"}
                    </td>
                  ))}
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-4 px-4 font-medium">Premium Features</td>
                  {carCategories.map((category, index) => (
                    <td key={index} className="text-center py-4 px-4">
                      {index === 0
                        ? "Basic"
                        : index === 1
                        ? "Standard"
                        : index === 2
                        ? "Enhanced"
                        : "Premium"}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="py-4 px-4"></td>
                  {carCategories.map((category) => (
                    <td key={category.name} className="text-center py-4 px-4">
                      <button
                        onClick={() => handleSelectCategory(category)}
                        className={`py-2 px-4 rounded-md w-full ${
                          selectedCategory?.name === category.name
                            ? "bg-blue-600 hover:bg-blue-700 text-white"
                            : category.popular && !selectedCategory
                            ? "bg-blue-600 hover:bg-blue-700 text-white"
                            : "border border-gray-300 hover:bg-gray-50 text-gray-700"
                        }`}
                      >
                        {selectedCategory?.name === category.name
                          ? "Selected"
                          : "Select"}
                      </button>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        {/* FAQ Section */}
        <div className="mt-16 max-w-3xl mx-auto">
          <div className="text-center space-y-4 mb-8">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-500">
              Everything you need to know about our pricing and rental policies
            </p>
          </div>
          <div className="space-y-4">
            {[
              {
                id: "item-1",
                question: "Are there any hidden fees?",
                answer:
                  "No, we believe in transparent pricing. The rates shown include the base rental fee. Additional options like insurance, GPS, child seats, or fuel plans are clearly presented during the booking process.",
              },
              {
                id: "item-2",
                question: "What's included in the rental price?",
                answer:
                  "Our standard rental price includes the vehicle rental, unlimited mileage, roadside assistance, and standard liability coverage. Additional insurance options are available during checkout.",
              },
              {
                id: "item-3",
                question: "Do you offer any discounts?",
                answer:
                  "Yes! We offer discounts for AAA members, military personnel, seniors, and corporate partners. We also have seasonal promotions and special offers for longer rentals.",
              },
              {
                id: "item-4",
                question: "What is your cancellation policy?",
                answer:
                  "Reservations can be canceled free of charge up to 48 hours before the scheduled pickup time. Cancellations made within 48 hours may be subject to a one-day rental fee.",
              },
              {
                id: "item-5",
                question: "Can I change my reservation?",
                answer:
                  "Yes, you can modify your reservation at any time before pickup, subject to vehicle availability. Changes to your pickup date, time, or location may affect your rate.",
              },
            ].map((item) => (
              <div
                key={item.id}
                className="border border-gray-200 rounded-lg overflow-hidden"
              >
                <button
                  onClick={() => toggleAccordion(item.id)}
                  className="flex justify-between items-center w-full px-4 py-3 text-left font-medium focus:outline-none"
                >
                  {item.question}
                  <svg
                    className={`h-5 w-5 text-gray-500 transform ${
                      activeAccordion === item.id ? "rotate-180" : ""
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                <div
                  className={`px-4 pb-4 ${
                    activeAccordion === item.id ? "block" : "hidden"
                  }`}
                >
                  <p className="text-gray-600">{item.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* CTA Section */}
        <div className="mt-16 text-center">
          <div className="bg-gray-100 rounded-lg p-8 max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Need a Custom Quote?</h2>
            <p className="text-gray-600 mb-6">
              For corporate accounts, long-term rentals, or special
              requirements, our team is ready to create a tailored solution for
              you.
            </p>
            <button
              onClick={handleContactUs}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-md"
            >
              Contact Us
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
