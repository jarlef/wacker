const VueLoaderPlugin = require('vue-loader/lib/plugin')

const apply = (config, options, pkg) => {

    config.module.rules.push({
        test: /\.vue$/,
        loader: 'vue-loader'
      });

    config.resolve.extensions.push('.vue')
    config.plugins.push(new VueLoaderPlugin());
};
    
module.exports = apply;
