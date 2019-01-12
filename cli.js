#!/usr/bin/env node

const yParser = require('yargs-parser');
const { existsSync, readdirSync } = require('fs');
const { join } = require('path');
const semver = require('semver');
const chalk = require('chalk');
const mkdirp = require('mkdirp');
const inquirer = require('inquirer');
const clipboardy = require('clipboardy');

if (!semver.satisfies(process.version, '>= 8.0.0')) {
  console.error(chalk.red('✘ The generator will only work with Node v8.0.0 and up!'));
  process.exit(1);
}

// print version and @local
const args = yParser(process.argv.slice(2));
if (args.v || args.version) {
  console.log(require('./package').version);
  if (existsSync(join(__dirname, '.local'))) {
    console.log(chalk.cyan('@local'));
  }
  process.exit(0);
}

const generators = readdirSync(`${__dirname}/lib/generators`)
  .filter(f => !f.startsWith('.'))
  .map(f => {
    return {
      name: `${f.padEnd(15)} - ${chalk.gray(require(`./lib/generators/${f}/meta.json`).description)}`,
      value: f,
      short: f,
    };
  });

inquirer.prompt([
  {
    name: 'type',
    message: 'Select the boilerplate type',
    type: 'list',
    choices: generators,
  },
]).then(answers => {
  runGenerator(`./lib/generators/${answers.type}`);
}).catch(e => {
  console.error(chalk.red(`> Generate failed`));
  console.log(e);
  process.exit(1);
});

function runGenerator(generatorPath) {
  let cwd = process.cwd();

  if (args._.length) {
    mkdirp.sync(args._[0]);
    cwd = join(cwd, args._[0]);
  }

  const Generator = require(generatorPath);
  const generator = new Generator(process.argv.slice(2), {
    name: '_',
    env: {
      cwd,
    },
    resolved: require.resolve(generatorPath),
  });
  generator.run(() => {
    if (args._[0]) {
      clipboardy.writeSync(`cd ${args._[0]}`);
      console.log('📋  Copied to clipboard, just use Ctrl+V');
    }
    console.log('✨  File Generate Done');
  });
}
