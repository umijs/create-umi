const BasicGenerator = require('../../BasicGenerator');

class Generator extends BasicGenerator {
  prompting() {
    const prompts = [
      {
        name: 'name',
        message: `What's the plugin name?`,
        default: this.name,
      },
      {
        name: 'description',
        message: `What's your plugin used for?`,
      },
      {
        name: 'mail',
        message: `What's your email?`,
      },
      {
        name: 'author',
        message: `What's your name?`,
      },
      {
        name: 'org',
        message: `Which organization is your plugin stored under github?`,
      },
      {
        name: 'withUmiUI',
        type: 'confirm',
        message: 'Does your plugin have ui interaction(umi ui)?',
        default: false,
      },
    ];
    return this.prompt(prompts).then(props => {
      this.prompts = props;
    });
  }

  writing() {
    this.writeFiles({
      context: this.prompts,
      filterFiles: f => {
        if (!this.prompts.withUmiUI && f === 'ui/index.js') return false;
        return true;
      },
    });
  }
}

module.exports = Generator;
