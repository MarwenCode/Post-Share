import express from "express";
import Post from "../models/Post.js";
import User from "../models/User.js";
import Comment from "../models/Comment.js";
import Friendprofile from "../models/friendprofile.js"
const profilefriendRoute = express.Router();

//get friend's post

profilefriendRoute.get("/friend/:id", async(req, res) => {
    try {
        const user = await User.findById(req.params.id);
        const posts = await Post.find({ userId: req.params.id})
          .populate("comments")
          .exec();
        res.status(200).json(posts);
      } catch (error) {
        res.status(500).json(error);
      }
})


//get friend's profile
profilefriendRoute.get("/friend/info/:id", async(req, res) => {
  try {
    const friend = await User.findById(req.params.id);
    res.status(200).json(friend)
    
  } catch (error) {
    res.status(500).json(error);
    
  }
})

//get a profile 

profilefriendRoute.get("/friend/:id", async(req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
})

 
export default profilefriendRoute;

