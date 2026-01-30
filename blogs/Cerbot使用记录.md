````markdown
---
title: 'Certbot 实战：使用 Webroot 模式实现证书自动续期'
category: 'Technology'
date: '2025-01-30'
tags: ['Certbot', 'Nginx', 'HTTPS', 'SSL']
---

在为移动端应用配置 **Universal Links** 或微信分享域名（如 `auth.imwind.cc`）时，HTTPS 是强制性的安全要求。虽然 Certbot 默认的 `--nginx` 插件可以一键完成配置，但它会自动修改 Nginx 配置文件，这在生产环境或复杂配置下往往不够稳健。

本文将介绍如何使用 **Webroot 模式**，在不侵入原有 Nginx 逻辑的前提下，实现证书的自动化获取与续期。

## 一、 为什么选择 Webroot 模式？

相比于直接让 Certbot 接管 Nginx 配置，Webroot 模式具有以下优势：

1.  **非侵入性**：Certbot 只负责在指定目录生成验证文件，不会触碰你的 `nginx.conf`，避免配置被意外搞乱。
2.  **可控性高**：你可以自由定义 HTTPS 相关的 SSL 参数（如 HSTS、加密套件等）。
3.  **兼容性强**：适用于 Docker 容器化环境或复杂的反向代理架构。

## 二、 工作原理：验证与分离

Webroot 的工作原理非常简单：Certbot 在你的 Web 根目录下放置一个临时文件，Let's Encrypt 的服务器通过 HTTP 访问这个文件，验证你对该域名的所有权。

## 三、 实战配置步骤

### 1. 准备验证专用目录

为了不影响业务代码，建议创建一个独立的目录专门用于存放 Let's Encrypt 的挑战文件（Challenge file）：

```bash
sudo mkdir -p /var/www/letsencrypt
```
````

### 2. 配置 Nginx 响应验证请求

在你的 Nginx HTTP（80 端口）配置中，添加一个特定的 `location` 块。

```nginx
server {
    listen 80;
    server_name auth.imwind.cc;

    # 关键配置：让 Certbot 的验证请求指向我们创建的目录
    location ^~ /.well-known/acme-challenge/ {
        allow all;
        root /var/www/letsencrypt;
        default_type "text/plain";
    }

    # 其他所有请求强制重定向到 HTTPS
    location / {
        return 301 https://$host$request_uri;
    }
}

```

### 3. 使用 Certbot 申请证书

执行以下命令。注意我们使用了 `certonly` 参数，这告诉 Certbot “只管拿证书，别动我的配置”。

```bash
sudo certbot certonly --webroot \
    -w /var/www/letsencrypt \
    -d auth.imwind.cc \
    --email your-email@example.com \
    --agree-tos

```

### 4. 手动部署证书

成功后，证书文件会出现在 `/etc/letsencrypt/live/auth.imwind.cc/` 目录下。你只需在 Nginx 的 443 端口配置中手动引用：

```nginx
ssl_certificate /etc/letsencrypt/live/[auth.imwind.cc/fullchain.pem](https://auth.imwind.cc/fullchain.pem);
ssl_certificate_key /etc/letsencrypt/live/[auth.imwind.cc/privkey.pem](https://auth.imwind.cc/privkey.pem);

```

## 四、 实现无人值守的自动续期

Let's Encrypt 的证书有效期为 90 天。由于我们是手动配置的 Nginx，证书续期后，Nginx 进程并不知道文件已更新。我们需要通过 **Deploy Hook** 自动重载 Nginx。

### 自动化钩子配置

在 Certbot 的续期任务中加入重载命令：

```bash
# 测试续期并注册重载钩子
sudo certbot renew --dry-run --deploy-hook "nginx -s reload"

```

这样，每次证书更新成功后，Certbot 都会自动执行 `nginx -s reload`，确保网站始终使用最新的证书。

## 五、 总结

Webroot 模式是 Certbot 方案中最灵活的一种。对于需要高稳定性的 API 域名或 App 关联域名（如 `auth.imwind.cc`）来说，这种方式既保证了证书的安全获取，又维持了服务器配置的纯净。

```

```
