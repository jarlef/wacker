
const path = require('path');
const getEntryPoints = require('./get-entry-points');
const PeerDepsExternalsPlugin = require('peer-deps-externals-webpack-plugin');

const applyBuiltins = require('./builtins/apply');

const defaults = {
    watch: false,
    entry: 'src/index.js',
    output: 'dist',
    root: null,
  };

const create = (options = {}) => {

    const root = path.resolve('.');
    const pkg = require(path.join(root, 'package.json'));

    const currentOptions = {...defaults, ...options, root};

    
    const config = { 
        context: root,
        mode: 'development',
        output: {
            path: path.join(root, currentOptions.output),
            filename: 'index.js',
        },
        resolve: { extensions: [] },
        watch: currentOptions.watch,
        module: {
            rules: []
        },
        plugins: [
            new PeerDepsExternalsPlugin()
        ]
    }

    config.entry = getEntryPoints(currentOptions);
    
    applyBuiltins(config, currentOptions, pkg);

    return config;
}

module.exports = create;