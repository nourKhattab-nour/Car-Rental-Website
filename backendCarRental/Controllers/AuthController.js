import { compare } from "bcryptjs";
import User from "../Models/User.js";

export const register = async (req, res) => {

  
  const { email, password } = req.body;
  console.log(email, password);
  
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = new User({ email, password });
    user.save();
    console.log(user);

    const token = user.generateToken();

    res.status(201).json({
      token,
      user: { id: user._id, email: user.email },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = user.generateToken();
    res.status(200).json({
      token,
      user: { id: user._id, email: user.email },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const adminLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    if (user.role !== "admin") {
      return res.status(403).json({ message: "Access denied: Not an admin" });
    }

    const isMatch = await compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = user.generateToken();
    res.status(200).json({
      token,
      user: { id: user._id, email: user.email, role: user.role },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const secured = (req, res) => {
  res.json({
    message: `Welcome ${req.user?.email || "User"}, this is a secured route.`,
  });
};
