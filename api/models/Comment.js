import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({

    PostId: {
        type: mongoose.Schema.Types.ObjectId,
      },
      username: {
        type: String,
      },
    
      userId: {
        type: String,
      },
      text: {
        type: String,
      },
    
    },
    { timestamps: true,
      toJSON: { getters: true, virtuals: true },
      toObject: { virtuals: true } },


);

export default mongoose.model("Comment", CommentSchema)