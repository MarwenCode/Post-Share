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
userRoute.put("/follow/:id", async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      if (!user.followers.includes(req.body.userId)) {
        await user.updateOne({ $push: { followers: req.body.userId  }  });
        await currentUser.updateOne({ $push: { followings: req.params.id  }  });
        res.status(200).json("user has been followed");
      } else {
        res.status(403).json("you allready follow this user");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("you cant follow yourself");
  }
});

//unfollow a user
userRoute.put("/unfollow/:id", async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      if (user.followers.includes(req.body.userId)) {
        await user.updateOne({ $pull: { followers: req.body.userId } });
        await currentUser.updateOne({ $pull: { followings: req.params.id  } });
        res.status(200).json("user has been unfollowed");
      }
       else {
        res.status(403).json("you dont follow this user");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("you cant unfollow yourself");
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
