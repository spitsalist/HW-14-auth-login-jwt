import { Router } from "express";
import { authenticateToken } from "../middleware/authMiddlewares.js";
import { Post } from "../models/auth.js";

export const postRouter = Router();

postRouter.get("/", (req, res) => {
  res.send("get");
});

postRouter.post("/", authenticateToken, async (req, res) => {
  const posts = req.body
  
  if (!posts || posts.length === 0) {
    return res.status(400).json({ message: "No posts provided" });
  }
  try {
    const savedPosts = await Post.insertMany(posts);
    res
      .status(201)
      .json({ message: "Post created succesfully", data: savedPosts });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating posts", error: error.message });
  }
});
