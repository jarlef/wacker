const path = require('path');
const fs = require('fs');
const { hasDependency } = require('../../../utils/package-helper');

const apply = (config, options, pkg) => {

    const hasBabelRc = fs.existsSync(path.resolve('./.babelrc')) || 
                       fs.existsSync(path.resolve('./babel.config.js'));;
    const hasTsConfig = fs.existsSync(path.resolve('./tsconfig.json')); 

    const react = hasDependency(pkg, 'react');
    const typescript = hasDependency(pkg, 'typescript') || hasTsConfig;
                   
    const babelLoader = { loader: 'babel-loader' };
    const loaders = [
        'cache-loader',
        babelLoader];
    if(typescript) {

        const tsLoader = { loader: 'ts-loader' };

        if(hasTsConfig) {
            tsLoader.options = require(path.resolve('./tsconfig.json'));
        }

        loaders.push(tsLoader);
    }

    const loaderConfig = {
            test: /\.(js|jsx|ts|tsx)$/,
            exclude: /node_modules/,
            use: loaders,
    };
    
    config.resolve.extensions.push('.js')
    config.resolve.extensions.push('.ts')
    config.resolve.extensions.push('.jsx')
    config.resolve.extensions.push('.tsx')
    config.module.rules.push(loaderConfig);

    if(hasBabelRc) {
        return;
    }

    const babelOptions = {
        presets: [ ['@babel/preset-env', { "modules": false, "loose": true }]],
        plugins: [ '@babel/plugin-transform-runtime'],
    };

    if(react) {
        babelOptions.presets.push('@babel/preset-react');
    }

    if(typescript) {
        babelOptions.presets.push('@babel/preset-typescript');
    }
    
    babelLoader.options = babelOptions;

};
    
module.exports = apply;
