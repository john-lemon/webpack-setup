'use strict';

const path = require('path');
const NODE_ENV = process.env.NODE_ENV || 'development';
const webpack = require('webpack');

let ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    context: __dirname + '/src',
    entry: {
        javascript: './app.js'
      },
    output: {
        path: path.join(__dirname, 'bundle'),
        filename: 'app.js'
    },

    resolve: {
        extensions: ['', '.js', '.jsx', '.styl', '.css'],
        modulesDirectories: ['node_modules', '.']
    },

    devtool: NODE_ENV == 'development' ? "cheap-inline-module-source-map" : null,

    module: {


        noParse: [
            /\.min\.js/,
        ],

        loaders: [
            {
                test: /\.js$/,
                exlude: /node_modules/,
                loaders: [
                    'babel?' + JSON.stringify({
                        presets: ['es2015', 'stage-0', 'react']
                    })
                ]
            }, {
                test: /\.styl$/,
                exlude: /node_modules/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader!stylus-loader')
            }
        ]

    },

    watchOptions: {
        poll: 100
    },

    plugins: [
        new ExtractTextPlugin('app.css'),

        new webpack.ProvidePlugin({
            Promise: 'imports?this=>global!exports?global.Promise!es6-promise',
            fetch: 'imports?this=>global!exports?global.fetch!whatwg-fetch',
        }),

        new webpack.NoErrorsPlugin(),

        new webpack.DefinePlugin({
            NODE_ENV: JSON.stringify(process.env.NODE_ENV)
        }),
    ],

    devServer: {
        host: 'localhost',
        port: 3000,
        historyApiFallback: true
    }
};
