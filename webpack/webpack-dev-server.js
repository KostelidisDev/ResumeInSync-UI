const NODE_ENV = process.env.NODE_ENV
const DEVELOPMENT = (NODE_ENV === 'development')
const ENV_FILE=(DEVELOPMENT) ? '.env.development' : '.env.production'

/* eslint-disable */
require('dotenv')
  .config({ path: ENV_FILE })

const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const config = require('./webpack.config')

const WEB_PROTOCOL = process.env.WEB_APP_PROTOCOL
const WEB_IP = process.env.WEB_APP_IP
const WEB_PORT = process.env.WEB_APP_PORT

new WebpackDevServer(webpack(config), {
  https: (WEB_PROTOCOL === 'https'),
  publicPath: config.output.publicPath,
  host: WEB_IP,
  stats: false,
  historyApiFallback: true,
  contentBase: 'public',
  compress: false,
  headers: {
    'Access-Control-Allow-Origin': '*'
  }
}).listen(WEB_PORT, WEB_IP, function (err) {
  if (err) {
    return console.log(err)
  }
})
