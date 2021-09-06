const webpack = require('webpack');
const path = require('path');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackDevServer = require('webpack-dev-server');
const commonWebpackConfig = require('./webpack.common.js');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const webpackConfig = merge(commonWebpackConfig, {
    mode: 'development',
    devtool: 'inline-source-map',
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../index.html'),
        }),
        new ForkTsCheckerWebpackPlugin({
            typescript: {
                diagnosticOptions: {
                    semantic: true,
                    syntactic: true,
                },
                mode: 'write-references',
            },
        }),
    ],
});

const port = 8081;
const devServerOptions = {
    hot: true,
    headers: {
        'Access-Control-Allow-Origin': 'http://localhost:9000',
    },
    port,
};

const compiler = webpack(webpackConfig);
const devServer = new WebpackDevServer(devServerOptions, compiler);
compiler.close(() => console.info('Compiler closed'));

devServer.startCallback((error) => {
    if (error) {
        console.error(error);
    } else {
        console.log(`Listening at port ${port}`);
    }
});
