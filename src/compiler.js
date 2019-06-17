

const chalk = require('chalk');
const webpack = require('webpack');			
const createConfig = require('./config/create');

const statsPresetToOptions = webpack.Stats.presetToOptions;

const log = (message) => {
  process.stdout.clearLine();
  process.stdout.cursorTo(0);
  process.stdout.write(message);
  //console.log(message);
}

const logInfo = (info) => {
  console.clear();

  console.log(chalk.cyan('Assets:'))

  info.chunks.forEach(c => {
    c.files.forEach(f => {
      console.log(chalk.yellow(`- ${f}`))
    })
  });

  console.log();
  const time = info.time > 1000 ? `${(info.time / 1000).toFixed(1)} seconds` : `${info.time} ms`;
  console.log(chalk.green(`Build time: ${time}`));
  console.log();
}

const create = (options = {}) => {

  console.clear();

  log(chalk.cyan(`Starting build...`));
  const config = createConfig(options);

  let compiler = webpack(config, (err, stats) => { // Stats Object
    if (err) {
        console.error(err.stack || err);
        if (err.details) {
          console.error(err.details);
          process.exit(1);
        }
        return;
      }
    
      let outputOptions = statsPresetToOptions({});
      const info = stats.toJson(outputOptions);
    
      if (stats.hasErrors()) {
        console.log(chalk.red(info.errors));
      }

      if (stats.hasWarnings()) {
        console.log(chalk.yellow(info.warnings));
      }

      logInfo(info);
  });

  if(compiler.compiler) {
    compiler = compiler.compiler;
  }

  compiler.hooks.beforeCompile.tap('app', (context, entry) => {
    log(chalk.cyan(`Building...`));
  });
};

module.exports = create;