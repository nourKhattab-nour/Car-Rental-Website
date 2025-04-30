import express, { json } from "express";
import { connect, Schema, model } from "mongoose";
import dotenv from "dotenv";
import ContactUs from "./Routes/ContactUs.js";
import Cars from "./Routes/Cars.js";
import authRoutes from "./Routes/AuthRoutes.js";
dotenv.config();

import cors from "cors";

const app = express();
const PORT = process.env.PORT;
const MONGO_URI = process.env.DB_URI;

// Middleware
app.use(cors());
app.use(json());
app.use("/api", ContactUs);
app.use("/api", Cars);

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

app.use("/api/auth", authRoutes);
