// import UserModel from "../models/UserModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import UserModel from "../models/UserModel.js";

// Register User
export const registerUser = async (req, res) => {
  console.log("BODY RECEIVED:", req.body);

  try {
    const { name, email, password, gender } = req.body;

    const existingUser =
      await UserModel.findOne({
        email,
      });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    const hashedPassword =
      await bcrypt.hash(password, 10);

    const user =
      await UserModel.create({
        name,
        email,
        password: hashedPassword,
        gender,
      });

    console.log("USER CREATED:", user);

    const token = jwt.sign(
      {
        userId: user._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      token,
      user,
    });

  } catch (error) {

    console.error(
      "REGISTER ERROR:",
      error
    );

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Login User
export const loginUser = async (
  req,
  res
) => {

  try {

    const {
      email,
      password,
    } = req.body;

    // Check User
    const user =
      await UserModel.findOne({
        email,
      });

    if (!user) {

      return res.status(400).json({
        success: false,
        message:
          "Incorrect Email",
      });
    }

    // Check Password
    const isMatch =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!isMatch) {

      return res.status(400).json({
        success: false,
        message:
          "Incorrect Password",
      });
    }

    // Create Token
    const token = jwt.sign(
      {
        userId: user._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    // Response
    res.status(200).json({
      success: true,
      token,
      user,
    });

  } catch (error) {

    res.status(500).json({
      message: "Server error",
    });
  }
};

// Google Login
export const googleLoginUser =
  async (req, res) => {

    try {

      const { email } =
        req.body;

      // Find User
      const user =
        await UserModel.findOne({
          email,
        });

      // If User Not Found
      if (!user) {

        return res.status(404).json({
          success: false,
          message:
            "Please register first",
        });
      }

      // Create Token
      const token = jwt.sign(
        {
          userId: user._id,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "7d",
        }
      );

      // Response
      res.status(200).json({
        success: true,
        token,
        user,
      });

    } catch (error) {

      res.status(500).json({
        message: "Server error",
      });
    }
  };

// Delete User
export const deleteAccount = async (req, res) => {
  try {
    // Get User ID From Middleware

    const userId = req.userId;

    console.log("User ID:", userId);

    // Check User

    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Delete User

    await UserModel.findByIdAndDelete(userId);

    // Success Response

    res.status(200).json({
      success: true,
      message: "Account deleted successfully",
    });

  } catch (error) {
    console.log("DELETE ACCOUNT ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};