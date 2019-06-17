
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const apply = (config, options) => {
    config.module.rules.push({
        test: /\.scss$/,
        use: [
            options.production ? MiniCssExtractPlugin.loader : 'vue-style-loader', // creates style nodes from JS strings
            'cache-loader',
            'css-loader',
            'sass-loader',
        ]
    });    
};
    
module.exports = apply;
