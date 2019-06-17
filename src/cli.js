#!/usr/bin/env node

const program = require('commander');
const { Command } = require('commander')
const pkg = require('../package.json');

const compiler = require('./compiler');
const server = require('./server');
const createConfig = require('./config/create');

Command.prototype.addDefaultOptions = function() {
  this.option('-o, --output <output>', 'output directory', 'dist')
  this.option('-e, --entry <entry>', 'entry point', 'src/index.js')
  return this;
};

const getOptionsFromCommand = (command) => {
  const { entry, output, watch, port, open } = command;
  return { entry, output, watch, port, open};
}

program.version(pkg.version);
program
  .command('build')
  .addDefaultOptions()
  .option('-w, --watch', 'Watch and rebuild (default: off)', false)
  .action((command) => {
    const options = getOptionsFromCommand(command);
    compiler(options);
  });

program
  .command('print')
  .addDefaultOptions()
  .option('-w, --watch', 'Watch and rebuild (default: off)', false)
  .action((command) => {
    const options = getOptionsFromCommand(command);
    const config = createConfig(options);
    console.log(JSON.stringify(config, null, 2));
  });

program
  .command('serve')
  .addDefaultOptions()
  .option('-p, --port <port>', 'Port', 9876)
  .option('--open', 'open browser (default: off)', false)
  .action((command) => {
    const options = getOptionsFromCommand(command);
    server(options);
  });

program.parse(process.argv);

if (!program.args.length) { 
    program.help();
}