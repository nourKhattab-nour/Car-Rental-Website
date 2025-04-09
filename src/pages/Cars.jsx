import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { GoArrowRight } from "react-icons/go";
import I1 from "@/assets/Images/car1.png";
import I2 from "@/assets/Images/car2.png";
import I3 from "@/assets/Images/car3.png";
import { FaStar } from "react-icons/fa";

const ProductsData = [
  {
    id: 1,
    img: I1,
    title: "Luxury SUV",
    description: "Experience comfort and power.",
    price: "$99/day",
    color: "Black",
    rating: 4.5,
  },
  {
    id: 2,
    img: I2,
    title: "Sports Sedan",
    description: "Speed and elegance combined.",
    price: "$120/day",
    color: "Red",
    rating: 4.8,
  },
  {
    id: 3,
    img: I3,
    title: "Convertible Coupe",
    description: "Drive in style and freedom.",
    price: "$150/day",
    color: "Blue",
    rating: 4.2,
  },
  {
    id: 4,
    img: I1,
    title: "Compact Hatchback",
    description: "Efficient and stylish.",
    price: "$75/day",
    color: "Silver",
    rating: 4.0,
  },
  {
    id: 5,
    img: I2,
    title: "Family Minivan",
    description: "Spacious and comfortable.",
    price: "$110/day",
    color: "White",
    rating: 4.6,
  },
  {
    id: 6,
    img: I3,
    title: "Electric Sedan",
    description: "Eco-friendly and powerful.",
    price: "$130/day",
    color: "Green",
    rating: 4.9,
  },
];

const Cars = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [selectedCard, setSelectedCard] = useState(null);

  const handleTabClick = (tabId) => setActiveTab(tabId);
  const handleCardClick = (id) => {
    setSelectedCard(id === selectedCard ? null : id);
    setTimeout(() => {
      window.location.href = "/booking";
    }, 500);
  };

  const getTabContent = () => {
    let filteredProducts = ProductsData;
    if (activeTab === "dashboard")
      filteredProducts = ProductsData.filter((p) => p.title.includes("Luxury"));
    if (activeTab === "settings")
      filteredProducts = ProductsData.filter((p) => p.title.includes("Sports"));
    if (activeTab === "contacts")
      filteredProducts = ProductsData.filter((p) =>
        p.title.includes("Convertible")
      );

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
        {filteredProducts.map((data) => (
          <div
            key={data.id}
            onClick={() => handleCardClick(data.id)}
            className={`cursor-pointer p-4 border rounded-lg transition-all ${
              selectedCard === data.id
                ? "border-[#4d9fff] shadow-lg scale-105 bg-[#111111]"
                : "border-gray-700 bg-[#111111]"
            }`}
          >
            <img
              src={data.img || "/placeholder.svg"}
              alt={data.title}
              className="w-full h-48 object-cover rounded-md"
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
      <div className="w-full flex flex-col items-center py-10 bg-secondary">
        <h6 className="text-lg text-gray-400 uppercase font-medium tracking-widest">
          What brands we offer?
        </h6>
        <h1 className="md:text-5xl text-2xl font-bold text-center text-white">
          Featured <span className="text-[#4d9fff]">Services</span>
        </h1>
      </div>

      <div className="py-5 flex justify-center bg-secondary">
        <ul className="flex space-x-4 border-b border-gray-700 pb-2">
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
                  ? "Sports"
                  : "Convertible"}
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
