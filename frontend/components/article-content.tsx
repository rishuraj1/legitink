import { Badge } from "@/components/ui/badge";
import { getArticleTime } from "@/lib/utils";
import { Article } from "@/types";
import { Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import RenderAuthorProfile from "./author-profile-display";
import ShareArticle from "./share-article";
import ShowBibliography from "./show-bibliography";
import TooltipDialog from "./tooltip-dialog";
import { UserAvatar } from "./user-button";

const ArticleContent = ({
  article,
  isAuthor = false,
}: {
  article: Article;
  isAuthor?: boolean;
}) => {
  if (!article) return <p>Loading article...</p>;

  return (
    <div className="flex flex-col gap-6 mx-5 md:mx-20 mt-14 md:min-w-[70%]">
      {/* Article Title */}
      <h1 className="text-2xl md:text-4xl font-semibold font-sans">
        {article?.title || "Untitled"}
        {"  "}
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
      <div className="flex flex-col items-start pt-3 md:flex-row justify-between gap-4 sm:flex-col">
        {/* Author Info */}
        <div className="flex flex-col items-start gap-4">
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
          <RenderAuthorProfile authorProfile={article?.authorProfile} />
        </div>
        <div className="flex items-start gap-2">
          <div className="w-full">
            <div className="text-sm text-zinc-700 flex gap-2 items-center justify-between dark:text-zinc-500">
              <span className="text-xs flex gap-1 items-center">
                <Clock size={16} className="dark:text-zinc-300 text-xs" />
                {getArticleTime(article.updatedAt)}
              </span>
              {isAuthor && (
                <div className="inline-block">
                  {article?.approveStatus === "pending" && (
                    <Badge variant="outline">
                      <span className="text-xs text-zinc-700 dark:text-zinc-300">
                        {article?.approveStatus
                          ? article.approveStatus.charAt(0).toUpperCase() +
                            article.approveStatus.slice(1)
                          : ""}
                      </span>
                    </Badge>
                  )}
                  {article?.approveStatus === "approved" && (
                    <Badge variant="secondary">
                      <span className="text-xs text-zinc-700 dark:text-zinc-300">
                        {article?.approveStatus
                          ? article.approveStatus.charAt(0).toUpperCase() +
                            article.approveStatus.slice(1)
                          : ""}
                      </span>
                    </Badge>
                  )}
                  {article?.approveStatus === "rejected" && (
                    <Badge variant="destructive">
                      <span className="text-xs text-zinc-200 dark:text-zinc-300">
                        {article?.approveStatus
                          ? article.approveStatus.charAt(0).toUpperCase() +
                            article.approveStatus.slice(1)
                          : ""}
                      </span>
                    </Badge>
                  )}
                </div>
              )}
            </div>
            <div className="mt-2 w-full">
              <ShareArticle article={article} />
            </div>
          </div>
        </div>
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
      <ShowBibliography bibliography={article.bibliography} />
    </div>
  );
};

export default ArticleContent;
