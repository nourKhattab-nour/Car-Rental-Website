import express, { json } from "express";
import { connect, Schema, model } from "mongoose";
import dotenv from "dotenv";
dotenv.config();

import cors from "cors";

const app = express();
const PORT = process.env.PORT;
const MONGO_URI = process.env.DB_URI;

// Middleware
app.use(cors());
app.use(json());

// MongoDB Connection
connect(MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

app.get("/", (req, res) => {
  res.send("Hello worldddddddddd");
});

const CarSchema = new Schema({
  id: String,
  img: String,
  title: String,
  description: String,
  price: String,
  color: String,
  rating: Number,
  category: String,
});

const Car = model("Car", CarSchema);

app.get("/api/cars", async (req, res) => {
  try {
    const cars = await Car.find();
    res.json(cars);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch cars" });
  }
});
