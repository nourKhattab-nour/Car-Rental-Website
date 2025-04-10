import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Routes, Route, BrowserRouter } from "react-router";
import Payment from "./pages/payment.jsx";
import Blogs from "./pages/Blogs.jsx";
import HomePage from "./pages/HomePage.jsx";
import AboutUs from "./pages/AboutUs.jsx";
import Cars from "./pages/Cars.jsx";
import QA from "./pages/QA.jsx";
import Booking from "./pages/Booking.jsx";
import Login from "./pages/Login.jsx";
import Contactus from "./pages/Contactus.jsx";
import AdminLogin from "./pages/AdminLogin.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route index element={<App />} />
        <Route path="payment" element={<Payment />} />
        <Route path="blogs" element={<Blogs />} />
        <Route path="HomePage" element={<HomePage />} />
        <Route path="AboutUs" element={<AboutUs />} />

        <Route path="Cars" element={<Cars/>} />

        <Route path="booking" element={<Booking />} />
        <Route path="Cars" element={<Cars />} />

        <Route path="QA" element={<QA />} />
        <Route path="login" element={<Login/>} />
        <Route path="contactus" element={<Contactus/>}/>
        <Route path="AdminLogin" element={<AdminLogin/>}/>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
