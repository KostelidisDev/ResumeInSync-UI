'use strict'

const path = require('path')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const DotenvPlugin = require('webpack-dotenv-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')

const NODE_ENV = process.env.NODE_ENV

const DEVELOPMENT = (NODE_ENV === 'development')

const config = {
  devtool: (DEVELOPMENT) ? 'cheap-module-source-map' : 'false',
  entry: {
    app: [path.join(__dirname, '/../src/app/Index.js')]
  },
  output: {
    path: path.join(__dirname, './../public'),
    filename: 'js/[name].js',
    chunkFilename: 'js/[name].bundle.js',
    publicPath: '/'
  },
  resolve: {
    modules: ['src', 'node_modules'],
    alias: {
      app: path.resolve(__dirname, '..', 'src', 'app')
    }
  },
  performance: {
    hints: (DEVELOPMENT) ? "warning" : false,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: ['@babel/preset-env'],
        },
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          {
            loader: 'css-loader',
            options: {
              url: true
            }
          }
        ]
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.png$/,
        loader: 'url-loader?prefix=images/&limit=8000&mimetype=image/png'
      },
      {
        test: /\.jpg$/,
        loader: 'url-loader?prefix=images/&limit=8000&mimetype=image/jpeg'
      },
      {
        test: /\.gif$/,
        loader: 'url-loader?prefix=images/&limit=8000&mimetype=image/gif'
      },
      {
        test: /\.hbs$/,
        loader: 'handlebars-loader'
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader',
        options: {
          limit: 8192,
          name: '[name].[ext]',
          outputPath: 'fonts'
        }
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': `'${process.env.NODE_ENV}'`
    }),
    new DotenvPlugin({
      sample: './.env.example',
      path: (DEVELOPMENT) ? './.env.development' : './.env.production',
      allowEmptyValues: true
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '..', 'src', 'Index.hbs'),
      inject: false,
      alwaysWriteToDisk: true,
    }),
    new CleanWebpackPlugin.CleanWebpackPlugin(),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../src/static'),
        to: 'static'
      }
    ]),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
      chunkFilename: '[id].css'
    })
  ]
}

if (DEVELOPMENT) {
  config.mode = 'development'
  config.plugins = config.plugins.concat([
    new webpack.HotModuleReplacementPlugin()
  ])
} else {
  config.mode = 'production'
  config.plugins = config.plugins.concat([
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
      chunkFilename: '[id].css'
    })
  ])
  config.optimization = {
    minimizer: [new TerserPlugin()],
    namedModules: true,
    namedChunks: true,
    moduleIds: 'hashed',
  }
}

module.exports = config
