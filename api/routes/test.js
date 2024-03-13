// import express from "express";
// import User from "../models/User.js";
// import Post from "../models/Post.js";
// import Comment from "../models/Comment.js";
// import mongoose from "mongoose";
// const commentRoute = express.Router()


// //create new comment

// commentRoute.post("/:postId", async(req, res) => {
   
//     try {
//         const newComment = await new Comment({ ...req.body, PostId: req.params.postId});
//           const savedComment = await newComment.save();
         
//           res.status(200).json(savedComment)
       
          
//       } catch(error) {
//           res.status(500).json(error)
          
//       }
//       console.log(req.body)  
// })

// //delete a comment
// commentRoute.delete("/:id", async(req, res) => {
//   // if( !mongoose.Types.ObjectId.isValid(req.params.id) ) return false;
//   try {
    
//     const comment = await Comment.findById(req.params.id)
//     // const comment = await User.findById(req.params.id)
//      if(comment.userId === req.body.userId)
//      {
//       try {
//         await comment.deleteOne()
//         res.status(200).json("comment has been deleted")
        
//       } catch (error) {
//         res.status(500).json(error)
        
//       }
//      }else {
//       res.status(401).json("you can delete only your comment")
//      }
    
//   } catch (error) {
//     res.status(500).json(error)
    
//   }
// })

// // commentRoute.post("/:postId", async(req, res) => {
// //   try {
// //     return Post.findByIdAndUpdate(
// //       req.params.id,
// //       {$push: {
// //         comment: {
// //           commenterId: req.body.commenterId,
// //           username: req.body.username,
// //           text: req.body.text,
// //           timestamp: new Date().getTime(),
// //         }
// //       }},
// //     {new:true})
    
// //   } catch (error) {
    
// //   }
   
// // })



// //get all comments post 

// // commentRoute.get("/:postId", async (req, res) => {
// //     try {
// //       const comments = await Comment.find({
// //           commentId: req.params.postId
// //       });
  
// //       res.status(200).json(comments);
// //     } catch (error) {
// //       res.status(500).json(error);
// //     }
// //   });
  
  
  
  
  
//   //get comments
  
//   commentRoute.get("/:id", async (req, res) => {
//     try {
//       const comment = await Comment.findById(res.params.id);
  
//       res.status(200).json(comment);
//     } catch (error) {
//       res.status(500).json(error);
//     }
//   });

// //   commentRoute.get("/:id", async(req, res) => {
// //     try {
// //         const comment = await Comment.findById(req.params.id);
// //         if(req.body.id === req.params.id) {
// //          try {
// //           res.status(200).json(comment)
// //         } catch (error) {
// //           res.status(500).json(error)
          
// //       }
          
          
// //          }else {
// //           res.status(401).json("you can get only your comment")
// //          }
          
// //         } catch (error) {
// //             res.status(500).json(error)
            
// //         }


        
  
// // });


// //solution to get one comment
// // commentRoute.get("/onecomment/:id", async(req, res) => {
// //   try {
// //    const user = await User.findById(req.params.id );
// //    const comment = await Comment.find({ userId: user._id })
 
// //    res.status(200).json(comment)
   
// //   } catch (error) {
// //    res.status(500).json(error);
   
// //   }
 
// //  })

// export default commentRoute
