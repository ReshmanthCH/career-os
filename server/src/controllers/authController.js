import User from "../models/User.js";
import OTP from "../models/OTP.js";
import { hashPassword, comparePassword } from "../utils/password.js";
import { generateToken } from "../utils/jwt.js";
import { sendOTPEmail } from "../utils/emailService.js";

// Helper regex for basic email validation
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Send 6-digit OTP to user's email for registration/auth
 * POST /api/v1/auth/send-otp
 */
export const sendOTP = async (req, res, next) => {
  try {
    const { email, purpose = "REGISTER" } = req.body;

    if (!email || !EMAIL_REGEX.test(email.trim())) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid email address.",
      });
    }

    const normalizedEmail = email.toLowerCase().trim();

    // Check if user already exists
    if (purpose === "REGISTER") {
      const existingUser = await User.findOne({ email: normalizedEmail });
      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: "A user with this email address already exists. Please log in.",
        });
      }
    }

    // Generate 6-digit OTP
    const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 mins

    // Upsert OTP document
    await OTP.findOneAndUpdate(
      { email: normalizedEmail, purpose },
      {
        email: normalizedEmail,
        otp: generatedOtp,
        purpose,
        isVerified: false,
        expiresAt,
      },
      { upsert: true, new: true }
    );

    // Send email via SMTP
    const emailResult = await sendOTPEmail(normalizedEmail, generatedOtp);

    res.status(200).json({
      success: true,
      message: emailResult.sent
        ? `Verification code sent to ${normalizedEmail}. Check your email inbox!`
        : `Verification code generated for ${normalizedEmail}.`,
      devOtp: emailResult.sent ? undefined : generatedOtp,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Verify OTP code without registering yet
 * POST /api/v1/auth/verify-otp
 */
export const verifyOTP = async (req, res, next) => {
  try {
    const { email, otp, purpose = "REGISTER" } = req.body;

    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        message: "Email and OTP code are required.",
      });
    }

    const normalizedEmail = email.toLowerCase().trim();

    const otpRecord = await OTP.findOne({
      email: normalizedEmail,
      purpose,
      otp: otp.trim(),
    });

    if (!otpRecord) {
      return res.status(400).json({
        success: false,
        message: "Invalid verification code. Please check and try again.",
      });
    }

    if (otpRecord.expiresAt < new Date()) {
      return res.status(400).json({
        success: false,
        message: "Verification code has expired. Please request a new code.",
      });
    }

    otpRecord.isVerified = true;
    await otpRecord.save();

    res.status(200).json({
      success: true,
      message: "Email verified successfully!",
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Register User with verified OTP
 * POST /api/v1/auth/register
 */
export const registerUser = async (req, res, next) => {
  try {
    const { name, email, password, otp } = req.body;

    if (!name || !email || !password || !otp) {
      return res.status(400).json({
        success: false,
        message: "Name, email, password, and verification code (OTP) are required.",
      });
    }

    const normalizedEmail = email.toLowerCase().trim();

    const existingUser = await User.findOne({ email: normalizedEmail });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "A user with this email already exists.",
      });
    }

    // Verify OTP record
    const otpRecord = await OTP.findOne({
      email: normalizedEmail,
      purpose: "REGISTER",
      otp: otp.trim(),
    });

    if (!otpRecord) {
      return res.status(400).json({
        success: false,
        message: "Invalid verification code. Please request a new OTP code.",
      });
    }

    if (otpRecord.expiresAt < new Date()) {
      return res.status(400).json({
        success: false,
        message: "Verification code has expired. Please request a new OTP code.",
      });
    }

    const hashedPassword = await hashPassword(password);

    const user = await User.create({
      name: name.trim(),
      email: normalizedEmail,
      password: hashedPassword,
      onboardingCompleted: false,
    });

    // Delete used OTP
    await OTP.deleteOne({ _id: otpRecord._id });

    const token = generateToken({ id: user._id });

    res.status(201).json({
      success: true,
      message: "User registered & email verified successfully.",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        onboardingCompleted: user.onboardingCompleted,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * User Login
 * POST /api/v1/auth/login
 */
export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required.",
      });
    }

    const normalizedEmail = email.toLowerCase().trim();

    const user = await User.findOne({ email: normalizedEmail });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    const isPasswordCorrect = await comparePassword(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    const token = generateToken({ id: user._id });

    res.status(200).json({
      success: true,
      message: "Login successful.",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        onboardingCompleted: user.onboardingCompleted,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get Current Logged In User
 * GET /api/v1/auth/me
 */
export const getCurrentUser = async (req, res, next) => {
  try {
    res.status(200).json({
      success: true,
      user: req.user,
    });
  } catch (error) {
    next(error);
  }
};