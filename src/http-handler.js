const fs = require('fs')
const path = require('path')
const { createServer, proxy } = require('tencent-serverless-http')

const { main } = require('./package.json')

let appPath
if (fs.existsSync('./index.js')) {
  appPath = './index'
} else {
  appPath = path.resolve(main)
}

const app = require(appPath)

function getRequestHandler(application) {
  // 目前只兼容 koa 及 express
  // callback 代表 koa app
  return application.callback ? application.callback() : application
}

module.exports.handler = async (event, context) => {
  const server = createServer(getRequestHandler(app), null, app.binaryTypes || [])
  return proxy(server, event, context, 'PROMISE').promise
}
