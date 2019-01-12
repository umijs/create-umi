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
        name: 'useBabel',
        message: `Do you want to compile your code with babel?`,
        type: 'confirm',
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
      filterFiles: (f) => {
        if (this.prompts.useBabel && f === 'index.js') return false;
        if (!this.prompts.useBabel && f === 'src/index.js') return false;
        return true;
      },
    });
  }
};

module.exports = Generator;
