// ref:
// - https://umijs.org/plugins/api
<% if (withUmiUI) { -%>
import { join } from 'path';
<% } -%>

export default function (api) {
  api.logger.info('use plugin');

  api.modifyHTML(($) => {
    $('body').prepend(`<h1>hello umi plugin</h1>`);
    return $;
  });

<% if (withUmiUI) { -%>
  api.addUIPlugin(() => join(__dirname, '../dist/index.umd.js'));

  api.onUISocket(({ action, failure, success }) => {
    if (action.type === 'org.xiaohuoni.demo.test') {
      success({
        data: 'demo.test',
      });
    }
  });
<% } -%>
}
