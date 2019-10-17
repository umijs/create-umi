# umi-plugin-<%= name %>

[![NPM version](https://img.shields.io/npm/v/umi-plugin-<%= name %>.svg?style=flat)](https://npmjs.org/package/umi-plugin-<%= name %>)
[![NPM downloads](http://img.shields.io/npm/dm/umi-plugin-<%= name %>.svg?style=flat)](https://npmjs.org/package/umi-plugin-<%= name %>)

<%= description %>

## Install

```bash
# or yarn
$ npm install
```

## Development UI

UI start:

```bash
$ npm run build --watch
$ npm run start
```

<img src="https://user-images.githubusercontent.com/13595509/67025108-10925980-f138-11e9-8f46-899eef3e098b.png" width="768" />

UI mini start:

```bash
$ npm run build --watch
$ npm run start:mini
```

<img src="https://user-images.githubusercontent.com/13595509/67024897-bbeede80-f137-11e9-9f19-6a3f0ea3f6cd.png" width="768" />

## Usage

Configure in `.umirc.js`,

```js
export default {
  plugins: [
    ['umi-plugin-<%= name %>', options],
  ],
}
```

## Options

TODO

## LICENSE

MIT
