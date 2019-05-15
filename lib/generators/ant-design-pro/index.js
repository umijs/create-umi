const chalk = require('chalk');
const BasicGenerator = require('../../BasicGenerator');

class AntDesignProGenerator extends BasicGenerator {
  writing() {
    this.writeFiles({
      context: {
        name: this.name,
        ...this.prompts,
      },
    });
  }
}

module.exports = AntDesignProGenerator;
