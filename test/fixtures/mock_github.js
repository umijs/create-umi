const mm = require('mm');
const getFastGithub = require('umi-utils/lib/getFastGithub');

mm(getFastGithub, 'default', () => {
  return 'github.com';
});
