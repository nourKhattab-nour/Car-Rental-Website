import React from 'react';
import Bannernew from '@/assets/Images/Blackimage.png';

const BannerImg = {
    backgroundImage: `url(${Bannernew})`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    width: "100%", // Fix the width
    minHeight: "300px", // Ensure visibility
}

const Subscribe = () => {
  return (
    <div
      data-aos="zoom-in"
      className="mb-20 text-white"
      style={BannerImg}
    >
      <div className="container py-10 flex flex-col items-center justify-center backdrop-blur-lg ">
        <div className="space-y-6 max-w-xl text-center">
          <h1 className="text-2xl sm:text-4xl font-semibold">Get Notified About New Deals</h1>
          <input
            data-aos="fade-up"
            type="text"
            placeholder="Enter Your email"
            className="w-full p-3 text-black border border-gray-300 rounded-md"
          />
        </div>
      </div>
    </div>
  );
}

export default Subscribe;
