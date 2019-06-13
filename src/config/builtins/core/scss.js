
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const apply = (config, options) => {
    config.module.rules.push({
        test: /\.scss$/,
        use: [
            options.production ? MiniCssExtractPlugin.loader : 'style-loader', // creates style nodes from JS strings
            'css-loader',
            'sass-loader',
        ]
    });    
};
    
module.exports = apply;
