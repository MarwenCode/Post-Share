import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";

import authRoute from "./routes/auth.js";
import userRoute from "./routes/users.js";
import postRoute from "./routes/posts.js";
import commentRoute from "./routes/comments.js";
import conversationRoute from "./routes/conversation.js";
import messageRoute from "./routes/message.js";
import profilefriendRoute from "./routes/friendsprofile.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log("images", __dirname);

const app = express();

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
app.use("/images", express.static(path.join(__dirname, "images")));

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
  res.status(200).json("File has been uploaded");
});

// Set up CORS middleware
app.use(cors({ origin: "*" }));

// Logging middleware (optional)
app.use((req, res, next) => {
  console.log("Request URL:", req.originalUrl);
  console.log("Request Method:", req.method);
  console.log("Request Body:", req.body);
  next();
});

// Routes
app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/post", postRoute);
app.use("/api/conversation", conversationRoute);
app.use("/api/message", messageRoute);
app.use("/api/comments", commentRoute);
app.use("/api/profile", profilefriendRoute);

// Default route
app.get("/", (req, res) => {
  res.send("Hello to media-app API");
});

// Start the server
app.listen(5500, () => {
  connect();
  console.log("Connected to backend. Server is running on port 5500");
});
