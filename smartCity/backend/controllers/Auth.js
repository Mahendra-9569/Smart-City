import User from "../models/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { OAuth2Client } from "google-auth-library";

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const createToken = (user) =>
  jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

const sanitizeUser = (user) => ({
  _id: user._id,
  name: user.name,
  email: user.email,
  avatar: user.avatar,
  provider: user.provider,
  googleId: user.googleId,
  emailVerified: user.emailVerified,
  createdAt: user.createdAt,
  updatedAt: user.updatedAt,
});

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required.",
      });
    }

    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (!user.password) {
      return res.status(400).json({
        success: false,
        message: "This account uses Google sign-in. Please continue with Google.",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const token = createToken(user);
    const safeUser = sanitizeUser(user);

    return res
      .cookie("token", token, cookieOptions)
      .status(200)
      .json({
        success: true,
        message: "User logged in successfully",
        token,
        user: safeUser,
      });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const Signup = async (req, res) => {
  try {
    const { email, password, name } = req.body;

    if (!email || !password || !name) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    const normalizedEmail = email.toLowerCase().trim();
    const userExists = await User.findOne({ email: normalizedEmail });

    if (userExists) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        success: false,
        message:
          "Password must be at least 6 characters long and have at least 1 number, 1 symbol and 1 uppercase letter",
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      email: normalizedEmail,
      password: hashPassword,
      name,
      provider: "local",
      emailVerified: false,
    });

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: sanitizeUser(user),
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const GoogleLogin = async (req, res) => {
  try {
    const { credential } = req.body;

    if (!credential) {
      return res.status(400).json({
        success: false,
        message: "Google credential is required.",
      });
    }

    const ticket = await googleClient.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    if (!payload) {
      return res.status(401).json({
        success: false,
        message: "Invalid Google token.",
      });
    }

    const googleId = payload.sub;
    const email = (payload.email || "").toLowerCase().trim();

    if (!email) {
      return res.status(401).json({
        success: false,
        message: "Google account did not return an email address.",
      });
    }

    const name = payload.name || payload.given_name || email.split("@")[0] || "Google User";
    const avatar = payload.picture || null;

    let user = await User.findOne({ email });

    if (user) {
      user.name = user.name || name;
      user.googleId = user.googleId || googleId;
      user.avatar = avatar || user.avatar;
      user.provider = "google";
      user.emailVerified = Boolean(payload.email_verified);
      await user.save();
    } else {
      user = await User.create({
        name,
        email,
        password: null,
        googleId,
        avatar,
        provider: "google",
        emailVerified: Boolean(payload.email_verified),
      });
    }

    const token = createToken(user);
    const safeUser = sanitizeUser(user);

    return res
      .cookie("token", token, cookieOptions)
      .status(200)
      .json({
        success: true,
        message: "Google login successful",
        token,
        user: safeUser,
      });
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: error.message || "Google sign-in failed.",
    });
  }
};

export const Logout = async (req, res) => {
  try {
    return res.status(200).clearCookie("token", cookieOptions).json({
      success: true,
      message: "User logged out successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
