
const path = require('path');
const webpack = require('webpack');
const getEntryPoints = require('./get-entry-points');

const PeerDepsExternalsPlugin = require('peer-deps-externals-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const applyBuiltins = require('./builtins/apply');

const defaults = {
    watch: false,
    entry: 'src/index.js',
    output: 'dist',
    root: null,
  };

const create = (options) => {

    const pkg = require(path.join(options.root, 'package.json'));

    const config = { 
        context: options.root,
        mode: 'development',
        output: {
            path: path.join(options.root, options.output),
            libraryTarget: 'umd',
            library: pkg.name,
            umdNamedDefine: true,
        },
        resolve: { extensions: [], symlinks: true, modules: [ 'node_modules', path.join(options.root, 'node_modules')] },
        watch: options.watch,
        module: {
            rules: []
        },
        plugins: [
            new webpack.NoEmitOnErrorsPlugin(),
            new PeerDepsExternalsPlugin(),
        ],
    }    

    const aliases = {};
    Object.keys(pkg.dependencies || {}).forEach(d => aliases[d] = path.resolve(path.join(options.root, 'node_modules', d)));
    config.resolve.alias = aliases;
    

    if(options.production) {
        config.plugins.push(new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            //filename: "[name].css",
            //chunkFilename: "[id].css"
            filename: '[name].css'
        }));
    }

    config.entry = getEntryPoints(options);
    
    applyBuiltins(config, options, pkg);

    return config;
}

module.exports = (options = {}) => {
    const root = path.resolve('.');
    const mergedOptions = {...defaults, ...options};
    mergedOptions.root = root;
    mergedOptions.production = !options.watch    
    return create(mergedOptions)
};