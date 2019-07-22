const coffee = require('coffee');

describe('cli', () => {
  it('should fork node cli', () => {
    return coffee
      .fork('./cli.js')
      .debug()
      .write('\n')
      .expect('stdout', new RegExp('Select the boilerplate type ant-design-pro'))
      .expect('code', 0)
      .end();
  });
});
