import React from "react";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaLocationArrow,
  FaMobileAlt,
} from "react-icons/fa";

import Banner from "@/assets/Images/Blackimage.png";

const BannerImg = {
  backgroundImage: `url(${Banner})`,
  backgroundPosition: "bottom",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  width: "100%",
};

const FooterLinks = [
  { title: "Home", link: "/" },
  { title: "About", link: "/aboutus" },
  { title: "Contact Us", link: "/contactus" },
  { title: "Blog", link: "/blogs" },
];

const Footer = () => {
  return (
    <div style={BannerImg} className="text-white">
      <div className="container mx-auto px-6">
        {/* Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 py-10">
          {/* Company Details */}
          <div>
            <h1 className="sm:text-3xl text-2xl font-bold mb-3">NovaRide</h1>
            <p className="text-gray-300 leading-relaxed">
              Your trusted car rental service, offering comfort, reliability,
              and seamless booking experiences. Drive with confidence!
            </p>
          </div>

          {/* Footer Links */}
          <div>
            <h1 className="text-xl font-bold mb-4 text-center sm:text-left">
              Important Links
            </h1>
            <ul className="flex flex-col gap-3 text-center sm:text-left">
              {FooterLinks.map((link) => (
                <li
                  className="cursor-pointer hover:text-primary hover:translate-x-1 transition duration-300 text-gray-300"
                  key={link.title}
                >
                  <a href={link.link}>{link.title}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social & Contact */}
          <div className="flex flex-col items-center sm:items-start">
            {/* Social Links */}
            <div className="flex gap-5 mb-6">
              <a href="#">
                <FaInstagram className="text-2xl hover:text-primary transition" />
              </a>
              <a href="#">
                <FaFacebook className="text-2xl hover:text-primary transition" />
              </a>
              <a href="#">
                <FaLinkedin className="text-2xl hover:text-primary transition" />
              </a>
            </div>

            {/* Contact Info */}
            <div className="space-y-3 text-gray-300">
              <div className="flex items-center gap-3">
                <FaLocationArrow />
                <p>Cairo, Egypt</p>
              </div>
              <div className="flex items-center gap-3">
                <FaMobileAlt />
                <p>01101100680</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="text-center text-gray-400 border-t border-gray-600 pt-4 text-sm">
          © {new Date().getFullYear()} NovaRide. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default Footer;
