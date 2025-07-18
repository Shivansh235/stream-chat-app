import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import {getRecommendedUsers,getMyFriends,sendFriendRequest,acceptFriendRequest,getFriendRequest,getoutgoingRequest} from "../controllers/user.controller.js";

const router = express.Router();

// apply this middleware to all the routes

router.use(protectRoute);  

router.get("/", getRecommendedUsers)
router.get("/friends", getMyFriends)
router.post("/friend-request/:id",sendFriendRequest)
router.put("/friend-request/:id/accept",acceptFriendRequest)
router.get("/friend-request",getFriendRequest)//this is for when you open notification page all the pending request for friendship will show there.
router.get("/outgoing-get-request",getoutgoingRequest)



export default router;
