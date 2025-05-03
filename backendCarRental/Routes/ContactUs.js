import express from "express";
import { submitContactForm, getAllContacts } from "../Controllers/ContactUs.js";

const router = express.Router();

router.post("/contact", submitContactForm);
router.get("/contact", getAllContacts);

export default router;
