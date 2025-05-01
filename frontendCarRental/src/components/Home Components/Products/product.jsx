import { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa6";

const Product = () => {
  const [cars, setCars] = useState(null);

  useEffect(() => {
    const fetchCars = async () => {
      const response = await fetch("http://localhost:3000/api/cars");
      const data = await response.json();
      setCars(data);
      //console.log(data);
    };
    fetchCars();
  }, []);
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
          {cars?.slice(0, -1).map((data) => (
            <div key={data.id} className="space-y-3">
              <img
                src={data.img}
                alt={data.title}
                className="h-[150px] object-cover rounded-md"
              />
              <div>
                <h3 className="font-semibold"> {data.title}</h3>
                <p className="text-sm text-gray-600"> {data.color}</p>
                <div className="flex items-center gap-1">
                  <FaStar className="text-yellow-400" />
                  <span>{data.rating}</span>
                  <button
                    className="bg-primary hover:scale-105 duration-300 text-white py-1 px-4 rounded-full mt-12 group-hover:bg-bhue group hover:text:white"
                    onClick={() => (window.location.href = "/booking")}
                  >
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
