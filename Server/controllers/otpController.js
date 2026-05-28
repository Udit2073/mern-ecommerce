import OTP from "../models/otpModel.js";
import UserModel from "../models/UserModel.js";
import nodemailer from "nodemailer";

// SEND OTP
export const sendOTP = async (req, res) => {
  try {
    const { email } = req.body;

    // CHECK IF USER ALREADY EXISTS
    const existingUser = await UserModel.findOne({
      email,
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    // GENERATE OTP
    const otp = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    // SAVE OTP
    await OTP.findOneAndUpdate(
      { email },
      {
        otp,
        expiresAt:
          Date.now() + 5 * 60 * 1000,
      },
      {
        upsert: true,
        new: true,
      }
    );

    // EMAIL TRANSPORTER
    const transporter =
      nodemailer.createTransport({
        service: "gmail",
        auth: {
          user:
            process.env.EMAIL_USER,
          pass:
            process.env.EMAIL_PASS,
        },
      });

    // SEND EMAIL
    await transporter.sendMail({
      from:
        process.env.EMAIL_USER,
      to: email,
      subject:
        "ShopHub OTP Verification",
      text: `Your OTP is ${otp}. Valid for 5 minutes.`,
    });

    res.status(200).json({
      success: true,
      message:
        "OTP Sent Successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// VERIFY OTP
export const verifyOTP = async (req, res) => {
  try {
    const { email, otp } =
      req.body;

    const record =
      await OTP.findOne({
        email,
      });

    if (!record) {
      return res.status(400).json({
        success: false,
        message:
          "OTP not found",
      });
    }

    if (
      record.expiresAt <
      Date.now()
    ) {
      return res.status(400).json({
        success: false,
        message:
          "OTP expired",
      });
    }

    if (
      record.otp !== otp
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid OTP",
      });
    }

    // DELETE OTP AFTER SUCCESS
    await OTP.deleteOne({
      email,
    });

    res.status(200).json({
      success: true,
      message:
        "OTP Verified Successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};