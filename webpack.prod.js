const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');


const buildPath = path.join(__dirname, 'build');

module.exports = {
    devtool: 'cheap-module-source-map',
    entry: ['babel-polyfill', './src/index.jsx'],
    output: {
        path: buildPath,
        filename: '[name].[chunkhash].js',
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                query: {
                    presets: ['react', 'es2015', 'stage-3']
                }
            },
            {
                test: /\.(png|jpg)$/,
                loader: 'url-loader',
                options: {
                    limit: 8192,
                  }
            },
            {
                test: /\.(JPG|png|svg)$/,
                loader: "file-loader",
                options: {
                    name: '[path][name].[ext]',
                }
            },
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        new webpack.optimize.ModuleConcatenationPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            filename: 'vendor.[chunkhash].js',
            minChunks(module) {
                return module.context && module.context.indexOf('node_modules') >= 0;
            }
        }),
        new webpack.optimize.UglifyJsPlugin(),
        new webpack.HashedModuleIdsPlugin(),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html',
            inject: 'body'
        }),
        new CompressionPlugin({
            asset: '[path].gz[query]',
            algorithm: 'gzip',
            test: /\.js$|\.css$|\.html$|\.eot?.+$|\.ttf?.+$|\.woff?.+$|\.svg?.+$/,
            threshold: 10240,
            minRatio: 0.8
        })
    ],
    devServer: {
        historyApiFallback: true,
        proxy: {
            "/api": "http://localhost:3000",
            "/google": "http://localhost:3000"
        }
    }
}