import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";

import ConnDB from "./db/ConnDB.js";
import authRoute from "./routes/auth.route.js";
import userRoute from "./routes/user.route.js";
import friendRoute from "./routes/friend.route.js";
import tokenRoute from "./routes/token.route.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Use ES Module __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Middleware
app.use(cors({
  origin: [process.env.CLIENT_URL || "http://localhost:5173"],
  credentials: true
}));
app.use(cookieParser());
app.use(express.json());

// ✅ Routes
app.use("/auth", authRoute);
app.use("/user", userRoute);
app.use("/friends", friendRoute);
app.use("/chat", tokenRoute);

// ✅ Serve Frontend
const frontendPath = path.resolve(__dirname, "../../frontend/dist");
app.use(express.static(frontendPath));
app.get("*", (req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});

// ✅ Start Server
app.listen(port, () => {
  console.log(`✅ Server running on port ${port}`);
  ConnDB();
});
