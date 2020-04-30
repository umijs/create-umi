import { Button } from 'antd';
import { IUiApi } from '@umijs/ui-types';

export default (api: IUiApi) => {
  const { callRemote } = api;

  function PluginPanel() {
    return (
      <div style={{ padding: 20 }}>
        <Button
          type="primary"
          onClick={async () => {
            const { data } = await callRemote({
              type: 'org.xiaohuoni.demo.test',
            });
            alert(data);
          }}
        >Test</Button>
      </div>
    );
  }

  api.addPanel({
    title: 'demo',
    path: '/demo',
    icon: 'home',
    component: PluginPanel,
  });
}
