import { join } from 'path';

export default {
  routes: [
    { path: '/', component: './index' },
  ],
  plugins: [
    join(__dirname, '..', require('../package').main || 'index.js'),
  ],
}
