import React from "react";
import { IoSpeedometer } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const AdminNavbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleAuthClick = () => {
    if (token) {
      // Log out
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      navigate("/Adminlogin");
    } else {
      // Go to login page
      navigate("/Adminlogin");
    }
  };

  return (
    <header className="w-full bg-primary text-white py-4">
      <nav className="flex justify-between items-center">
        {/* Logo Section */}
        <div className="flex items-center gap-2 ml-6">
          <IoSpeedometer size={50} />
          <a href="/" className="font-bold text-2xl">
            NovaRide
          </a>
        </div>

        <div className="flex items-center gap-8 font-medium text-xl pr-4">
          {token && (
            <>
              <a
                href="/admincars"
                className="transition duration-200 ease-linear"
              >
                Manage Cars
              </a>
              <a
                href="/managereviews"
                className="transition duration-200 ease-linear"
              >
                Manage Reviews
              </a>
            </>
          )}
          <button
            onClick={handleAuthClick}
            className="hidden lg:flex border-2 border-white text-lg px-4 rounded-md hover:bg-white hover:text-primary transition duration-200 ease-linear mr-4"
          >
            {token ? "Log Out" : "Log In"}
          </button>
        </div>
      </nav>
    </header>
  );
};

export default AdminNavbar;
