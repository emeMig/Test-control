const HtmlWebPackPlugin         = require('html-webpack-plugin');
const MiniCssExtractPlugin      = require('mini-css-extract-plugin');
const CssMinimizerPlugin        = require('css-minimizer-webpack-plugin');
const CopyPlugin                = require('copy-webpack-plugin');
const MinifyPlugin              = require('babel-minify-webpack-plugin');
const path                      = require('path');
const { CleanWebpackPlugin }    = require('clean-webpack-plugin');
//const { loader } = require('mini-css-extract-plugin');

module.exports = {

    mode: 'production',
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    'babel-loader'
                ]
            },
            {
                test: /\.css$/,
                exclude: /styles\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /styles\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ]
            },
            {
                test: /\.html$/i,
                loader: 'html-loader',
                options: {
                    // Disables attributes processing
                    sources: false,
                    minimize: false,
                },
            },
            {
                test: /\.(png|svr|jpg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            esModule: false,
                        }
                    }

                ]
            }            
        ]
    },
    optimization: {
        minimize: true,
        minimizer: [
            new CssMinimizerPlugin()
        ]
    },
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'main.[contenthash].js',
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: './src/index.html',
            title: 'App Build',
            filename: 'index.html'
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css',
            ignoreOrder: false,
        }),
        new CopyPlugin({
            patterns: [
                {
                    from: 'src/assets',
                    to: 'assets/'
                }
            ]
        }),
        new MinifyPlugin( ),
        new CleanWebpackPlugin( ),
    ]

}