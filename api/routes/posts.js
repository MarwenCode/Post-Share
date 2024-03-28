import express from "express";
import Post from "../models/Post.js";
import User from "../models/User.js";
import Comment from "../models/Comment.js";
const postRoute = express.Router();


import multer from 'multer';

// Assuming you've already configured Cloudinary
const upload = multer({ dest: 'images/' }); // Set the destination folder as needed


postRoute.post("/", upload.single("file"), async (req, res) => {
  try {
    console.log("Request received to add a new post:", req.body);

    // Create a new post object
    const newPost = new Post({
      desc: req.body.desc,
      userId: req.body.userId,
      username: req.body.username,
    });

    console.log(newPost)

    // Check if a file is provided
    if (req.file) {
      // Access the file details
      const { originalname, filename } = req.file;

      // Add the image details to the post object
      newPost.img = filename; // Save the file name or use Cloudinary here
    }

    const post = await newPost.save();

    console.log("Post added successfully!");
    res.status(200).json(post);
  } catch (error) {
    console.error("Error adding post:", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



//update a post
// Update a post (without checking userId)
postRoute.put("/:id", async (req, res) => {
  try {
    const updatePost = await Post.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatePost);
  } catch (error) {
    res.status(500).json(error);
  }
});


// delete a post
postRoute.delete("/:id", async (req, res) => {
  console.log("Request Params:", req.params);
  const post = await Post.findById(req.params.id);
  try {
    await post.deleteOne();
    console.log("Post deleted successfully");
    res.status(200).json("Post has been deleted");
  } catch (error) {
    console.error("Error deleting post:", error);
    res.status(500).json(error);
  }
});


//like && dislike a post
postRoute.put("/:id/like", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post.likes.includes(req.body.userId)) {
      await post.updateOne({ $push: { likes: req.body.userId } });
      res.status(200).json("the post has been liked");
    } else {
      await post.updateOne({ $pull: { likes: req.body.userId } });
      res.status(200).json("the post has been disliked");
    }
  } catch (error) {
    res.status(500).json(err);
  }
});

//get a post
postRoute.get("/:id", async (req, res) => {
  try {
    const posts = await Post.findById(req.params.id)
      .populate("comments")
      .exec();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json(error);
  }
});

//get all posts
postRoute.get("/", async (req, res) => {
  try {
    const posts = await Post.find(req.body).populate("comments").exec();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json(error);
  }
});

//get my own posts

postRoute.get("/myposts/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const posts = await Post.find({ userId: user._id })
      .populate("comments")
      .exec();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json(error);
  }
});

//get all posts

postRoute.get("/", async (req, res) => {
  try {
    await User.find();
    const post = await Post.find().populate("comments").exec();
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json(error);
  }
});

export default postRoute;
