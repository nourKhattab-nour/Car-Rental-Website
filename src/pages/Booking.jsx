import { useState } from "react"
import { Link } from "react-router-dom"
import {
  Car,
  Clock,
  MapPin,
  Calendar,
  User,
  Phone,
  Mail,
  Menu,
  X,
  Check,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { Formik, Form, Field, ErrorMessage } from "formik"
// Import individual methods from Yup instead of the whole library
import * as Yup from "yup"
import I1 from '../assets/Images/Car.png';
function Booking() {
  const [activeTab, setActiveTab] = useState("economy")
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [selectedCar, setSelectedCar] = useState(null)

  // Date picker states
  const [showPickupCalendar, setShowPickupCalendar] = useState(false)
  const [showReturnCalendar, setShowReturnCalendar] = useState(false)
  const [currentMonth, setCurrentMonth] = useState(new Date())

  // Car data for each category
  const cars = {
    economy: [
      {
        id: "economy-1",
        name: "Toyota Corolla",
        category: "Economy",
        passengers: 4,
        price: 45,
        image: "https://via.placeholder.com/400x300",
      },
      {
        id: "economy-2",
        name: "Hyundai Elantra",
        category: "Economy",
        passengers: 4,
        price: 42,
        image: "https://via.placeholder.com/400x300",
      },
    ],
    business: [
      {
        id: "business-1",
        name: "BMW 3 Series",
        category: "Business",
        passengers: 5,
        price: 75,
        image: "https://via.placeholder.com/400x300",
      },
      {
        id: "business-2",
        name: "Audi A4",
        category: "Business",
        passengers: 5,
        price: 78,
        image: "https://via.placeholder.com/400x300",
      },
    ],
    luxury: [
      {
        id: "luxury-1",
        name: "Mercedes S-Class",
        category: "Luxury",
        passengers: 5,
        price: 150,
        image: "https://via.placeholder.com/400x300",
      },
      {
        id: "luxury-2",
        name: "BMW 7 Series",
        category: "Luxury",
        passengers: 5,
        price: 145,
        image: "https://via.placeholder.com/400x300",
      },
    ],
    suv: [
      {
        id: "suv-1",
        name: "Toyota Land Cruiser",
        category: "SUV",
        passengers: 7,
        price: 120,
        image: "https://via.placeholder.com/400x300",
      },
      {
        id: "suv-2",
        name: "Jeep Grand Cherokee",
        category: "SUV",
        passengers: 5,
        price: 110,
        image: I1,
      },
    ],
  }

  // Validation schema using Yup with individual imports
  const validationSchema = Yup.object({
    pickupLocation: Yup.string().required("Pickup location is required"),
    dropoffLocation: Yup.string().required("Drop-off location is required"),
    pickupDate: Yup.date()
      .required("Pickup date is required")
      .min(new Date(new Date().setHours(0, 0, 0, 0)), "Pickup date cannot be in the past"),
    returnDate: Yup.date()
      .required("Return date is required")
      .min(Yup.ref("pickupDate"), "Return date must be after pickup date"),
    fullName: Yup.string().required("Full name is required").min(3, "Name must be at least 3 characters"),
    email: Yup.string().email("Invalid email address").required("Email is required"),
    phone: Yup.string()
      .required("Phone number is required")
      .matches(/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/, "Phone number is not valid"),
  })

  const handleSelectCar = (carId) => {
    setSelectedCar(carId)
  }

  // Date picker functions
  const formatDate = (date) => {
    if (!date) return ""
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay()
  }

  const handlePrevMonth = () => {
    setCurrentMonth((prev) => {
      const prevMonth = new Date(prev)
      prevMonth.setMonth(prev.getMonth() - 1)
      return prevMonth
    })
  }

  const handleNextMonth = () => {
    setCurrentMonth((prev) => {
      const nextMonth = new Date(prev)
      nextMonth.setMonth(prev.getMonth() + 1)
      return nextMonth
    })
  }

  const handleDateSelect = (day, formikProps, field) => {
    const selectedDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)

    if (field === "pickupDate") {
      formikProps.setFieldValue("pickupDate", selectedDate)
      setShowPickupCalendar(false)

      // If return date is before pickup date, reset it
      if (formikProps.values.returnDate && selectedDate > formikProps.values.returnDate) {
        formikProps.setFieldValue("returnDate", null)
      }
    } else {
      formikProps.setFieldValue("returnDate", selectedDate)
      setShowReturnCalendar(false)
    }
  }

  const isDateSelectable = (day, formikProps, field) => {
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)

    const today = new Date()
    today.setHours(0, 0, 0, 0)

    // Can't select dates in the past
    if (date < today) return false

    // For return date, can't select before pickup date
    if (field === "returnDate" && formikProps.values.pickupDate && date < formikProps.values.pickupDate) return false

    return true
  }

  const renderCalendar = (formikProps, field) => {
    const year = currentMonth.getFullYear()
    const month = currentMonth.getMonth()
    const daysInMonth = getDaysInMonth(year, month)
    const firstDay = getFirstDayOfMonth(year, month)

    const monthName = currentMonth.toLocaleString("default", { month: "long" })

    const days = []
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-8 w-8"></div>)
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day)
      const isSelected =
        field === "pickupDate"
          ? formikProps.values.pickupDate && date.toDateString() === formikProps.values.pickupDate.toDateString()
          : formikProps.values.returnDate && date.toDateString() === formikProps.values.returnDate.toDateString()

      const isToday = new Date().toDateString() === date.toDateString()
      const selectable = isDateSelectable(day, formikProps, field)

      days.push(
        <button
          type="button" // Important to prevent form submission
          key={day}
          onClick={() => selectable && handleDateSelect(day, formikProps, field)}
          disabled={!selectable}
          className={`h-8 w-8 rounded-full flex items-center justify-center text-sm
            ${isSelected ? "bg-blue-500 text-white" : ""}
            ${isToday && !isSelected ? "border border-blue-400 text-blue-400" : ""}
            ${!selectable ? "text-gray-600 cursor-not-allowed" : "hover:bg-zinc-700"}`}
        >
          {day}
        </button>,
      )
    }

    return (
      <div className="absolute top-full left-0 mt-1 bg-zinc-900 border border-zinc-700 rounded-md p-3 z-10 shadow-lg w-64">
        <div className="flex justify-between items-center mb-2">
          <button
            type="button"
            onClick={handlePrevMonth}
            className="p-1 rounded-full hover:bg-zinc-700 transition-colors duration-200"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <div className="font-medium">
            {monthName} {year}
          </div>
          <button
            type="button"
            onClick={handleNextMonth}
            className="p-1 rounded-full hover:bg-zinc-700 transition-colors duration-200"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
        <div className="grid grid-cols-7 gap-1 mb-1">
          {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
            <div key={day} className="h-8 w-8 flex items-center justify-center text-xs text-gray-400">
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1">{days}</div>
      </div>
    )
  }

  const renderCarCard = (car) => {
    const isSelected = selectedCar === car.id

    return (
      <div
        key={car.id}
        className={`bg-zinc-900 border ${isSelected ? "border-blue-500" : "border-zinc-800"} rounded-lg overflow-hidden transition-all duration-200 ${isSelected ? "ring-2 ring-blue-500" : ""}`}
      >
        <div className="p-0">
          <div className="grid grid-cols-1 md:grid-cols-3">
            <div className="relative h-48 md:h-full">
              <img
                src={car.image || "/placeholder.svg"}
                alt={car.name}
                className="w-full h-full object-cover absolute top-0 left-0 rounded-t-lg md:rounded-l-lg md:rounded-t-none"
              />
              {isSelected && (
                <div className="absolute top-2 right-2 bg-blue-500 text-white p-1 rounded-full">
                  <Check className="h-4 w-4" />
                </div>
              )}
            </div>
            <div className="col-span-2 p-6">
              <h3 className="text-xl font-bold mb-2">{car.name}</h3>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <Car className="h-4 w-4 text-blue-400" />
                  <span className="text-sm text-gray-300">{car.category}</span>
                </div>
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-blue-400" />
                  <span className="text-sm text-gray-300">{car.passengers} Passengers</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-blue-400" />
                  <span className="text-sm text-gray-300">Unlimited mileage</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-blue-400" />
                  <span className="text-sm text-gray-300">GPS Navigation</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <span className="text-2xl font-bold">${car.price}</span>
                  <span className="text-gray-400 text-sm"> / day</span>
                </div>
                <button
                  type="button"
                  onClick={() => handleSelectCar(car.id)}
                  className={`px-4 py-2 rounded-md transition-colors duration-200 ${
                    isSelected
                      ? "bg-green-600 hover:bg-green-700 text-white"
                      : "bg-blue-500 hover:bg-blue-600 text-white"
                  }`}
                >
                  {isSelected ? "Selected" : "Select"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Calculate rental duration and total price
  const calculateRentalDetails = (pickupDate, returnDate) => {
    if (!pickupDate || !returnDate || !selectedCar) return null

    const oneDay = 24 * 60 * 60 * 1000 // hours*minutes*seconds*milliseconds
    const diffDays = Math.round(Math.abs((returnDate - pickupDate) / oneDay)) || 1

    const selectedCarObj = Object.values(cars)
      .flat()
      .find((car) => car.id === selectedCar)

    if (!selectedCarObj) return null

    const dailyRate = selectedCarObj.price
    const totalPrice = dailyRate * diffDays

    return {
      days: diffDays,
      dailyRate,
      totalPrice,
    }
  }

  const handleSubmit = (values, { setSubmitting }) => {
    // Get the selected car details
    const selectedCarObj = Object.values(cars)
      .flat()
      .find((car) => car.id === selectedCar)

    // Combine form values with selected car
    const bookingData = {
      ...values,
      car: selectedCarObj,
      rentalDetails: calculateRentalDetails(values.pickupDate, values.returnDate),
    }

    // Here you would typically send this data to your backend
    console.log("Booking submitted:", bookingData)

    // Simulate API call
    setTimeout(() => {
      alert("Booking successful! Redirecting to payment...")
      setSubmitting(false)
      // Here you would redirect to payment page
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="bg-black text-white border-b border-zinc-800">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <Car className="h-8 w-8" />
              <span className="text-xl font-bold">NovaRide</span>
            </Link>

            <nav className="hidden md:flex items-center space-x-8">
              <Link to="/" className="hover:text-blue-400 transition-colors duration-200">
                Home
              </Link>
              <Link to="/about-us" className="hover:text-blue-400 transition-colors duration-200">
                About Us
              </Link>
              <Link to="/contact-us" className="hover:text-blue-400 transition-colors duration-200">
                Contact Us
              </Link>
              <Link to="/our-cars" className="hover:text-blue-400 transition-colors duration-200">
                Our Cars
              </Link>
              <Link to="/blogs" className="hover:text-blue-400 transition-colors duration-200">
                Blogs
              </Link>
              <Link to="/payment" className="hover:text-blue-400 transition-colors duration-200">
                Payment
              </Link>
              <Link to="/booking" className="text-blue-400 font-medium">
                Booking
              </Link>
            </nav>

            <div className="hidden md:flex items-center space-x-4">
              <Link to="/login">
                <button className="bg-transparent text-white hover:text-blue-400 transition-colors duration-200">
                  Login
                </button>
              </Link>
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors duration-200">
                Log In
              </button>
            </div>

            <button className="bg-transparent text-white md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden">
            <div className="flex flex-col space-y-4 px-4 py-6 border-t border-zinc-800">
              <Link to="/" className="hover:text-blue-400 transition-colors duration-200">
                Home
              </Link>
              <Link to="/about-us" className="hover:text-blue-400 transition-colors duration-200">
                About Us
              </Link>
              <Link to="/contact-us" className="hover:text-blue-400 transition-colors duration-200">
                Contact Us
              </Link>
              <Link to="/our-cars" className="hover:text-blue-400 transition-colors duration-200">
                Our Cars
              </Link>
              <Link to="/blogs" className="hover:text-blue-400 transition-colors duration-200">
                Blogs
              </Link>
              <Link to="/payment" className="hover:text-blue-400 transition-colors duration-200">
                Payment
              </Link>
              <Link to="/booking" className="text-blue-400 font-medium">
                Booking
              </Link>

              <div className="flex space-x-4 pt-4">
                <Link to="/login" className="flex-1">
                  <button className="w-full bg-transparent border border-zinc-700 text-white px-4 py-2 rounded-md transition-colors duration-200">
                    Login
                  </button>
                </Link>
                <button className="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors duration-200">
                  Log In
                </button>
              </div>
            </div>
          </div>
        )}
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-2">Book Your Ride</h1>
          <p className="text-gray-400">Select your preferred vehicle and booking details</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="w-full">
              <div className="grid grid-cols-4 mb-6 border-b border-zinc-800">
                <button
                  type="button"
                  className={`py-2 px-4 text-sm font-medium ${activeTab === "economy" ? "text-blue-400 border-b-2 border-blue-400" : "text-gray-400"}`}
                  onClick={() => setActiveTab("economy")}
                >
                  Economy
                </button>
                <button
                  type="button"
                  className={`py-2 px-4 text-sm font-medium ${activeTab === "business" ? "text-blue-400 border-b-2 border-blue-400" : "text-gray-400"}`}
                  onClick={() => setActiveTab("business")}
                >
                  Business
                </button>
                <button
                  type="button"
                  className={`py-2 px-4 text-sm font-medium ${activeTab === "luxury" ? "text-blue-400 border-b-2 border-blue-400" : "text-gray-400"}`}
                  onClick={() => setActiveTab("luxury")}
                >
                  Luxury
                </button>
                <button
                  type="button"
                  className={`py-2 px-4 text-sm font-medium ${activeTab === "suv" ? "text-blue-400 border-b-2 border-blue-400" : "text-gray-400"}`}
                  onClick={() => setActiveTab("suv")}
                >
                  SUV
                </button>
              </div>

              <div className="space-y-6">{cars[activeTab].map((car) => renderCarCard(car))}</div>
            </div>
          </div>

          <div>
            <Formik
              initialValues={{
                pickupLocation: "",
                dropoffLocation: "",
                pickupDate: null,
                returnDate: null,
                fullName: "",
                email: "",
                phone: "",
              }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {(formikProps) => {
                const rentalDetails = calculateRentalDetails(
                  formikProps.values.pickupDate,
                  formikProps.values.returnDate,
                )

                return (
                  <Form className="bg-zinc-900 border border-zinc-800 rounded-lg overflow-hidden">
                    <div className="p-6 border-b border-zinc-800">
                      <h2 className="text-xl font-semibold mb-1">Booking Details</h2>
                      <p className="text-gray-400 text-sm">Fill in your rental information</p>
                    </div>

                    <div className="p-6 space-y-4">
                      {selectedCar && (
                        <div className="mb-4 p-3 bg-zinc-800 rounded-md">
                          <p className="text-sm text-gray-300 mb-1">Selected Vehicle:</p>
                          <div className="flex justify-between items-center">
                            <p className="font-medium">
                              {Object.values(cars)
                                .flat()
                                .find((car) => car.id === selectedCar)?.name || "Unknown Car"}
                            </p>
                            <p className="text-blue-400 font-medium">
                              $
                              {Object.values(cars)
                                .flat()
                                .find((car) => car.id === selectedCar)?.price || 0}
                              /day
                            </p>
                          </div>
                        </div>
                      )}

                      <div className="space-y-2">
                        <label htmlFor="pickupLocation" className="block text-sm font-medium">
                          Pickup Location
                        </label>
                        <Field
                          as="select"
                          id="pickupLocation"
                          name="pickupLocation"
                          className="w-full bg-zinc-800 border border-zinc-700 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="" disabled>
                            Select location
                          </option>
                          <option value="cairo-airport">Cairo International Airport</option>
                          <option value="cairo-downtown">Cairo Downtown</option>
                          <option value="alexandria">Alexandria</option>
                          <option value="sharm">Sharm El Sheikh</option>
                          <option value="hurghada">Hurghada</option>
                        </Field>
                        <ErrorMessage name="pickupLocation" component="div" className="text-red-500 text-xs mt-1" />
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="dropoffLocation" className="block text-sm font-medium">
                          Drop-off Location
                        </label>
                        <Field
                          as="select"
                          id="dropoffLocation"
                          name="dropoffLocation"
                          className="w-full bg-zinc-800 border border-zinc-700 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="" disabled>
                            Select location
                          </option>
                          <option value="cairo-airport">Cairo International Airport</option>
                          <option value="cairo-downtown">Cairo Downtown</option>
                          <option value="alexandria">Alexandria</option>
                          <option value="sharm">Sharm El Sheikh</option>
                          <option value="hurghada">Hurghada</option>
                        </Field>
                        <ErrorMessage name="dropoffLocation" component="div" className="text-red-500 text-xs mt-1" />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2 relative">
                          <label htmlFor="pickupDate" className="block text-sm font-medium">
                            Pickup Date
                          </label>
                          <div
                            className="flex h-10 w-full rounded-md border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm cursor-pointer hover:border-zinc-600 transition-colors duration-200"
                            onClick={() => {
                              setShowPickupCalendar(!showPickupCalendar)
                              setShowReturnCalendar(false)
                            }}
                          >
                            <Calendar className="mr-2 h-4 w-4 opacity-50" />
                            <span>
                              {formikProps.values.pickupDate
                                ? formatDate(formikProps.values.pickupDate)
                                : "Select date"}
                            </span>
                          </div>
                          {showPickupCalendar && renderCalendar(formikProps, "pickupDate")}
                          <ErrorMessage name="pickupDate" component="div" className="text-red-500 text-xs mt-1" />
                        </div>
                        <div className="space-y-2 relative">
                          <label htmlFor="returnDate" className="block text-sm font-medium">
                            Return Date
                          </label>
                          <div
                            className="flex h-10 w-full rounded-md border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm cursor-pointer hover:border-zinc-600 transition-colors duration-200"
                            onClick={() => {
                              setShowReturnCalendar(!showReturnCalendar)
                              setShowPickupCalendar(false)
                            }}
                          >
                            <Calendar className="mr-2 h-4 w-4 opacity-50" />
                            <span>
                              {formikProps.values.returnDate
                                ? formatDate(formikProps.values.returnDate)
                                : "Select date"}
                            </span>
                          </div>
                          {showReturnCalendar && renderCalendar(formikProps, "returnDate")}
                          <ErrorMessage name="returnDate" component="div" className="text-red-500 text-xs mt-1" />
                        </div>
                      </div>

                      {rentalDetails && (
                        <div className="p-3 bg-zinc-800 rounded-md">
                          <div className="flex justify-between items-center mb-1">
                            <p className="text-sm text-gray-300">Duration:</p>
                            <p className="font-medium">
                              {rentalDetails.days} day{rentalDetails.days !== 1 ? "s" : ""}
                            </p>
                          </div>
                          <div className="flex justify-between items-center">
                            <p className="text-sm text-gray-300">Total Price:</p>
                            <p className="text-blue-400 font-medium">${rentalDetails.totalPrice}</p>
                          </div>
                        </div>
                      )}

                      <div className="h-px bg-zinc-800 my-4"></div>

                      <div className="space-y-2">
                        <label htmlFor="fullName" className="block text-sm font-medium">
                          Full Name
                        </label>
                        <div className="flex">
                          <User className="mr-2 h-4 w-4 opacity-50 mt-3" />
                          <Field
                            id="fullName"
                            name="fullName"
                            placeholder="John Doe"
                            className="w-full bg-zinc-800 border border-zinc-700 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                        <ErrorMessage name="fullName" component="div" className="text-red-500 text-xs mt-1" />
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="email" className="block text-sm font-medium">
                          Email
                        </label>
                        <div className="flex">
                          <Mail className="mr-2 h-4 w-4 opacity-50 mt-3" />
                          <Field
                            id="email"
                            name="email"
                            type="email"
                            placeholder="john@example.com"
                            className="w-full bg-zinc-800 border border-zinc-700 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                        <ErrorMessage name="email" component="div" className="text-red-500 text-xs mt-1" />
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="phone" className="block text-sm font-medium">
                          Phone Number
                        </label>
                        <div className="flex">
                          <Phone className="mr-2 h-4 w-4 opacity-50 mt-3" />
                          <Field
                            id="phone"
                            name="phone"
                            placeholder="+20 123 456 7890"
                            className="w-full bg-zinc-800 border border-zinc-700 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                        <ErrorMessage name="phone" component="div" className="text-red-500 text-xs mt-1" />
                      </div>
                    </div>

                    <div className="p-6 border-t border-zinc-800">
                      <button
                        type="submit"
                        className={`w-full px-4 py-2 rounded-md transition-colors duration-200 ${
                          selectedCar && !formikProps.isSubmitting
                            ? "bg-blue-500 hover:bg-blue-600"
                            : "bg-gray-600 cursor-not-allowed"
                        } text-white`}
                        disabled={!selectedCar || formikProps.isSubmitting}
                      >
                        {formikProps.isSubmitting ? "Processing..." : "Continue to Payment"}
                      </button>
                      {!selectedCar && (
                        <p className="text-center text-sm text-gray-400 mt-2">Please select a vehicle first</p>
                      )}
                    </div>
                  </Form>
                )
              }}
            </Formik>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Booking

