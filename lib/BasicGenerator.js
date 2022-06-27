const Generator = require('yeoman-generator');
const glob = require('glob');
const { statSync } = require('fs');
const { basename } = require('path');
const debug = require('debug')('create-umi:BasicGenerator');

function noop() {
  return true;
}

class BasicGenerator extends Generator {
  constructor(opts) {
    super(opts);
    this.opts = opts;
    this.name = basename(opts.env.cwd);
  }

  isTsFile(f) {
    return f.endsWith('.ts') || f.endsWith('.tsx') || !!/(tsconfig\.json)/g.test(f);
  }

  writeFiles({ context, filterFiles = noop }) {
    // We have multiple welcome file, random this
    const welcomeImages = glob
      .sync('**/assets/welcomeImgs/*', {
        cwd: this.templatePath(),
        dot: true,
      })
      .filter(filterFiles);

    if (welcomeImages.length) {
      const welcomeImg = welcomeImages[Math.floor(Math.random() * welcomeImages.length)];
      debug(`copy ${welcomeImg}`);

      this.fs.copyTpl(
        this.templatePath(welcomeImg),
        this.destinationPath(welcomeImg.replace(/welcomeImgs.*$/, 'yay.jpg')),
        context,
      );
    }

    debug(`context: ${JSON.stringify(context)}`);
    glob
      .sync('**/*', {
        cwd: this.templatePath(),
        dot: true,
      })
      .filter(filterFiles)
      .filter((file) => !file.includes('welcomeImgs'))
      .forEach((file) => {
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

  prompt(questions) {
    process.send && process.send({ type: 'prompt' });
    process.emit('message', { type: 'prompt' });
    return super.prompt(questions);
  }
}

module.exports = BasicGenerator;
