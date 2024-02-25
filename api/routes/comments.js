import express from "express";
import User from "../models/User.js";
import Post from "../models/Post.js";
import Comment from "../models/Comment.js";
import mongoose from "mongoose";
const commentRoute = express.Router();

//create new comment

// commentRoute.post("/:postId", async (req, res) => {
//   try {
//     const newComment = await new Comment({
//       ...req.body,
//       PostId: req.params.postId,
//     });
//     const savedComment = await newComment.save();

//     res.status(200).json(savedComment);
//   } catch (error) {
//     res.status(500).json(error);
//   }
//   console.log(req.body);
// });

commentRoute.post("/:postId", async (req, res) => {
  try {
    // Fetch the user's username based on userId (assuming you have a User model)
    const user = await User.findById(req.body.userId);
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const newComment = new Comment({
      PostId: req.params.postId,
      username: user.username, 
      userId: req.body.userId,
      text: req.body.text,
    });

    const savedComment = await newComment.save();

    res.status(200).json(savedComment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


//delete a comment
//delete a comment
// routes/comments.js

// commentRoute.delete("/:id", async (req, res) => {
//   try {
//     console.log("Request Body:", req.body); // Log the request body
//     const comment = await Comment.findById(req.params.id);

//     if (comment.userId === req.body.userId) {
//       console.log("Comment User ID:", comment.userId);
//       console.log("Request User ID:", req.body.userId);
      
//       try {
//         await comment.deleteOne();
//         console.log("Comment deleted successfully");
//         res.status(200).json("comment has been deleted");
//       } catch (error) {
//         console.error("Error deleting comment:", error);
//         res.status(500).json(error);
//       }
//     } else {
//       console.log("Unauthorized deletion attempt");
//       res.status(401).json("you can delete only your comment");
//     }
//   } catch (error) {
//     console.error("Error finding comment:", error);
//     res.status(500).json(error);
//   }
// });





commentRoute.delete("/:id", async (req, res) => {
  try {
    console.log("Request Body:", req.body); // Add this line to log the request body
    const comment = await Comment.findById(req.params.id);

    // Temporarily removing the user check
    // if (comment.userId === req.body.userId) {
    try {
      await comment.deleteOne();
      console.log("Comment deleted successfully");
      res.status(200).json("comment has been deleted");
    } catch (error) {
      console.error("Error deleting comment:", error);
      res.status(500).json(error);
    }
    // } else {
    //   console.log("Unauthorized deletion attempt");
    //   res.status(401).json("you can delete only your comment");
    // }
  } catch (error) {
    console.error("Error finding comment:", error);
    res.status(500).json(error);
  }
});


// commentRoute.delete("/:id", async (req, res) => {
//   try {
//     const comment = await Comment.findById(req.params.id);

//     // Check if the current user ID is equal to the comment's user ID
//     if (comment.userId === req.body.userId) {
//       try {
//         await comment.deleteOne();
//         console.log("Comment deleted successfully");
//         res.status(200).json("comment has been deleted");
//       } catch (error) {
//         console.error("Error deleting comment:", error);
//         res.status(500).json(error);
//       }
//     } else {
//       console.log("Unauthorized deletion attempt");
//       res.status(401).json("you can delete only your comment");
//     }
//   } catch (error) {
//     console.error("Error finding comment:", error);
//     res.status(500).json(error);
//   }
// });






// update a comment

// commentRoute.put("/:id", async(req, res) => {
//   try {
//     const comment = await Comment.findById(req.params.id);
//     if (comment.userId === req.body.userId) {
//       try {
//         const updateComment = await Comment.findByIdAndUpdate(
//           req.params.id,
//           {$set: req.body},
//           {new: true}
//         );
//         res.status(200).json(updateComment);
//       } catch (error) {
//         res.status(500).json(error)
        
//       }
//     }else {
//       res.status(401).json("you can edit only your comment")
//     }

//   } catch (error) {
//     res.status(500).json(error);
    
//   }
// })


// Update a comment
commentRoute.put("/:id", async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);

    // Check if the comment exists
    if (!comment) {
      return res.status(404).json("Comment not found");
    }

    // Check if the user is the owner of the comment
    // if (comment.userId !== req.body.userId) {
    //   return res.status(401).json("You can edit only your comment");
    // }

    // Update the comment
    const updatedComment = await Comment.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    res.status(200).json(updatedComment);
  } catch (error) {
    res.status(500).json(error);
  }
});






//get all comments post

commentRoute.get("/:postId", async (req, res) => {
  try {
    const comments = await Comment.find({
      commentId: req.params.postId,
    });

    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json(error);
  }
});


//get a single comment
commentRoute.get("/:postId/:commentId", async(req, res) => {
  try {
    const comment = await Comment.findById({
      commentId:req.params.postId
    });
    res.status(200).json(comment)
    
  } catch (error) {
    res.status(500).json(error);
    
  }
})




export default commentRoute;
