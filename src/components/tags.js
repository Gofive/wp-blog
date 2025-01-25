// 列举所有的tags

import tags from "~/blogs/tags.json";

export default function Tags() {
  return (
    <div className="p-4 mt-10 mx-8 bg-slate-100 shadow-md flex gap-4 w-60 font-semibold text-violet-500 flex-wrap">
      {tags.map((item) => (
        <div key={item.tag} className="">
          {item.tag}({item.articles.length})
        </div>
      ))}
    </div>
  );
}
