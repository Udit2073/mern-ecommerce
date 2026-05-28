import express from "express";
import {
  registerUser,
  loginUser,
  googleLoginUser,
  deleteAccount,
} from "../controllers/userController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// REGISTER
router.post("/register", registerUser);

// LOGIN
router.post("/login", loginUser);

// GOOGLE LOGIN
router.post("/google-login", googleLoginUser);

// DELETE ACCOUNT
router.delete(
  "/delete-account",
  authMiddleware,
  deleteAccount
);

export default router;