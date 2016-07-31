'use strict';
var path = require('path');
var webpack = require('webpack');

var env = process.env.NODE_ENV;

var config = {
    devtool: 'cheap-module-eval-source-map',
    entry: [
        'babel-polyfill',
        path.resolve(__dirname, 'index.js')
    ],
    output: {
        path: path.resolve(__dirname, 'public/js/'),
        filename: 'bundle.js',
        publicPath: '/js/'
    },
    plugins: [
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
