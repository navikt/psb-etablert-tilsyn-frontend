const process = require('process');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const cssExtractLoaderConfig = {
    loader: MiniCssExtractPlugin.loader,
};

const nodeModules = path.resolve(__dirname, '../node_modules');

module.exports = {
    entry: path.resolve(__dirname, '../', 'src') + '/app.ts',
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.css'],
    },
    module: {
        rules: [
            {
                test: /\.(ts|js)x?$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                },
            },
            {
                test: /\.css$/,
                use: [
                    cssExtractLoaderConfig,
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                            modules: {
                                localIdentName: '[name]_[local]_[contenthash:base64:5]',
                            },
                        },
                    },
                ],
                exclude: [nodeModules],
            },
            {
                test: /\.(less|css)?$/,
                use: [
                    cssExtractLoaderConfig,
                    {
                        loader: 'css-loader',
                    },
                    {
                        loader: 'less-loader',
                        options: {
                            lessOptions: {
                                modifyVars: {
                                    nodeModulesPath: '~',
                                    coreModulePath: '~',
                                },
                            },
                        },
                    },
                ],
                include: [nodeModules],
            },
            {
                test: /\.(jpg|png|svg)$/,
                loader: 'file-loader',
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'styles.css',
        }),
    ],
};
