import jwt from "jsonwebtoken";
import { JWT_TOKEN_SECRET } from "../utils/Constants.js";
import User from "../models/userModal.js";

export const getProfile = async (req, res) => {
  try {
    const token = req.headers.auth;

    const decoded = jwt.verify(token, JWT_TOKEN_SECRET);

    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
