import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { GoArrowRight } from "react-icons/go";
import { FaStar } from "react-icons/fa";

const Cars = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [selectedCard, setSelectedCard] = useState(null);
  const [cars, setCars] = useState(null);

  useEffect(() => {
    const fetchCars = async () => {
      const response = await fetch("http://localhost:3000/api/cars");
      const data = await response.json();
      setCars(data.data);
      console.log(data);
    };
    fetchCars();
  }, []);

  const handleTabClick = (tabId) => setActiveTab(tabId);

  const handleCardClick = (id) => {
    setSelectedCard(id);

    localStorage.setItem("selectedCarId", id);

    setTimeout(() => {
      window.location.href = "/booking";
    }, 500);
  };

  const getTabContent = () => {
    let filteredProducts = cars;

    if (activeTab === "dashboard")
      filteredProducts = cars?.filter((p) => p.category === "Luxury");
    if (activeTab === "settings")
      filteredProducts = cars?.filter((p) => p.category === "Business");
    if (activeTab === "contacts")
      filteredProducts = cars?.filter((p) => p.category === "Economy");

    return (
      <div className="grid grid-cols-1 gap-6 px-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredProducts?.map((data) => (
          <div
            key={data._id}
            onClick={() => handleCardClick(data._id)}
            className={`cursor-pointer p-4 border rounded-lg transition-all ${
              selectedCard === data.id
                ? "border-[#4d9fff] shadow-lg scale-105 bg-[#111111]"
                : "border-gray-700 bg-[#111111]"
            }`}
          >
            <img
              src={data.img || "/placeholder.svg"}
              alt={data.title}
              className="object-cover w-full rounded-md h-60"
            />
            <div className="mt-3">
              <h3 className="font-semibold text-white">{data.title}</h3>
              <p className="text-sm text-gray-400">{data.color}</p>
              <div className="flex items-center gap-1">
                <FaStar className="text-yellow-400" />
                <span className="text-gray-300">{data.rating}</span>
              </div>
            </div>
            <div className="mt-2">
              <h2 className="text-xl font-semibold text-[#4d9fff]">
                {data.price}
              </h2>
              <p className="text-gray-400">{data.description}</p>
            </div>
            <div className="flex justify-between mt-4">
              <button className="px-4 py-2 bg-[#4d9fff] text-white rounded-lg hover:bg-[#3a8aee] transition">
                Book now
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center w-full py-10 bg-secondary">
        <h6 className="text-lg font-medium tracking-widest text-gray-400 uppercase">
          What brands we offer?
        </h6>
        <h1 className="text-2xl font-bold text-center text-white md:text-5xl">
          Featured <span className="text-[#4d9fff]">Services</span>
        </h1>
      </div>

      <div className="flex justify-center py-5 bg-secondary">
        <ul className="flex pb-2 space-x-4 border-b border-gray-700">
          {["profile", "dashboard", "settings", "contacts"].map((tab) => (
            <li key={tab}>
              <button
                className={`px-4 py-2 border-b-2 transition ${
                  activeTab === tab
                    ? "border-[#4d9fff] text-[#4d9fff] font-semibold"
                    : "text-gray-400 hover:text-gray-300 border-transparent"
                }`}
                onClick={() => handleTabClick(tab)}
              >
                {tab === "profile"
                  ? "All Cars"
                  : tab === "dashboard"
                  ? "Luxury"
                  : tab === "settings"
                  ? "Business"
                  : "Economy"}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="p-4 bg-secondary">{getTabContent()}</div>

      <div className="flex justify-center py-6 bg-secondary">
        <button className="flex items-center border border-gray-700 bg-[#111111] text-white px-4 py-2 rounded-lg shadow-md hover:bg-[#111111]">
          View All Cars
          <GoArrowRight className="ml-2 text-xl text-[#4d9fff] transition-transform duration-300 group-hover:rotate-45" />
        </button>
      </div>

      <Footer />
    </>
  );
};

export default Cars;
