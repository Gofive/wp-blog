---
title: "JSON Web Token认证方案"
category: "Technology"
date: "2019-05-23"
tags: ["安全", "Web", "架构"]
---

JSON Web Token（JWT）是当今最流行的跨域认证解决方案之一，广泛应用于分布式系统和前后端分离架构中。本文将详细介绍 JWT 的原理、结构、使用方式及其优缺点，理解其在现代 Web 开发中的重要性。

## 一、跨域认证的挑战

在互联网服务中，用户认证是不可或缺的一环。传统的认证流程通常如下：

1. 用户向服务器发送用户名和密码。
2. 服务器验证通过后，在会话（session）中存储用户相关信息，如用户 ID、角色、登录时间等。
3. 服务器返回一个 session_id，存储在客户端的 Cookie 中。
4. 后续请求中，客户端通过 Cookie 自动携带 session_id，服务器根据 session_id 查找会话数据以确认用户身份。
5. 服务器根据会话数据处理请求并返回结果。

这种基于 session 的认证方式在单机环境中运行良好，但在分布式系统或跨域场景中面临扩展性问题。例如，假设 A 和 B 是同一公司的两个网站，用户在 A 网站登录后，希望访问 B 网站时自动登录。如何实现？

<!--summary-->

### 传统方案的局限性

- **会话数据共享**：在服务器集群中，每台服务器需要访问共享的 session 数据，通常通过数据库或 Redis 实现。这增加了工程复杂性，且持久层可能成为单点故障。
- **跨域限制**：不同域名下的 Cookie 无法直接共享，导致跨域单点登录（SSO）实现困难。
- **扩展性问题**：随着用户量和服务器数量增加，集中式 session 管理可能导致性能瓶颈。

JWT 提供了一种无状态的认证方案，通过将用户身份信息存储在客户端，解决了上述问题。

## 二、JWT 的原理

JWT 的核心理念是：服务器在验证用户身份后，生成一个包含用户信息的 JSON 对象，附加签名后发回客户端。客户端在后续请求中携带此 JSON 对象，服务器仅通过验证签名即可确认用户身份，无需在服务器端存储会话数据。

例如，服务器可能生成如下 JSON 对象：

```json
{
  "user_id": "12345",
  "role": "admin",
  "exp": 1735689600
}
```

这个 JSON 对象经过编码和签名后，形成 JWT 令牌。客户端每次请求时携带该令牌，服务器验证其有效性以确认用户身份。由于服务器无需存储会话数据，这种方式天然适合分布式系统和跨域场景。

## 三、JWT 的数据结构

JWT 是一个由三部分组成的字符串，用点号（`.`）分隔，形如：

```
Header.Payload.Signature
```

每一部分都是 Base64URL 编码的字符串，具体作用如下：

### 3.1 Header（头部）

Header 是一个 JSON 对象，描述 JWT 的元数据，通常包含以下字段：

```json
{
  "alg": "HS256",
  "typ": "JWT"
}
```

- **alg**：签名算法，通常为 HMAC SHA256（HS256）或 RSA。
- **typ**：令牌类型，固定为 "JWT"。

Header 被 Base64URL 编码后，形成 JWT 的第一部分。

### 3.2 Payload（负载）

Payload 包含实际的用户数据，分为官方字段和自定义字段。JWT 规范定义了以下官方字段：

- **iss**（issuer）：签发者，例如 "auth.example.com"。
- **sub**（subject）：主题，通常是用户 ID，如 "12345"。
- **aud**（audience）：受众，指定令牌的接收方，如 "api.example.com"。
- **exp**（expiration time）：过期时间，Unix 时间戳，如 1735689600。
- **nbf**（not before）：生效时间，Unix 时间戳。
- **iat**（issued at）：签发时间，Unix 时间戳。
- **jti**（JWT ID）：唯一标识，用于防止令牌重放。

自定义字段可以根据业务需求添加，例如：

```json
{
  "sub": "12345",
  "name": "张三",
  "role": "admin"
}
```

Payload 同样被 Base64URL 编码，形成 JWT 的第二部分。**注意**：Payload 默认不加密，任何人都可以解码读取，因此不应包含敏感信息（如密码）。

### 3.3 Signature（签名）

Signature 用于验证 JWT 的完整性和真实性，防止数据被篡改。其生成公式为：

```json
HMACSHA256(
  base64UrlEncode(header) + "." + base64UrlEncode(payload),
  secret
)
```

- **secret**：服务器私有的密钥，仅服务器知道。
- **HMACSHA256**：默认签名算法，也可使用 RSA 等非对称加密算法。

签名后，Header、Payload 和 Signature 通过点号拼接，形成完整的 JWT，例如：

```json
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NSIsIm5hbWUiOiLlvKDkuoYiLCJyb2xlIjoiYWRtaW4iLCJleHAiOjE3MzU2ODk2MDB9.dQw4w9WgXcQ
```

### 3.4 Base64URL 编码

Base64URL 是一种适合 URL 传输的编码方式，与标准 Base64 类似，但有以下调整：

- 去掉填充字符 `=`。
- 将 `+` 替换为 `-`，将 `/` 替换为 `_`。

这确保 JWT 可以在 URL 中安全传输，例如 `api.example.com/?token=xxx`。

## 四、JWT 的使用方式

### 4.1 客户端存储

客户端收到 JWT 后，可以存储在以下位置：

- **Cookie**：通过 `Set-Cookie` 头自动发送，但不适合跨域场景（受同源策略限制）。
- **localStorage/sessionStorage**：适合前后端分离场景，需手动添加到请求头。
- **HTTP 请求头**：推荐方式，将 JWT 放入 `Authorization` 头，例如：

```json
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### 4.2 跨域单点登录

在跨域场景中，JWT 的无状态特性尤为重要。例如：

1. 用户在 A 网站（`a.example.com`）登录，服务器验证后返回 JWT。
2. 客户端将 JWT 存储在 localStorage 或通过 POST 请求传递。
3. 访问 B 网站（`b.example.com`）时，客户端在请求头中携带 JWT。
4. B 网站的服务器使用共享的密钥验证 JWT，提取用户身份（如 `sub`），实现自动登录。

### 4.3 服务器验证

服务器收到 JWT 后：

1. 使用相同的密钥和算法重新计算签名。
2. 比较计算出的签名与 JWT 中的签名是否一致。
3. 检查 Payload 中的 `exp`（过期时间）、`nbf`（生效时间）等字段是否有效。
4. 根据 `sub` 或其他字段确认用户身份，处理请求。

## 五、JWT 的特点与优缺点

### 5.1 特点

1. **无状态性**：服务器不存储会话数据，适合分布式系统和微服务架构。
2. **跨域友好**：JWT 存储在客户端，适合跨域单点登录。
3. **信息交换**：Payload 可携带用户数据，减少服务器查询（如获取用户角色）。
4. **可扩展性**：支持多种签名算法（如 HS256、RS256）和加密方式。

### 5.2 优点

- **扩展性强**：无需共享 session 数据，适合服务器集群和微服务。
- **跨域支持**：通过 HTTP 头或 POST 数据传递 JWT，实现跨域认证。
- **减少服务器开销**：无需在服务器端存储会话，降低内存和数据库压力。
- **标准化**：遵循 RFC 7519 规范，社区支持广泛，库实现丰富（如 `jsonwebtoken`）。

### 5.3 缺点

1. **无法主动失效**：由于无状态设计，服务器无法在过期前主动废除 JWT。例如，用户在设备 A 登录后又在设备 B 登录，设备 A 的 JWT 仍有效，除非添加额外逻辑（如黑名单）。
2. **安全性风险**：JWT 默认不加密，Payload 可被解码，需避免存储敏感信息。
3. **盗用风险**：若 JWT 被窃取（如通过 XSS 攻击），攻击者在有效期内可冒用身份。建议设置较短的过期时间并使用 HTTPS 传输。
4. **数据膨胀**：JWT 包含 Header、Payload 和 Signature，数据量较大，可能增加网络开销。

### 5.4 解决缺点的方法

- **短过期时间**：设置较短的 `exp`（如 15 分钟），配合 refresh token 刷新。
- **黑名单机制**：在 Redis 中维护失效 JWT 的 `jti` 列表，检查令牌是否被废除。
- **防止重放攻击**：使用 `jti` 和一次性 nonce，或在 Payload 中加入时间戳，验证请求的唯一性。
- **加密 JWT**：使用 JWE（JSON Web Encryption）对 Payload 加密，增强安全性。

## 六、JWT 的应用场景

1. **单点登录（SSO）**：在多个子域名或服务间共享用户身份。例如，用户在 `auth.example.com` 登录后，访问 `api.example.com` 时自动认证。
2. **前后端分离**：在 RESTful API 中，客户端（如 React、Vue）通过 JWT 认证用户。
3. **第三方授权**：结合 OAuth 2.0，JWT 作为访问令牌，减少对授权服务器的查询。
4. **移动端认证**：在移动应用中，JWT 适合无状态认证，减少服务器压力。

## 七、实际示例

假设一个简单的登录场景：

1. 用户在前端输入用户名和密码，发送到 `/login` 接口。
2. 服务器验证后，生成 JWT：

```json
{
  "header": {
    "alg": "HS256",
    "typ": "JWT"
  },
  "payload": {
    "sub": "12345",
    "name": "张三",
    "role": "admin",
    "exp": 1735689600,
    "iat": 1735686000
  }
}
```

3. 服务器使用密钥 `my-secret-key` 生成签名，返回 JWT：

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NSIsIm5hbWUiOiLlvKDkuoYiLCJyb2xlIjoiYWRtaW4iLCJleHAiOjE3MzU2ODk2MDAsImlhdCI6MTczNTY4NjAwMH0.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
```

4. 客户端存储 JWT（例如在 localStorage），并在后续请求中添加：

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

5. 服务器验证 JWT 的签名和有效期，提取 `sub` 确认用户身份。

## 八、常见问题解答

### 8.1 如何实现单设备登录？

若要求设备 B 登录后使设备 A 的 JWT 失效，可在服务器端维护一个 Redis 表，记录用户 ID 和最新 JWT 的 `jti`。验证时检查 `jti` 是否匹配，不匹配则拒绝请求。此方案虽引入少量状态，但比 session 管理更轻量。

### 8.2 如何防止 JWT 被盗用？

- 使用 HTTPS 加密传输，防止中间人攻击。
- 设置较短的过期时间（如 15 分钟），并使用 refresh token 刷新。
- 在 Payload 中加入设备指纹（如 IP 或设备 ID），增加验证条件。
- 通过 XSS 防护（如 CSP）防止客户端存储的 JWT 被窃取。

### 8.3 JWT 与 session 的选择

- **选择 JWT 的场景**：跨域认证、前后端分离、分布式系统、第三方授权。
- **选择 session 的场景**：单机系统、高安全性需求、需频繁修改用户权限。

## 九、总结

JWT 是一种轻量、无状态的认证方案，通过将用户身份信息编码为令牌，解决了传统 session 在分布式和跨域场景中的局限性。其标准化的结构（Header、Payload、Signature）和灵活的使用方式使其成为现代 Web 开发的首选认证工具。然而，JWT 的无状态特性也带来了无法主动失效和潜在的安全风险，需要通过短过期时间、黑名单机制和 HTTPS 等措施弥补。理解 JWT 的原理和适用场景，能帮助开发者设计更安全、高效的认证系统。
