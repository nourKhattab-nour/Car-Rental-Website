import React from "react";
import carPng from "../../assets/Images/car.png";

function Hero() {
  return (
    <div className="bg-secondary text-white duration-300 pt-16">
      <div className="container min-h-[620px] flex items-center">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex justify-center items-center">
            <img src={carPng} alt="Car" className="max-w-full h-auto" />
          </div>
          <div className="flex flex-col justify-center">
            {/* Additional content */}
            <p className="text-primary text-2xl font-Inter mb-2">
              NovaRide is always with you
            </p>
            <h1 className="text-5xl  lg:text-7xl font-semibold font-serif mb-4">
              Car Rental
            </h1>
            <p className="text-lg mb-6">
              CAR RENTAL & LIMOUSINE SERVICES IN EGYPT
            </p>
            <p className="text-lg mb-6">
              Are you looking for a reliable and professional high-end services?
              Look no further! NovaRide is here for YOU.
            </p>
            <div className="flex space-x-4">
              <button className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition duration-300">
                Get Started
              </button>
              <button className="px-6 py-2 border border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition duration-300">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
