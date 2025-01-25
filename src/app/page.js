import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import dayjs from "dayjs";
import posts from "~/blogs/search-index.json";
import { Paginate } from "@/components/paginate";
import { redirect } from "next/navigation";

dayjs.locale("en");

export default async function Home({ searchParams }) {
  const { p = 1, s = 10 } = await searchParams;

  // 计算分页数据
  const totalPages = Math.ceil(posts.length / s);

  // 超出分页范围，重定向
  if (p < 1 || p > totalPages) {
    redirect(`/?p=${Math.max(1, Math.min(totalPages, p))}`);
  }

  const startIndex = (p - 1) * s;
  const displayedPosts = posts.slice(startIndex, startIndex + s);

  return (
    <div className="p-8 bg-slate-100 dark:bg-slate-700">
      {displayedPosts.map((post) => (
        <div key={post.slug} className=" my-4">
          <article className="markdown-body">
            <h2 className="!border-none">
              <a href={`/blog/${post.slug}`}>{post.title}</a>
            </h2>
            <div className="italic mb-6 text-slate-500 dark:text-slate-200 font-semibold w-full">
              {dayjs(post.date).format("MMM D,YYYY")}
            </div>
            <Markdown
              rehypePlugins={[rehypeRaw]}
              remarkPlugins={[[remarkGfm, { singleTilde: false }]]}
            >
              {post.summary}
            </Markdown>
            <a href={`/blog/${post.slug}`}>Read more →</a>
          </article>
        </div>
      ))}
      <Paginate currentPage={p} totalPages={totalPages} />
    </div>
  );
}
