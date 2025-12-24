"use client";

import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import remarkFrontmatter from "remark-frontmatter";
import rehypeStringify from "rehype-stringify";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialOceanic } from "react-syntax-highlighter/dist/esm/styles/prism";
import CopyButton from "@/components/copy-btn";
import Article from "@/components/article";
import { useEffect, useState, useRef } from "react";
import mermaid from "mermaid";
import Slugger from "github-slugger";

/**
 * 自定义 rehype 插件，生成与 TOC 一致的 ID
 */
const rehypeCustomSlug = () => {
  return (tree) => {
    const slugger = new Slugger();

    const visit = (node) => {
      if (node.type === "element" && /^h[1-6]$/.test(node.tagName)) {
        // 提取标题文本
        const text = node.children
          .filter((child) => child.type === "text")
          .map((child) => child.value)
          .join("");

        // 生成 slug
        let id = slugger.slug(text);

        // 确保 ID 不以数字开头
        if (/^\d/.test(id)) {
          id = `heading-${id}`;
        }

        // 设置 ID 属性
        node.properties = node.properties || {};
        node.properties.id = id;
      }

      // 递归处理子节点
      if (node.children) {
        node.children.forEach(visit);
      }
    };

    visit(tree);
  };
};

/**
 * Mermaid Diagram Component
 * Renders mermaid diagrams client-side with unique IDs
 */
const MermaidDiagram = ({ code }) => {
  const [diagramHtml, setDiagramHtml] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const diagramRef = useRef(null);
  const diagramId = useRef(
    `mermaid-${Math.random().toString(36).substring(2, 11)}`
  );

  useEffect(() => {
    const renderDiagram = async () => {
      try {
        // Initialize mermaid with configuration
        mermaid.initialize({
          startOnLoad: false,
          theme: "default",
          securityLevel: "loose",
        });

        // Generate unique ID for this diagram
        const id = diagramId.current;

        // Render the diagram
        const { svg } = await mermaid.render(id, code);
        setDiagramHtml(svg);
        setError(null);
      } catch (err) {
        console.error("Mermaid rendering error:", err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    renderDiagram();
  }, [code]);

  if (isLoading) {
    return (
      <div
        className="mermaid-loading"
        style={{
          padding: "1rem",
          textAlign: "center",
          background: "#f5f5f5",
          borderRadius: "4px",
        }}
      >
        Loading diagram...
      </div>
    );
  }

  if (error) {
    return (
      <div className="mermaid-error">
        <div
          style={{
            padding: "0.5rem",
            background: "#fee",
            color: "#c33",
            borderRadius: "4px",
            marginBottom: "0.5rem",
            fontSize: "0.9rem",
          }}
        >
          Mermaid rendering error: {error}
        </div>
        <pre
          style={{
            background: "#263238",
            color: "#eeffff",
            padding: "1rem",
            borderRadius: "4px",
            overflow: "auto",
            fontFamily:
              "'Fira Code', 'JetBrains Mono', 'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, 'Courier New', monospace",
            fontSize: "0.9rem",
            lineHeight: "1.5",
          }}
        >
          {code}
        </pre>
      </div>
    );
  }

  return (
    <div
      className="mermaid-diagram"
      ref={diagramRef}
      dangerouslySetInnerHTML={{ __html: diagramHtml }}
      style={{
        textAlign: "center",
        padding: "1rem",
        background: "#fff",
        borderRadius: "4px",
        border: "1px solid #e1e5e9",
      }}
    />
  );
};

export default function BlogContent({ markdown, toc, title }) {
  return (
    <Article toc={toc} title={title}>
      <Markdown
        rehypePlugins={[rehypeRaw, rehypeCustomSlug, rehypeStringify]}
        remarkPlugins={[
          [remarkGfm, { singleTilde: false }],
          [remarkFrontmatter],
        ]}
        components={{
          code({ inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || "");
            const code = String(children).replace(/\n$/, "");

            // Handle mermaid blocks
            if (!inline && match && match[1] === "mermaid") {
              return (
                <div style={{ position: "relative" }}>
                  <CopyButton code={code} />
                  <MermaidDiagram code={code} />
                </div>
              );
            }

            // Handle other code blocks with syntax highlighting
            return !inline && match ? (
              <div style={{ position: "relative" }}>
                <CopyButton code={code} />
                <SyntaxHighlighter
                  style={materialOceanic}
                  language={match[1]}
                  PreTag="div"
                  customStyle={{
                    fontFamily:
                      "'Fira Code', 'JetBrains Mono', 'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, 'Courier New', monospace",
                    fontSize: "0.9rem",
                    lineHeight: "1.5",
                    margin: 0,
                    padding: "1rem",
                  }}
                  {...props}
                >
                  {code}
                </SyntaxHighlighter>
              </div>
            ) : (
              <code
                className={`${className} language-none`}
                style={{
                  fontFamily:
                    "'Fira Code', 'JetBrains Mono', 'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, 'Courier New', monospace",
                  fontSize: "0.9em",
                  backgroundColor: "#f6f8fa",
                  padding: "0.2em 0.4em",
                  borderRadius: "3px",
                  border: "1px solid #e1e4e8",
                }}
                {...props}
              >
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
