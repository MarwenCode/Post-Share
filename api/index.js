import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import multer from "multer";
import path from "path";
import authRoute from "./routes/auth.js";
import userRoute from "./routes/users.js";
import postRoute from "./routes/posts.js";
import commentRoute from "./routes/comments.js";
import conversationRoute from "./routes/conversation.js";
import messageRoute from "./routes/message.js";
import profilefriendRoute from "./routes/friendsprofile.js";
import { fileURLToPath } from "url";
import cors from "cors";

import cloudinary from "cloudinary";
// const cloudinary = require('cloudinary').v2

cloudinary.config({
  cloud_name: "djzv6xzgd",
  api_key: "388734543329589",
  api_secret: "diIBcaMWqEu5LA91weAU7nS76lE",
});

dotenv.config();

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);
console.log("images", __dirname);

const app = express();
dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("connected to mongoDB");
  } catch (error) {
    throw error;
  }
};

//upload pic
app.use("/images", express.static(path.join(__dirname, "/images")));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage });



app.post("/api/upload", upload.single("file"), (req, res) => {
  console.error(req.file);
  console.error(req.body);

  res.status(200).json("File has been uploaded");
});




app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});


app.use(cors({
  origin: "*"
}));

// Logging middleware
app.use((req, res, next) => {
  console.log("Request URL:", req.originalUrl);
  console.log("Request Method:", req.method);
  console.log("Request Body:", req.body);
  next();
});



//routes 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/post", postRoute);
app.use("/api/conversation", conversationRoute);
app.use("/api/message", messageRoute);
app.use("/api/comments", commentRoute);
app.use("/api/profile", profilefriendRoute);



// Add Access Control Allow Origin headers


app.use(express.static(path.join(__dirname, "../client/build")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build/index.html"));
});

app.get("/", (req, res) => {
  res.send("hello to media-app API");
});

app.listen(5500, () => {
  connect();
  console.log("connected to backend");
});
