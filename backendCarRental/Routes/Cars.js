import express from "express";
import Car from "../models/Cars.js";

const router = express.Router();

router.get("/cars", async (req, res) => {
  // Removed '/api' here
  try {
    const cars = await Car.find();
    res.json(cars);
  } catch (err) {
    console.error("Error fetching cars:", err);
    res.status(500).json({ error: "Failed to fetch cars" });
  }
});

export default router;
