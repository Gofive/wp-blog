import Posts from "@/components/posts";
import Tags from "@/components/tags";
import { getArticles } from "@/lib/read-md";
import React from "react";

export default async function Article({ searchParams }) {
  const { tag, p, s } = await searchParams;
  const posts = await getArticles(tag);

  return (
    <div className="flex bg-slate-100 dark:bg-slate-700">
      <Tags tag={tag} />
      <Posts posts={posts} tag={tag} p={p} s={s} />
    </div>
  );
}
