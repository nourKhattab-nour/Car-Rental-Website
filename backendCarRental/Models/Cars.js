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
  totalPrice: String,
  available: Boolean,
  year: String,
  make: String,
  model: String,
});

CarSchema.pre("save", function (next) {
  if (this.make && this.model) {
    this.title = `${this.make} ${this.model}`;
  }
  next();
});

const Car = mongoose.model("Car", CarSchema);
export default Car;
