import React, { useState } from "react";
import { IoSpeedometer } from "react-icons/io5";
import { useNavigate, Link } from "react-router-dom"; 
import { HiMenu, HiX } from "react-icons/hi"; 

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
          <Link to="/" className="font-bold text-2xl">
            NovaRide
          </Link>
        </div>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-8 font-medium text-lg">
          <Link to="/homePage" className="hover:text-primary transition">
            Home
          </Link>
          <Link to="/aboutUs" className="hover:text-primary transition">
            About Us
          </Link>
          <Link to="/contactus" className="hover:text-primary transition">
            Contact Us
          </Link>
          <Link to="/qa" className="hover:text-primary transition">
            Q&A
          </Link>
          <Link to="/cars" className="hover:text-primary transition">
            Cars
          </Link>
          <Link to="/blogs" className="hover:text-primary transition">
            Blogs
          </Link>
          <Link to="/payment" className="hover:text-primary transition">
            Payment
          </Link>
          <Link to="/booking" className="hover:text-primary transition">
            Booking
          </Link>

          {isLoggedIn && (
            <Link to="/profile" className="hover:text-primary transition">
              Profile
            </Link>
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
          <Link to="/homePage" onClick={() => setMenuOpen(false)}>
            Home
          </Link>
          <Link to="/aboutUs" onClick={() => setMenuOpen(false)}>
            About Us
          </Link>
          <Link to="/contactus" onClick={() => setMenuOpen(false)}>
            Contact Us
          </Link>
          <Link to="/qa" onClick={() => setMenuOpen(false)}>
            Q&A
          </Link>
          <Link to="/cars" onClick={() => setMenuOpen(false)}>
            Cars
          </Link>
          <Link to="/blogs" onClick={() => setMenuOpen(false)}>
            Blogs
          </Link>
          <Link to="/payment" onClick={() => setMenuOpen(false)}>
            Payment
          </Link>
          <Link to="/booking" onClick={() => setMenuOpen(false)}>
            Booking
          </Link>

          {isLoggedIn && (
            <Link to="/profile" onClick={() => setMenuOpen(false)}>
              Profile
            </Link>
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
