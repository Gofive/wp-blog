import Posts from "@/components/posts";
import { Button } from "@/components/ui/button";
import Fuse from "fuse.js";
import { SearchIcon } from "lucide-react";
import searchIndex from "~/blogs/search-index.json";

export default async function Search({ searchParams }) {
  const { q, p = 1, s = 10 } = await searchParams;
  const posts = [];

  // TODO: search by title, tag, content
  if (!!q) {
    const fuse = new Fuse(searchIndex, {
      keys: ["title", "tags", "content"],
    });
    const results = fuse.search(q);
    results.forEach((result) => {
      posts.push(result.item);
    });
  }

  return (
    <div className="max-w-3xl mx-auto">
      <form className="max-w-xl ml-10">
        <div className="relative flex items-center w-full">
          <SearchIcon className="absolute left-3 text-slate-500 dark:text-slate-200" />
          <input
            type="text"
            id="default-search"
            name="q"
            defaultValue={q}
            className=" block w-full py-3 ps-12 pe-28 text-md text-gray-900 border border-gray-300 rounded-full bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="search title \ tag \ content or something else ... "
            required
          />
          <Button type="submit" className="absolute right-5">
            Search
          </Button>
        </div>
        <div className="w-full mt-2 text-right flex justify-between right-0 px-2">
          <span>
            {posts.length > 0 ? ` ${posts.length} results found` : ""}
          </span>
          <span className="text-xs ">
            powered by{" "}
            <a
              className="text-blue-600"
              href="https://fusejs.io/"
              target="_blank"
            >
              fuse.js
            </a>
          </span>
        </div>
      </form>
      <Posts posts={posts} p={p} s={5} search q={q} />
    </div>
  );
}
