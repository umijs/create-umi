const chalk = require('chalk');
const BasicGenerator = require('../../BasicGenerator');

class AntDesignProGenerator extends BasicGenerator {
  async writing() {
    const path = this.args._[0] || './';
    const args = [
      `clone`,
      `https://github.com/umijs/ant-design-pro`,
      `--depth=1`,
      path,
    ];
    console.log(`${chalk.gray('>')} git ${args.join(' ')}`);
    await require('execa')(
      `git`,
      args,
    );
  }
}

module.exports = AntDesignProGenerator;
