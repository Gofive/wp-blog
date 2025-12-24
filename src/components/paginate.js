"use client";

import { useRouter } from "next/navigation";

export const Paginate = ({
  currentPage,
  totalPages,
  article,
  tag,
  search,
  q,
  onPageChange,
}) => {
  const router = useRouter();

  const handlePageChange = (newPage) => {
    if (onPageChange) {
      onPageChange(newPage);
      const mainContent = document.getElementById('main-content');
      if (mainContent) {
        mainContent.scrollTo({ top: 0, behavior: 'smooth' });
      }
      return;
    }

    if (search) {
      const searchText = `q=${q}&`;
      router.push(`/search?${q ? searchText : ""}p=${newPage}`);
    } else if (article) {
      const tagText = `tag=${tag}&`;
      router.push(`/article?${tag ? tagText : ""}p=${newPage}`);
    } else {
      router.push(`/?p=${newPage}`);
    }
  };

  return (
    <div className="flex items-center justify-center pb-8 pt-6 w-full">
      <nav className="flex text-slate-700 dark:text-slate-100 text-lg">
        <button
          className="disabled:text-gray-400 disabled:cursor-not-allowed cursor-pointer"
          disabled={currentPage <= 1}
          onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
        >
          Prev
        </button>
        <span className="mx-6 font-semibold">
          {currentPage} of {totalPages}
        </span>
        <button
          className="disabled:text-gray-400 disabled:cursor-not-allowed cursor-pointer"
          disabled={currentPage >= totalPages}
          onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))}
        >
          Next
        </button>
      </nav>
    </div>
  );
};

