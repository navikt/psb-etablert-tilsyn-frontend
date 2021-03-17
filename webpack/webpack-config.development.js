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

const devServerOptions = {
    hot: true,
    headers: {
        'Access-Control-Allow-Origin': 'http://localhost:9000',
    },
};
WebpackDevServer.addDevServerEntrypoints(webpackConfig, devServerOptions);

const compiler = webpack(webpackConfig);
const devServer = new WebpackDevServer(compiler, devServerOptions);
compiler.close(() => console.info('Compiler closed'));

const port = 8081;
devServer.listen(port, 'localhost', (error) => {
    if (error) {
        return console.error(error);
    }
    console.log(`Listening at port ${port}`);
});
