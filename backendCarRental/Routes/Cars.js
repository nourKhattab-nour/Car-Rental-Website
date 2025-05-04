// carRoutes.js
import express from "express";
import carController from "../Controllers/AdminCars.js";
import { 
  validateObjectId, 
  createCarValidation, 
  updateCarValidation 
} from "../middlewares/validation.js";
import authMiddleware from "../middlewares/Authmiddleware.js";

const router = express.Router();

// Public routes
router.get("/cars", carController.getAllCars);
router.get("/cars/:id", validateObjectId, carController.getCarById);

// Protected routes - require authentication
router.post("/cars", authMiddleware, createCarValidation, carController.createCar);
router.put("/cars/:id", authMiddleware, validateObjectId, updateCarValidation, carController.updateCar);
router.delete("/cars/:id", authMiddleware, validateObjectId, carController.deleteCar);

export default router;