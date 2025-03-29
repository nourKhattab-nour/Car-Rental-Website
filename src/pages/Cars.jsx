import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { GoArrowRight } from 'react-icons/go';
import I1 from '@/assets/Images/car1.png';
import I2 from '@/assets/Images/car2.png';
import I3 from '@/assets/Images/car3.png';
import { FaStar } from 'react-icons/fa';

const ProductsData = [
  { id: 1, img: I1, title: 'Luxury SUV', description: 'Experience comfort and power.', price: '$99/day', color: 'Black', rating: 4.5 },
  { id: 2, img: I2, title: 'Sports Sedan', description: 'Speed and elegance combined.', price: '$120/day', color: 'Red', rating: 4.8 },
  { id: 3, img: I3, title: 'Convertible Coupe', description: 'Drive in style and freedom.', price: '$150/day', color: 'Blue', rating: 4.2 },
  { id: 4, img: I1, title: 'Compact Hatchback', description: 'Efficient and stylish.', price: '$75/day', color: 'Silver', rating: 4.0 },
  { id: 5, img: I2, title: 'Family Minivan', description: 'Spacious and comfortable.', price: '$110/day', color: 'White', rating: 4.6 },
  { id: 6, img: I3, title: 'Electric Sedan', description: 'Eco-friendly and powerful.', price: '$130/day', color: 'Green', rating: 4.9 },
];

const Cars = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [selectedCard, setSelectedCard] = useState(null);

  const handleTabClick = (tabId) => setActiveTab(tabId);
  const handleCardClick = (id) => setSelectedCard(id === selectedCard ? null : id);

  const getTabContent = () => {
    let filteredProducts = ProductsData;
    if (activeTab === 'dashboard') filteredProducts = ProductsData.filter(p => p.title.includes('Luxury'));
    if (activeTab === 'settings') filteredProducts = ProductsData.filter(p => p.title.includes('Sports'));
    if (activeTab === 'contacts') filteredProducts = ProductsData.filter(p => p.title.includes('Convertible'));

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
        {filteredProducts.map((data) => (
          <div
            key={data.id}
            onClick={() => handleCardClick(data.id)}
            className={`cursor-pointer p-4 border rounded-lg transition-all ${
              selectedCard === data.id ? 'border-blue-500 shadow-lg scale-105' : 'border-gray-200'
            }`}
          >
            <img src={data.img} alt={data.title} className="w-full h-48 object-cover rounded-md" />
            <div className="mt-3">
              <h3 className="font-semibold">{data.title}</h3>
              <p className="text-sm text-gray-600">{data.color}</p>
              <div className="flex items-center gap-1">
                <FaStar className="text-yellow-400" />
                <span>{data.rating}</span>
              </div>
            </div>
            <div className="mt-2">
              <h2 className="text-xl font-semibold text-gray-600">{data.price}</h2>
              <p className="text-gray-600">{data.description}</p>
            </div>
            <div className="flex justify-between mt-4">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
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
      <div className="w-full flex flex-col items-center py-10">
        <h6 className="text-lg text-gray-500 uppercase font-medium tracking-widest">What brands we offer?</h6>
        <h1 className="md:text-5xl text-2xl font-bold text-center text-gray-800">
          Featured <span className="text-blue-600">Services</span>
        </h1>
      </div>

      <div className="py-5 flex justify-center">
        <ul className="flex space-x-4 border-b pb-2">
          {['profile', 'dashboard', 'settings', 'contacts'].map((tab) => (
            <li key={tab}>
              <button
                className={`px-4 py-2 border-b-2 transition ${
                  activeTab === tab ? 'border-blue-600 text-blue-600 font-semibold' : 'text-gray-500 hover:text-gray-600'
                }`}
                onClick={() => handleTabClick(tab)}
              >
                {tab === 'profile' ? 'All Cars' : tab === 'dashboard' ? 'Luxury' : tab === 'settings' ? 'Sports' : 'Convertible'}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="p-4">{getTabContent()}</div>

      <div className="flex justify-center py-6">
        <button className="flex items-center border border-gray-300 bg-white text-gray-700 px-4 py-2 rounded-lg shadow-md hover:bg-gray-100">
          View All Cars
          <GoArrowRight className="ml-2 text-xl transition-transform duration-300 group-hover:rotate-45" />
        </button>
      </div>

      <Footer />
    </>
  );
};

export default Cars;