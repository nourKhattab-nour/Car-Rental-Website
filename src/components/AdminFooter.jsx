import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaLocationArrow,
  FaMobileAlt,
} from "react-icons/fa";
import footerLogo from "@/assets/Images/Blackimage.png"; // Import the footer logo

const FooterLinks = [
  {
    title: "Home",
    link: "/",
  },
  {
    title: "About",
    link: "/aboutus",
  },
  {
    title: "Contact",
    link: "/contactus",
  },
  {
    title: "Blog",
    link: "/blogs",
  },
];

const AdminFooter = () => {
  return (
    <footer className="w-full bg-[#29a9e1] text-white mt-8">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 py-8">
          {/* Company Details */}
          <div className="py-4 px-4">
            <div className="flex items-center gap-3 mb-3">
              <img
                src={footerLogo || "/placeholder.svg"}
                alt="Footer Logo"
                className="max-w-[50px]"
              />
              <h1 className="text-2xl font-bold">NovaRide</h1>
            </div>
            <p className="text-white">
              Your trusted car rental service, offering comfort, reliability,
              and seamless booking experiences. Drive with confidence!
            </p>
          </div>

          {/* Footer Links */}
          <div className="grid grid-cols-2 col-span-2 md:pl-10">
            <div>
              <div className="py-4 px-4">
                <h1 className="text-xl font-bold mb-4">Important Links</h1>
                <ul className="flex flex-col gap-3">
                  {FooterLinks.map((link) => (
                    <li
                      className="cursor-pointer hover:text-gray-200 hover:translate-x-1 duration-300"
                      key={link.title}
                    >
                      <a href={link.link}>{link.title}</a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div>
              <div className="py-4 px-4">
                <h1 className="text-xl font-bold mb-4">Links</h1>
                <ul className="flex flex-col gap-3">
                  {FooterLinks.map((link) => (
                    <li
                      className="cursor-pointer hover:text-gray-200 hover:translate-x-1 duration-300"
                      key={link.title}
                    >
                      <a href={link.link}>{link.title}</a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Social Links and Contact Info */}
        <div className="border-t border-white/20 py-6 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-4 mb-4 md:mb-0">
            <a href="#" className="hover:text-gray-200">
              <FaInstagram className="text-2xl" />
            </a>
            <a href="#" className="hover:text-gray-200">
              <FaFacebook className="text-2xl" />
            </a>
            <a href="#" className="hover:text-gray-200">
              <FaLinkedin className="text-2xl" />
            </a>
          </div>
          <div className="flex flex-col md:flex-row gap-4 md:gap-8">
            <div className="flex items-center gap-2">
              <FaLocationArrow />
              <p>Noida, Uttar Pradesh</p>
            </div>
            <div className="flex items-center gap-2">
              <FaMobileAlt />
              <p>+91 123456789</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default AdminFooter;
