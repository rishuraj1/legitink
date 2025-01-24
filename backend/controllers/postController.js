import { Article } from "../models/article.model.js";
import { Dictionary } from "../models/dictionary.model.js";

const getPostsByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    const posts = await Article.find({ author: userId })
      .sort({ createdAt: -1 })
      .populate("author");

    if (!posts) {
      return res.status(404).json({ message: "Posts not found" });
    }

    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createNewArticle = async (req, res) => {
  try {
    console.log(req.body);
    const {
      title,
      subtitle,
      content,
      mainImageUrl,
      userId,
      bibliography,
      authorProfile,
    } = req.body;
    if (
      !title ||
      !subtitle ||
      !content ||
      !userId ||
      (!bibliography?.urls?.length && !bibliography?.books?.length) ||
      !authorProfile
    ) {
      return res.status(400).json({ message: "Please fill in all fields" });
    }

    const profile = { ...authorProfile, userId };

    await Article.create({
      title: title,
      subtitle: subtitle,
      content: content,
      mainImage: mainImageUrl || "",
      author: userId,
      bibliography,
      authorProfile: profile,
    });

    res.status(201).json({ message: "Article created successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

const getArticleByArticleId = async (req, res) => {
  try {
    const { articleId } = req.params;
    const article = await Article.findById(articleId).populate("author");
    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }

    res.status(200).json(article);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const incrementArticleViews = async (req, res) => {
  try {
    const { articleId } = req.params;
    const article = await Article.findById(articleId);
    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }

    article.views += 1;
    await article.save();

    res.status(200).json({ message: "Article views incremented" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const incrementShareCount = async (req, res) => {
  try {
    const { articleId } = req.params;
    const article = await Article.findById(articleId);
    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }

    article.shares += 1;
    await article.save();

    res.status(200).json({ message: "Article shares incremented" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getDictionary = async (req, res) => {
  try {
    const dictionary = await Dictionary.find();
    res.status(200).json(dictionary);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export {
  getPostsByUserId,
  createNewArticle,
  getArticleByArticleId,
  incrementArticleViews,
  getDictionary,
};
