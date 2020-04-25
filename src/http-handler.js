const { createServer, proxy } = require('tencent-serverless-http')
const { main } = require('./package.json')

// TODO: index.js 会报错，原因未明
const app = require(main || '.')

function getRequestHandler(application) {
  // 目前只兼容 koa 及 express
  // callback 代表 koa app
  return application.callback ? application.callback() : application
}

module.exports.handler = async (event, context) => {
  const server = createServer(getRequestHandler(app), null, app.binaryTypes || [])
  return proxy(server, event, context, 'PROMISE').promise
}
