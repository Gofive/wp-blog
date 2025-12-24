'use client';

import { ArrowUp } from 'lucide-react';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

export default function UpTop() {
  const [show, setShow] = useState(false);
  const pathname = usePathname();

  // 检查是否在博客文章页面
  const isBlogPost = pathname?.startsWith('/blog/') && pathname !== '/blog';

  useEffect(() => {
    const mainContent = document.getElementById('main-content');
    if (!mainContent) return;

    const handleScroll = () => {
      const scrollPosition = mainContent.scrollTop;

      if (scrollPosition > 200) {
        setShow(true);
      } else {
        setShow(false);
      }
    };

    mainContent.addEventListener('scroll', handleScroll);

    // 清理事件监听器
    return () => {
      mainContent.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <ArrowUp
      onClick={() => {
        const mainContent = document.getElementById('main-content');
        if (mainContent) {
          mainContent.scrollTo({
            top: 0,
            behavior: 'smooth',
          });
        }
      }}
      className={`${show ? 'relative' : 'hidden'
        } w-10 h-10 p-2 bg-indigo-500 hover:bg-indigo-600 text-slate-100 rounded-full cursor-pointer shadow-lg transition-all duration-300 z-30`}
      size={24}
    />
  );
}
