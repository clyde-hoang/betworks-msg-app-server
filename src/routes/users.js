const userService = require('../services/user.service');

module.exports = function (router, apiPrefix) {
    // routes
    router.post(apiPrefix + '/users/authenticate', authenticate);
    router.get(apiPrefix +  '/users', getAll);
};

function authenticate(req, res, next) {
    userService.authenticate(req.body)
        .then(user => res.json(user))
        .catch(next);
}

function me(req, res, next) {
    userService.authenticate(req.body)
        .then(user => res.json(user))
        .catch(next);
}

function getAll(req, res, next) {
    userService.getAll()
        .then(users => res.json(users))
        .catch(next);
}

function getMessages(req, res, next) {
    userService.getAll()
        .then(users => res.json(users))
        .catch(next);
}
