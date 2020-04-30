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
        type: 'list',
        message: 'Select the development language',
        choices: [
          {
            name: 'TypeScript',
            value: true,
          },
          {
            name: 'JavaScript',
            value: false,
          },
        ],
        default: true,
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
    const uiFile = lang === 'ts' ? 'ui/index.tsx' : 'ui/index.jsx';
    return file === uiFile;
  }

  writing() {
    this.writeFiles({
      context: this.prompts,
      filterFiles: f => {
        const { isTypeScript = true, withUmiUI } = this.prompts;
        if (isTypeScript) {
          if (f.endsWith('.js') || f.endsWith('.jsx')) return false;
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
