import { getArticleById } from "@/actions/post";
import { auth } from "@/auth";
import ArticleContent from "@/components/article-content";
import ScrollTriggeredDrawer from "@/components/scroll-trigger-drawer";
import { Article } from "@/types";
import Head from "next/head";
import { redirect } from "next/navigation";

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ articleId: string }>;
}) {
  const session = await auth();
  const { articleId } = await params;
  if (!articleId) {
    return redirect("/not-found");
  }
  // await increaseArticleViews(articleId);
  const article: Article = await getArticleById(articleId);
  console.log("Article:", article);
  if (!article) return redirect("/not-found");
  const isAuthor = session?.user?.id === article?.author?._id;
  const notPublishedAndNotAuthor =
    (article?.approveStatus === "pending" ||
      article?.approveStatus === "rejected") &&
    !isAuthor;
  if (notPublishedAndNotAuthor) return redirect("/not-found");

  const title = article?.title || "Article";
  const subtitle = article?.subtitle || "Read this amazing article.";
  const image = article?.mainImage || "/assets/Images/placeholders/image03.svg";

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={subtitle} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={subtitle} />
        <meta property="og:image" content={article?.mainImage} />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={subtitle} />
        <meta name="twitter:image" content={image} />
      </Head>
      <div className="px-4 py-4 flex-col flex gap-6 justify-around items-center h-full">
        <ScrollTriggeredDrawer />
        <ArticleContent article={article} isAuthor={isAuthor} />
        {/* <ArticleComments articleId={articleId} /> */}
      </div>
    </>
  );
}
