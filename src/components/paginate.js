"use client";

import { useRouter } from "next/navigation";

export const Paginate = ({
  currentPage,
  totalPages,
  article,
  tag,
  search,
  q,
}) => {
  const router = useRouter();
  return (
    <div className="flex items-center justify-center pb-8 pt-6 w-full">
      <nav className="flex text-slate-700 dark:text-slate-100 text-lg">
        <button
          className="disabled:text-gray-400 disabled:cursor-not-allowed cursor-pointer"
          disabled={currentPage <= 1}
          onClick={() => {
            if (search) {
              const searchText = `q=${q}&`;
              router.push(
                `/search?${q ? searchText : ""}p=${Math.max(
                  1,
                  currentPage - 1
                )}`
              );
            } else if (article) {
              const tagText = `tag=${tag}&`;
              router.push(
                `/article?${tag ? tagText : ""}p=${Math.max(
                  1,
                  currentPage - 1
                )}`
              );
            } else {
              router.push(
                `/${tag ? "article" : ""}?p=${Math.max(1, currentPage - 1)}`
              );
            }
          }}
        >
          Prev
        </button>
        <span className="mx-6 font-semibold">
          {currentPage} of {totalPages}
        </span>
        <button
          className="disabled:text-gray-400 disabled:cursor-not-allowed cursor-pointer"
          disabled={currentPage >= totalPages}
          onClick={() => {
            if (search) {
              const searchText = `q=${q}&`;
              router.push(
                `/search?${q ? searchText : ""}p=${Math.min(
                  currentPage + 1,
                  totalPages
                )}`
              );
            } else if (article) {
              const tagText = `tag=${tag}&`;
              router.push(
                `/article?${tag ? tagText : ""}p=${Math.min(
                  currentPage + 1,
                  totalPages
                )}`
              );
            } else {
              router.push(
                `/${tag ? "article" : ""}?p=${Math.min(
                  currentPage + 1,
                  totalPages
                )}`
              );
            }
          }}
        >
          Next
        </button>
      </nav>
    </div>
  );
};
