import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { authRouter } from "./routes/authRoute.js";
import { postRouter } from "./routes/postRoute.js";

dotenv.config({ path: ".env" });
const port = 4001;
const app = express();
app.use(express.json());
app.use("/auth", authRouter);
app.use("/posts", postRouter);

const uri = process.env.MONGO_URI;

mongoose
  .connect(uri, {})
  .then(() => {
    app.listen(port, async () => {
      console.log(`Server is running on ${port}`);
    });
  })
  .catch((error) => {
    console.log("Mongoose connection error", error);
  });
