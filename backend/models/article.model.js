import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  isbn: {
    type: String,
  },
});

const articleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    images: [String],
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    content: {
      type: String,
      required: true,
    },
    views: {
      type: Number,
      default: 0,
    },
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
    highlightedWords: [
      {
        word: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Dictionary",
        },
      },
    ],
    status: {
      type: String,
      default: "draft",
      enum: ["draft", "pending", "published"],
    },
    approveStatus: {
      type: String,
      default: "pending",
      enum: ["approved", "pending", "rejected"],
    },
    approvedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    mainImage: {
      type: String,
    },
    bibliography: {
      books: {
        type: [bookSchema],
        default: [],
      },
      urls: {
        type: [String],
        default: [],
      },
    },
  },
  { timestamps: true },
);

export const Article =
  mongoose.models?.Article || mongoose.model("Article", articleSchema);
