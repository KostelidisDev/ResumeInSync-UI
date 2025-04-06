'use strict'

const path = require('path')
const { ProvidePlugin, HotModuleReplacementPlugin } = require("webpack")
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const DotenvPlugin = require('webpack-dotenv-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')

const NODE_ENV = process.env.NODE_ENV

const DEVELOPMENT = (NODE_ENV === 'development')

const config = {
  mode: (DEVELOPMENT) ? "development" : "production",
  devtool: (DEVELOPMENT) ? 'cheap-module-source-map' : 'inline-source-map',
  entry: {
    main: path.join(__dirname, '/../src/app/Index.js'),
  },
  output: {
    publicPath: '/',
    path: path.join(__dirname, './../public'),
    filename: (DEVELOPMENT) ? 'js/[name].bundle.js' : 'js/[name].[contenthash].bundle.js',
    clean: true,
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
  optimization: {
    minimizer: [new TerserPlugin()],
    moduleIds: 'deterministic',
    splitChunks: {
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
          maxSize: 512000,
        },
      },
    },
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
        loader: 'url-loader',
        options: {
          prefix: "images",
          limit: 8000,
          mimetype: "image/png"
        }
      },
      {
        test: /\.jpg$/,
        loader: 'url-loader',
        options: {
          prefix: "images",
          limit: 8000,
          mimetype: "image/jpeg"
        }
      },
      {
        test: /\.gif$/,
        loader: 'url-loader',
        options: {
          prefix: "images",
          limit: 8000,
          mimetype: "image/gif"
        }
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
    new DotenvPlugin({
      sample: './.env.example',
      path: (DEVELOPMENT) ? './.env.development' : './.env.production',
      allowEmptyValues: true
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '..', 'src', 'Index.hbs'),
      scriptLoading: 'blocking',
    }),
    new CleanWebpackPlugin.CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, '../src/static'),
          to: 'static'
        }
      ]
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
      chunkFilename: '[id].css'
    }),
    new ProvidePlugin({
      '$': 'jquery',
      'jQuery': 'jquery',
      'Backbone': 'backbone',
      'Backbone.Radio': 'backbone.radio',
      '_': ['underscore','default'],
    })
  ]
}

if (DEVELOPMENT) {
  config.plugins = config.plugins.concat([
    new HotModuleReplacementPlugin()
  ])
}

module.exports = config
