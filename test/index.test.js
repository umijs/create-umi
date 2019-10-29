const coffee = require('coffee');
const path = require('path');
const os = require('os');
const fs = require('fs');

describe('test umi-create', () => {
  it('test generate antd pro project from github', async () => {
    let temp = fs.mkdtempSync(path.join(os.tmpdir(), `umi-create`));
    if (os.platform() === 'darwin') {
      temp = path.join('/private', temp);
    }
    const Coffee = coffee.Coffee;
    const fixtures = path.join(__dirname, 'fixtures');
    const response = await new Coffee({
      method: 'fork',
      cmd: path.join(__dirname, '../cli.js'),
      opt: { cwd: temp },
    })
      .beforeScript(path.join(fixtures, 'mock_github.js'))
      .waitForPrompt()
      .write('\n')
      .waitForPrompt()
      .writeKey('DOWN', 'ENTER')
      .expect('code', 0)
      .end();

    const expectStdout = [
      '? Select the boilerplate type (Use arrow keys)',
      '❯ ant-design-pro  - Create project with a layout-only ant-design-pro boilerplate',
      ', use together with umi block. ',
      '  app             - Create project with a simple boilerplate, support typescript',
      '. ',
      '  block           - Create a umi block. ',
      '  library         - Create a library with umi. ',
      '  plugin          - Create a umi plugin. \u001b[41D\u001b[41C\u001b[2K\u001b[1A\u001b[2K\u001b[1A\u001b[2K\u001b[1A\u001b[2K\u001b[1A\u001b[2K\u001b[1A\u001b[2K\u001b[1A\u001b[2K\u001b[1A\u001b[2K\u001b[G? Select the boilerplate type ant-design-pro\u001b[44D\u001b[44C',
      '? Which language do you want to use? (Use arrow keys)',
      '❯ TypeScript ',
      '  JavaScript \u001b[13D\u001b[13C\u001b[2K\u001b[1A\u001b[2K\u001b[1A\u001b[2K\u001b[G? Which language do you want to use? ',
      '  TypeScript ',
      '❯ JavaScript \u001b[13D\u001b[13C\u001b[2K\u001b[1A\u001b[2K\u001b[1A\u001b[2K\u001b[G? Which language do you want to use? JavaScript\u001b[47D\u001b[47C',
      `> git clone https://github.com/ant-design/ant-design-pro --depth=1 ${temp}`,
      '> [Sylvanas] Prepare js environment...',
      '> [JS] Clean up...',
      '> Clean up...',
      '✨ File Generate Done',
      '',
    ];
    expect(response.stdout).toEqual(expectStdout.join('\n'));
    expect(response.code).toBe(0);
  });

  it('test generate antd pro project from github.com.cnpmjs.org', async () => {
    let temp = fs.mkdtempSync(path.join(os.tmpdir(), `umi-create-cnpm`));
    if (os.platform() === 'darwin') {
      temp = path.join('/private', temp);
    }
    const Coffee = coffee.Coffee;
    const fixtures = path.join(__dirname, 'fixtures');
    const response = await new Coffee({
      method: 'fork',
      cmd: path.join(__dirname, '../cli.js'),
      opt: { cwd: temp },
    })
      .beforeScript(path.join(fixtures, 'mock_cnpmjs.js'))
      .waitForPrompt()
      .write('\n')
      .waitForPrompt()
      .write('\n')
      .end();

    const expectStdout = [
      '? Select the boilerplate type (Use arrow keys)',
      '❯ ant-design-pro  - Create project with a layout-only ant-design-pro boilerplate',
      ', use together with umi block. ',
      '  app             - Create project with a simple boilerplate, support typescript',
      '. ',
      '  block           - Create a umi block. ',
      '  library         - Create a library with umi. ',
      '  plugin          - Create a umi plugin. \u001b[41D\u001b[41C\u001b[2K\u001b[1A\u001b[2K\u001b[1A\u001b[2K\u001b[1A\u001b[2K\u001b[1A\u001b[2K\u001b[1A\u001b[2K\u001b[1A\u001b[2K\u001b[1A\u001b[2K\u001b[G? Select the boilerplate type ant-design-pro\u001b[44D\u001b[44C',
      '? Which language do you want to use? (Use arrow keys)',
      '❯ TypeScript ',
      '  JavaScript \u001b[13D\u001b[13C\u001b[2K\u001b[1A\u001b[2K\u001b[1A\u001b[2K\u001b[G? Which language do you want to use? TypeScript\u001b[47D\u001b[47C',
      `> git clone https://github.com/ant-design/ant-design-pro --depth=1 ${temp}`,
      '> Clean up...',
      '✨ File Generate Done',
      '',
    ];
    if (response.code !== 0) {
      console.log(response);
    }
    expect(response.stdout).toEqual(expectStdout.join('\n'));
    expect(response.code).toBe(0);
  });
});

describe('typescript', () => {
  it('tsconfig.json should be removed if JavaScript is picked', async () => {
    let temp = fs.mkdtempSync(path.join(os.tmpdir(), `umi-create`));
    if (os.platform() === 'darwin') {
      temp = path.join('/private', temp);
    }
    const Coffee = coffee.Coffee;
    const fixtures = path.join(__dirname, 'fixtures');
    const response = await new Coffee({
      method: 'fork',
      cmd: path.join(__dirname, '../cli.js'),
      opt: { cwd: temp },
    })
      .beforeScript(path.join(fixtures, 'mock_github.js'))
      .waitForPrompt()
      .write('\n')
      .waitForPrompt()
      .writeKey('DOWN', 'ENTER')
      .end();

    expect(response.code).toBe(0);
    expect(fs.existsSync(path.join(temp, 'jsconfig.json'))).toBeTruthy();
    expect(fs.existsSync(path.join(temp, 'tsconfig.json'))).toBeFalsy();
  });
})
