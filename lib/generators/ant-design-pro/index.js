const BasicGenerator = require('../../BasicGenerator');

class AntDesignProGenerator extends BasicGenerator {
  async writing() {
    const path = this.args._[0] || './';
    console.log(`git clone https://github.com/umijs/ant-design-pro ${path}`);
    await require('execa')(
      `git`,
      [
        `clone`,
        `https://github.com/umijs/ant-design-pro`,
        path,
      ],
    );
  }
}

module.exports = AntDesignProGenerator;
