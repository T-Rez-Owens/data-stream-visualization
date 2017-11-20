var path = require('path');
var nodeExternals = require('webpack-node-externals');

module.exports = {
    entry: {
        App: "./app/assets/server/views/scripts/drawPage.js" //The server side script is not run through webpack.
    },

    output: {
        path: path.resolve(__dirname, "./app/assets/server/views/scripts/temp/scripts"),
        filename: "[name].js"
    },

    module: {
        loaders: [
            {
                loader: 'babel-loader',
                query: {
                    presets: ['env']
                },
                test: /\.js$/,
                exclude: /node_modules/
            }
        ]
    }
};