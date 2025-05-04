import express from "express";
import { createPayment, getPaymentsByUser } from "../Controllers/Payment.js";
import { 
  createPaymentValidation, 
  getUserPaymentsValidation 
} from "../middlewares/validation.js";
import authMiddleware from "../middlewares/Authmiddleware.js";

const router = express.Router();

// Apply validation and authentication middleware
router.post("/payments", authMiddleware, createPaymentValidation, createPayment);
router.get("/payments/:userId", authMiddleware, getUserPaymentsValidation, getPaymentsByUser);

export default router;