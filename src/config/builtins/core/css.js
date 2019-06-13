
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const apply = (config, options) => {
    config.module.rules.push({
        test: /\.css$/,
        use: [
            options.production ? MiniCssExtractPlugin.loader : 'style-loader', // creates style nodes from JS strings
            'css-loader', // translates CSS into CommonJS
        ]
    });

    if(options.production) {
        config.plugins.push(new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            //filename: "[name].css",
            //chunkFilename: "[id].css"
            filename: 'index.css'
        }));
    }
};
    
module.exports = apply;
