// carRoutes.js
import express from "express";
import carController from "../Controllers/AdminCars.js";

const router = express.Router();

router.get("/cars", carController.getAllCars);
router.get("/cars/:id", carController.getCarById);
router.post("/cars", carController.createCar);
router.put("/cars/:id", carController.updateCar);
router.delete("/cars/:id", carController.deleteCar);

export default router;
