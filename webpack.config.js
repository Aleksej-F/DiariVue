const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const { VueLoaderPlugin}  = require('vue-loader')

module.exports = {
    //mode: 'development',
    mode: 'production',
    
    entry: './js/common.js',
    output: {
        filename: 'bundle.js',
    },
    module: {
        rules: [
        {
            test: /\.vue$/,
            loader: 'vue-loader'
        },
        // это будет применяться к файлам `.js`
        // А ТАКЖЕ к секциям `<script>` внутри файлов `.vue`
        {
            test: /\.js$/,
            //исключения
            exclude: (/node_modules/),
            loader: 'babel-loader'
        },
        // это будет применяться к файлам `.css`
        // А ТАКЖЕ к секциям `<style>` внутри файлов `.vue`
        
        {
            test: /\.css$/,
            use: [
                MiniCssExtractPlugin.loader,
                'vue-style-loader',
                'css-loader'
            ]
        }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({ template: './index.html' }),
        // убедитесь что подключили плагин!
        new VueLoaderPlugin(),
        //new webpack.HotModuleReplacementPlugin(),
        new MiniCssExtractPlugin({
            filename: 'styles.css'
        })
    ],
    resolve: {
        extensions: ['vue'],
        alias: {
          Utilities: path.resolve(__dirname, 'js/components/'),
          
        },
      },
}