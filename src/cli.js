#!/usr/bin/env node

const program = require('commander');

const pkg = require('../package.json');

const compiler = require('./compiler');
const server = require('./server');
const createConfig = require('./config/create');

program.version(pkg.version);
program
  .command('build')
  .option('-w, --watch', 'Watch and rebuild')
  .option('-o, --output <output>', 'output directory')
  .option('-e, --entry <entry>', 'entry point')
  .action((command) => {
    compiler(command);
  });

program
  .command('print')
  .option('-w, --watch', 'Watch and rebuild')
  .option('-o, --output <output>', 'output directory')
  .option('-e, --entry <entry>', 'entry point')
  .action((command) => {
    console.log(createConfig(command));
  });

program
  .command('serve')
  .option('-p, --port <port>', 'Port', 9876)
  .option('-o, --output <output>', 'output directory')
  .option('-e, --entry <entry>', 'entry point')
  .action((command) => {
    server(command);
  });

program.parse(process.argv);

if (!program.args.length) { 
    program.help();
}