import { getArticleById, increaseArticleViews } from "@/actions/post";
import { auth } from "@/auth";
import ArticleContent from "@/components/article-content";
import ScrollTriggeredDrawer from "@/components/scroll-trigger-drawer";
import { Article } from "@/types";
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
  await increaseArticleViews(articleId);

  const article: Article = await getArticleById(articleId);
  console.log("Article:", article);
  if (!article) return redirect("/not-found");
  const isAuthor = session?.user?.id === article?.author?._id;
  return (
    <div className="px-4 py-4 flex-col flex gap-6 justify-around items-center h-full">
      <ScrollTriggeredDrawer />
      <ArticleContent article={article} isAuthor={isAuthor} />
      {/* <ArticleComments articleId={articleId} /> */}
    </div>
  );
}
