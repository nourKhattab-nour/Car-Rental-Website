// filepath: c:\Users\Noor\OneDrive - The British University in Egypt\Desktop\testproject\myreactproject\src\App.jsx
import React from 'react';
import './index.css';
import AOS from "aos";
import "aos/dist/aos.css";
import HomePage from './pages/HomePage';
function App() {

  React.useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 800,
      easing: "ease-in-sine",
      delay: 100,
    }
    ); 
    AOS.refresh();
  }, []); // Empty dependency array ensures it runs only once

  return (
    <>
    <HomePage/>

    
    </>
  );
}

export default App;