// 列举所有的tags

import tags from "~/blogs/tags.json";
export default async function Tags({ tag }) {
  return (
    <div className="bg-white md:max-h-full max-h-[300px] overflow-auto dark:bg-slate-800 shrink-0 sticky top-0 md:top-4 w-full p-4 h-fit flex gap-4 md:w-60 font-semibold text-blue-500 flex-wrap">
      {tags.map((item) => (
        <a
          href={`/article?tag=${item.tag}`}
          key={item.tag}
          className={`${tag === item.tag ? "text-violet-500 font-bold" : ""}`}
        >
          {item.tag}({item.articles.length})
        </a>
      ))}
    </div>
  );
}
