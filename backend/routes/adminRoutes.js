import express from "express";
import { uploadDictionaryWords } from "../controllers/adminController.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Admin route");
});

router.post("/upload-words", uploadDictionaryWords);

export default router;
