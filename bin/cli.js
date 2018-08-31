#!/usr/bin/env node

const semver = require('semver');
const chalk = require('chalk');

if (!semver.satisfies(process.version, '>= 8.0.0')) {
  console.error(chalk.red('The generator will only work with Node v8.0.0 and up!'));
  process.exit(1);
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
  console.log('✨ Done');
});
