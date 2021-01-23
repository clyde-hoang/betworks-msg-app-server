const expressJwt = require('express-jwt');
const config = require('../config');
const API_PREFIX = config.api_root + '/' + config.api_version

module.exports = jwt;

function jwt() {
    const { secret } = config;

    return expressJwt({ secret, algorithms: ['HS256'] }).unless({
        path: [
            // public routes that don't require authentication
            API_PREFIX + '/users/authenticate',
            '/socket.io'
        ]
    });
}
