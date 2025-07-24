import { getBlog } from "@/lib/read-md";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import remarkFrontmatter from "remark-frontmatter";
import rehypeStringify from "rehype-stringify";
import rehypeSlug from "rehype-slug";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
// 选择你喜欢的主题
import { materialOceanic } from "react-syntax-highlighter/dist/esm/styles/prism";
import CopyButton from "@/components/copy-btn";
import { remark } from "remark";
import { visit } from "unist-util-visit";
import Slugger from "github-slugger";
import Article from "@/components/article";

// Dynamic metadata
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const url = `https://imwind.cc/blog/${slug}`;
  return {
    title: decodeURIComponent(slug),
    "og:url": url,
  };
}
/**
 * 从 Markdown 内容中提取目录
 * @param {string} markdownContent - Markdown 内容
 * @returns {Object} 包含目录数据和 HTML 内容
 */
export const parseMarkdownWithToc = async (markdownContent) => {
  const toc = []; // 存储目录
  const slugger = new Slugger(); // 初始化 github-slugger
  const processor = remark()
    .use(remarkFrontmatter)
    .use(() => (tree) => {
      visit(tree, "heading", (node) => {
        const level = node.depth; // 标题层级 (h1 -> 1, h2 -> 2, etc.)
        const text = node.children
          .filter((child) => child.type === "text")
          .map((child) => child.value)
          .join("");
        const id = slugger.slug(text); // 使用 github-slugger 生成 ID
        if (level === 2 || level === 3) {
          // 如果是 h2,h3 标题，将其添加到目录数组中
          toc.push({ level, text, id });
        }
      });
    });

  // 返回处理后的 Markdown 内容
  await processor.process(markdownContent);
  return toc;
};

/**
 * 提取 React 节点树中的纯文本内容
 * @param {React.ReactNode} node - React 节点
 * @returns {string} 提取出的纯文本内容
 */
const extractText = (node) => {
  if (!node) return "";
  if (typeof node === "string") return node; // 如果是字符串，直接返回
  if (Array.isArray(node)) {
    // 如果是数组，递归处理每个子节点
    return node.map(extractText).join("");
  }
  if (typeof node === "object" && node.props?.children) {
    // 如果是 React 节点，递归处理其 children
    return extractText(node.props.children);
  }
  return ""; // 其他情况返回空字符串
};

export default async function Blog({ params }) {
  const slug = (await params).slug;

  // 解码中文 slug
  const decodedSlug = decodeURIComponent(slug);
  const markdown = await getBlog(`${decodedSlug}.md`);

  const toc = await parseMarkdownWithToc(markdown);

  return (
    <Article toc={toc} title={decodedSlug}>
      <Markdown
        rehypePlugins={[rehypeRaw, rehypeSlug, rehypeStringify]}
        remarkPlugins={[
          [remarkGfm, { singleTilde: false }],
          [remarkFrontmatter],
        ]}
        components={{
          code({ inline, className, children, node, ...props }) {
            const match = /language-(\w+)/.exec(className || "");
            const code = String(children).replace(/\n$/, "");
            return !inline && match ? (
              <div style={{ position: "relative", marginBottom: "1.5rem" }}>
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
    </Article>
  );
}
