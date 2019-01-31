const debug = require('debug')('create-umi:generator');
const BasicGenerator = require('../../BasicGenerator');

class Generator extends BasicGenerator {
  prompting() {
    const prompts = [
      {
        name: 'isTypeScript',
        type: 'confirm',
        message: 'Do you want to use typescript?',
        default: false,
      },
      {
        name: 'reactFeatures',
        message: 'What functionality do you want to enable?',
        type: 'checkbox',
        choices: [
          { name: 'antd', value: 'antd' },
          { name: 'dva', value: 'dva' },
          { name: 'code splitting', value: 'dynamicImport' },
          { name: 'dll', value: 'dll' },
          { name: 'internationalization', value: 'locale' },
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
      context: {
        name: this.name,
        ...this.prompts,
      },
      filterFiles: (f) => {
        const { isTypeScript, reactFeatures } = this.prompts;
        if (isTsFile(f)) {
          if (!isTypeScript) return false;
        }
        if (f.endsWith('.js') && f !== '.umirc.js') {
          if (isTypeScript) return false;
        }
        if (f.startsWith('src/models') || f === 'src/app.js' || f === 'src/app.ts') {
          if (!reactFeatures.includes('dva')) return false;
        }
        if (f.startsWith('src/locales') || f.includes('umi-plugin-locale')) {
          if (!reactFeatures.includes('locale')) return false;
        }
        return true;
      },
    });
  }
};

module.exports = Generator;
