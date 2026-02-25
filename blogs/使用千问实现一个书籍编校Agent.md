---
title: '使用通义千问 API 构建智能书籍编校 Agent'
category: 'Technology'
date: '2026-02-17'
tags: ['AI', 'Agent']
---

对于作家、编辑和出版从业者来说，书籍的初稿校对是一项极其耗时且枯燥的工作。错别字、语病、标点符号误用，甚至是上下文逻辑的细微断裂，都需要消耗大量的精力。

今天，我们将利用阿里云的通义千问大模型（Qwen API，需要本地的Python环境），构建一个“智能书籍编校 Agent”。这个 Agent 不仅能帮你挑出基础错误，还能给出修改建议和润色方案。(本文仅为架构思路演示，实际应用中可能需要更复杂的逻辑和错误处理机制。)

## 架构设计：这个 Agent 是如何工作的？

处理一整本书的最大挑战在于**上下文长度限制（Context Window）**。即使是最新的大模型，一次性塞入几十万字也容易导致“幻觉”或遗忘。因此，我们需要一个核心的流水线（Pipeline）：

1. **文档解析与切分（Chunking）：** 将长篇书籍文本按章节或固定字数切分为小块（Chunks）。
2. **角色设定（System Prompt）：** 为大模型注入“资深图书编辑”的人设和校对标准。
3. **大模型推理（LLM Processing）：** 将文本块逐一发送给通义千问 API 进行错漏检查和润色。
4. **结果解析与合并（Reassembly）：** 提取模型的修改建议，与原文对照，合并输出最终的校对报告。

---

## 前置准备

1. **获取 API Key：** 登录阿里云百炼大模型平台（DashScope），开通通义千问服务并获取你的 API Key。
2. **安装依赖包：** 在你的终端运行以下命令安装阿里云的 SDK。

```bash
pip install dashscope

```

---

## 详细实现步骤与代码实例

### 第一步：配置环境与基础调用

首先，配置你的 API Key，并写一个基础的 API 调用函数来测试连接。我们将使用 `qwen-plus` 或 `qwen-max` 模型，它们在文本处理上表现极佳。

```python
import dashscope
import json
import os

# 强烈建议将 API Key 设置在环境变量中，而不是硬编码在代码里
# export DASHSCOPE_API_KEY="sk-你的真实API_KEY"
dashscope.api_key = os.environ.get("DASHSCOPE_API_KEY")

def call_qwen(prompt, system_prompt):
    messages = [
        {'role': 'system', 'content': system_prompt},
        {'role': 'user', 'content': prompt}
    ]

    response = dashscope.Generation.call(
        model='qwen-max', # 使用 qwen-max 获取最佳的逻辑和语言能力
        messages=messages,
        result_format='message',
    )

    if response.status_code == 200:
        return response.output.choices[0]['message']['content']
    else:
        print(f"调用失败: {response.code} - {response.message}")
        return None

```

### 第二步：精准的角色设定（Prompt Engineering）

为了让 Agent 输出结构化的校对结果，我们需要精心设计 System Prompt。最好的方式是让它返回 JSON 格式的数据，这样方便我们后续在代码中解析。

```python
EDITING_SYSTEM_PROMPT = """
你现在是一位拥有20年经验的资深图书出版编辑。你的任务是对用户提供的书籍文本进行专业的编校。
你需要检查：
1. 错别字与标点符号错误。
2. 语法错误与语病（如成分残缺、搭配不当）。
3. 句子流畅度（在保持原意的前提下进行微调润色）。

请以 JSON 格式输出你的校对结果，格式如下，不要包含任何额外的解释文本：
{
  "issues": [
    {
      "original": "原文本中的错误片段",
      "correction": "修改后的建议片段",
      "reason": "修改的原因（如错别字、语病等）"
    }
  ],
  "polished_text": "全文经过校对和润色后的完整文本"
}
"""

```

### 第三步：文本切分（Chunking）

我们不能把几万字一次性扔给 API，为了确保每个 Chunk 不超过指定的长度（例如 1000 字），我们通常需要设计一个切分文档的方法。这里我们为了演示只写一个简单的切分函数，实际生产环境中我们通常使用基于向量嵌入（Embeddings）的语义切分（这是一种基于计算相邻句子之间的余弦相似度来确定是否发生了“话题转移”或“场景切换”的方法）。

```python
def chunk_text(text, max_length=1000):
    paragraphs = text.split('\n')
    chunks = []
    current_chunk = ""

    for para in paragraphs:
        if not para.strip():
            continue

        if len(current_chunk) + len(para) <= max_length:
            current_chunk += para + "\n"
        else:
            if current_chunk:
                chunks.append(current_chunk)
            # 如果单段实在太长，直接截断（这里为了演示简单处理）
            current_chunk = para + "\n"

    if current_chunk:
        chunks.append(current_chunk)

    return chunks

```

### 第四步：组装智能编校 Agent

现在，我们将前面的模块组装起来，实现对整本（或整个章节）文本的循环处理，并收集结果。

````python
def editing_agent(raw_text):
    print("开始文档切分...")
    chunks = chunk_text(raw_text, max_length=1500)
    print(f"文档已切分为 {len(chunks)} 个片段。")

    final_report = []
    final_polished_text = ""

    for i, chunk in enumerate(chunks):
        print(f"正在编校第 {i+1}/{len(chunks)} 个片段...")

        prompt = f"请严格按照预设的 JSON 格式对以下文本进行编校：\n\n{chunk}"
        result_str = call_qwen(prompt, EDITING_SYSTEM_PROMPT)

        if result_str:
            try:
                # 移除模型可能输出的 markdown 代码块标记 (```json ... ```)
                clean_json_str = result_str.replace('```json', '').replace('```', '').strip()
                result_dict = json.loads(clean_json_str)

                final_report.extend(result_dict.get("issues", []))
                final_polished_text += result_dict.get("polished_text", "") + "\n\n"
            except json.JSONDecodeError:
                print(f"片段 {i+1} 返回的 JSON 格式有误，跳过解析。返回内容：\n{result_str}")
                final_polished_text += chunk + "\n\n" # 降级处理：保留原文

    return final_report, final_polished_text

# --- 测试运行 ---
if __name__ == "__main__":
    sample_text = """
    他今天非常高兴，甚至高兴的有些过了头。在去公司的陆上，他买了一辈咖啡，还跟店员小妹妹聊了半天。
    到了办公室，领导突然宣布了一个坏消息，公司即将在下个月拆员，而且拆员比例高达百分之二十。
    他心里的喜悦瞬间跌落谷底，这简直是晴天劈雳。
    """

    report, polished = editing_agent(sample_text)

    print("\n" + "="*20 + " 校对报告 " + "="*20)
    for issue in report:
        print(f"【原文】{issue['original']}")
        print(f"【建议】{issue['correction']}")
        print(f"【原因】{issue['reason']}\n")

    print("="*20 + " 润色后全文 " + "="*20)
    print(polished)

````

## 更深层次的探索

目前的实现是一个基础的单向 Agent。在实际生产中，你还可以继续增加以下特性：

1. **外挂风格指南（RAG）：** 将特定出版社的排版规范、敏感词库向量化，让大模型在校对时参考这些外部知识库。
2. **多 Agent 协作：** 设计一个 Agent 专门抓错别字，另一个 Agent 专门负责情节逻辑的连贯性，最后由一个“主编 Agent”合并意见。
3. **流式输出（Streaming）：** 对于前端界面，使用流式输出可以大幅提升用户的等待体验。
