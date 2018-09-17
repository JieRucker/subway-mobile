'use strict'
const utils = require('./utils')
const config = require('../config')
const isProduction = process.env.NODE_ENV === 'production'
const sourceMapEnabled = isProduction
  ? config.build.productionSourceMap
  : config.dev.cssSourceMap

const switchLoaders = () => {
  if (isProduction) {
    return utils.cssLoaders({
      sourceMap: sourceMapEnabled,
      extract: true
    })
  } else {
    return {
      css: 'vue-style-loader!css-loader',
      less: 'vue-style-loader!css-loader!less-loader',
      sass: 'vue-style-loader!css-loader!sass-loader',
    }
  }
};

module.exports = {
  loaders: switchLoaders(),
  cssSourceMap: sourceMapEnabled,
  cacheBusting: config.dev.cacheBusting,
  transformToRequire: {
    video: ['src', 'poster'],
    source: 'src',
    img: 'src',
    image: 'xlink:href'
  }
};
/*module.exports = {
  loaders: utils.cssLoaders({
    sourceMap: sourceMapEnabled,
    extract: isProduction
  }),
  cssSourceMap: sourceMapEnabled,
  cacheBusting: config.dev.cacheBusting,
  transformToRequire: {
    video: ['src', 'poster'],
    source: 'src',
    img: 'src',
    image: 'xlink:href'
  }
}*/
