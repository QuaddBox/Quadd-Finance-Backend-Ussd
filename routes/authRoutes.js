import { Router } from "express";
const router = Router();
import { register, login } from "../controllers/authController.js";

// Register a new user
router.post("/register", register);

// Login an existing user
router.post("/login", login);

export default router;
