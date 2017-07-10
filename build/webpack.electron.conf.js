'use strict'

process.env.BABEL_ENV = 'main'

const path = require('path')
const { dependencies } = require('../package.json')
const config = require('../config');
const webpack = require('webpack');

module.exports = (env = {}) => {
    const isProduction = !!env.production;

    const mainConfig = {
        entry: {
            main: path.join(__dirname, `../src/electron/${isProduction ? "index.ts" : "index.dev.ts"}`)
        },
        externals: [
            ...Object.keys(dependencies || {})
        ],
        module: {
            rules: [
                {
                    test: /\.ts$/,
                    exclude: /node_modules|src\/renderer/,
                    use: [
                        // {loader: 'babel-loader'},
                        // {
                        //     loader:'ts-loader',
                        //     options: {

                        //     }
                        // }
                        {
                            loader: "awesome-typescript-loader",
                            options: {
                                configFileName: path.join(__dirname, "build/tsconfig.electron.json")
                            }
                        }
                    ]
                },
                {
                    test: /\.js$/,
                    use: 'babel-loader',
                    exclude: /node_modules/
                },
                {
                    test: /\.node$/,
                    use: 'node-loader'
                }
            ]
        },
        node: {
            __dirname: !isProduction,
            __filename: !isProduction
        },
        output: {
            filename: '[name].js',
            libraryTarget: 'commonjs2',
            path: config.build.assetsRoot
        },
        plugins: [
            new webpack.NoEmitOnErrorsPlugin(),
            isProduction ?
                new webpack.DefinePlugin({ 'process.env': config.build.env }) :
                new webpack.DefinePlugin({ '__static': `"${path.join(__dirname, '../src/static').replace(/\\/g, '\\\\')}"` })
        ],
        resolve: {
            extensions: ['.ts', '.js', '.json', '.node']
        },
        target: 'electron-main'
    };

    return mainConfig;
}



