import express from "express";
import Contact from "../models/ContactUs.js";

const router = express.Router();

router.post("/contact", async (req, res) => {
  const { firstName, lastName, email, queryType, message, consent } = req.body;

  if (
    !firstName ||
    !lastName ||
    !email ||
    !queryType ||
    !message ||
    consent !== true
  ) {
    return res
      .status(400)
      .json({ error: "All fields are required and consent must be given." });
  }

  try {
    const newContact = new Contact({
      firstName,
      lastName,
      email,
      queryType,
      message,
      consent,
    });

    await newContact.save();
    res.status(200).json({ message: "Form submitted and saved successfully." });
  } catch (err) {
    console.error("Error saving contact form:", err);
    res.status(500).json({ error: "Server error. Please try again later." });
  }
});

router.get("/contact", async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json(contacts);
  } catch (err) {
    console.error("Error fetching contacts:", err);
    res.status(500).json({ error: "Unable to fetch contact requests." });
  }
});

export default router;
