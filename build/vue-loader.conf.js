var utils = require('./utils')
var config = require('../config')
var isProduction = process.env.NODE_ENV === 'production'

module.exports = {
    loaders: Object.assign({
        ts: "awesome-typescript-loader"
    }, utils.cssLoaders({
        sourceMap: isProduction
            ? config.build.productionSourceMap
            : config.dev.cssSourceMap,
        extract: isProduction
    })),
    esModule: true,
    postcss: [
        require('autoprefixer')({
            browsers: ['last 2 versions']
        })
    ]
}
