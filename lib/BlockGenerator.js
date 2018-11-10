const Generator = require('yeoman-generator');
const { basename } = require('path');
const debug = require('debug')('create-umi');

module.exports = class PluginGenerator extends Generator {
  constructor(args, opts) {
    super(args, opts);

    this.name = basename(process.cwd());
    this.props = {};
  }

  prompting() {
    const prompts = [
      {
        name: 'name',
        message: `What's the block name?`,
        default: this.name,
      },
      {
        name: 'description',
        message: `What's your block description?`,
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
        message: `Which repo is your block stored under github?`,
        default: 'umijs/umi-blocks',
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

    this.fs.copy(this.templatePath('block', '_gitignore'), this.destinationPath('.gitignore'));
    this.fs.copy(this.templatePath('block', '.umirc.js'), this.destinationPath('.umirc.js'));
    this.fs.copy(this.templatePath('block', 'src'), this.destinationPath('src'));
    this.fs.copyTpl(this.templatePath('block', 'package.json'), this.destinationPath('package.json'), context);
    this.fs.copyTpl(this.templatePath('block', 'LICENSE'), this.destinationPath('LICENSE'), context);
    this.fs.copyTpl(this.templatePath('block', 'README.md'), this.destinationPath('README.md'), context);
  }
};
