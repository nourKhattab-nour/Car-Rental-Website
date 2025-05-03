import React from "react";
import Navbar from "../components/Navbar";
import Home from "../components/Home Components/Home/Home";
import Products from "../components/Home Components/Products/product";
import Subscribe from "../components/Home Components/Subscribe/subscribe";
import TopProducts from "../components/Home Components/TopProducts/TopProducts";
import Feedback from "../components/Home Components/Feedback/Feedback";
import Footer from "../components/Footer";

const HomePage = () => {
  return (
    <div className="bg-secondary text-white">
      <Navbar />
      <Home />
      <Products />
      <TopProducts />
      <Feedback />
      <Subscribe />
      <Footer />
    </div>
  );
};

export default HomePage;
