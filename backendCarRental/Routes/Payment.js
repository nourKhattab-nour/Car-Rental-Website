import express from "express";
import { createPayment, getPaymentsByUser } from "../Controllers/Payment.js";

const router = express.Router();

router.post("/payments", createPayment);

router.get("/payments/:userId", getPaymentsByUser);

export default router;
