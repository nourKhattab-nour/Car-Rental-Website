import { Router } from "express";
import authMiddleware from "../middlewares/Authmiddleware.js";
import {
  login,
  register,
  secured,
  adminLogin,
} from "../Controllers/AuthController.js";
const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/admin-login", adminLogin);
router.get("/secured", secured);

export default router;
