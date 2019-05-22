const path = require('path');
const chalk = require('chalk');
const del = require('del');
const BasicGenerator = require('../../BasicGenerator');

class AntDesignProGenerator extends BasicGenerator {
  async writing() {
    const projectName = this.opts.name || './';
    const gitArgs = [ `clone`, `https://github.com/ant-design/ant-design-pro`, `--depth=1` ];

    // Set branch if provided
    if (this.opts.args.branch) {
      gitArgs.push('--branch', this.opts.args.branch);
    }

    gitArgs.push(projectName);

    console.log(`${chalk.gray('>')} git ${gitArgs.join(' ')}`);
    await require('execa')(`git`, gitArgs);

    const projectPath = path.resolve(projectName);
    const packageJsonPath = path.resolve(projectPath, 'package.json');
    const pkg = require(packageJsonPath);

    if (pkg['create-umi'] && pkg['create-umi'].ignore) {
      console.log(`${chalk.gray('>')} clean up...`);
      const ignoreFiles = pkg['create-umi'].ignore;
      del.sync(ignoreFiles, { cwd: projectPath });
    }
  }
}

module.exports = AntDesignProGenerator;
