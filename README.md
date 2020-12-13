# create-umi

Creates a UmiJS application/plugin/block/library using the command line.

[![codecov](https://codecov.io/gh/umijs/create-umi/branch/master/graph/badge.svg)](https://codecov.io/gh/umijs/create-umi) [![NPM version](https://img.shields.io/npm/v/create-umi.svg?style=flat)](https://npmjs.org/package/create-umi) [![CircleCI](https://circleci.com/gh/umijs/create-umi/tree/master.svg?style=svg)](https://circleci.com/gh/umijs/create-umi/tree/master) [![NPM downloads](http://img.shields.io/npm/dm/create-umi.svg?style=flat)](https://npmjs.org/package/create-umi) [![GitHub Actions status](https://github.com/umijs/create-umi/workflows/Node%20CI/badge.svg)](https://github.com/umijs/create-umi)

## Usage

```bash
$ yarn create umi [appName]
```

## Boilerplates

- `ant-design-pro` - Create project with a layout-only ant-design-pro boilerplate, use together with umi block.
- `app` - Create project with a simple boilerplate, support typescript.
- `plugin` - Create a umi plugin.

## Usage Example

```bash
$ yarn create umi

? Select the boilerplate type (Use arrow keys)
  ant-design-pro  - Create project with a layout-only ant-design-pro boilerplate, use together with umi block.
❯ app             - Create project with a simple boilerplate, support typescript.
  plugin          - Create a umi plugin.

? Do you want to use typescript? (y/N)

? What functionality do you want to enable? (Press <space> to select, <a> to toggle all, <i> to invert selection)
❯◯ antd
 ◯ dva
 ◯ code splitting
 ◯ dll

  create abc/package.json
  create abc/.gitignore
  create abc/.editorconfig
  create abc/.env
  create abc/.eslintrc
  create abc/.prettierignore
  create abc/.prettierrc
  create abc/.umirc.js
  create abc/mock/.gitkeep
  create abc/src/assets/yay.jpg
  create abc/src/global.css
  create abc/src/layouts/index.css
  create abc/src/layouts/index.tsx
  create abc/src/pages/index.css
  create abc/src/pages/index.tsx
  create abc/tsconfig.json
  create abc/typings.d.ts
 📋  Copied to clipboard, just use Ctrl+V
 ✨  File Generate Done
```

## FAQ

### `yarn create umi` command failed

这个问题基本上都是因为没有添加 yarn global module 的路径到 PATH 环境变量引起的。

先执行 `yarn global bin` 拿到路径，然后添加到 PATH 环境变量里。

```bash
$ yarn global bin
/usr/local/bin
```

你也可以尝试用 npm，

```bash
$ npm create umi
```

或者手动安装 create-umi，并执行他，

```bash
$ npm install create-umi -g
$ create-umi
```

## Questions & Suggestions

Please open an issue [here](https://github.com/umijs/umi/issues?q=is%3Aissue+is%3Aopen+sort%3Aupdated-desc).

## LICENSE

MIT
