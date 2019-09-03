
export default [
  {
    cjs: 'babel',
  },
<% if (withUmiUI) { -%>
  {
    entry: 'ui/index.tsx',
    typescriptOpts: {
      check: false,
    },
    umd: {
      name: '<%= name %>',
      minFile: false,
    },
  },
<% } -%>
];
