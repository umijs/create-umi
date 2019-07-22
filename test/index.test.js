const coffee = require('coffee');
const path = require('path');
const os = require('os');
const fs = require('fs');

describe('test umi-create', () => {
  it('test generate antd pro project', () => {
    const fixtures = fs.mkdtempSync(path.join(os.tmpdir(), `umi-create`));
    const Coffee = coffee.Coffee;

    return new Coffee({
      method: 'fork',
      cmd: path.join(__dirname, '../cli.js'),
      opt: { cwd: fixtures },
    })
      .debug()
      .expect('stdout', /Select the boilerplate type ant-design-pro/)
      .waitForPrompt()
      .write('\n')
      .waitForPrompt()
      .write('\n')
      .expect('code', 0)
      .expect(
        'stdout',
        new RegExp('git clone https://github.com.cnpmjs.org/ant-design/ant-design-pro --depth=1'),
      )
      .end();
  });
});
