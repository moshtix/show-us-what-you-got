var webpack = require('webpack'),
    HtmlWebpackPlugin = require('html-webpack-plugin')
;

var HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
    template: __dirname + '/src/index.html',
    filename: 'index.html',
    inject: 'body'
});

// export webpack config
module.exports = {
    devtool: 'source-map',
    entry: [
        './src/app.js'
    ],
    output: {
        path: __dirname + '/lib',
        filename: "bundle.js"
    },
    resolve: {
        modules: ['node_modules', './src'],
        extensions: ['.js', '.jsx', '.css', '.scss' ]
    },

    // declare loaders to be used in webpack
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loaders: ['babel-loader']
            },
            {
                test: /\.scss$|\.css$/i,
                loaders: ["style-loader", "css-loader", "sass-loader"]
            }
        ]
    },
    // initialize the added webpack plugins
    plugins: [
        HTMLWebpackPluginConfig,
        new webpack.HotModuleReplacementPlugin()
    ]
};
