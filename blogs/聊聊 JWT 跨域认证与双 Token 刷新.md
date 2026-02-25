---
title: '别再用 Session 了：聊聊 JWT 跨域认证与双 Token 刷新'
category: 'Technology'
date: '2019-05-23'
tags: ['Web', '架构']
---

在当今互联网应用架构中，前后端分离和微服务化已经成为了主流。但在这种多域名、多终端（Web、iOS、Android）的复杂场景中，如果依然使用传统的基于 Session 会话的用户认证机制，开发者就会面临极度痛苦的“跨域”与“状态共享”问题。

**JSON Web Token（JWT）**，这个轻量级、无状态的跨域认证解决方案应运而生，成为了现代 Web 开发必须掌握的核心利器。

本文将从最基底的原理出发，带你深入拆解 JWT，并结合实际应用痛点，分析它的优雅使用以及企业级的安全防范机制。

<!--summary-->

---

## 一、为什么抛弃了传统的 Session 认证？

在理解 JWT 之前，我们需要弄明白以前的老路为什么走不通了。

**传统的 Session 认证流程是这样的**：

1. 客户端提交账号密码给服务端。
2. 服务端校验通过后，在内存或者数据库（如 Redis）中创建一条关联此用户的 `Session` 对话数据，并生成一个唯一标识符 `session_id`。
3. 服务端通过 HTTP 响应头的 `Set-Cookie` 将 `session_id` 种在客户端浏览器中。
4. 随后客户端每次请求，浏览器都会自动附带这个 Cookie，服务端靠 `session_id` 去内存里“查字典”确认你是谁。

这套模式在单体应用（Monolithic）时代运行得完美无瑕，但在现代架构下却处处碰壁：

- **状态共享难**：如果有几十台服务器做负载均衡，你的 Session 数据怎么办？只能引入集中式存储（比方说 Redis），这让架构变重，且多出了单点故障风险。
- **跨域不友好**：Cookie 的安全策略（SameSite）天然抗拒跨域。如果公司有 `news.company.com` 和 `shop.company.com` 两个独立的子系统，想实现一次登录全网通行（单点登录 SSO）将会非常棘手。
- **非浏览器端难以处理**：移动端（APP）原生请求或是纯 API 接口调用，管理 Cookie 是一件恶心的事情。

---

## 二、JWT 原理剖析：自包含的“通行证”

JWT 的核心理念是：**“去中心化”，将状态保存在客户端。**

服务端在验证完用户身份后，不去建立任何 Session 数据，而是直接将用户信息（如用户 ID、角色、过期时间等）打包成一个 JSON 对象，并通过秘钥进行加密签名，最后变成一串字符串（这就是 JWT 令牌）发还给客户端。

以后客户端只要带着这串字符串来，服务端只需验证底部的“官方大印”（签名）没有被造假，就能确信其身份。

### JWT 结构拆解

标准的 JWT 是一个由三段字符组成的字符串，彼此间用点号（`.`）分隔，长这样：
`Header.Payload.Signature`

#### 1. Header（头部）

描述这个 Token 的基本元数据，比如用的是什么加密算法：

```json
{
  "alg": "HS256",
  "typ": "JWT"
}
```

它会被 Base64URL 编码后作为 JWT 字符串的第一部分。

#### 2. Payload（负载数据载体）

真正存放有效信息的地方。除了官方定义的一些通用声明（如 `iss` 签发人、`exp` 过期时间戳、`sub` 面向主题等），开发者可以自己塞自定义数据：

```json
{
  "sub": "user_89757",
  "name": "IMWIND",
  "role": "admin"
}
```

它也被 Base64URL 编码成为了第二部分。

> 🚨 **绝对禁区**：因为 Base64 仅仅是“编码”而非“加密”，任何人都可以随意解析。所以 Payload 里 **绝对不可以存放密码或其他核心机密信息**！

#### 3. Signature（签名防伪验证）

这是 JWT 最核心的安全网。服务端会拿着前两部分的编码字符串，使用只有服务端自己才知道的神秘秘钥（`secret`），再运用 Header 指定的算法（比如 HMAC SHA256）计算出一个哈希串：

```javascript
HMACSHA256(base64UrlEncode(header) + '.' + base64UrlEncode(payload), secret);
```

这个哈希串就是签名。这就相当于人民币上的防伪水印。由于黑客不知道后端的 `secret`，即使他拦截到了 JWT，一旦擅自修改 Payload 里的用户角色想提权，送到服务器时，服务器拿着新的假 Payload 重新计算签名出来的字符串，和拿到的假签名一对比，立马就会原形毕露。

---

## 三、真实应用与代码实战

### 1. 登录下发与 API 鉴权

现在的标准做法是，客户端拿到 JWT 后，不再放进 Cookie 中苦苦挣扎，而是通常保存在 `localStorage` 中。并在每一次发起 AJAX 请求时，手动将其强塞进 HTTP 的 Authorization 请求头里：

```http
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR...
```

### 2. NodeJS (Express) 的 JWT 精简示例

下面是一段用 Node.js 和 `jsonwebtoken` 模块编写的极简登录签发与验证拦截流：

```javascript
const jwt = require('jsonwebtoken');
const express = require('express');
const app = express();
app.use(express.json());

const JWT_SECRET = '$uper_S3cr3t_K3y'; // 这个千万不能写死在代码里，必须走环境变量

// 发放令牌（登录接口）
app.post('/login', (req, res) => {
  // 省略查询数据库比对密码的代码...
  const user = { id: 89757, username: 'imwind' };

  // 签发 Token，设置 2 小时后过期
  const token = jwt.sign(
    { sub: user.id, username: user.username },
    JWT_SECRET,
    { expiresIn: '2h' },
  );

  res.json({ token, message: '登录成功' });
});

// Middleware 鉴权拦截器
function authenticateToken(req, res, next) {
  // 从请求头部获取 Bearer 令牌
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401); // 没令牌，滚去登录

  // 校验签名合法性与是否过期
  jwt.verify(token, JWT_SECRET, (err, decodedUser) => {
    if (err) return res.sendStatus(403); // 签名造假或过期拦截
    // 解析通过，放行！并将用户信息挂载给路由
    req.user = decodedUser;
    next();
  });
}

// 只有验证通过了，才能访问这个私密接口获取收益报表
app.get('/api/protected/reports', authenticateToken, (req, res) => {
  res.json({
    message: `欢迎回来老板 ${req.user.username}，您的今日结算是：$1,000,000`,
  });
});

app.listen(3000);
```

---

## 四、JWT 的致命短板与妥协之道

虽然 JWT 被吹捧成了微服务架构下的银弹，但由于其**绝对的无状态性**，它带了一个极其致命的短板：**发出去的令牌如泼出去的水，在过期之前，服务端竟然无权让它提前提前注销或撤销！**

这会引发巨大的安全和交互隐患：

- 用户改了密码，用新密码登录了，结果拿着旧系统的老 JWT 竟然还能继续操作。
- 如果你的 JWT 过期时间长达一个月，用户的电脑在网吧没关页面被人拿走，你根本没办法主动踢掉那个窃贼的登录状态。

为了权衡无状态的高性能与安全管控的“部分状态权”，现代企业级开发中通常使用 **双 Token 刷新机制 (Access / Refresh Token Pattern)** 的终极复合方案：

1. **Access Token (前台短命令牌)**：通常仅 15 甚至 5 分钟就过期。用于频繁的高负荷 API 鉴权，因为它的寿命短，哪怕被拦截了，危害也很有限。且全程无状态，极大地降低服务端数据库查表的开销。
2. **Refresh Token (后台长命令牌)**：能活 7 天或者 30 天。用于向特定的、受强管控的网关去换取新的临时 Access Token。

当 Access Token 失效时，前端通过拦截器静默携带 Refresh Token 去换取新的短命令牌，用户体验上做到了“无感”。而在后台服务器中，我们可以将不频繁使用的大长命 `Refresh Token` 配合简单数据库（比如 Redis 表）管控起来：当我们想人工干预或者主动封禁某个用户时，只要禁用他的 Refresh Token，等到前台最长 15 分钟的短令牌一旦死亡，整个权限大楼就彻底倒塌了。

这就是在极致轻量和可控安全性之间的技术折中之美。
