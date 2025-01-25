"use client";

import { useEffect, useState } from "react";
import { debounce } from "lodash"; // 导入 lodash 的 throttle 函数

export default function Article({ children, toc }) {
  const [activeId, setActiveId] = useState(null);

  useEffect(() => {
    const hash = window.location.hash;
    if (!hash) {
      setActiveId(null);
      return;
    }
    const element = document.querySelector(decodeURIComponent(hash));
    console.log("hash", hash);
    if (element) {
      window.scrollTo({
        top: element.offsetTop,
        behavior: "instant",
      });
    }
  }, []);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      const element = document.querySelector(decodeURIComponent(hash));
      if (element) {
        window.scrollTo({
          top: element.offsetTop,
          behavior: "smooth",
        });
      }
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  // 滚动监听并更新 activeId
  useEffect(() => {
    const handleScroll = debounce(() => {
      // 获取所有标题元素
      const headingElements = toc.map((item) =>
        document.getElementById(item.id)
      );
      const scrollPosition = window.scrollY;

      // 找到第一个顶部接近的标题
      for (let i = headingElements.length - 1; i >= 0; i--) {
        const heading = headingElements[i];

        if (
          headingElements[0] &&
          scrollPosition < headingElements[0].offsetTop
        ) {
          setActiveId(toc[0].id);
          break;
        }
        // 获取元素高度
        const elementHeight = heading?.offsetHeight || 0;

        if (heading && heading.offsetTop <= scrollPosition + elementHeight) {
          setActiveId(toc[i].id);
          break;
        }
      }
    }, 200);
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="relative mx-auto max-w-screen-xl px-4 py-10 md:flex md:flex-row md:py-10">
      <div className="mt-4 w-full min-w-0 max-w-6xl px-1 md:px-6 ">
        <article className="markdown-body">{children}</article>
      </div>
      {/* 目录区域 */}
      <nav className="order-last w-56 shrink-0">
        <div className="sticky top-[80px] w-[240px] p-4">
          <ul>
            {toc.map((item, index) => (
              <li
                onClick={() => {
                  setActiveId(item.id);
                }}
                className={`${
                  activeId === item.id ? "text-blue-500 font-semibold" : ""
                } my-1 text-sm transition-all`}
                key={index}
                style={{ marginLeft: (item.level - 1) * 20 }}
              >
                <a href={`#${item.id}`}>{item.text}</a>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </div>
  );
}
