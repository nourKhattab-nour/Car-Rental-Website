import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { IoSpeedometer } from "react-icons/io5";

const AboutUs = () => {
  return (
    <>
      <Navbar />
      <div className="flex flex-col min-h-screen bg-secondary">
        {/* Header */}
        <header className="w-full py-16 bg-secondary">
          <h1 className="text-center text-5xl font-medium text-white">
            About us
          </h1>
        </header>

        {/* Main content */}
        <main className="flex-grow py-12 px-4 md:px-8 lg:px-16 bg-secondary">
          <div className="max-w-5xl mx-auto bg-[#111111] rounded-lg p-8 border border-zinc-700 shadow-lg">
            <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
              {/* Logo and company name */}
              <div className="flex flex-col items-center md:w-1/3">
                <div className="w-48 h-48 relative mb-4">
                  <div className="w-48 h-48 rounded-lg flex items-center justify-center bg-[#111111] border border-zinc-700">
                    <IoSpeedometer size={48} className="text-[#4d9fff]" />
                  </div>
                </div>
                <div className="text-center flex flex-col items-center">
                  <h2 className="text-5xl font-serif text-white">NovaRide</h2>
                  <p className="text-sm text-[#4d9fff] italic mt-[-8px]">
                    always with you
                  </p>
                </div>
              </div>

              {/* Company description */}
              <div className="md:w-2/3">
                <h3 className="text-2xl font-medium mb-4 text-white">
                  who are we
                </h3>
                <div className="p-6 bg-[#111111] rounded-lg border border-zinc-700 mb-6">
                  <p className="mb-4 text-gray-300">
                    NovaRide Limousine Company for Tourist Transportation and
                    Land Transportation... A brilliant name in the world of
                    renting cars, limousines and transport vehicles of all kinds
                    throughout the Arab Republic of Egypt.
                  </p>
                  <p className="text-gray-300">
                    NovaRide Limousine Company was established in 2006 with an
                    old name until 2010, and the name and headquarters of the
                    company were changed, as we once again set a new definition
                    of luxury and service. Luxury crowned with the highest
                    standards of service.
                  </p>
                </div>

                {/* WhatsApp button */}
                <a
                  href="#"
                  className="inline-block px-6 py-2 bg-[#4d9fff] text-white rounded-md hover:bg-[#3a8aee] transition-colors"
                >
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default AboutUs;
