import User from "../models/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { OAuth2Client } from "google-auth-library";

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// ================= UTILS & HELPERS =================

const createToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      email: user.email,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );
};

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

// ================= LOGIN =================

export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password required",
      });
    }

    const normalizedEmail = email.toLowerCase().trim();
    const user = await User.findOne({ email: normalizedEmail });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (!user.password) {
      return res.status(400).json({
        success: false,
        message: "This account uses Google sign in",
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

    return res
      .cookie("token", token, cookieOptions)
      .status(200)
      .json({
        success: true,
        message: "Login successful",
        token,
        user: sanitizeUser(user),
      });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= SIGNUP =================

export const Signup = async (req, res) => {
  try {
    const { email, password, name } = req.body;

    if (!email || !password || !name) {
      return res.status(400).json({
        success: false,
        message: "All fields required",
      });
    }

    const normalizedEmail = email.toLowerCase().trim();
    const existingUser = await User.findOne({ email: normalizedEmail });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/;

    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        success: false,
        message: "Password must contain uppercase lowercase and number",
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email: normalizedEmail,
      password: hashPassword,
      provider: "local",
      emailVerified: false,
    });

    return res.status(201).json({
      success: true,
      message: "Signup successful",
      user: sanitizeUser(user),
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= GOOGLE LOGIN =================

export const GoogleLogin = async (req, res) => {
  try {
    const { credential } = req.body;

    if (!credential) {
      return res.status(400).json({
        success: false,
        message: "Google credential missing",
      });
    }

    // DEBUG TOKEN
    const decoded = JSON.parse(
      Buffer.from(credential.split(".")[1], "base64").toString()
    );

    console.log("TOKEN AUD:", decoded.aud);
    console.log("EXPECTED:", process.env.GOOGLE_CLIENT_ID);

    const ticket = await googleClient.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    if (!payload) {
      return res.status(401).json({
        success: false,
        message: "Invalid Google token",
      });
    }

    const email = (payload.email || "").toLowerCase().trim();
    const googleId = payload.sub;
    const name = payload.name || payload.given_name || "Google User";
    const avatar = payload.picture || "";

    let user = await User.findOne({ email });

    if (user) {
      user.googleId = googleId;
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

    return res
      .cookie("token", token, cookieOptions)
      .status(200)
      .json({
        success: true,
        message: "Google login successful",
        token,
        user: sanitizeUser(user),
      });
  } catch (error) {
    console.log("GOOGLE ERROR:", error);
    return res.status(401).json({
      success: false,
      message: error.message || "Google auth failed",
    });
  }
};

// ================= LOGOUT =================

export const Logout = async (req, res) => {
  try {
    return res
      .clearCookie("token", cookieOptions)
      .status(200)
      .json({
        success: true,
        message: "Logout successful",
      });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};