"use client";

import { useEffect } from "react";
import Article from "@/components/article";

/**
 * 静态博客文章组件
 * 用于渲染预生成的 HTML 内容
 */
export default function StaticBlogArticle({ article }) {
  const { title, htmlContent, toc, readingTime } = article;

  useEffect(() => {
    // 为代码块添加复制功能
    const addCopyFunctionality = () => {
      const copyButtons = document.querySelectorAll('.copy-btn');

      copyButtons.forEach(button => {
        button.addEventListener('click', async () => {
          const code = button.getAttribute('data-code');

          try {
            await navigator.clipboard.writeText(code);

            // 显示复制成功反馈
            const originalHTML = button.innerHTML;
            button.innerHTML = `
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="20,6 9,17 4,12"></polyline>
              </svg>
            `;
            button.style.color = '#10b981';

            setTimeout(() => {
              button.innerHTML = originalHTML;
              button.style.color = '';
            }, 2000);

          } catch (err) {
            console.error('复制失败:', err);

            // 降级方案：选择文本
            const textArea = document.createElement('textarea');
            textArea.value = code;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);

            // 显示反馈
            const originalHTML = button.innerHTML;
            button.innerHTML = '已复制';
            setTimeout(() => {
              button.innerHTML = originalHTML;
            }, 2000);
          }
        });
      });
    };

    // 添加代码高亮样式
    const addCodeStyles = () => {
      if (!document.getElementById('prism-styles')) {
        const style = document.createElement('style');
        style.id = 'prism-styles';
        style.textContent = `
          .code-block-wrapper {
            position: relative;
            margin-bottom: 1.5rem;
          }
          
          .copy-btn {
            position: absolute;
            top: 0.5rem;
            right: 0.5rem;
            background: rgba(0, 0, 0, 0.7);
            color: white;
            border: none;
            border-radius: 4px;
            padding: 0.5rem;
            cursor: pointer;
            z-index: 10;
            transition: all 0.2s ease;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          
          .copy-btn:hover {
            background: rgba(0, 0, 0, 0.9);
            transform: scale(1.05);
          }
          
          .copy-btn:active {
            transform: scale(0.95);
          }
          
          /* 代码块样式优化 */
          pre[class*="language-"] {
            position: relative;
            background: #263238 !important;
            border-radius: 8px;
            padding: 1rem !important;
            overflow-x: auto;
            font-size: 0.875rem;
            line-height: 1.5;
          }
          
          code[class*="language-"] {
            background: transparent !important;
            color: #eeffff !important;
          }
          
          /* 行号样式 */
          .line-numbers .line-numbers-rows {
            border-right: 1px solid #37474f;
            padding-right: 0.5rem;
            margin-right: 0.5rem;
          }
          
          .line-numbers-rows > span:before {
            color: #546e7a;
          }
          
          /* 响应式优化 */
          @media (max-width: 768px) {
            pre[class*="language-"] {
              font-size: 0.75rem;
              padding: 0.75rem !important;
            }
            
            .copy-btn {
              top: 0.25rem;
              right: 0.25rem;
              padding: 0.375rem;
            }
          }
        `;
        document.head.appendChild(style);
      }
    };

    addCodeStyles();
    addCopyFunctionality();

    // 清理函数
    return () => {
      const copyButtons = document.querySelectorAll('.copy-btn');
      copyButtons.forEach(button => {
        button.replaceWith(button.cloneNode(true));
      });
    };
  }, [htmlContent]);

  return (
    <Article toc={toc} title={title} readingTime={readingTime}>
      <div
        className="prose prose-slate dark:prose-invert max-w-none
          prose-headings:scroll-mt-20
          prose-h1:text-3xl prose-h1:font-bold prose-h1:mb-6
          prose-h2:text-2xl prose-h2:font-semibold prose-h2:mt-8 prose-h2:mb-4
          prose-h3:text-xl prose-h3:font-medium prose-h3:mt-6 prose-h3:mb-3
          prose-p:text-base prose-p:leading-7 prose-p:mb-4
          prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline
          prose-strong:font-semibold prose-strong:text-slate-900 dark:prose-strong:text-slate-100
          prose-code:text-sm prose-code:bg-slate-100 dark:prose-code:bg-slate-800 
          prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:font-mono
          prose-code:before:content-none prose-code:after:content-none
          prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:pl-4 prose-blockquote:italic
          prose-ul:list-disc prose-ul:pl-6 prose-ol:list-decimal prose-ol:pl-6
          prose-li:mb-2 prose-li:leading-6
          prose-table:w-full prose-table:border-collapse
          prose-th:border prose-th:border-slate-300 dark:prose-th:border-slate-600 prose-th:p-2 prose-th:bg-slate-50 dark:prose-th:bg-slate-800
          prose-td:border prose-td:border-slate-300 dark:prose-td:border-slate-600 prose-td:p-2
          prose-img:rounded-lg prose-img:shadow-md"
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />
    </Article>
  );
}