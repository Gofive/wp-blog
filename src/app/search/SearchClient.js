"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { Paginate } from "@/components/paginate";
import { Button } from "@/components/ui/button";
import Fuse from "fuse.js";
import { SearchIcon } from "lucide-react";
import searchIndex from "~/blogs/search-index";
import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import dayjs from "dayjs";
import Link from "next/link";

dayjs.locale("en");

function PostList({ posts, page, pageSize, onPageChange }) {
  const postsArray = Array.isArray(posts) ? posts : [];
  const totalPages = Math.ceil(postsArray.length / pageSize);

  if (totalPages === 0) {
    return <div className="">No posts found...</div>;
  }

  const startIndex = (page - 1) * pageSize;
  const displayedPosts = postsArray.slice(startIndex, startIndex + pageSize);

  return (
    <div className="px-2 md:px-4 py-6 grow-1 max-w-4xl mx-auto">
      {displayedPosts.map((post) => (
        <div key={post.slug} className="my-6">
          <article className="markdown-body rounded-lg p-6 bg-white dark:bg-slate-800 shadow-sm border border-gray-200 dark:border-slate-700">
            <h2 className="!border-none">
              <Link href={`/blog/${encodeURIComponent(post.slug)}`}>
                {post.title}
              </Link>
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
            <Link href={`/blog/${encodeURIComponent(post.slug)}`}>
              Read more →
            </Link>
          </article>
        </div>
      ))}
      <Paginate
        currentPage={page}
        totalPages={totalPages}
        search
        q=""
        onPageChange={(newPage) => {
          onPageChange(newPage);
          const mainContent = document.getElementById("main-content");
          if (mainContent) {
            mainContent.scrollTo({ top: 0, behavior: "smooth" });
          }
        }}
      />
    </div>
  );
}

export default function SearchClient({ initialQuery = "" }) {
  const [query, setQuery] = useState(initialQuery);
  const [page, setPage] = useState(1);
  const [posts, setPosts] = useState(
    initialQuery ? searchPosts(initialQuery) : []
  );
  const debounceTimer = useRef(null);

  const searchPosts = useCallback((query) => {
    const fuse = new Fuse(searchIndex, {
      keys: ["title", "tags", "content"],
    });
    const results = fuse.search(query);
    return results.map((result) => result.item);
  }, []);

  const debouncedSearch = useCallback(
    (searchQuery) => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }

      debounceTimer.current = setTimeout(() => {
        if (searchQuery.trim()) {
          const results = searchPosts(searchQuery);
          setPosts(results);
          setPage(1);
        } else {
          setPosts([]);
          setPage(1);
        }
      }, 300);
    },
    [searchPosts]
  );

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    debouncedSearch(value);
  };

  function handleSearch(e) {
    e.preventDefault();
    if (query.trim()) {
      const results = searchPosts(query);
      setPosts(results);
      setPage(1);
    }
  }

  // 清理定时器
  useEffect(() => {
    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, []);

  return (
    <div className="max-w-3xl md:mx-auto">
      <div className="w-full top-0 sticky flex bg-white/95 dark:bg-slate-800/95 z-20">
        <form
          className="max-w-xl w-full z-10 py-4 backdrop-blur-sm border-gray-200 dark:border-slate-700"
          onSubmit={handleSearch}
        >
          <div className="relative flex items-center w-full">
            <SearchIcon className="absolute left-3 text-slate-500 dark:text-slate-200" />
            <input
              type="text"
              id="default-search"
              name="q"
              value={query}
              onChange={handleInputChange}
              className=" block w-full py-3 ps-12 pe-28 text-md text-gray-900 border border-gray-300 rounded-full bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="title/tag/content or something else ... "
            />
          </div>
          <div className="w-full mt-2 text-right flex justify-between right-0 px-2 h-5">
            <span className="text-xs">
              {posts.length > 0 ? `${posts.length} results found` : "\u00A0"}
            </span>
            <span className="text-xs">
              powered by{" "}
              <a
                className="text-blue-600"
                href="https://fusejs.io/"
                target="_blank"
                rel="noopener noreferrer"
              >
                fuse.js
              </a>
            </span>
          </div>
        </form>
      </div>

      <PostList posts={posts} page={page} pageSize={5} onPageChange={setPage} />
    </div>
  );
}
