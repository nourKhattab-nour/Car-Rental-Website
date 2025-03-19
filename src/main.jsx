import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Routes, Route, BrowserRouter } from "react-router";
import Payment from './pages/Payment.jsx';
import Blogs from './pages/Blogs.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <Routes>
        <Route index element={<App />} />
        <Route path="payment" element={<Payment />} />
        <Route path="blogs" element={<Blogs />}/>
        
        
      </Routes>

      </BrowserRouter>
  </StrictMode>,
)
