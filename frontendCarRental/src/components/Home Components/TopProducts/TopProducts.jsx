import { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa6";

const TopProducts = () => {
  const handleOrderPopup = () => {
    alert("Order popup triggered!");
  };
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
    <div className="container ">
      {/* Header section */}
      <div className="text-left mb-24 ">
        <p className="text-sm text-primary">Top Rated for You</p>
        <h1 className="text-3xl font-bold"> Best Cars</h1>
        <p className="text-xs text-black-400">
          Discover the top-selling cars that combine style, performance, and
          reliability. Whether you're looking for luxury, efficiency, or power,
          these models offer the best in class. Explore a range of vehicles to
          find the perfect fit for your needs.
        </p>
      </div>
      {/* Body section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  md:gap-5 place-items-center gap-20">
        {/* Add content for the body section here */}
        {cars?.slice(0, -3).map((data) => (
          <div
            className="rounded-2xl bg-black/80 dark:bg-white-800
                        hover:bg-blue-500  dark:hover:bg-blue-500
                        hover:text-white relative shadow-xl
                        duration-300 group max-w-[300px]"
          >
            {/* Image section  */}
            <div className="h-[100px]">
              <img
                src={data.img}
                alt=""
                className="max-w-[140px] block mx-auto group-hover:scale-105 duration-00 drop-shadow-md"
              ></img>
            </div>
            {/* Details section  */}

            <div className="p-4  text-center ">
              {/* star rating */}
              <div className="w-full flex items-center justify-center gap-1 ">
                <FaStar className="text-yellow-500"></FaStar>
                <FaStar className="text-yellow-500"></FaStar>
                <FaStar className="text-yellow-500"></FaStar>
                <FaStar className="text-yellow-500"></FaStar>
              </div>
              <h1 className="text-xl  font-bold"> {data.title}</h1>
              <p className="text-black-500 group-hover:text-white duration-300 text-sm  line-clamp-2">
                {data.description}
              </p>
              <button
                className="bg-primary hover:scale-105 duration-300 text-white py-1 px-4 rounded-full mt-4 group-hover:bg-bhue group hover:text:white"
                onClick={() => (window.location.href = "/booking")}
              >
                {" "}
                Book Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopProducts;
