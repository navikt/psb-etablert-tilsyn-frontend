const webpack = require('webpack');
const path = require('path');
const { merge } = require('webpack-merge');
const TerserPlugin = require('terser-webpack-plugin');
const commonWebpackConfig = require('./webpack.common.js');
const pkg = require('./../package.json');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = merge(commonWebpackConfig, {
    mode: 'production',
    output: {
        filename: 'app.js',
        path: path.resolve(__dirname, `../build/${pkg.version}`),
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
