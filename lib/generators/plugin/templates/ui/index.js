import { Button } from 'antd';

export default (api) => {
  const { callRemote } = api;

  function PluginPanel() {
    return (
      <div style={{ padding: 20 }}>
        <Button
          type="primary"
          onClick={async () => {
            const { data } = await callRemote({
              type: 'org.<%= author %>.<%= name %>.test',
            });
            alert(data);
          }}
        >Test</Button>
      </div>
    );
  }

  api.addPanel({
    title: '<%= name %>',
    path: '/<%= name %>',
    icon: 'home',
    component: PluginPanel,
  });
}
