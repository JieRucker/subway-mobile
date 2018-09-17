'use strict';
const path = require('path');
const utils = require('./utils');
const webpack = require('webpack');
const config = require('../config');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const cleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const env = require('../config/prod.env');
const api = require('../src/api/apiUrl');
if (process.env.env_config === 'prod') {
  env.api = JSON.stringify(api.build);
} else if (process.env.env_config === 'dev') {
  env.api = JSON.stringify(api.build_dev);
}

const staticUrl = JSON.parse(env.api).staticUrl;

const webpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({
      sourceMap: config.build.productionSourceMap,
      extract: true,
      usePostCSS: true
    })
  },
  devtool: config.build.productionSourceMap ? config.build.devtool : false,
  output: {
    publicPath: staticUrl,
    path: config.build.assetsRoot,
    filename: utils.assetsPath('js/[name].js?v=[chunkhash]'),
    chunkFilename: utils.assetsPath('js/[id].js?v=[chunkhash]')
  },
  plugins: [
    new cleanWebpackPlugin(['dist/*'], {
      root: path.resolve(__dirname, '../')
    }),
    // http://vuejs.github.io/vue-loader/en/workflow/production.html
    new webpack.DefinePlugin({
      'process.env': env
    }),
    new UglifyJsPlugin({
      uglifyOptions: {
        compress: {
          warnings: false
        }
      },
      sourceMap: config.build.productionSourceMap,
      parallel: true
    }),
    // extract css into its own file
    new ExtractTextPlugin({
      filename: utils.assetsPath('css/[name].css?v=[contenthash]'),
      // Setting the following option to `false` will not extract CSS from codesplit chunks.
      // Their CSS will instead be inserted dynamically with style-loader when the codesplit chunk has been loaded by webpack.
      // It's currently set to `true` because we are seeing that sourcemaps are included in the codesplit bundle as well when it's `false`,
      // increasing file size: https://github.com/vuejs-templates/webpack/issues/1110
      allChunks: true,
    }),
    // Compress extracted CSS. We are using this plugin so that possible
    // duplicated CSS from different components can be deduped.
    new OptimizeCSSPlugin({
      cssProcessorOptions: config.build.productionSourceMap ? {safe: true, map: {inline: false}} : {safe: true}
    }),
    // generate dist index.html with correct asset hash for caching.
    // you can customize output by editing /index.html
    // see https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      title: '地铁',
      iconfont: '//at.alicdn.com/t/font_733969_icvberhy4fj.css?v=' + new Date().getTime(),
      jquery: staticUrl + 'static/js/jquery.min.js',
      upload: staticUrl + 'static/js/uploader.min.js',
      template: '!!ejs-loader!./src/template/index.ejs',
      filename: config.build.vmRoot + '/subway/index.vm',
      inject: false,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      },
      chunks: ['manifest', 'vendor', 'app'],
      chunksSortMode: 'dependency'
    }),
    new HtmlWebpackPlugin({
      title: '用户',
      iconfont: '//at.alicdn.com/t/font_458067_txd3eb7dw1giudi.css?v=' + new Date().getTime(),
      jquery: staticUrl + 'static/js/jquery.min.js',
      template: '!!ejs-loader!./src/template/user.ejs',
      filename: config.build.vmRoot + '/subway/user.vm',
      inject: false,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      },
      chunks: ['manifest', 'vendor', 'user'],
      chunksSortMode: 'dependency'
    }),
    new HtmlWebpackPlugin({
      title: 'subway',
      iconfont: '//at.alicdn.com/t/font_733969_icvberhy4fj.css?v=' + new Date().getTime(),
      template: '!!ejs-loader!./src/template/index.ejs',
      filename: config.build.assetsRoot + '/index.html',
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      },
      chunksSortMode: 'dependency'
    }),
    // keep module.id stable when vendor modules does not change
    new webpack.HashedModuleIdsPlugin(),
    // enable scope hoisting
    new webpack.optimize.ModuleConcatenationPlugin(),
    // split vendor js into its own file
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks(module) {
        // any required modules inside node_modules are extracted to vendor
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(
            path.join(__dirname, '../node_modules')
          ) === 0
        )
      }
    }),
    // extract webpack runtime and module manifest to its own file in order to
    // prevent vendor hash from being updated whenever app bundle is updated
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      minChunks: Infinity
    }),
    // This instance extracts shared chunks from code splitted chunks and bundles them
    // in a separate chunk, similar to the vendor chunk
    // see: https://webpack.js.org/plugins/commons-chunk-plugin/#extra-async-commons-chunk
    new webpack.optimize.CommonsChunkPlugin({
      name: 'app',
      async: 'vendor-async',
      children: true,
      minChunks: 3
    }),

    // copy custom static assets
    new CopyWebpackPlugin((() => {
        let array = [];
        const copyPath = {
          '../static': config.build.assetsSubDirectory,
          '../src/libs/jquery/jquery.min.js': 'static/js',
          '../src/libs/uploader/uploader.min.js': 'static/js',
          '../src/template/refresh.vm': [config.build.vmRoot + '/frame'],
        };

        const getArray = (fn) => {
          return (...args) => {
            return fn.apply(this, args)
          }
        };

        const isArray = getArray((args) => {
          return Object.prototype.toString.call(args) === '[object Array]'
        });

        Object.keys(copyPath).forEach(key => {
          const fromTo = (() => {
            return (array, from, to) => {
              array.push({
                from: from,
                to: to
              })
            }
          })();

          isArray(copyPath[key]) ? [...copyPath[key]].forEach(value => {
            fromTo(array, path.resolve(__dirname, key), value)
          }) : fromTo(array, path.resolve(__dirname, key), copyPath[key])
        });

        return array;
      })()
    )
  ]
});

if (config.build.productionGzip) {
  const CompressionWebpackPlugin = require('compression-webpack-plugin');

  webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp(
        '\\.(' +
        config.build.productionGzipExtensions.join('|') +
        ')$'
      ),
      threshold: 10240,
      minRatio: 0.8
    })
  )
}

if (config.build.bundleAnalyzerReport) {
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
  webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = webpackConfig;
