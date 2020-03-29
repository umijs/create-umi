const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');
const glob = require('glob');
const exec = require('execa');
const BasicGenerator = require('../../BasicGenerator');
const filterPkg = require('./filterPkg');
const prettier = require('prettier');
const sylvanas = require('sylvanas');
const sortPackage = require('sort-package-json');
const { getFastGithub } = require('umi-utils');

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

const getGithubUrl = async () => {
  const fastGithub = await getFastGithub();
  if (fastGithub === 'gitee.com' || fastGithub === 'github.com.cnpmjs.org') {
    return 'https://gitee.com/ant-design/ant-design-pro';
  }
  return 'https://github.com/ant-design/ant-design-pro';
};

class AntDesignProGenerator extends BasicGenerator {
  prompting() {
    if (this.opts.args.language) {
      this.prompts = {
        language: this.opts.args.language,
      };
    } else {
      const prompts = [
        {
          name: 'language',
          type: 'list',
          message: '🤓 Which language do you want to use?',
          choices: ['TypeScript', 'JavaScript'],
          default: 'TypeScript',
          filter: value => {
            // 为了测试，没有任何用处
            process.send && process.send({ type: 'prompt' });
            process.emit('message', { type: 'prompt' });
            return value;
          },
        },
        {
          name: 'allBlocks',
          type: 'list',
          message: '🚀 Do you need all the blocks or a simple scaffold?',
          choices: ['simple', 'complete'],
          default: 'simple',
          filter: value => {
            // 为了测试，没有任何用处
            process.send && process.send({ type: 'prompt' });
            process.emit('message', { type: 'prompt' });
            return value;
          },
        },
        {
          name: 'nextAntd',
          type: 'confirm',
          when: ({ allBlocks }) => {
            return allBlocks === 'simple';
          },
          message: '🦄 Time to use better, faster and latest antd@4!',
          default: true,
        },
      ];
      return this.prompt(prompts).then(props => {
        this.prompts = props;
      });
    }
  }

  async writing() {
    const { language, allBlocks, nextAntd } = this.prompts;

    const isTypeScript = language === 'TypeScript';
    const projectName = this.opts.name || this.opts.env.cwd;
    const projectPath = path.resolve(projectName);

    const envOptions = {
      cwd: projectPath,
    };

    const githubUrl = await getGithubUrl();
    const gitArgs = [`clone`, githubUrl, `--depth=1`];

    // 如果想要使用旧的 antd,使用 antd@3 分支
    if (!nextAntd && allBlocks === 'simple') {
      gitArgs.push('--branch', 'antd@3');
    }

    // all-blocks 分支上包含了所有的区块
    if (allBlocks === 'complete') {
      log(`🙈 complete mode can only use the version of antd@4`);
      gitArgs.push('--branch', 'all-blocks');
    }

    // Set branch if provided
    if (this.opts.args.branch) {
      gitArgs.push('--branch', this.opts.args.branch);
    }

    gitArgs.push(projectName);

    // Clone remote branch
    // log(`git ${[`clone`, githubUrl].join(' ')}`);
    await exec(
      `git`,
      gitArgs,
      process.env.TEST
        ? {}
        : {
            stdout: process.stdout,
            stderr: process.stderr,
            stdin: process.stdin,
          },
    );

    log(`🚚 clone success`);

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
      const removeTsFiles = globList(['tsconfig.json', '**/*.d.ts'], envOptions);
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
        // 删除一个包之后 json会多了一些空行。sortPackage 可以删除掉并且排序
        // prettier 会容忍一个空行
        prettier.format(JSON.stringify(sortPackage(projectPkg)), {
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
