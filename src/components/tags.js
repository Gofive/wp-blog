// 列举所有的tags

import tags from "~/blogs/tags.json";
export default async function Tags({ tag }) {
  return (
    <div className="shrink-0 sticky top-[80px] w-full p-4 mt-10 h-fit flex gap-4 md:w-60 font-semibold text-blue-500 flex-wrap">
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
