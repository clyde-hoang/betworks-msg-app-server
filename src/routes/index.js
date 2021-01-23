const router = require('express').Router();
const config = require('../config');

const API_PREFIX = config.api_root + '/' + config.api_version;

require('./users')(router, API_PREFIX);
require('./messages')(router, API_PREFIX);

module.exports = router;
