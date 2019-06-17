const path = require('path');
const fs = require('fs');
const { hasDependency } = require('../../../utils/package-helper');

const apply = (config, options, pkg) => {

    const hasBabelRc = fs.existsSync(path.resolve('./.babelrc')) || 
                       fs.existsSync(path.resolve('./babel.config.js'));;

    const loaderConfig = {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
    };
    
    config.resolve.extensions.push('.js')

    if(!hasBabelRc) {
        loaderConfig.options = {
            presets: [ ['@babel/preset-env', { "modules": false, "loose": true }]],
            plugins: [ '@babel/plugin-transform-runtime']
        };

        if(hasDependency(pkg, 'react')) {
            loaderConfig.options.presets.push('@babel/preset-react');
            config.resolve.extensions.push('.jsx');
        }
    }

    config.module.rules.push(loaderConfig);
};
    
module.exports = apply;
