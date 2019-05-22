const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');
const glob = require('glob');
const exec = require('execa');
const BasicGenerator = require('../../BasicGenerator');

const TMP_JS_FOLDER = 'tsc_tmp';

function log(...args) {
  console.log(`${chalk.gray('>')}`, ...args);
}

function globList(patternList, options) {
  let fileList = [];
  patternList.forEach((pattern) => {
    fileList = [...fileList, ...glob.sync(pattern, options)];
  });

  return fileList;
}

class AntDesignProGenerator extends BasicGenerator {
  prompting() {
    const prompts = [
      {
        name: 'isTypeScript',
        type: 'confirm',
        message: 'Do you want to use typescript?',
        default: true,
      },
    ];
    return this.prompt(prompts).then((props) => {
      this.prompts = props;
    });
  }

  async writing() {
    const { isTypeScript } = this.prompts;

    const projectName = this.opts.name || './';
    const projectPath = path.resolve(projectName);

    const envOptions = {
      cwd: projectPath,
    };

    const gitArgs = [ `clone`, `https://github.com/ant-design/ant-design-pro`, `--depth=1` ];

    // Set branch if provided
    if (this.opts.args.branch) {
      gitArgs.push('--branch', this.opts.args.branch);
    }

    gitArgs.push(projectName);

    // Clone remote branch
    log(`git ${gitArgs.join(' ')}`);
    await exec(`git`, gitArgs);

    const packageJsonPath = path.resolve(projectPath, 'package.json');
    const pkg = require(packageJsonPath);

    // Handle js version
    if (!isTypeScript) {
      log('Prepare js version...');

      await exec(`npm`, [ 'install', '--no-save', 'typescript', 'prettier' ], envOptions);

      log('Compiling ts files...');
      try {
        await exec(`npx`, [ 'tsc', '--sourceMap', 'false', '--allowJs', 'false', '--outDir', TMP_JS_FOLDER ], envOptions);
      } catch (err) {
        // We don't care ts error message
      }

      log('Prettier code...');
      await exec(`npx`, [ 'prettier', '--write', `${TMP_JS_FOLDER}/**/*.js` ], envOptions);

      log('Write files...');
      const jsFiles = glob.sync(`${TMP_JS_FOLDER}/**/*.js`, envOptions);
      jsFiles.forEach(filePath => {
        const sourcePath = path.resolve(projectPath, filePath);
        const targetPath = path.resolve(projectPath, filePath.slice(TMP_JS_FOLDER.length + 1));
        fs.moveSync(sourcePath, targetPath);
      });

      log('Remove tmp files...');
      fs.removeSync(path.resolve(projectPath, 'node_modules'));
      fs.removeSync(path.resolve(projectPath, TMP_JS_FOLDER));
      const tsFiles = globList(['**/*.ts', '**/*.tsx'], envOptions);
      tsFiles.forEach((filePath) => {
        const targetPath = path.resolve(projectPath, filePath);
        fs.removeSync(targetPath);
      });
    }

    // Clean up useless files
    if (pkg['create-umi'] && pkg['create-umi'].ignore) {
      log('Clean up...');
      const ignoreFiles = pkg['create-umi'].ignore;
      const fileList = globList(ignoreFiles, envOptions);

      fileList.forEach((filePath) => {
        const removePath = path.resolve(projectPath, filePath);
        fs.removeSync(removePath);
      });
    }
  }
}

module.exports = AntDesignProGenerator;
