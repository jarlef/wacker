

const apply = (config, options, pkg) => {

    config.module.rules.push({
        test: /\.svelte$/,
        use: {
          loader: 'svelte-loader',
          options: {
            emitCss: true,
            hotReload: options.watch
          },
        },
      },
    );

    config.resolve.extensions.push('.svelte')
};
    
module.exports = apply;
