import { useState, useEffect } from "react";
import { Car, Clock, MapPin, User, Check } from "lucide-react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { object, string } from "yup";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Booking() {
  const [activeTab, setActiveTab] = useState("economy");
  const [selectedCar, setSelectedCar] = useState(null);
  const [pickupDate, setPickupDate] = useState(null);
  const [returnDate, setReturnDate] = useState(null);
  const [cars, setCars] = useState({});

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/cars");
        const data = await response.json();

        const grouped = data.data.reduce((acc, car) => {
          const key = car.category.toLowerCase();
          if (!acc[key]) acc[key] = [];
          acc[key].push({
            id: car._id,
            name: car.title,
            category: car.category,
            passengers: car.passengers || 5,
            price: parseInt(car.price.replace(/\D/g, "")),
            image: car.img,
          });
          return acc;
        }, {});

        setCars(grouped);
      } catch (error) {
        console.error("Error fetching cars:", error);
      }
    };

    fetchCars();
  }, []);

  useEffect(() => {
    const selectedCarId = localStorage.getItem("selectedCarId");

    if (selectedCarId) {
      for (const [tab, carList] of Object.entries(cars)) {
        const found = carList.find((car) => car.id === selectedCarId);
        if (found) {
          setActiveTab(tab);
          setSelectedCar(selectedCarId);
          break;
        }
      }
      localStorage.removeItem("selectedCarId");
    }
  }, [cars]);

  const validationSchema = object().shape({
    pickupLocation: string().required("Pickup location is required"),
    dropoffLocation: string().required("Drop-off location is required"),
    fullName: string().required("Full name is required"),
    email: string().email("Invalid email").required("Email is required"),
    phone: string().required("Phone number is required"),
  });

  const handleSelectCar = (carId) => {
    setSelectedCar(carId);
  };

  const calculateRentalDetails = () => {
    if (!pickupDate || !returnDate || !selectedCar) return null;

    const oneDay = 24 * 60 * 60 * 1000;
    const diffDays =
      Math.round(Math.abs((returnDate - pickupDate) / oneDay)) || 1;

    const selectedCarObj = Object.values(cars)
      .flat()
      .find((car) => car.id === selectedCar);

    if (!selectedCarObj) return null;

    const totalPrice = selectedCarObj.price * diffDays;

    return {
      days: diffDays,
      dailyRate: selectedCarObj.price,
      totalPrice,
    };
  };

  const handleSubmit = (values, { setSubmitting }) => {
    const selectedCarObj = Object.values(cars)
      .flat()
      .find((car) => car.id === selectedCar);

    if (!selectedCarObj || !pickupDate || !returnDate) {
      alert("Please select a car and dates");
      setSubmitting(false);
      return;
    }

    const rentalDetails = calculateRentalDetails();
    const taxes = Math.round(rentalDetails.totalPrice * 0.1);

    const bookingData = {
      ...values,
      pickupDate,
      returnDate,
      car: selectedCarObj,
      rentalDetails,
      taxes,
    };

    localStorage.setItem("carRentalBooking", JSON.stringify(bookingData));

    setTimeout(() => {
      setSubmitting(false);
      window.location.href = "/payment";
    }, 500);
  };

  const renderCarCard = (car) => {
    const isSelected = selectedCar === car.id;

    return (
      <div
        key={car.id}
        className={`bg-[#111111] border ${
          isSelected ? "border-[#4d9fff]" : "border-zinc-800"
        } rounded-lg overflow-hidden transition-all duration-200 ${
          isSelected ? "ring-2 ring-[#4d9fff]" : ""
        }`}
      >
        <div className="grid grid-cols-1 md:grid-cols-3">
          <div className="relative h-48 md:h-full">
            <img
              src={car.image}
              alt={car.name}
              className="absolute top-0 left-0 object-cover w-full h-full rounded-t-lg md:rounded-l-lg md:rounded-t-none"
            />
            {isSelected && (
              <div className="absolute top-2 right-2 bg-[#4d9fff] text-white p-1 rounded-full">
                <Check className="w-4 h-4" />
              </div>
            )}
          </div>
          <div className="col-span-2 p-6">
            <h3 className="mb-2 text-xl font-bold">{car.name}</h3>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="flex items-center gap-2">
                <Car className="h-4 w-4 text-[#4d9fff]" />
                <span className="text-sm text-gray-300">{car.category}</span>
              </div>
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-[#4d9fff]" />
                <span className="text-sm text-gray-300">
                  {car.passengers} Passengers
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-[#4d9fff]" />
                <span className="text-sm text-gray-300">Unlimited mileage</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-[#4d9fff]" />
                <span className="text-sm text-gray-300">GPS Navigation</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <span className="text-2xl font-bold">${car.price}</span>
                <span className="text-sm text-gray-400"> / day</span>
              </div>
              <button
                type="button"
                onClick={() => handleSelectCar(car.id)}
                className={`px-4 py-2 rounded-md transition-colors duration-200 ${
                  isSelected
                    ? "bg-green-600 hover:bg-green-700"
                    : "bg-[#4d9fff] hover:bg-[#3a8aee]"
                } text-white`}
              >
                {isSelected ? "Selected" : "Select"}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen text-white bg-secondary">
      <Navbar />

      <main className="container px-4 py-8 mx-auto">
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-4xl font-bold">Book Your Ride</h1>
          <p className="text-gray-400">
            Select your preferred vehicle and booking details
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="w-full">
              <div className="grid grid-cols-4 mb-6 border-b border-zinc-800">
                {["economy", "business", "luxury", "suv"].map((tab) => (
                  <button
                    key={tab}
                    type="button"
                    className={`py-2 px-4 text-sm font-medium ${
                      activeTab === tab
                        ? "text-[#4d9fff] border-b-2 border-[#4d9fff]"
                        : "text-gray-400"
                    }`}
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </div>

              <div className="space-y-6">
                {cars[activeTab]?.map((car) => renderCarCard(car)) || (
                  <p className="text-gray-400">Loading cars...</p>
                )}
              </div>
            </div>
          </div>

          <div>
            <Formik
              initialValues={{
                pickupLocation: "",
                dropoffLocation: "",
                fullName: "",
                email: "",
                phone: "",
              }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {(formikProps) => (
                <Form className="bg-[#111111] border border-zinc-800 rounded-lg overflow-hidden">
                  <div className="p-6 border-b border-zinc-800">
                    <h2 className="mb-1 text-xl font-semibold">
                      Booking Details
                    </h2>
                    <p className="text-sm text-gray-400">
                      Fill in your rental information
                    </p>
                  </div>

                  <div className="p-6 space-y-4">
                    {selectedCar && (
                      <div className="mb-4 p-3 bg-[#1e293b] rounded-md">
                        <p className="mb-1 text-sm text-gray-300">
                          Selected Vehicle:
                        </p>
                        <div className="flex items-center justify-between">
                          <p className="font-medium">
                            {Object.values(cars)
                              .flat()
                              .find((car) => car.id === selectedCar)?.name ||
                              "Unknown Car"}
                          </p>
                          <p className="text-[#4d9fff] font-medium">
                            $
                            {Object.values(cars)
                              .flat()
                              .find((car) => car.id === selectedCar)?.price ||
                              0}
                            /day
                          </p>
                        </div>
                      </div>
                    )}

                    <div className="space-y-2">
                      <label
                        htmlFor="pickupLocation"
                        className="block text-sm font-medium"
                      >
                        Pickup Location
                      </label>
                      <Field
                        as="select"
                        id="pickupLocation"
                        name="pickupLocation"
                        className="w-full bg-[#1e293b] border border-zinc-700 rounded-md px-3 py-2 text-sm"
                      >
                        <option value="" disabled>
                          Select location
                        </option>
                        <option value="cairo-airport">
                          Cairo International Airport
                        </option>
                        <option value="cairo-downtown">Cairo Downtown</option>
                        <option value="alexandria">Alexandria</option>
                        <option value="sharm">Sharm El Sheikh</option>
                        <option value="hurghada">Hurghada</option>
                      </Field>
                      <ErrorMessage
                        name="pickupLocation"
                        component="div"
                        className="mt-1 text-xs text-red-500"
                      />
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor="dropoffLocation"
                        className="block text-sm font-medium"
                      >
                        Drop-off Location
                      </label>
                      <Field
                        as="select"
                        id="dropoffLocation"
                        name="dropoffLocation"
                        className="w-full bg-[#1e293b] border border-zinc-700 rounded-md px-3 py-2 text-sm"
                      >
                        <option value="" disabled>
                          Select location
                        </option>
                        <option value="cairo-airport">
                          Cairo International Airport
                        </option>
                        <option value="cairo-downtown">Cairo Downtown</option>
                        <option value="alexandria">Alexandria</option>
                        <option value="sharm">Sharm El Sheikh</option>
                        <option value="hurghada">Hurghada</option>
                      </Field>
                      <ErrorMessage
                        name="dropoffLocation"
                        component="div"
                        className="mt-1 text-xs text-red-500"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label
                          htmlFor="pickupDate"
                          className="block text-sm font-medium"
                        >
                          Pickup Date
                        </label>
                        <input
                          type="date"
                          id="pickupDate"
                          className="w-full bg-[#1e293b] border border-zinc-700 rounded-md px-3 py-2 text-sm"
                          onChange={(e) =>
                            setPickupDate(new Date(e.target.value))
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <label
                          htmlFor="returnDate"
                          className="block text-sm font-medium"
                        >
                          Return Date
                        </label>
                        <input
                          type="date"
                          id="returnDate"
                          className="w-full bg-[#1e293b] border border-zinc-700 rounded-md px-3 py-2 text-sm"
                          onChange={(e) =>
                            setReturnDate(new Date(e.target.value))
                          }
                        />
                      </div>
                    </div>

                    {calculateRentalDetails() && (
                      <div className="p-3 bg-[#1e293b] rounded-md">
                        <div className="flex items-center justify-between mb-1">
                          <p className="text-sm text-gray-300">Duration:</p>
                          <p className="font-medium">
                            {calculateRentalDetails().days} day
                            {calculateRentalDetails().days !== 1 ? "s" : ""}
                          </p>
                        </div>
                        <div className="flex items-center justify-between">
                          <p className="text-sm text-gray-300">Total Price:</p>
                          <p className="text-[#4d9fff] font-medium">
                            ${calculateRentalDetails().totalPrice}
                          </p>
                        </div>
                      </div>
                    )}

                    <div className="h-px my-4 bg-zinc-800"></div>

                    <div className="space-y-2">
                      <label
                        htmlFor="fullName"
                        className="block text-sm font-medium"
                      >
                        Full Name
                      </label>
                      <Field
                        id="fullName"
                        name="fullName"
                        placeholder="John Doe"
                        className="w-full bg-[#1e293b] border border-zinc-700 rounded-md px-3 py-2 text-sm"
                      />
                      <ErrorMessage
                        name="fullName"
                        component="div"
                        className="mt-1 text-xs text-red-500"
                      />
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium"
                      >
                        Email
                      </label>
                      <Field
                        id="email"
                        name="email"
                        type="email"
                        placeholder="john@example.com"
                        className="w-full bg-[#1e293b] border border-zinc-700 rounded-md px-3 py-2 text-sm"
                      />
                      <ErrorMessage
                        name="email"
                        component="div"
                        className="mt-1 text-xs text-red-500"
                      />
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium"
                      >
                        Phone Number
                      </label>
                      <Field
                        id="phone"
                        name="phone"
                        placeholder="+20 123 456 7890"
                        className="w-full bg-[#1e293b] border border-zinc-700 rounded-md px-3 py-2 text-sm"
                      />
                      <ErrorMessage
                        name="phone"
                        component="div"
                        className="mt-1 text-xs text-red-500"
                      />
                    </div>
                  </div>

                  <div className="p-6 border-t border-zinc-800">
                    <button
                      type="submit"
                      className={`w-full px-4 py-2 rounded-md transition-colors duration-200 ${
                        selectedCar && !formikProps.isSubmitting
                          ? "bg-[#4d9fff] hover:bg-[#3a8aee]"
                          : "bg-gray-600 cursor-not-allowed"
                      } text-white`}
                      disabled={!selectedCar || formikProps.isSubmitting}
                    >
                      {formikProps.isSubmitting
                        ? "Processing..."
                        : "Continue to Payment"}
                    </button>
                    {!selectedCar && (
                      <p className="mt-2 text-sm text-center text-gray-400">
                        Please select a vehicle first
                      </p>
                    )}
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Booking;
