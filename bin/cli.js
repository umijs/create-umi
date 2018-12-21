#!/usr/bin/env node

const yParser = require('yargs-parser');
const { existsSync } = require('fs');
const { join } = require('path');
const semver = require('semver');
const chalk = require('chalk');
const mkdirp = require('mkdirp');
const inquirer = require('inquirer');
const clipboardy = require('clipboardy');
const debug = require('debug')('create-umi:cli');

if (!semver.satisfies(process.version, '>= 8.0.0')) {
  console.error(chalk.red('✘ The generator will only work with Node v8.0.0 and up!'));
  process.exit(1);
}

// print version and @local
const args = yParser(process.argv.slice(2));
if (args.v || args.version) {
  console.log(require('../package').version);
  if (existsSync(join(__dirname, '../.local'))) {
    console.log(chalk.cyan('@local'));
  }
  process.exit(0);
}

if (args.plugin) {
  runGenerator(require('../lib/PluginGenerator'));
} else if (args.block) {
  runGenerator(require('../lib/BlockGenerator'));
} else {
  inquirer.prompt([
    {
      name: 'type',
      message: 'Select the boilerplate type',
      type: 'list',
      choices: [
        'project',
        'ant-design-pro',
        'plugin',
        'block',
      ],
    }
  ]).then(answers => {
    debug(`answer, type: ${answers.type}`);
    switch (answers.type) {
      case 'ant-design-pro':
        cloneAntdPro()
          .catch(e => {
            console.log(`Clone failed: ${e}`);
          });
        break;
      case 'project':
        runGenerator(require('../lib/AppGenerator'));
        break;
      case 'plugin':
        runGenerator(require('../lib/PluginGenerator'));
        break;
      case 'block':
        runGenerator(require('../lib/BlockGenerator'));
        break;
      default:
        break;
    }
  });
}

function runGenerator(Generator) {
  // create with child path
  if (args._.length) {
    mkdirp.sync(args._[0]);
    process.chdir(args._[0]);
  }

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
}

async function cloneAntdPro() {
  console.log(`git clone https://github.com/umijs/ant-design-pro ${args._[0] || './'}`);
  await require('execa')(
    `git`,
    [
      `clone`,
      `https://github.com/umijs/ant-design-pro`,
      args._[0] || './',
    ],
  );
}
