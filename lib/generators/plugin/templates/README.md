# <%= name %>

[![NPM version](https://img.shields.io/npm/v/<%= name %>.svg?style=flat)](https://npmjs.org/package/<%= name %>)
[![NPM downloads](http://img.shields.io/npm/dm/<%= name %>.svg?style=flat)](https://npmjs.org/package/<%= name %>)

<%= description %>

## Install

```bash
# or yarn
$ npm install
```
<% if (withUmiUI) { -%>
## Development UI

UI mini start:

```bash
$ npm run build --watch
$ npm run start
```

<img src="https://user-images.githubusercontent.com/13595509/67024897-bbeede80-f137-11e9-9f19-6a3f0ea3f6cd.png" width="768" />
<% } else { -%>

```bash
$ npm run build --watch
$ npm run start
```
<% } -%>

## Usage

Configure in `.umirc.js`,

```js
export default {
  plugins: [
    ['<%= name %>'],
  ],
}
```

## Options

TODO

## LICENSE

MIT
