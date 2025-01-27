import Posts from "@/components/posts";
import Tags from "@/components/tags";
import { getArticles } from "@/lib/read-md";
import React from "react";

export default async function Article({ searchParams }) {
  const { tag, p, s } = await searchParams;
  const posts = await getArticles(tag);

  return (
    <div className="flex flex-col md:flex-row">
      <Tags tag={tag} />
      <Posts posts={posts} article tag={tag} p={p} s={s} />
    </div>
  );
}
