const Generator = require('yeoman-generator');
const yParser = require('yargs-parser');
const glob = require('glob');
const { statSync } = require('fs');
const { basename } = require('path');
const debug = require('debug')('create-umi:BasicGenerator');

function noop() {
  return true;
}

class BasicGenerator extends Generator {
  constructor(args, opts) {
    super(args, opts);
    this.args = yParser(args);
    this.name = basename(opts.env.cwd);
  }

  writeFiles({ context, filterFiles = noop }) {
    debug(`context: ${JSON.stringify(context)}`);
    glob
      .sync('**/*', {
        cwd: this.templatePath(),
        dot: true,
      })
      .filter(filterFiles)
      .forEach(file => {
        debug(`copy ${file}`);
        const filePath = this.templatePath(file);
        if (statSync(filePath).isFile()) {
          this.fs.copyTpl(
            this.templatePath(filePath),
            this.destinationPath(file.replace(/^_/, '.')),
            context,
          );
        }
      });
  }
}

module.exports = BasicGenerator;
