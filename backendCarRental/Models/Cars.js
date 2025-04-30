import mongoose from "mongoose";
const CarSchema = new mongoose.Schema({
  id: String,
  img: String,
  title: String,
  description: String,
  price: String,
  color: String,
  rating: Number,
  category: String,
});

const Car = mongoose.model("Car", CarSchema);
export default Car;
