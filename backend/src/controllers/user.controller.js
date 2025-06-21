import User from "../models/User.js";
import FriendRequest from "../models/FriendRequest.js";

export async function getRecommendedUsers(req, res) {
  try {
    const currentUserId = req.user.id;
    const currentuser = req.user;

    const RecommendedUsers = await User.find({
      $and: [
        { _id: { $ne: currentUserId } },
        { $id: { $nin: currentuser.friends } },
        { isOnboarded: true },
      ],
    });
    res.status(200).json({ success: true, RecommendedUsers });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function getMyFriends(req, res) {
  try {
    const user = await User.findById(req.user.id)
      .select("friends")
      .populate(
        "friends",
        "fullName profilePic nativeLanguage learningLanguage"
      );

    res.status(200).json(user.friends);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function sendFriendRequest(req, res) {
  try {
    const myId = req.user.id;
    const { id: recipientId } = req.params;
    //prevent sending request to yourself

    if (myId === recipientId) {
      return res
        .status(400)
        .json({ message: "You can't send friend request to yourself" });
    }

    const recipient = await User.findById(recipientId);

    if (!recipient) {
      return res.status(404).json({
        message: "reciepient not found",
      });
    }

    //check if the users are already friends

    if (recipient.friends.includes(myId)) {
      return res
        .status(400)
        .json({ message: "You are already friends with this user" });
    }

    //check if user already exists

    const existingrequest = await FriendRequest.findOne({
      $or: [
        { sender: myId, recipient: recipientId },
        { recipient: myId, sender: recipientId },
      ],
    });

    if (existingrequest) {
      return res.status(400).json({
        message: "A friend request already exist betweeen you and the user!",
      });
    }

    const friendRequest = await FriendRequest.create({
      sender: myId,
      recipient: recipientId,
    });

    res.status(201).json(friendRequest);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function acceptFriendRequest(req, res) {
  try {
    const { id: requestId } = req.params;
    const friendRequest = await FriendRequest.findById(requestId);

    if (!friendRequest) {
      return res
        .status(403)
        .json({ message: "you are not authorized to accept this request" });
    }

    //verify that the current user is the recipient

    if (friendRequest.recipient.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: "You are not authorized to accept this request" });
    }

    friendRequest.status = "accepted";
    await friendRequest.save();

    // add each user to others friends array

    await User.findByIdAndUpdate(friendRequest.sender, {
      $addToSet: { friends: friendRequest.recipient },
    });

    await User.findByIdAndUpdate(friendRequest.recipient, {
      $addToSet: { friends: friendRequest.sender },
    });

    res.status(200).json({ message: "friend request is accepted" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function getFriendRequest(req, res) {
  try {
    const incomingrequest = await FriendRequest.find({
      recipient: req.user.id,
      status: "pending",
    }).populate(
      "sender",
      "fullName profilePic nativeLanguage learningLanguage"
    );

    const acceptrequest = await FriendRequest.find({
      sender: req.user.id,
      status: "accepted",
    }).populate("recipient", "fullName profilePic");

    res.status(200).json({ incomingrequest, acceptrequest });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
}


export async function getoutgoingRequest(req, res) {
   try {
    const Outgoing = await FriendRequest.find({
        sender: req.user.id,
        status: "pending",
    }).populate("recipient", "fullName profilePic nativeLanguage learningLanguage")

    res.status(200).json(Outgoing);
    
   } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
   }
}

