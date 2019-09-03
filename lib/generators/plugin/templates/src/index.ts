// ref:
// - https://umijs.org/plugin/develop.html
import { IApi } from 'umi-types';

export default function (api: IApi, options) {

  // Example: output the webpack config
  api.chainWebpackConfig(config => {
    console.log(config.toString());
  });

<% if (withUmiUI) { -%>
  api.addUIPlugin(require.resolve('../dist/index.umd'));

  api.onUISocket(({ action, failure, success }) => {
    if (action.type === 'org.<%= author %>.<%= name %>.test') {
      success({
        data: '<%= name %>.test',
      });
    }
  });
<% } %>
}
