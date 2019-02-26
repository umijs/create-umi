const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const semver = require('semver');
const mkdirp = require('mkdirp');
const inquirer = require('inquirer');
const clipboardy = require('clipboardy');

const generators = fs.readdirSync(`${__dirname}/generators`)
  .filter(f => !f.startsWith('.'))
  .map(f => {
    return {
      name: `${f.padEnd(15)} - ${chalk.gray(require(`./generators/${f}/meta.json`).description)}`,
      value: f,
      short: f,
    };
	});

const runGenerator = async (generatorPath, {
	name = '',
	cwd = process.cwd(),
}) => {
	return new Promise(resolve => {
		if (name) {
			mkdirp.sync(name);
			cwd = path.join(cwd, name);
		}

		const Generator = require(generatorPath);
		const generator = new Generator({
			name,
			env: {
				cwd,
			},
			resolved: require.resolve(generatorPath),
		});

		return generator.run(() => {
			if (name) {
				clipboardy.writeSync(`cd ${name}`);
				console.log('📋 Copied to clipboard, just use Ctrl+V');
			}
			console.log('✨ File Generate Done');
			resolve(true);
		});
	});
}

const run = async config => {
	if (!semver.satisfies(process.version, '>= 8.0.0')) {
		console.error(chalk.red('✘ The generator will only work with Node v8.0.0 and up!'));
		process.exit(1);
	}

	return inquirer.prompt([
		{
			name: 'type',
			message: 'Select the boilerplate type',
			type: 'list',
			choices: generators,
		},
	]).then(answers => {
		return runGenerator(`./generators/${answers.type}`, config);
	}).catch(e => {
		console.error(chalk.red(`> Generate failed`), e);
		process.exit(1);
	});
}

module.exports = run;
