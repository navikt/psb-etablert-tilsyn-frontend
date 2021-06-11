const webpack = require('webpack');
const path = require('path');
const { merge } = require('webpack-merge');
const TerserPlugin = require('terser-webpack-plugin');
const commonWebpackConfig = require('./webpack.common.js');
const pkg = require('./../package.json');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

const version = pkg.version;
const versionSegments = version.split('.');
const majorVersion = versionSegments[0];

module.exports = merge(commonWebpackConfig, {
    mode: 'production',
    output: {
        filename: 'app.js',
        path: path.resolve(__dirname, `../build/${majorVersion}`),
    },
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin({ extractComments: false }), new CssMinimizerPlugin()],
    },
    performance: {
        maxAssetSize: 400000,
        maxEntrypointSize: 600000,
    },
});
