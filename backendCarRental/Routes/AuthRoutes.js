import { Router } from "express";
import {
  login,
  register,
  secured,
  adminLogin,
} from "../Controllers/AuthController.js";
import { 
  registerValidation, 
  loginValidation, 
  adminLoginValidation 
} from "../middlewares/validation.js";
import authMiddleware from "../middlewares/Authmiddleware.js";

const router = Router();

// Apply validation middleware before controllers
router.post("/register", registerValidation, register);
router.post("/login", loginValidation, login);
router.post("/admin-login", adminLoginValidation, adminLogin);
// Apply auth middleware to secured route
router.get("/secured", authMiddleware, secured);

export default router;