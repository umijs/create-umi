import { join } from 'path';
import { IConfig } from 'umi-types';

export default {
  plugins: [
    join(__dirname, '..', require('../package').main || 'index.js'),
  ],
} as IConfig;
