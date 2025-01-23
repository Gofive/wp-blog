import { getBlog } from '@/lib/read-md';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import remarkParse from 'remark-parse';
import rehypeColorChips from 'rehype-color-chips';
import remarkToc from 'remark-toc';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { materialOceanic } from 'react-syntax-highlighter/dist/esm/styles/prism'; // 选择你喜欢的主题
import './index.css';
import './github-markdown.css';
import CopyButton from '@/components/copy-btn';
export default async function Blog({ params }) {
  const slug = (await params).slug;

  // 解码中文 slug
  const decodedSlug = decodeURIComponent(slug);

  const markdown = await getBlog(decodedSlug);

  return (
    <article className="markdown-body">
      <Markdown
        rehypePlugins={[rehypeRaw, rehypeStringify]}
        remarkPlugins={[
          [remarkGfm, { singleTilde: false }],
          [remarkToc, { tight: true, maxDepth: 5 }],
        ]}
        components={{
          code({ inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '');
            const code = String(children).replace(/\n$/, '');
            return !inline && match ? (
              <div style={{ position: 'relative', marginBottom: '1.5rem' }}>
                <CopyButton code={code} />
                <SyntaxHighlighter
                  style={materialOceanic}
                  language={match[1]}
                  PreTag="div"
                  {...props}
                >
                  {code}
                </SyntaxHighlighter>
              </div>
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
        }}
      >
        {markdown}
      </Markdown>
    </article>
  );
}
