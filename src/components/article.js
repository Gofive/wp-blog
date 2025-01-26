"use client";

import { useEffect, useState } from "react";
import { debounce } from "lodash"; // 导入 lodash 的 throttle 函数
import { List } from "lucide-react";
import { Drawer } from "vaul";
export default function Article({ children, toc }) {
  const [activeId, setActiveId] = useState(null);
  const [open, setOpen] = useState(false);

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
    <div className="relative mx-auto max-w-(--breakpoint-xl) flex flex-col md:flex-row">
      <div className="mt-4 w-full min-w-0 max-w-6xl px-1 md:px-6 ">
        <article className="markdown-body">{children}</article>
      </div>
      {/* 目录区域 */}
      <nav className="md:order-last order-first md:w-56 shrink-0 w-full hidden md:flex">
        <div className="p-4 sticky top-[80px]">
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

      <Drawer.Root direction="right" open={open} onOpenChange={setOpen}>
        <Drawer.Portal>
          <Drawer.Overlay className="fixed inset-0 bg-black/40" />
          <Drawer.Content
            className="right-2 top-16 bottom-2 fixed z-10 outline-none max-w-[280px] w-[70%] flex"
            // The gap between the edge of the screen and the drawer is 8px in this case.
            style={{ "--initial-transform": "calc(100% + 8px)" }}
          >
            <Drawer.Title />
            <div className="bg-zinc-50 dark:bg-slate-800 h-full w-full grow p-5 flex flex-col rounded-[10px]">
              <div className="max-w-md mx-auto">
                <div className="text-left font-semibold ml-[20px] my-6">
                  文章目录
                </div>
                <ul>
                  {toc.map((item, index) => (
                    <li
                      onClick={() => {
                        setOpen(false);
                        setActiveId(item.id);
                      }}
                      className={`${
                        activeId === item.id
                          ? "text-blue-500 font-semibold"
                          : ""
                      } my-1 text-sm transition-all`}
                      key={index}
                      style={{ marginLeft: (item.level - 1) * 20 }}
                    >
                      <a href={`#${item.id}`}>{item.text}</a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
      <List
        onClick={() => setOpen(!open)}
        className="w-9 h-9 p-2 bg-violet-500 text-slate-100 fixed bottom-4 right-4 rounded-full md:hidden cursor-pointer"
        size={26}
      />
    </div>
  );
}
