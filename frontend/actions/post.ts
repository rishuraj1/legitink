"use server";

import axios from "axios";

import { auth } from "@/auth";
import { Bibliography, CurrProfile } from "@/types";
// import connectDb from "@/lib/db";
// import { s3Client } from "@/lib/aws";

// import { Article } from "@/models/article.model";
// import { User } from "@/models/user.model";
// import { Article as articles } from "@/types";
// import { PutObjectCommand } from "@aws-sdk/client-s3";

const baseAPIUrl = process.env.NEXT_PUBLIC_API_URL! || "http://localhost:5000";

interface NewArticleProps {
  title: string;
  subtitle: string;
  content: string;
  mainImage?: File | null;
  bibliography: Bibliography;
  authorProfile: CurrProfile | null;
}

const createNewArticle = async ({
  title,
  subtitle,
  content,
  mainImage,
  bibliography,
  authorProfile,
}: NewArticleProps) => {
  try {
    const user = await auth();
    if (!user) {
      throw new Error("You need to be logged in to create a post");
    }

    if (
      !title ||
      !subtitle ||
      !content ||
      content === "<p></p>" ||
      (!bibliography?.urls?.length && !bibliography?.books?.length) ||
      !authorProfile
    ) {
      throw new Error("All fields are required");
    }

    const userId = user?.user?.id;
    console.log("User ID:", userId);

    let mainImageUrl = "";
    if (mainImage) {
      mainImageUrl = await uploadArticleImageToS3(mainImage);
      console.log("Main image uploaded to S3:", mainImageUrl);
    }

    const data = {
      title,
      subtitle,
      content,
      mainImageUrl,
      userId,
      bibliography,
      authorProfile,
    };

    const response = await axios.post(
      `${baseAPIUrl}/api/v1/posts/create-post`,
      JSON.stringify(data),
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    console.log("Article saved successfully:", response.data);
    return null;
  } catch (error) {
    const err = error as Error;
    console.error("Error creating article:", err.message);
    return err.message;
  }
};

const getPostsByUserId = async (userId: string) => {
  try {
    if (!userId) {
      throw new Error("User ID is required");
    }

    const posts = await axios.get(
      `${baseAPIUrl}/api/v1/users/${userId}/articles`,
    );
    return posts.data;
  } catch (error) {
    const err = error as Error;
    console.error("Error fetching posts:", err.message);
    return err.message;
  }
};

const getArticleById = async (articleId: string) => {
  try {
    if (!articleId) {
      throw new Error("Article ID is required");
    }
    const article = await axios.get(`${baseAPIUrl}/api/v1/posts/${articleId}`);
    return article?.data;
  } catch (error) {
    const err = error as Error;
    console.error("Error fetching article:", err.message);
    return err.message;
  }
};

// const getCommentsLikesByArticleId = async (articleId: string) => {
//   try {
//     if (!articleId) {
//       throw new Error("Article ID is required");
//     }
//     await connectDb();
//     const article = await Article.findById(articleId).populate("likes");
//     return article;
//   } catch (error) {
//     const err = error as Error;
//     console.error("Error fetching article:", err.message);
//     return err.message;
//   }
// };

// const getAllArticles = async (): Promise<articles[] | null> => {
//   try {
//     await connectDb();
//     const articles = await Article.find()
//       .populate("author")
//       .sort({ createdAt: -1 });
//     return articles;
//   } catch (error) {
//     const err = error as Error;
//     console.error("Error fetching articles:", err.message);
//     return null;
//   }
// };

// const getAllPublishedArticles = async (): Promise<articles[] | null> => {
//   try {
//     await connectDb();
//     const articles = await Article.find({
//       status: "published",
//       approveStatus: "approved",
//     })
//       .populate("author")
//       .sort({ createdAt: -1 });
//     return articles;
//   } catch (error) {
//     const err = error as Error;
//     console.error("Error fetching published articles:", err.message);
//     return null;
//   }
// };

const increaseArticleViews = async (articleId: string) => {
  try {
    if (!articleId) {
      throw new Error("Article ID is required");
    }
    await axios.put(`${baseAPIUrl}/api/v1/posts/${articleId}/increase-views`);
  } catch (error) {
    const err = error as Error;
    console.error("Error increasing article views:", err.message);
    return err.message;
  }
};

const uploadArticleImageToS3 = async (
  file: File,
  fileName?: string,
): Promise<string> => {
  try {
    console.log("Uploading image to S3...");
    const formData = new FormData();
    formData.append("file", file);
    if (fileName) formData.append("fileName", fileName);

    console.log("Uploading image to S3...", formData);

    const response = await axios.post(
      `${baseAPIUrl}/api/v1/upload-to-s3`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
    console.log("Image uploaded to S3:", response.data.s3Url);
    return response.data.s3Url;
  } catch (err) {
    console.error("Error uploading to S3:", err);
    throw err;
  }
};

export {
  createNewArticle,
  getPostsByUserId,
  getArticleById,
  //   getCommentsLikesByArticleId,
  //   getAllArticles,
  increaseArticleViews,
  uploadArticleImageToS3,
  //   getAllPublishedArticles,
};
