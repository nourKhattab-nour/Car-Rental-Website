import React from "react";
import { IoSpeedometer } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const isLoggedIn =
    localStorage.getItem("token") && localStorage.getItem("user");

  const handleAuthClick = () => {
    if (isLoggedIn) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      navigate("/login");
    } else {
      navigate("/login");
    }
  };

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

        {/* Navigation Links */}
        <div className="flex items-center gap-8 font-medium text-xl pr-4">
          <a
            href="/HomePage"
            className="hover:text-primary transition duration-200 ease-linear"
          >
            Home
          </a>
          <a
            href="/aboutUs"
            className="hover:text-primary transition duration-200 ease-linear"
          >
            About Us
          </a>
          <a
            href="/contactus"
            className="hover:text-primary transition duration-200 ease-linear"
          >
            Contact Us
          </a>
          <a
            href="/qa"
            className="hover:text-primary transition duration-200 ease-linear"
          >
            Q&A
          </a>
          <a
            href="/cars"
            className="hover:text-primary transition duration-200 ease-linear"
          >
            Cars
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

          {isLoggedIn ? (
            <a
              href="/profile"
              className="hover:text-primary transition duration-200 ease-linear"
            >
              Profile
            </a>
          ) : null}

          {/* Log In / Log Out Button */}
          <button
            onClick={handleAuthClick}
            className="hidden lg:flex border-2 border-primary text-lg px-4 rounded-md hover:bg-primary transition duration-200 ease-linear mr-4"
          >
            {isLoggedIn ? "Log Out" : "Log In"}
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
