// ref:
// - https://umijs.org/plugins/api
<% if (withUmiUI) { -%>
import { join } from 'path';
<% } -%>
import { IApi } from '@umijs/types';

export default function (api: IApi) {
  api.logger.info('use plugin');

  api.modifyHTML(($) => {
    $('body').prepend(`<h1>hello umi plugin</h1>`);
    return $;
  });

<% if (withUmiUI) { -%>
  // @ts-ignore
  api.addUIPlugin(() => join(__dirname, '../dist/index.umd.js'));

  // @ts-ignore
  api.onUISocket(({ action, failure, success }) => {
    if (action.type === 'org.xiaohuoni.demo.test') {
      success({
        data: 'demo.test',
      });
    }
  });
<% } -%>
}
