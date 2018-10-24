const Generator = require('yeoman-generator');
const { basename } = require('path');
const debug = require('debug')('create-umi');

module.exports = class AppGenerator extends Generator {
  constructor(args, opts) {
    super(args, opts);

    this.name = basename(process.cwd());
    this.props = {};
  }

  prompting() {
    const prompts = [
      {
        name: 'react',
        message: 'What functionality do you want to enable?',
        type: 'checkbox',
        choices: [
          { name: 'antd', value: 'antd' },
          { name: 'dva', value: 'dva' },
          { name: 'code splitting', value: 'dynamicImport' },
          { name: 'dll', value: 'dll' },
          { name: 'hard source', value: 'hardSource' },
        ],
      },
    ];
    return this.prompt(prompts).then(props => {
      this.props = Object.assign(this.props, props);
    });
  }

  writing() {
    debug(`this.name: ${this.name}`);
    debug(`this.props: ${JSON.stringify(this.props)}`);

    const context = {
      name: this.name,
      props: this.props,
    };

    this.fs.copy(this.templatePath('app', 'mock', '.*'), this.destinationPath('mock'));
    this.fs.copy(this.templatePath('app', 'src', 'assets'), this.destinationPath('src/assets'));
    this.fs.copy(this.templatePath('app', 'src', 'layouts'), this.destinationPath('src/layouts'));
    this.fs.copy(this.templatePath('app', 'src', 'pages'), this.destinationPath('src/pages'));
    this.fs.copy(this.templatePath('app', 'src', 'global.css'), this.destinationPath('src/global.css'));
    this.fs.copyTpl(this.templatePath('app', 'package.json'), this.destinationPath('package.json'), context);
    this.fs.copy(this.templatePath('app', '_gitignore'), this.destinationPath('.gitignore'));
    this.fs.copy(this.templatePath('app', '.editorconfig'), this.destinationPath('.editorconfig'));
    this.fs.copy(this.templatePath('app', '.env'), this.destinationPath('.env'));
    this.fs.copyTpl(this.templatePath('app', '.umirc.js'), this.destinationPath('.umirc.js'), context);
    this.fs.copy(this.templatePath('app', '.eslintrc'), this.destinationPath('.eslintrc'));
    this.fs.copy(this.templatePath('app', '.prettierrc'), this.destinationPath('.prettierrc'));
    this.fs.copy(this.templatePath('app', '.prettierignore'), this.destinationPath('.prettierignore'));

    if (this.props.react.includes('dva')) {
      this.fs.copy(this.templatePath('app', 'src', 'models', '.*'), this.destinationPath('src/models'));
      this.fs.copyTpl(this.templatePath('app', 'src', 'app.js'), this.destinationPath('src/app.js'), context);
    }
  }
};
