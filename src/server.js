
const middleware = require('webpack-dev-middleware');
const hotMiddleware = require('webpack-hot-middleware');
const express = require('express');
const createConfig = require('./config/create');

const webpack = require('webpack');
const open = require('open');
const hotMiddlewareScript = 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true';
//const hotMiddlewareScript = 'webpack-hot-middleware/client';

const create = (options) => {
  const config = createConfig({...options, watch: true});

  Object.keys(config.entry).forEach((key) => config.entry[key] = [config.entry[key], hotMiddlewareScript])

  config.plugins.push(new webpack.HotModuleReplacementPlugin());


  const compiler = webpack(config);
  const app = express();

  app.use(
    middleware(compiler, {
      writeToDisk: false,
      stats: true,
      publicPath: '/'
    })
  );

  app.use(hotMiddleware(compiler));
  app.listen(options.port, () => console.log(`Dev server listing on http://localhost:${options.port}`));
  if(options.open) {
    open(`http://localhost:${options.port}`);
  }
};

module.exports = create;