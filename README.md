# Serverless Http Component for Tencent Cloud

快速在腾讯云上部署 `express` 及 `koa` 应用，并可以充分集成 `typescript`，`babel` 等转译工具。本工具基于腾讯云的 [tencent-framework](https://github.com/serverless-components/tencent-framework)

## 快速开始

根据我的模板进行创建，这是一个简单结合 `koa` 及 `typescript` 的示例。关于本示例使用请移至 [tencent-koa-ts](https://github.com/shfshanyue/serverless-template-zh/tree/master/tencent-koa-ts)

```bash
$ serverless install --url https://github.com/shfshanyue/serverless-template-zh/tree/master/tencent-koa-ts --name koa-function
```

## 部署到腾讯云

```bash
# 部署到腾讯云
$ sls
koa-function [████████████████████████████████████████] 100% | ETA: 0s | Speed: 314.98k/

  koa-app:
    functionName:        koa-function
    functionOutputs:
      ap-guangzhou:
        Name:        koa-function
        Runtime:     Nodejs10.15
        Handler:     http-handler.handler
        MemorySize:  128
        Timeout:     60
        Region:      ap-guangzhou
        Namespace:   default
        Description: This is a function created by serverless component
    region:              ap-guangzhou
    apiGatewayServiceId: service-dture22u
    url:                 https://service-dture22u-1257314149.gz.apigw.tencentcs.com/release/
    cns:                 (empty array)

  11s › koa-app › done
```

## 自定义配置

```yaml
app:
  component: sls-component-http
  inputs:
    region: ap-guangzhou
    functionName: app-demo
    runtime: Nodejs10.15
    functionConf:
      timeout: 60
      memorySize: 128
    apigatewayConf:
      protocols:
        - https
      environment: release
```

更多配置参见 [tencent framework configure](https://github.com/serverless-components/tencent-framework/blob/master/docs/configure.md)

## 服务器框架

你可以从任意服务器框架中导出 `HttpServer` 作为入口文件，并在 `package.json` 中的 `main` 字段中标明入口文件位置。

因此你可以使用任意的转译工具，如 `typescript` 及 `babel`，只需要注意在 `package.json` 中标明编译后入口文件位置。

### Koa

```js
const Koa = require('koa')

const app = new Koa()

app.use((ctx) => {
  ctx.body = 'hello, world'
})

module.exports = app
```

### Express

```js
const express = require('express')
const app = express()

// Routes
app.get(`/*`, (req, res) => {
  res.send('hello, world)
})

module.exports = app
```

## 注意点

1. 如入口文件并非 `index.js`，请在 `package.json` 中 `main` 字段标明位置
1. 严格区分 `dep` 及 `devDep`，避免在部署时因为 `node_modules` 过大而造成速度过慢
1. 如使用 `typescript` 等编译工具，请使用 `inputs.exclude` 排除源文件及编译工具
