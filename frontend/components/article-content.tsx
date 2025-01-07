import { getArticleTime } from "@/lib/utils";
import { Article } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { UserAvatar } from "./user-button";
import TooltipDialog from "./tooltip-dialog";
import { Badge } from "./ui/badge";

const ArticleContent = ({
  article,
  isAuthor = false,
}: {
  article: Article;
  isAuthor?: boolean;
}) => {
  if (!article) return <p>Loading article...</p>;

  return (
    <div className="flex flex-col gap-6 mx-5 md:mx-20 mt-14">
      {/* Article Title */}
      <h1 className="text-2xl md:text-4xl font-semibold font-sans">
        {article?.title || "Untitled"}
      </h1>

      {/* Article Main Image */}
      {article?.mainImage && (
        <div className="flex items-center gap-2 bg-[#E8E8EA] bg-opacity-65 dark:bg-zinc-900 rounded-md">
          <Image
            src={article?.mainImage}
            alt={article?.title || "Article Image"}
            className="rounded-lg border border-zinc-500 max-h-[500px]"
            width={800}
            height={300}
            layout="responsive"
            objectFit="contain"
            loading="lazy"
          />
        </div>
      )}

      {/* Author and Created Time */}
      <div className="flex items-center justify-between">
        {/* Author Info */}
        <Link
          href={`/user/${article?.author?._id || "#"}`}
          className="flex items-center gap-2"
        >
          <UserAvatar
            src={article?.author?.image}
            initials={article?.author?.name || "NA"}
            className="w-9 h-9"
          />
          <span className="text-sm text-zinc-700 dark:text-zinc-500 text-ellipsis">
            {article?.author?.name || "Unknown Author"}
          </span>
        </Link>

        {isAuthor && (
          <Badge className="text-xs" variant={"outline"}>
            {article?.approveStatus.toUpperCase()}
          </Badge>
        )}
        {article?.createdAt && (
          <span className="text-sm text-zinc-700 dark:text-zinc-500">
            {getArticleTime(article?.createdAt)}
          </span>
        )}
      </div>

      {/* Article Subtitle */}
      {article.subtitle && (
        <h2 className="text-lg font-semibold">{article.subtitle}</h2>
      )}

      {/* Article Content */}
      {/* <div
        className="text-lg text-zinc-800 dark:text-zinc-500"
        dangerouslySetInnerHTML={{
          __html: article.content || "",
        }}
      /> */}
      <TooltipDialog content={article.content} />
    </div>
  );
};

export default ArticleContent;
