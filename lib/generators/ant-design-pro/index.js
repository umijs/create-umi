const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');
const glob = require('glob');
const exec = require('execa');
const BasicGenerator = require('../../BasicGenerator');
const filterPkg = require('./filterPkg');
const prettier = require('prettier');
const sylvanas = require('sylvanas');

function log(...args) {
  console.log(`${chalk.gray('>')}`, ...args);
}

function globList(patternList, options) {
  let fileList = [];
  patternList.forEach(pattern => {
    fileList = [...fileList, ...glob.sync(pattern, options)];
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
    return this.prompt(prompts).then(props => {
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

    const gitArgs = [`clone`, `https://github.com/ant-design/ant-design-pro`, `--depth=1`];

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
      log('[Sylvanas] Prepare js environment...');
      const tsFiles = globList(['**/*.tsx', '**/*.ts'], {
        ...envOptions,
        ignore: ['**/*.d.ts'],
      });
      sylvanas(tsFiles, {
        ...envOptions,
        action: 'overwrite',
      });

      log('[JS] Clean up...');
      const removeTsFiles = globList(['**/*.d.ts'], envOptions);
      removeTsFiles.forEach(filePath => {
        const targetPath = path.resolve(projectPath, filePath);
        fs.removeSync(targetPath);
      });
    }

    // copy readme
    const babelConfig = path.resolve(__dirname, 'README.md');
    fs.copySync(babelConfig, path.resolve(projectPath, 'README.md'));

    // gen package.json
    if (pkg['create-umi']) {
      const { ignoreScript = [], ignoreDependencies = [] } = pkg['create-umi'];
      // filter scripts and devDependencies
      const projectPkg = {
        ...pkg,
        version: '1.0.0',
        scripts: filterPkg(pkg.scripts, ignoreScript),
        devDependencies: filterPkg(pkg.devDependencies, ignoreDependencies),
      };
      // remove create-umi config
      delete projectPkg['create-umi'];
      fs.writeFileSync(
        path.resolve(projectPath, 'package.json'),
        prettier.format(JSON.stringify(projectPkg), {
          parser: 'json',
        }),
      );
    }

    // Clean up useless files
    if (pkg['create-umi'] && pkg['create-umi'].ignore) {
      log('Clean up...');
      const ignoreFiles = pkg['create-umi'].ignore;
      const fileList = globList(ignoreFiles, envOptions);

      fileList.forEach(filePath => {
        const targetPath = path.resolve(projectPath, filePath);
        fs.removeSync(targetPath);
      });
    }
  }
}

module.exports = AntDesignProGenerator;
