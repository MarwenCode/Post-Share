import express from "express";
import User from "../models/User.js";
const userRoute = express.Router();

//update user
userRoute.put("/:id", async (req, res) => {
  if (req.body.userId === req.params.id) {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(401).json("You can update only your account !");
  }
});

//delete user
userRoute.delete("/:id", async (req, res) => {
  if (req.body.userId === req.params.id) {
    try {
      const userDeleted = await User.findByIdAndDelete(req.params.id);
      res.status(200).json({
        userDeleted,
        message: "user has been deleted",
      });
    } catch (error) {
      res.status(500).json(error);
    }
  }
});

//get a user
userRoute.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
});






userRoute.get("/", async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
      } catch (error) {
        res.status(500).json(error);
      }
  });



// follow a user
// follow a user
// follow a user
userRoute.put("/follow/:id", async (req, res) => {
  const userIdToFollow = req.params.id;
  console.log("User ID to follow/follow:", userIdToFollow);
  console.log("Request Body:", req.body); // Log the request body

  if (req.body.userId !== userIdToFollow) {
    try {
      const user = await User.findById(userIdToFollow);
      console.log("User found:", user); // Log the user

      const currentUser = await User.findById(req.body.userId);
      console.log("Current user found:", currentUser); // Log the current user

      if (!user) {
        console.log("User not found");
        return res.status(404).json("User not found");
      }

      if (!currentUser) {
        console.log("Current user not found. req.body.userId:", req.body.userId);
        return res.status(404).json("Current user not found");
      }

      if (!user.followers.includes(req.body.userId)) {
        await user.updateOne({ $push: { followers: req.body.userId } });
        await currentUser.updateOne({ $push: { followings: userIdToFollow } });
        return res.status(200).json("User has been followed");
      } else {
        return res.status(403).json("You already follow this user");
      }
    } catch (err) {
      console.error(err);
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json("You can't follow yourself");
  }
});


// unfollow a user
userRoute.put("/unfollow/:id", async (req, res) => {
  const userIdToUnfollow = req.params.id;
  console.log("User ID to unfollow/unfollow:", userIdToUnfollow);
  console.log("Request Body:", req.body); // Log the request body

  if (req.body.userId !== userIdToUnfollow) {
    try {
      const user = await User.findById(userIdToUnfollow);
      const currentUser = await User.findById(req.body.userId);

      if (!user) {
        console.log("User not found");
        return res.status(404).json("User not found");
      }

      if (user.followers.includes(req.body.userId)) {
        await user.updateOne({ $pull: { followers: req.body.userId } });
        await currentUser.updateOne({ $pull: { followings: userIdToUnfollow } });
        return res.status(200).json("User has been unfollowed");
      } else {
        return res.status(403).json("You don't follow this user");
      }
    } catch (err) {
      console.error(err);
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json("You can't unfollow yourself");
  }
});


//get friends
userRoute.get("/friends/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    const friends = await Promise.all(
      user.followers.map((friendId) => {
        return User.findById(friendId);
      })
    );
    let friendList = [];
    friends.map((friend) => {
      const { _id, username, profilePicture } = friend;
      friendList.push({ _id, username, profilePicture });
    });
    res.status(200).json(friendList);
  } catch (error) {
    res.status(500).json(error);
  }
});

export default userRoute;
