const Generator = require('yeoman-generator');
const { basename } = require('path');
const yParser = require('yargs-parser');
const debug = require('debug')('create-umi');

module.exports = class AppGenerator extends Generator {
  constructor(args, opts) {
    super(args, opts);

    this.isTypeScript = yParser(args).ts;
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

    const tempPath = this.isTypeScript?'tsapp':'app';

    this.fs.copy(this.templatePath(tempPath, 'mock', '.*'), this.destinationPath('mock'));
    this.fs.copy(this.templatePath(tempPath, 'src', 'assets'), this.destinationPath('src/assets'));
    this.fs.copy(this.templatePath(tempPath, 'src', 'layouts'), this.destinationPath('src/layouts'));
    this.fs.copy(this.templatePath(tempPath, 'src', 'pages'), this.destinationPath('src/pages'));
    this.fs.copy(this.templatePath(tempPath, 'src', 'global.css'), this.destinationPath('src/global.css'));
    this.fs.copy(this.templatePath(tempPath, 'package.json'), this.destinationPath('package.json'));
    this.fs.copy(this.templatePath(tempPath, '_gitignore'), this.destinationPath('.gitignore'));
    this.fs.copy(this.templatePath(tempPath, '.editorconfig'), this.destinationPath('.editorconfig'));
    this.fs.copy(this.templatePath(tempPath, '.env'), this.destinationPath('.env'));

    if(this.isTypeScript){
      this.fs.copy(this.templatePath(tempPath, 'public'), this.destinationPath('public'));
      this.fs.copyTpl(this.templatePath(tempPath, 'config', 'config.js'), this.destinationPath('config/config.js'),context);
      this.fs.copy(this.templatePath(tempPath, 'dva.d.ts'), this.destinationPath('dva.d.ts'));
      this.fs.copy(this.templatePath(tempPath, 'jest.config.js'), this.destinationPath('jest.config.js'));
      this.fs.copy(this.templatePath(tempPath, 'tsconfig.json'), this.destinationPath('tsconfig.json'));
      this.fs.copy(this.templatePath(tempPath, 'tsconfig.prod.json'), this.destinationPath('tsconfig.prod.json'));
      this.fs.copy(this.templatePath(tempPath, 'tsconfig.test.json'), this.destinationPath('tsconfig.test.json'));
      this.fs.copy(this.templatePath(tempPath, 'tslint.json'), this.destinationPath('tslint.json'));
      this.fs.copy(this.templatePath(tempPath, 'typings.d.ts'), this.destinationPath('typings.d.ts'));
    }else{
      this.fs.copyTpl(this.templatePath(tempPath, '.umirc.js'), this.destinationPath('.umirc.js'), context);
      this.fs.copy(this.templatePath(tempPath, '.eslintrc'), this.destinationPath('.eslintrc'));
      this.fs.copy(this.templatePath(tempPath, '.prettierrc'), this.destinationPath('.prettierrc'));
      this.fs.copy(this.templatePath(tempPath, '.prettierignore'), this.destinationPath('.prettierignore'));
    }
    if (this.props.react.includes('dva')) {
      this.fs.copy(this.templatePath(tempPath, 'src', 'models', this.isTypeScript?'*.*':'.*'), this.destinationPath('src/models'));
      this.fs.copyTpl(this.templatePath(tempPath, 'src', 'app.js'), this.destinationPath('src/app.js'), context);
    }
  }
};
