'use strict';

const NODE_ENV = process.env.NODE_ENV || 'development';
const webpack = require('webpack');

let ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    context: __dirname + '/src',
    entry: './app',
    output: {
        path: __dirname + '/dist',
        publicPath: '/',
        filename: 'app.js'
    },


    devtool: NODE_ENV == 'development' ? "cheap-inline-module-source-map" : null,


    module: {

        noParse: [
            /\.min\.js/,
        ],

        loaders: [
            {
                test: /\.js$/,
                exclude: /\/node_modules\//,
                loader: 'babel',
                query: {
                  presets: ['es2015'],
                  plugins: ['transform-runtime']
                }
            }, 
            {
                test: /\.styl$/,
                exclude: /\/node_modules\//,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader!stylus-loader')
            },
            {
                test: /\.jpg$/,
                loader: 'file-loader?name=/images/[name].[ext]'
            },
            {
                test: /\.(png|svg)$/,
                loader: 'url-loader?name=/images/[name].[ext]&limit=4096'
            },
            {
                test: /\.(ttf|eot|woff|woff2)$/,
                loader: 'file-loader?name=/fonts/[name].[ext]'
            }
        ]
    },

    plugins: [
        new ExtractTextPlugin('style.css')
    ],

    devServer: {
        host: 'localhost',
        port: 8080
    }
};

if (NODE_ENV == 'production') {
    module.exports.plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                drop_console: true,
                unsafe: true,
            }
        })
    )
}
