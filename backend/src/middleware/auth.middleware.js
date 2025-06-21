import jwt from "jsonwebtoken";
import User from "../models/User.js"; // ✅ include .js

export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      return res
        .status(401)
        .json({ message: "Authorization not found - No token provided" });
    }

    const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);

    const user = await User.findById(decode.userId).select("-password"); // ✅ lowercase key

    if (!user) {
      return res
        .status(401)
        .json({ message: "Unauthorized - User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Auth Middleware Error:", error.message);
    return res.status(500).json({ message: "Internal server error!" });
  }
};
