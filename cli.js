#!/usr/bin/env node

const yParser = require('yargs-parser');
const semver = require('semver');
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

if (!semver.satisfies(process.version, '>= 8.0.0')) {
  console.error(chalk.red('✘ The generator will only work with Node v8.0.0 and up!'));
  process.exit(1);
}

const name = args._[0] || '';
const { type } = args;
delete args.type;

(async () => {
  await run({
    name,
    type,
    args,
  });
  process.exit(0);
})();
