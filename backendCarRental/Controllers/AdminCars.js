import Car from "../Models/Cars.js";

const getAllCars = async (req, res) => {
  try {
    // Add optional filtering by query parameters
    const filter = {};
    
    // Example: filter by make, model, or year if provided in query
    if (req.query.make) filter.make = req.query.make;
    if (req.query.model) filter.model = req.query.model;
    if (req.query.year) filter.year = req.query.year;
    if (req.query.available !== undefined) filter.available = req.query.available === 'true';
    
    const cars = await Car.find(filter);
    res.status(200).json({
      success: true,
      count: cars.length,
      data: cars
    });
  } catch (err) {
    res
      .status(500)
      .json({ 
        success: false,
        message: "Failed to fetch cars", 
        error: err.message 
      });
  }
};

const getCarById = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) return res.status(404).json({ 
      success: false,
      message: "Car not found" 
    });
    
    res.status(200).json({
      success: true,
      data: car
    });
  } catch (err) {
    res.status(500).json({ 
      success: false,
      message: "Error fetching car", 
      error: err.message 
    });
  }
};

const createCar = async (req, res) => {
  try {
    // Validation already passed at this point
    const car = new Car(req.body);
    await car.save();
    
    res.status(201).json({
      success: true,
      message: "Car created successfully",
      data: car
    });
  } catch (err) {
    res
      .status(400)
      .json({ 
        success: false,
        message: "Failed to create car", 
        error: err.message 
      });
  }
};

const updateCar = async (req, res) => {
  try {
    // Validation already passed at this point
    const updatedCar = await Car.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    
    if (!updatedCar) return res.status(404).json({ 
      success: false,
      message: "Car not found" 
    });
    
    res.status(200).json({
      success: true,
      message: "Car updated successfully",
      data: updatedCar
    });
  } catch (err) {
    res
      .status(400)
      .json({ 
        success: false,
        message: "Failed to update car", 
        error: err.message 
      });
  }
};

const deleteCar = async (req, res) => {
  try {
    const deletedCar = await Car.findByIdAndDelete(req.params.id);
    if (!deletedCar) return res.status(404).json({ 
      success: false,
      message: "Car not found" 
    });
    
    res.status(200).json({ 
      success: true,
      message: "Car deleted successfully" 
    });
  } catch (err) {
    res
      .status(500)
      .json({ 
        success: false,
        message: "Failed to delete car", 
        error: err.message 
      });
  }
};

export default {
  getAllCars,
  getCarById,
  createCar,
  updateCar,
  deleteCar,
};