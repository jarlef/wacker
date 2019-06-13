

const chalk = require('chalk');
const webpack = require('webpack');			
const createConfig = require('./config/create');

const statsPresetToOptions = webpack.Stats.presetToOptions;

const log = (message) => {
  //process.stdout.clearLine();
  //process.stdout.cursorTo(0);
  //process.stdout.write(message);
  console.log(message);
}

const logInfo = (info) => {
  //console.clear();

  console.log(chalk.blue('Output:'))

  info.chunks.forEach(c => {
    console.log(chalk.blue(`${c.files[0]}:\t${c.size}`))
  });

  console.log();
  console.log(chalk.green(`Build time:\t${info.time}`));
}

const create = (options = {}) => {

  console.clear();

  log(chalk.blue(`Starting build...`));
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
    log(chalk.blue(`Rebuilding...`));
  });
};

module.exports = create;