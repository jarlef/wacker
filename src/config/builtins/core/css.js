
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const apply = (config, options) => {
    config.module.rules.push({
        test: /\.css$/,
        use: [
            options.production ? MiniCssExtractPlugin.loader : 'vue-style-loader', // creates style nodes from JS strings
            'cache-loader',
            'css-loader', // translates CSS into CommonJS
        ]
    });
};
    
module.exports = apply;
