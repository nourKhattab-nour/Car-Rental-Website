import { register, login, secured } from "../Controllers/AuthController.js";
import { Router } from "express";
import authMiddleware from "../middlewares/Authmiddleware.js";
const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/protected", authMiddleware, secured);

export default router;
