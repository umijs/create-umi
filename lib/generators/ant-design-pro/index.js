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
    fileList = [ ...fileList, ...glob.sync(pattern, options) ];
  });

  return fileList;
}

class AntDesignProGenerator extends BasicGenerator {
  prompting() {
    const prompts = [
      {
        name: 'language',
        type: 'list',
        message: 'Which language do you want to use?',
        choices: ['TypeScript', 'JavaScript'],
      },
    ];
    return this.prompt(prompts).then((props) => {
      this.prompts = props;
    });
  }

  async writing() {
    const { language } = this.prompts;
    const isTypeScript = language === 'TypeScript';

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
      log('[JS] Prepare js environment...');

      const babelConfig = path.resolve(__dirname, '.babelrc');
      fs.copySync(babelConfig, path.resolve(projectPath, '.babelrc'));

      await exec(
        `npm`,
        [ 'install', '--no-save', '@babel/core', '@babel/cli', '@babel/plugin-transform-typescript', 'prettier' ],
        envOptions,
      );

      log('[JS] Compiling ts files...');
      const tsFiles = globList(['**/*.tsx', "**/*.ts"], {
        ...envOptions,
        ignore: ['**/*.d.ts']
      });

      tsFiles.forEach(filePath => {
        const sourcePath = path.resolve(projectPath, filePath);
        const targetPath = sourcePath.replace(/\.tsx?$/, '.js');
        exec.sync('npx', ['babel', sourcePath, '-o', targetPath], envOptions);
      });

      log('[JS] Prettier code...');
      await exec(`npx`, [ 'prettier', '--write', `${TMP_JS_FOLDER}/**/*.js` ], envOptions);

      log('[JS] Remove tmp files...');
      fs.removeSync(path.resolve(projectPath, 'node_modules'));
      fs.removeSync(path.resolve(projectPath, TMP_JS_FOLDER));
      const tsFiles = globList(['**/*.ts', '**/*.tsx'], envOptions);
      tsFiles.forEach((filePath) => {
        const targetPath = path.resolve(projectPath, filePath);
        fs.removeSync(targetPath);
      });
    }

    // Replace files
    if (pkg['create-umi'] && pkg['create-umi'].copy) {
      log('Copy extra files...');
      const copyFiles = pkg['create-umi'].copy;
      copyFiles.forEach(([source, target]) => {
        const sourcePath = path.resolve(projectPath, source);
        const targetPath = path.resolve(projectPath, target);

        fs.copySync(sourcePath, targetPath, { overwrite: true });
      });
    }

    // Clean up useless files
    if (pkg['create-umi'] && pkg['create-umi'].ignore) {
      log('Clean up...');
      const ignoreFiles = pkg['create-umi'].ignore;
      const fileList = globList(ignoreFiles, envOptions);

      console.log('~>', ignoreFiles, fileList);
      fileList.forEach((filePath) => {
        const targetPath = path.resolve(projectPath, filePath);
        fs.removeSync(targetPath);
      });
    }
  }
}

module.exports = AntDesignProGenerator;
