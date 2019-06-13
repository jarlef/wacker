
const middleware = require('webpack-dev-middleware');
const hotMiddleware = require('webpack-hot-middleware');
const express = require('express');
const createConfig = require('./config/create');

const webpack = require('webpack');

const create = (options = {}) => {
  const config = createConfig(options);

    config.entry = [
      ...[].concat(config.entry),
      'webpack-hot-middleware/client'
    ].filter(Boolean);

  config.plugins.push(new webpack.HotModuleReplacementPlugin());


  const compiler = webpack(config);

  const app = express();
  


  app.use(
    middleware(compiler, {
      writeToDisk: false,
      stats: false,
      publicPath: '/'
    })
  );

  app.use(hotMiddleware(compiler));

  app.listen(options.port, () => console.log(`Dev server listing on http://localhost:${options.port}`));
};

module.exports = create;