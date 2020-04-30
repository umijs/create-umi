import { defineConfig } from 'umi';

export default defineConfig({
<% if (withUmiUI) { -%>
  presets: [require.resolve('@umijs/preset-ui')],
<% } -%>
  plugins: [require.resolve('../lib')],
});
