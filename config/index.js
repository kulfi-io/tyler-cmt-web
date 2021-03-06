'use strict'
const path = require('path');

module.exports = {
    dev: {
        // Paths
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
        proxyTable: {},

        // Dev Server Settings
        host: '127.0.0.1',
        port: 3000,
        autoOpenBrowser: true,
        errorOverlay: true,
        noptifyOnErrors: false,
        poll: false,

        // Source Map
        devtool: '#eval-source-map',
        cacheBusting: true,
        cssSourceMap: true,
    },
    build: {
        index: path.resolve(__dirname, '../app/index.html'),
        assetsRoot: path.resolve(__dirname, '../app'),
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',

        // Source Map
        productionSourceMap: true,
        devtool: '#source-map',
        productionGzip: false,
        productionGzipExtentions: ['js', 'css', 'animations'],
        bundleAnalyzerReport: process.env.npm_config_report
    }
}