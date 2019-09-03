
export default [
  {
    cjs: 'babel',
  },
<% if (withUmiUI) { -%>
  {
    entry: 'ui/index.js',
    umd: {
      name: '<%= name %>',
      minFile: false,
    },
  },
<% } -%>
];
