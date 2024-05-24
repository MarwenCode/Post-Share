import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({

    userId: {
        type: String,
        required: true,
      },
    username: {
        type: String,
        required: true,
      },
      desc: {
        type: String,
        max: 500,
      },
      img: {
        type: String,
        required: false,
      },
      likes: {
        type: Array,
        default: [],
      },
  

}, { timestamps: true,
    toJSON: { getters: true, virtuals: true },
    toObject: { virtuals: true } }

);

PostSchema.virtual("comments", {
    ref: "Comment",
    localField: "_id",
    foreignField: "PostId",
    justOne: false
  });

  export default mongoose.model("Post", PostSchema)