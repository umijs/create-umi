const chalk = require('chalk');
const BasicGenerator = require('../../BasicGenerator');

class AntDesignProGenerator extends BasicGenerator {
  async writing() {
    const path = this.opts.name || './';
    const gitArgs = [
      `clone`,
      `https://github.com/umijs/ant-design-pro`,
      `--depth=1`,
      path,
    ];
    console.log(`${chalk.gray('>')} git ${gitArgs.join(' ')}`);
    await require('execa')(
      `git`,
      gitArgs,
    );
  }
}

module.exports = AntDesignProGenerator;
