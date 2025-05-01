import Car from "../Models/Cars.js";

// Get all cars
export const getAllCars = async (req, res) => {
  try {
    const cars = await Car.find();
    res.status(200).json(cars);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch cars", error: err.message });
  }
};

// Get a single car by ID
export const getCarById = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) return res.status(404).json({ message: "Car not found" });
    res.status(200).json(car);
  } catch (err) {
    res.status(500).json({ message: "Error fetching car", error: err.message });
  }
};

// Create a new car
export const createCar = async (req, res) => {
  try {
    const car = new Car(req.body);
    await car.save();
    res.status(201).json(car);
  } catch (err) {
    res
      .status(400)
      .json({ message: "Failed to create car", error: err.message });
  }
};

// Update an existing car
export const updateCar = async (req, res) => {
  try {
    const updatedCar = await Car.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedCar) return res.status(404).json({ message: "Car not found" });
    res.status(200).json(updatedCar);
  } catch (err) {
    res
      .status(400)
      .json({ message: "Failed to update car", error: err.message });
  }
};

// Delete a car
export const deleteCar = async (req, res) => {
  try {
    const deletedCar = await Car.findByIdAndDelete(req.params.id);
    if (!deletedCar) return res.status(404).json({ message: "Car not found" });
    res.status(200).json({ message: "Car deleted successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to delete car", error: err.message });
  }
};
