import { Article } from "../models/article.model.js";
import { User } from "../models/user.model.js";

const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.create({ name, email, password });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getArticlesByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    const articles = await Article.find({ author: userId })
      .populate("author")
      .sort({ createdAt: -1 });

    if (!articles) {
      return res.status(404).json({ message: "Articles not found" });
    }

    res.status(200).json(articles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { createUser, getUserById, getArticlesByUserId };
