import express from "express";
import { submitContactForm, getAllContacts } from "../Controllers/ContactUs.js";
import { contactFormValidation } from "../middlewares/validation.js";
import authMiddleware from "../middlewares/Authmiddleware.js";

const router = express.Router();

// Apply validation middleware to the contact form submission route
router.post("/contact", contactFormValidation, submitContactForm);

// Protect the getAllContacts route with authentication since it's admin-only
router.get("/contact", authMiddleware, getAllContacts);

export default router;