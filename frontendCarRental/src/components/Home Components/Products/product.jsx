import React from "react";
import Img1 from "../../../assets/Images/car1.png";
import Img2 from "../../../assets/Images/car2.png";
import Img3 from "../../../assets/Images/car3.png";
import Img4 from "../../../assets/Images/car4.png";
import { FaStar } from "react-icons/fa6";
const ProductsData = [
  {
    id: 1,
    img: Img1,
    title: "BMW 3 Series",
    rating: 5.0,
    color: "white",
    aosDelay: "0",
  },
  {
    id: 2,
    img: Img2,
    title: "BMW X5",
    rating: 4.5,
    color: "Blue",
    aosDelay: "200",
  },
  {
    id: 3,
    img: Img3,
    title: "Mercedes-Benz GLE",
    rating: 4.7,
    color: "white",
    aosDelay: "400",
  },
  {
    id: 4,
    img: Img4,
    title: "BMW i4",
    rating: 4.4,
    color: "white",
    aosDelay: "600",
  },
  {
    id: 5,
    img: Img2,
    title: "BMW i4",
    rating: 4.5,
    color: "Blue",
    aosDelay: "800",
  },
];

const Product = () => {
  return (
    <div className="mt-14 mb-12 ">
      <div className="container ">
        {/* Header section */}
        <div className="text-center mb-10 max-w-[600px] mx-auto">
          <p className="text-sm text-primary">Top selling Cars for You</p>
          <h1 className="text-3xl font-bold">Cars</h1>
          <p className="text-xs text-black-400">
            Discover the top-selling cars that combine style, performance, and
            reliability. Whether you're looking for luxury, efficiency, or
            power, these models offer the best in class. Explore a range of
            vehicles to find the perfect fit for your needs.
          </p>
        </div>
        {/* Body section */}
        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 place-items-center gap-1 ">
          {/* Card section */}
          {ProductsData.map((data) => (
            <div
              data-aos-delay={data.aosDelay}
              key={data.id}
              className="space-y-3"
            >
              <img
                src={data.img}
                alt={data.title}
                className="h-[120px] w-[2000px] object-cover rounded-md"
              />
              <div>
                <h3 className="font-semibold "> {data.title}</h3>
                <p className="text-sm text-gray-600 "> {data.color}</p>
                <div className="flex items-center gap-1 ">
                  <FaStar className="text-yellow-400"></FaStar>
                  <span>{data.rating}</span>
                  <button
                    className="bg-primary hover:scale-105 duration-300 text-white py-1 px-4 rounded-full mt-12 group-hover:bg-bhue group hover:text:white"
                    onClick={() => (window.location.href = "/booking")}
                  >
                    {" "}
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Product;
