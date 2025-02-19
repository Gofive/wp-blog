import Markdown from "react-markdown";
import { Paginate } from "./paginate";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import dayjs from "dayjs";
import { redirect } from "next/navigation";

dayjs.locale("en");

export default function Posts({
  p = 1,
  s = 10,
  posts,
  article,
  tag,
  search,
  q,
}) {
  // 计算分页数据
  const totalPages = Math.ceil(posts.length / s);

  if (totalPages === 0) {
    return <div className="">No posts found...</div>;
  }

  // 超出分页范围，重定向
  if (p < 1 || p > totalPages) {
    if (search) {
      const searchText = `q=${q}&`;
      redirect(
        `/search?${q ? searchText : ""}p=${Math.max(
          1,
          Math.min(totalPages, p)
        )}`
      );
    } else if (article) {
      const tagText = `tag=${tag}&`;
      redirect(
        `/article?${tag ? tagText : ""}p=${Math.max(
          1,
          Math.min(totalPages, p)
        )}`
      );
    } else {
      redirect(`/?p=${Math.max(1, Math.min(totalPages, p))}`);
    }
  }

  const startIndex = (p - 1) * s;
  const displayedPosts = posts.slice(startIndex, startIndex + s);

  return (
    <div className="p-0 grow-1">
      {displayedPosts.map((post) => (
        <div key={post.slug} className="my-4">
          <article className="markdown-body rounded-lg">
            <h2 className="!border-none">
              <a href={`/blog/${post.slug}`}>{post.title}</a>
            </h2>
            <div className="italic mb-6 text-slate-500 dark:text-slate-200 font-semibold w-full">
              {dayjs(post.date).format("MMM D,YYYY")}
            </div>
            <div className="flex gap-2 mb-4">
              {post.tags.map((tag) => (
                <div
                  key={tag}
                  className="px-2 py-0.5 text-sm bg-violet-500 text-zinc-100 rounded-md  dark:bg-slate-600 dark:text-slate-200"
                >
                  {tag}
                </div>
              ))}
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
      <Paginate
        currentPage={p}
        totalPages={totalPages}
        tag={tag}
        search={search}
        q={q}
        article={article}
      />
    </div>
  );
}
