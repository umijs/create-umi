#!/usr/bin/env node

const yParser = require('yargs-parser');
const { existsSync } = require('fs');
const { join } = require('path');
const semver = require('semver');
const chalk = require('chalk');
const mkdirp = require('mkdirp');
const clipboardy = require('clipboardy');

if (!semver.satisfies(process.version, '>= 8.0.0')) {
  console.error(chalk.red('✘ The generator will only work with Node v8.0.0 and up!'));
  process.exit(1);
}

const args = yParser(process.argv.slice(2));
if (args.v || args.version) {
  console.log(require('../package').version);
  if (existsSync(join(__dirname, '../.local'))) {
    console.log(chalk.cyan('@local'));
  }
  process.exit(0);
}

if (args._.length) {
  mkdirp.sync(args._[0]);
  process.chdir(args._[0]);
}

let Generator;
if (args.plugin) {
  Generator = require('../lib/PluginGenerator');
} else if (args.block) {
  Generator = require('../lib/BlockGenerator');
} else {
  Generator = require('../lib/AppGenerator');
};
const generator = new Generator(process.argv.slice(2), {
  name: 'basic',
  env: {
    cwd: process.cwd(),
  },
  resolved: __dirname,
});
generator.run(() => {
  if (args._[0]) {
    clipboardy.writeSync(`cd ${args._[0]}`);
    console.log('📋  Copied to clipboard, just use Ctrl+V');
  }
  console.log('✨  File Generate Done');
});
