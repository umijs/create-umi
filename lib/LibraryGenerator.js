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

    this.fs.copy(this.templatePath('library', 'src', 'index.js'), this.destinationPath('src/index.js'));
    this.fs.copy(this.templatePath('library', 'src', 'index.css'), this.destinationPath('src/index.css'));
    this.fs.copy(this.templatePath('library', 'src', 'index.mdx'), this.destinationPath('src/index.mdx'));
    this.fs.copyTpl(this.templatePath('library', 'package.json'), this.destinationPath('package.json'), context);
    this.fs.copy(this.templatePath('library', '_gitignore'), this.destinationPath('.gitignore'));
    this.fs.copy(this.templatePath('library', 'LICENSE'), this.destinationPath('LICENSE'));
    this.fs.copy(this.templatePath('library', 'README.md'), this.destinationPath('README.md'));
    this.fs.copyTpl(this.templatePath('library', '.umirc.js'), this.destinationPath('.umirc.js'), context);
  }
};
