const Koa = require('koa')

const app = new Koa()

app.use((ctx) => {
  ctx.body = 'hello, world'
})

// app.listen(3030)

module.exports = app
