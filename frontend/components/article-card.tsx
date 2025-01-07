"use client";

import { Article } from "@/types";
import Image from "next/image";

import { getArticleTime } from "@/lib/utils";
import Link from "next/link";
import { Avatar, AvatarImage } from "./ui/avatar";

import {
  image01,
  image02,
  image03,
  image04,
  image05,
} from "../public/assets/Images/index";
import { useEffect, useState } from "react";

interface ArticleCardProps {
  article: Article;
}

const ArticleCard = ({ article }: ArticleCardProps) => {
  console.log("article", article);
  const [randomImage, setRandomImage] = useState<string | null>(null);

  useEffect(() => {
    const images = [image01, image02, image03, image04, image05];
    setRandomImage(images[Math.floor(Math.random() * images.length)]);
  }, []);

  const imageSrc = article?.mainImage || randomImage || null;

  return (
    <div className="flex flex-col gap-2 justify-between p-2 items-center max-w-full md:w-[392px] md:max-h-[488px] h-full border dark:border-zinc-800 border-zinc-800/20 rounded-md shadow-sm">
      <div className="flex items-center justify-center w-full h-2/3 border rounded-md dark:bg-zinc-300/10 bg-zinc-300/90">
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt="Article Image"
            width={400}
            height={200}
            className="w-full max-w-[360px] max-h-[240px] h-full rounded-md"
          />
        ) : null}
      </div>
      <div className="w-full h-1/3 max-w-[360px] max-h-[200px] gap-3 flex flex-col justify-between">
        <div className="w-full text-justify flex flex-col gap-1">
          <Link href={`/articles/${article?._id}`}>
            <h3 className="text-lg font-semibold dark:text-zinc-300/80 dark:hover:text-zinc-300/100 text-zinc-800/90 hover:text-zinc-800/100 duration-300 ease-in-out">
              {article?.title}
            </h3>
          </Link>
        </div>
        <div className="flex justify-between w-full items-end">
          <Link
            href={`/user/${article?.author?._id}`}
            className="flex gap-1 items-end justify-end"
          >
            <Avatar className="w-8 h-8">
              <AvatarImage
                src={article?.author?.image}
                alt={article?.author?.name}
              />
            </Avatar>
            <span className="font-light text-sm text-zinc-600">
              {article?.author?.name}
            </span>
          </Link>
          <div className="flex gap-4 items-end justify-end">
            <span className="font-light text-sm text-zinc-600">
              {getArticleTime(article?.createdAt)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;
