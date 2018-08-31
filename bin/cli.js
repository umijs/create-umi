#!/usr/bin/env node

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

const script = process.argv[2];
if (script === '-v' || script === '--version') {
  console.log(require('../package').version);
  if (existsSync(join(__dirname, '../.local'))) {
    console.log(chalk.cyan('@local'));
  }
  process.exit(0);
}

if (script) {
  mkdirp.sync(script);
  process.chdir(script);
}

const BasicGenerator = require('../lib/BasicGenerator');
const generator = new BasicGenerator(process.argv.slice(2), {
  name: 'basic',
  env: {
    cwd: process.cwd(),
  },
  resolved: __dirname,
});
generator.run(() => {
  if (script) {
    clipboardy.writeSync(`cd ${script}`);
    console.log('📋  Copied to clipboard, just use Ctrl+V');
  }
  console.log('✨  File Generate Done');
});
