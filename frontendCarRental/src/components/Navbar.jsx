import React, { useState } from "react";
import { IoSpeedometer } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi"; // Hamburger & close icons

const Navbar = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

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
      <nav className="flex justify-between items-center px-6">
        {/* Logo Section */}
        <div className="flex items-center gap-2">
          <IoSpeedometer size={40} />
          <a href="/" className="font-bold text-2xl">
            NovaRide
          </a>
        </div>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-8 font-medium text-lg">
          <a href="/HomePage" className="hover:text-primary transition">
            Home
          </a>
          <a href="/aboutUs" className="hover:text-primary transition">
            About Us
          </a>
          <a href="/contactus" className="hover:text-primary transition">
            Contact Us
          </a>
          <a href="/qa" className="hover:text-primary transition">
            Q&A
          </a>
          <a href="/cars" className="hover:text-primary transition">
            Cars
          </a>
          <a href="/blogs" className="hover:text-primary transition">
            Blogs
          </a>
          <a href="/payment" className="hover:text-primary transition">
            Payment
          </a>
          <a href="/booking" className="hover:text-primary transition">
            Booking
          </a>

          {isLoggedIn && (
            <a href="/profile" className="hover:text-primary transition">
              Profile
            </a>
          )}

          {/* Log In / Log Out Button */}
          <button
            onClick={handleAuthClick}
            className="border-2 border-primary px-4 py-1 rounded-md hover:bg-primary transition"
          >
            {isLoggedIn ? "Log Out" : "Log In"}
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="lg:hidden text-3xl focus:outline-none"
        >
          {menuOpen ? <HiX /> : <HiMenu />}
        </button>
      </nav>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="lg:hidden flex flex-col items-center gap-4 mt-4 text-lg font-medium">
          <a href="/HomePage" onClick={() => setMenuOpen(false)}>
            Home
          </a>
          <a href="/aboutUs" onClick={() => setMenuOpen(false)}>
            About Us
          </a>
          <a href="/contactus" onClick={() => setMenuOpen(false)}>
            Contact Us
          </a>
          <a href="/qa" onClick={() => setMenuOpen(false)}>
            Q&A
          </a>
          <a href="/cars" onClick={() => setMenuOpen(false)}>
            Cars
          </a>
          <a href="/blogs" onClick={() => setMenuOpen(false)}>
            Blogs
          </a>
          <a href="/payment" onClick={() => setMenuOpen(false)}>
            Payment
          </a>
          <a href="/booking" onClick={() => setMenuOpen(false)}>
            Booking
          </a>

          {isLoggedIn && (
            <a href="/profile" onClick={() => setMenuOpen(false)}>
              Profile
            </a>
          )}

          <button
            onClick={() => {
              handleAuthClick();
              setMenuOpen(false);
            }}
            className="border-2 border-primary px-4 py-1 rounded-md hover:bg-primary transition"
          >
            {isLoggedIn ? "Log Out" : "Log In"}
          </button>
        </div>
      )}
    </header>
  );
};

export default Navbar;
