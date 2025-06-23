import User from "../models/User.js";

import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET || 1234567890,
    { expiresIn: process.env.JWT_EXPIRES_IN || "30d" }
  );
};

const authController = {
  register: async (req, res) => {
    try {
      const { fName, lName, email, password } = req.body;
      const userExist = await User.findOne({ email });
      if (!fName || !lName || !email || !password) {
        return res.status(400).json({ message: "All fields are required." });
      }
      console.log(userExist);
      if (userExist) {
        return res
          .status(400)
          .json({ message: "User with this email alredy exist" });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const newUser = await User.create({
        fName,
        lName,
        email,
        password: hashedPassword,
      });

      const token = await generateToken(newUser);

      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Lax",
        maxAge: 3 * 24 * 60 * 60 * 1000,
      });

      const userToReturn = { ...newUser.toObject() };
      delete userToReturn.password;

      res.status(201).json({
        message: "user registerd successfully",
        user: userToReturn,
        token,
      });
    } catch (err) {
      console.error("Error while registerin: ", err.message);
      res.status(500).json({
        message: "Internal serveer error",
        error: err.message,
      });
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email }).select("+password");

      if (!user) {
        return res.status(400).json({ message: "No user found" });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      const token = generateToken(user);

      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Lax",
        maxAge: 3 * 24 * 60 * 60 * 1000,
      });

      if (!isMatch) {
        return res.status(400).json({ message: "Invalid password" });
      }

      const userToReturn = { ...user.toObject() };
      delete userToReturn.password;

      res.status(200).json({
        message: "Login successful",
        user: userToReturn,
        token,
      });
    } catch (err) {
      console.error("Error while logging: ", err.message);
      res
        .status(500)
        .json({ message: "Internal server error", error: err.message });
    }
  },
  logout: async (req, res) => {
    try {
      res.clearCookie("token");
      res.status(200).json({ message: "Logged out successfully" });
    } catch (err) {
      console.log(err.message);
      res.status(400).json({ message: "Lougout failed", error: err.message });
    }
  },
};

export default authController;
