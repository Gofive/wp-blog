'use client';

import { useEffect, useState } from 'react';
import { debounce } from 'lodash'; // 导入 lodash 的 throttle 函数
import { List } from 'lucide-react';
import { Drawer } from 'vaul';
import UpTop from './up-top';

export default function Article({ children, toc, title }) {
  const [activeId, setActiveId] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const hash = window.location.hash;
    if (!hash) {
      setActiveId(null);
      return;
    }
    const element = document.querySelector(decodeURIComponent(hash));
    console.log('hash', hash);
    if (element) {
      window.scrollTo({
        top: element.offsetTop,
        behavior: 'instant',
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
          behavior: 'smooth',
        });
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
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
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [toc, title]);

  return (
    <div className="relative mx-auto max-w-7xl flex flex-col md:flex-row gap-6">
      <div className="mt-4 w-full min-w-0 flex-1 px-1 md:px-6">
        <article className="markdown-body">
          <h1>{title}</h1>
          {children}
        </article>
      </div>
      <div className="flex-col justify-between sticky top-[100px] md:order-last order-first w-full h-[calc(100vh-100px)] hidden md:w-64 shrink-0 md:flex">
        {/* 目录区域 */}
        <nav className="p-4 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg shadow-sm max-h-[calc(100vh-180px)] overflow-y-auto">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3 border-b border-gray-200 dark:border-slate-600 pb-2">
            文章目录
          </h3>
          <ul className="space-y-1.5">
            {toc.map((item, index) => (
              <li
                onClick={() => {
                  setActiveId(item.id);
                }}
                className={`${
                  activeId === item.id
                    ? 'text-blue-500 font-semibold bg-blue-50 dark:bg-blue-900/20'
                    : 'text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400'
                } text-sm transition-all cursor-pointer rounded px-2 py-1`}
                key={index}
                style={{ marginLeft: Math.max(0, (item.level - 2) * 12) }}
              >
                <a
                  href={`#${item.id}`}
                  className="block truncate"
                  title={item.text}
                >
                  {item.text}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="pb-6">
          <UpTop />
        </div>
      </div>

      <Drawer.Root direction="right" open={open} onOpenChange={setOpen}>
        <Drawer.Portal>
          <Drawer.Overlay className="fixed inset-0 bg-black/40" />
          <Drawer.Content
            className="right-2 top-16 bottom-2 fixed z-10 outline-none max-w-[280px] w-[70%] flex"
            // The gap between the edge of the screen and the drawer is 8px in this case.
            style={{ '--initial-transform': 'calc(100% + 8px)' }}
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
                          ? 'text-blue-500 font-semibold'
                          : ''
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
        className="w-10 h-10 p-2 bg-violet-500 hover:bg-violet-600 text-slate-100 fixed bottom-8 right-2 rounded-full md:hidden cursor-pointer shadow-lg transition-colors"
        size={26}
      />
      <div className="md:hidden fixed bottom-20 right-2 ">
        <UpTop />
      </div>
    </div>
  );
}
