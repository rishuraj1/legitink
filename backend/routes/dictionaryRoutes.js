import express from "express";

import { getDictionary } from "../controllers/dictionaryController.js";

const router = express.Router();

router.get("/", getDictionary);

export default router;
