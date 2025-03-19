import React from "react"; //Import React Libary
import { FaCarTunnel } from "react-icons/fa6"; //Import FaCarTunnel Icon from react-icons/fa6
const Navbar = () => {
  //Create a functional component called Navbar
  return (
    <header className="w-full bg-secondary text-white py-4">
      <nav className="flex justify-between items-center">
        {/* Logo Sextion */}
        <div className="flex items-center gap-2">
          <FaCarTunnel size={50} />
          <a href="/" className="font-bold text-2xl">
            NovaRide
          </a>
        </div>
        <div className="flex items-center gap-8 font-medium text-xl">
          <a
            href="/"
            className="hover:text-primary transition duration-200 ease-linear"
          >
            Home
          </a>
          <a
            href="/"
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
            href="/"
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
            href="/"
            className="hover:text-primary transition duration-200 ease-linear"
          >
            Booking
          </a>
          <a
            href="/"
            className="hover:text-primary transition duration-200 ease-linear"
          >
            Login
          </a>

          <button className=" hidden lg:flex border-2 border-primary text-lg px-4 rounded-md hover:bg-primary transition duration-200 ease-linear">
            Log In
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;

//Note
//<header className=" fixed w-full z-10 bg-secondary text-white py-4">
//fixed->Keeps the navbar fixed at the top of the screen
//Makes the <div> stretch across the entire width of its parent.
//z-10 -> ensure that its above other elements
//bg-secondary: Applies a dark background color (from Tailwind configuration).
//text-white: Sets text color to white.
//py-4: Adds vertical padding.

//--------------------------------------------------------------------------------------------------------
//<nav className="flex justify-between items-center"></nav>
//flex: Uses Flexbox for layout.
//justify-between: Aligns children to the left and right edges of the parent.
//items-center: Aligns items vertically.
//--------------------------------------------------------------------------------------------------------
//href="/" className="font-bold text-2xl">NovaRide</a>
//Makes "NovaRide" a clickable link with bold and large text.
//hover:text-primary: Changes text color on hover.
//transition duration-200 ease-linear: Smooth color change over 200ms.
//transition: It allows smooth changes when properties like color, opacity, background, and position change,Without transition, the background color changes immediately on hover.
//--------------------------------------------------------------------------------------------------------
//ease-linear
//This controls the speed curve of the transition.
//Types:
//ease-linear	Constant speed from start to finish.
//ease-in	Starts slow, then speeds up.
//ease-out	Starts fast, then slows down.
//ease-in-out	Starts slow, speeds up in the middle, then slows down again.
