const coffee = require('coffee');
const path = require('path');
const os = require('os');
const fs = require('fs');
const { winEOL } = require('umi-utils');

describe('test umi-create', () => {
  beforeAll(() => {
    process.env.TEST = 'test';
  });
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
      opt: { cwd: temp, stdout: process.stdout, stderr: process.stderr, stdin: process.stdin },
    })
      .beforeScript(path.join(fixtures, 'mock_github.js'))
      .waitForPrompt()
      .write('\n')
      .writeKey('DOWN', 'ENTER')
      .write('\n')
      .end();

    expect(winEOL(response.stdout).replace(/>/g, '❯')).toMatchSnapshot();
    expect(response.code).toBe(0);
    expect(fs.existsSync(path.join(temp, 'package.json'))).toBeTruthy();
  });

  it('test generate antd pro project from gitee.org', async () => {
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
      .write('\n')
      .write('\n')
      .end();

    expect(winEOL(response.stdout).replace(/>/g, '❯')).toMatchSnapshot();
    expect(response.code).toBe(0);
    expect(fs.existsSync(path.join(temp, 'package.json'))).toBeTruthy();
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
      .write('\n')
      .write('\n')
      .end();

    expect(response.code).toBe(0);
    expect(fs.existsSync(path.join(temp, 'jsconfig.json'))).toBeTruthy();
    expect(fs.existsSync(path.join(temp, 'tsconfig.json'))).toBeTruthy();
    expect(fs.existsSync(path.join(temp, 'package.json'))).toBeTruthy();
  });
});
