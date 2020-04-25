const { Component } = require('@serverless/core')
const path = require('path')

class HttpComponent extends Component {
  async default(inputs) {
    inputs = {
      runtime: 'Nodejs10.15',
      handler: 'http-handler.handler',
      include: [],
      ...inputs,
      framework: 'shanyue-koa'
    }

    inputs.include.push(path.join(__dirname, 'src'))

    const framework = await this.load('@serverless/tencent-framework')
    const framworkOutpus = await framework(inputs)

    this.state = framworkOutpus
    await this.save()
    return framworkOutpus
  }

  async remove(inputs = {}) {
    const Framework = await this.load('@serverless/tencent-framework')
    await Framework.remove(inputs)
    this.state = {}
    await this.save()
    return {}
  }
}

module.exports = HttpComponent
