"use client";

import { Article } from "@/types";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import dynamic from "next/dynamic";

const ArticleCard = dynamic(() => import("@/components/article-card"));

interface UserPostsProps {
  posts: Article[];
}

const UserPosts = ({ posts }: UserPostsProps) => {
  if (posts?.length === 0)
    return (
      <div className="flex flex-col justify-center items-center h-1/4 w-1/4">
        <DotLottieReact
          src={"/assets/postsNotFound.lottie"}
          loop
          autoplay
          width={200}
          height={200}
          style={{ width: "250px", height: "250px" }}
        />
        <p className="text-center font-semibold text-xl text-zinc-500">
          No Posts found!
        </p>
      </div>
    );

  return (
    <div className="grid lg:grid-cols-4 sm:grid-cols-1 md:grid-cols-3 gap-5 w-full">
      {posts?.map((post) => <ArticleCard key={post?._id} article={post} />)}
    </div>
  );
};

export default UserPosts;
