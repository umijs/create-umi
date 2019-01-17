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
        name: 'lang',
        message: 'Which of the following ways are you going to develop in?',
        type: 'list',
        choices: [
          { name: 'with Babel', value: 'with Babel' },
          { name: 'without Babel', value: 'without Babel' },
          { name: 'TypeScript', value: 'TypeScript' },
        ],
      },
    ];
    return this.prompt(prompts).then(props => {
      this.prompts = props;
    });
  }

  writing() {
    function isTsFile(f) {
      return f.endsWith('.ts')
        || f.endsWith('.tsx')
        || [
          'tsconfig.json',
          'typings.d.ts',
          'tslint.yml',
        ].includes(f);
    }

    this.writeFiles({
      context: this.prompts,
      filterFiles: (f) => {
        const { lang } = this.prompts;
        if (f.startsWith('example/')) {
          return true;
        }
        if (isTsFile(f)) {
          if (lang !== 'TypeScript') return false;
        }
        if (f.endsWith('.js')) {
          if (lang === 'TypeScript') return false;
          if (lang === 'with Babel' && f === 'index.js') return false;
          if (lang === 'without Babel' && f === 'src/index.js') return false;
        }
        return true;
      },
    });
  }
};

module.exports = Generator;
