'use strict';
var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var env = process.env.NODE_ENV;

var config = {
    devtool: 'cheap-module-eval-source-map',
    entry: [
        'babel-polyfill',
        path.resolve(__dirname, 'index.js'),
        path.resolve(__dirname, 'public/assets/bootstrap-3.3.7/css/bootstrap.css'),
        path.resolve(__dirname, 'public/css/main.css')
    ],
    output: {
        path: path.resolve(__dirname, 'public/js/'),
        filename: 'bundle.js',
        publicPath: '/js/'
    },
    plugins: [
        new ExtractTextPlugin('css/[main].css', { allChunks: true }),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify(env)
            }
        }),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ],
    module: {
        loaders: [
            {
                test: /.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                loader: "style-loader!css-loader"
            },
            {
                test: /\.(png|jpg|jpeg|gif)$/,
                exclude: /node_modules/,
                loader: require.resolve("url-loader")
            },
            {
                test: /\.(svg|eot|otf|ttf|woff|woff2)$/,
                exclude: /node_modules/,
                loader: require.resolve("url-loader")
            }
        ]
    },
    devServer: {
        devtool: 'eval',
        colors: true,
        contentBase: './public/js',
        hot: true,
        proxy: {
            '/*': {
                target: 'http://smt-finder.local'
            }
        },
    }
};

if (env === 'production') {
    config.plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            compressor: {
                pure_getters: true,
                unsafe: true,
                unsafe_comps: true,
                screw_ie8: true,
                warnings: false
            }
        })
    )
}

module.exports = config;
