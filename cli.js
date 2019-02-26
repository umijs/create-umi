#!/usr/bin/env node

const yParser = require('yargs-parser');
const { existsSync } = require('fs');
const { join } = require('path');
const chalk = require('chalk');
const run = require('./lib/run');

// print version and @local
const args = yParser(process.argv.slice(2));

if (args.v || args.version) {
  console.log(require('./package').version);
  if (existsSync(join(__dirname, '.local'))) {
    console.log(chalk.cyan('@local'));
  }
  process.exit(0);
}

const name = args._[0] || '';

run({
  name,
});
