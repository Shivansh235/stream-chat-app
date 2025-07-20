import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js";// we import all the end points in the form of endpoints
import userRoutes from "./routes/user.route.js";// we import all the end points in the form of endpoints
import {ConnDB} from './lib/ConnDB.js'
import cookieParser from "cookie-parser";
import chatRoutes from "./routes/chat.route.js";
import cors from "cors";
import path from "path";
dotenv.config();
const app = express()
const port = process.env.PORT || 3000;


const __dirname = path.resolve();


app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,// allow frontend to send the cookies(token) to the user 
}))

app.use(express.json());
app.use(cookieParser());


app.use("/api/auth",authRoutes); 
app.use("/api/user",userRoutes); 
app.use("/api/chat",chatRoutes); 

app.get("/" , (req,res)=>{
  res.send("Hello world!")
})


if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

app.listen(3000, () => {
  console.log("Example app listening on port 3000")
  ConnDB();
})
