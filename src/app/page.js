import dayjs from "dayjs";
import Posts from "@/components/posts";
import { getArticles } from "@/lib/read-md";

export default async function Home({ searchParams }) {
  const { p = 1, s = 10 } = await searchParams;
  const posts = await getArticles();

  return <Posts p={p} s={s} posts={posts} />;
}
