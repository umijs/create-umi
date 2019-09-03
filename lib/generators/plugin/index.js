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
        name: 'isTypeScript',
        type: 'confirm',
        message: 'Do you want to use typescript?',
        default: false,
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

  // lang: ts || js
  isUIFiles(file, lang) {
    const uiFile = lang === 'ts'
      ? 'ui/index.tsx'
      : 'ui/index.js';
    return file === uiFile;
  }

  writing() {
    this.writeFiles({
      context: this.prompts,
      filterFiles: f => {
        const { isTypeScript, withUmiUI } = this.prompts;
        if (isTypeScript) {
          if (f.endsWith('.js')) return false;
          // filter ui files
          if (!withUmiUI && this.isUIFiles(f, 'ts')) return false;
        } else {
          if (this.isTsFile(f)) return false;
          // filter ui files
          if (!withUmiUI && this.isUIFiles(f)) return false;
        }
        return true;
      },
    });
  }
}

module.exports = Generator;
