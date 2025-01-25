"use client";

import { useRouter } from "next/navigation";
import React from "react";

export const Paginate = ({ currentPage, totalPages }) => {
  const router = useRouter();
  return (
    <div className="flex items-center justify-center pb-8 pt-6 w-full">
      <nav className="flex text-slate-700 dark:text-slate-100 text-lg">
        <button
          className="disabled:text-gray-400 disabled:cursor-not-allowed"
          disabled={currentPage <= 1}
          onClick={() => router.push(`/?p=${Math.max(1, currentPage - 1)}`)}
        >
          Prev
        </button>
        <span className="mx-6 font-semibold">
          {currentPage} of {totalPages}
        </span>
        <button
          className="disabled:text-gray-400 disabled:cursor-not-allowed"
          disabled={currentPage >= totalPages}
          onClick={() =>
            router.push(`/?p=${Math.max(currentPage + 1, totalPages)}`)
          }
        >
          Next
        </button>
      </nav>
    </div>
  );
};
