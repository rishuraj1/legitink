import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import { v4 } from "uuid";

import connectDB from "./utils/db.js";
const PORT = process.env.PORT || 5000;

import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import dictionaryRoutes from "./routes/dictionaryRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/posts", postRoutes);
app.use("/api/v1/upload-to-s3", uploadRoutes);
app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/dictionary", dictionaryRoutes);

app.get("/", (req, res) => {
  res.send("LegalInk API");
});

app.listen(PORT, async (req, res) => {
  await connectDB();
  console.log(`Server running on port ${PORT}`);
});
