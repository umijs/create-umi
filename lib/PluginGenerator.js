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
        message: `What's the plugin name?`,
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
        name: 'useBabel',
        message: `Do you want to compile your code with babel?`,
        type: 'confirm',
        default: false,
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

    this.fs.copy(this.templatePath('plugin', '_gitignore'), this.destinationPath('.gitignore'));
    this.fs.copy(this.templatePath('plugin', 'example'), this.destinationPath('example'));
    this.fs.copy(this.templatePath('plugin/example', '.umirc.js'), this.destinationPath('example/.umirc.js'));
    this.fs.copyTpl(this.templatePath('plugin', 'package.json'), this.destinationPath('package.json'), context);
    this.fs.copyTpl(this.templatePath('plugin', 'LICENSE'), this.destinationPath('LICENSE'), context);
    this.fs.copyTpl(this.templatePath('plugin', 'README.md'), this.destinationPath('README.md'), context);
    if (this.props.useBabel) {
      this.fs.copyTpl(this.templatePath('plugin', 'src', 'index.js'), this.destinationPath('src/index.js'), context);
    } else {
      this.fs.copyTpl(this.templatePath('plugin', 'index.js'), this.destinationPath('index.js'), context);
    }
  }
};
