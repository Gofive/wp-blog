---
title: '为什么大厂微服务内部都在跑 RPC？(附 Go gRPC 极简示例)'
category: 'Technology'
date: '2025-11-23'
tags: ['RPC', 'Backend', 'Architecture', 'gRPC', 'Golang']
---

在单机时代的应用程序中，我们调用一个方法（Function）或者过程（Procedure）通常是非常直观的。只要传递参数、跳转到内存中指定函数的地址执行，最后拿到返回结果即可。

但随着系统复杂度的提高，我们不可避免地需要走向**微服务**与**分布式架构**。当我们需要调用一个部署在几十公里外的另一台服务器上的方法时，问题就来了：**如何像调用本地函数一样，无感知地跨网络层去调用远程服务器上的函数？**

这就是 **RPC（Remote Procedure Call，远程过程调用）** 诞生的核心愿景。

---

## 一、破冰：RPC 的核心工作原理

RPC 的核心思想非常纯粹：**屏蔽底层的网络通信细节（序列化、协议解析、网络传输），让调用方像调本地方法一样发起网络请求。**

为了实现这个愿景，RPC 架构通常包含五个极其关键的组件，我们称之为“RPC 的五脏六腑”：

1. **Client（客户端）**：业务代码里真正发起调用的地方。
2. **Client Stub（客户端存根 / 代理）**：它是本地的一个“壳”，负责把客户端传递的参数、方法名打包（序列化）成能够在网络上流转的二进制流，发给远程。
3. **Transport / Network（网络传输模块）**：负责跨机器底层的网络通信（TCP、HTTP/2，甚至是 QUIC 等）。
4. **Server Stub（服务端存根 / 代理）**：接收到二进制流后，进行解包（反序列化），并根据方法名，找到本地真正的业务逻辑进行执行。
5. **Server（服务端）**：真正的业务逻辑提供者。

> 💡 **通俗的例子**：
> 客户端（你）想向 服务端（跨国公司）下订单。
> 客户端 Stub 就像你的贴身翻译兼快递员，他把你的需求（调用参数）翻译成通用外联密文（序列化），打包丢给快递公司（网络传输层）；快递公司漂洋过海送到对方公司的收发室处理人手中（服务端 Stub），收发室解码后交由内部的加工厂（Server）真正处理。

---

## 二、对比：为什么内部通信更青睐 RPC 而不是 RESTFul API？

RESTful（HTTP + JSON）是我们最常见的前后端交互手段，但为什么主流大厂（如阿里、Google）的内部微服务调用几乎都在用 RPC（Dubbo、gRPC）？

| 对比维度         | RESTful API                                      | RPC 框架                                       |
| :--------------- | :----------------------------------------------- | :--------------------------------------------- |
| **设计理念**     | 面向**资源（Resource）**的表述和状态转移         | 面向**动作（Action）**的过程调用命令           |
| **传输协议**     | 通常强制绑定于 HTTP/1.1                          | 灵活，基于自研的高性能 TCP 或 HTTP/2 协议      |
| **序列化**       | 绝大多数为 JSON（字符串格式、带大量键名冗余）    | Protobuf、Hessian2 等紧密二进制格式            |
| **速度与包体积** | 较重，解析开销大                                 | 体积小、解析极速，非常适合高并发低延迟内部调用 |
| **使用场景**     | 对应用层面（如提供给前端或第三方平台的入口接口） | 公司内网的高频微服务解耦与后台调用             |

通过表格一眼就能发现，内部微服务链路常常极多，从入口网关可能要经过四五层内部系统的调用。如果使用由于 JSON 体积臃肿、HTTP/1.1 连接等问题带来的耗时，请求链就会变得极其缓慢。RPC 的序列化压缩和跨网络调用的开销更低，是必然的选择。

---

## 三、实战干货：基于 Golang + gRPC 的极简体验

空谈概念不够，下面我们以谷歌大名鼎鼎的 **gRPC** 为例，用 Go 语言撸一个最简单的“打招呼”微服务通信系统。

### 1. 定义接口规约 (IDL: Interface Definition Language)

首先我们需要起草一个双方都能理解的“黑话手册”，gRPC 中使用 `Protocol Buffers` 作为默认 IDL。创建一个名为 `hello.proto` 的文件：

```protobuf
syntax = "proto3";

// 定义服务层
service Greeter {
  // 定义一个名叫 SayHello 的远程方法
  rpc SayHello (HelloRequest) returns (HelloReply) {}
}

// 客户端发出的请求参数
message HelloRequest {
  string name = 1; // 1是标识符标号，保证二进制传输结构稳定
}

// 服务端返回的响应结果
message HelloReply {
  string message = 1;
}
```

编写完毕后，利用工具命令（`protoc`）就能自动为客户端和服务端生成对应的存根（Stub）骨架代码，它帮我们包办了所有网络流序列化的脏活累活。

### 2. 编写服务端 (Server) 提供真实方法

接下来，在 Server 端编写真实业务执行逻辑并启动监听：

```go
package main

import (
	"context"
	"log"
	"net"

	"google.golang.org/grpc"
	pb "your_project/hello" // 这里引入刚才由 proto 生成的包
)

// 实现定义的协议接口
type server struct {
	pb.UnimplementedGreeterServer
}

// 核心：实现远程要调用的业务逻辑函数
func (s *server) SayHello(ctx context.Context, in *pb.HelloRequest) (*pb.HelloReply, error) {
	log.Printf("Received: %v", in.GetName())
	// 拼接返回体
	return &pb.HelloReply{Message: "Hello, " + in.GetName() + "!"}, nil
}

func main() {
    // 监听本地 50051 端口
	lis, err := net.Listen("tcp", ":50051")
	if err != nil {
		log.Fatalf("failed to listen: %v", err)
	}

    // 创建底层 gRPC 服务实例
	s := grpc.NewServer()
	pb.RegisterGreeterServer(s, &server{})

    log.Println("RPC Server is running at :50051...")

    // 启动服务阻塞等待
	if err := s.Serve(lis); err != nil {
		log.Fatalf("failed to serve: %v", err)
	}
}
```

### 3. 编写调用方 (Client) 轻松发起诉求

到了客户端这里，由于已经有了 Stub 的辅助，写跨机器的网络调用，就和平常写同一个项目下的文件调用简直一模一样！

```go
package main

import (
	"context"
	"log"
	"time"

	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials/insecure"
	pb "your_project/hello"
)

func main() {
	// 连接远程服务（为了演示忽略了证书加密配置）
	conn, err := grpc.Dial("localhost:50051", grpc.WithTransportCredentials(insecure.NewCredentials()))
	if err != nil {
		log.Fatalf("did not connect: %v", err)
	}
	defer conn.Close()

    // 实例化一个 Stub 客户端
	client := pb.NewGreeterClient(conn)

	// 发起无感知的 "远程" 呼叫
	ctx, cancel := context.WithTimeout(context.Background(), time.Second)
	defer cancel()

    // 就像在调用本地写好的函数一样自然
	response, err := client.SayHello(ctx, &pb.HelloRequest{Name: "IMWIND"})
	if err != nil {
		log.Fatalf("could not greet: %v", err)
	}

	log.Printf("Greeting Result: %s", response.GetMessage())
    // 会输出 -> Greeting Result: Hello, IMWIND!
}
```

你看，客户端开发者甚至不需要碰到一行像 `http.Get("...")` 这样充满网络细节的代码，直接传入对应的结构体传参、返回值接收。强类型系统也会在编译层面为你拦截低级的拼写差错。

---

## 四、写在最后：大型工业级 RPC 还要解决什么？

对于一个成熟的技术架构，光能“连通”往往是不够的。我们在学习阿里 Dubbo 或微服务体系时，会发现 RPC 框架越来越像一个全家桶。这是因为在千万级别的真实并发生产环境下，RPC 工具链还要额外处理海量的**服务治理（Service Governance）**工作：

- **服务注册与发现**：成百上千台服务器不停地上下线，客户端怎么知道请求往哪个真实 IP 发送才能找到相应的微服务？（引入 Nacos、Zookeeper、Etcd 等注册中心）。
- **负载均衡机制**：下游如果有 10 个提供同样接口的节点资源，客户端应该轮询还是根据权重散列分发？
- **熔断与限流降级**：当调用的下游服务器突然崩溃导致大堵车时，RPC 该怎么立刻感知并熔断阻断请求来保护系统整体不雪崩？
- **全链路追踪**：如果一个前台请求依次跨越了 5 个核心应用节点的 RPC 调用，在哪里卡顿了怎么排查？（引入 SkyWalking 或 Zipkin）。

可以说，**你所认为的微服务拆分，往往就是由高可用的 RPC 不断演进而搭建成的庞大桥梁**。了解并利用好内部的二进制 RPC 网络层，是每一位后端走向资深技术专家的必由之路。
