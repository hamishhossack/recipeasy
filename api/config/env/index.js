import path from 'path';
import _ from 'lodash';

const env = process.env.NODE_ENV || 'development';
const config = require(`./${env}`); // eslint-disable-line

const defaults = {
  root: path.join(__dirname, '/..')
};

_.assign(config, defaults);

export default config;
