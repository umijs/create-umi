<% if (withUmiUI) { -%>
const isProd = process.env.NODE_ENV === 'prod';

<% } -%>
export default [{
  target: 'node',
  cjs: { type: 'babel', lazy: true },
  disableTypeCheck: true,
  extraBabelPlugins: [
    [
      'babel-plugin-import',
      { libraryName: 'antd', libraryDirectory: 'es', style: true },
      'antd',
    ],
  ],
<% if (withUmiUI) { -%>
},
{
  entry: 'ui/index.tsx',
  umd: {
    name: 'tasks',
    minFile: isProd,
    sourcemap: !isProd,
  },
  extraExternals: ['antd', 'react', 'react-dom', 'xterm'],
  typescriptOpts: {
    check: false,
    globals: {
      antd: 'window.antd',
      react: 'window.React',
      'react-dom': 'window.ReactDOM',
    },
  },
<% } -%>
}];
