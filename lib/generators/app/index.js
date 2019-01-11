const debug = require('debug')('create-umi:generator');
const BasicGenerator = require('../../BasicGenerator');

class Generator extends BasicGenerator {
  prompting() {
    const prompts = [
      {
        name: 'reactFeatures',
        message: 'What functionality do you want to enable?',
        type: 'checkbox',
        choices: [
          { name: 'antd', value: 'antd' },
          { name: 'dva', value: 'dva' },
          { name: 'code splitting', value: 'dynamicImport' },
          { name: 'dll', value: 'dll' },
        ],
      },
    ];
    return this.prompt(prompts).then(props => {
      this.prompts = props;
    });
  }

  writing() {
    this.writeFiles({
      context: {
        name: this.name,
        ...this.prompts,
      },
      filterFiles: (f) => {
        if (f.startsWith('src/models') || f === 'src/app.js') {
          return this.prompts.reactFeatures.includes('dva');
        }
        return true;
      },
    });
  }
};

module.exports = Generator;
