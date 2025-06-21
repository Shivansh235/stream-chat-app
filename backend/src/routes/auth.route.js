import express from "express";
import {signup,Login,Logout,onboard} from "../controllers/auth.controller.js"
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router()

router.post("/signup",signup)
router.post("/Logout",Logout)
router.post("/Login",Login)


router.post("/onboarding",protectRoute, onboard)

router.get("/exist",protectRoute,(req,res)=>{
    res.status(200).json({success:true, user:req.user})
})


export default router;