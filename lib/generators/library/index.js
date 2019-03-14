const BasicGenerator = require('../../BasicGenerator');

class Generator extends BasicGenerator {
  prompting() {
    const prompts = [
      {
        name: 'name',
        message: `What's the library name?`,
        default: this.name,
      },
      {
        name: 'description',
        message: `What's your library description?`,
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
        name: 'repo',
        message: `Which repo is your library stored under github?`,
      },
      {
        name: 'isTypeScript',
        type: 'confirm',
        message: 'Do you want to use typescript?',
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
        const { isTypeScript } = this.prompts;
        if (isTypeScript) {
          if (f.endsWith('.js')) return false;
        } else {
          if (this.isTsFile(f)) return false;
        }
        return true;
      },
    });
  }
}

module.exports = Generator;
