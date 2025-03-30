import React from "react"; //Import React Library
import { IoSpeedometer } from "react-icons/io5";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation

const Navbar = () => {
  const navigate = useNavigate(); // Hook to navigate between pages

  // Function to handle login button click
  const handleLoginClick = () => {
    navigate("/login");
  };

  // Create a functional component called Navbar
  return (
    <header className="w-full bg-secondary text-white py-4">
      <nav className="flex justify-between items-center">
        {/* Logo Section */}
        <div className="flex items-center gap-2 ml-6">
          <IoSpeedometer size={50} />
          <a href="/" className="font-bold text-2xl">
            NovaRide
          </a>
        </div>
        <div className="flex items-center gap-8 font-medium text-xl pr-4">
          <a
            href="/HomePage"
            className="hover:text-primary transition duration-200 ease-linear"
          >
            Home
          </a>
          <a
            href="/AboutUs"
            className="hover:text-primary transition duration-200 ease-linear"
          >
            About Us
          </a>
          <a
            href="/"
            className="hover:text-primary transition duration-200 ease-linear"
          >
            Contact Us
          </a>
          <a
            href="/QA"
            className="hover:text-primary transition duration-200 ease-linear"
          >
            Q&A
          </a>
          <a
            href="/Cars"
            className="hover:text-primary transition duration-200 ease-linear"
          >
            Our Cars
          </a>
          <a
            href="/blogs"
            className="hover:text-primary transition duration-200 ease-linear"
          >
            Blogs
          </a>
          <a
            href="/payment"
            className="hover:text-primary transition duration-200 ease-linear"
          >
            Payment
          </a>
          <a
            href="/booking"
            className="hover:text-primary transition duration-200 ease-linear"
          >
            Booking
          </a>
          <button
            onClick={handleLoginClick} // Add onClick event to navigate to login
            className="hidden lg:flex border-2 border-primary text-lg px-4 rounded-md hover:bg-primary transition duration-200 ease-linear mr-4"
          >
            Log In
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
