import React from 'react'
import Navbar from "../components/Navbar";
import Home from "../components/Home Components/Home/Home"; // Import Home component
import Products from "../components/Home Components/Products/product"; // Import Products component
import Subscribe from "../components/Home Components/Subscribe/subscribe"; // Import Subscribe component
import TopProducts from "../components/Home Components/TopProducts/TopProducts"; // Import TopProducts component
import Feedback from "../components/Home Components/Feedback/Feedback"; // Import Feedback component
import Footer from "../components/Footer"; // Import Footer component

const HomePage = () => {
  return (

    <div className="bg-secondary text-white">
    <Navbar/>
    <Home/>
    <Products/>
    <Subscribe />
    <TopProducts/>
    <Feedback/>
    <Footer/>

    </div>
   
  )
}

export default HomePage;