const userService = require('../services/user.service');

module.exports = function (router, apiPrefix) {
    router.post(apiPrefix + '/users/authenticate', authenticate);
    router.get(apiPrefix +  '/users', getAll);
    router.get(apiPrefix +  '/users/:id', getById);
    router.get(apiPrefix +  '/users/:id/contacts', getUserContacts);
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

function getById(req, res, next) {
    const userId = req.params.id;
    userService.getById(userId)
        .then(users => res.json(users))
        .catch(next);
}

function getUserContacts(req, res, next) {
    const userId = req.params.id;
    userService.getUserContacts(userId)
        .then(users => res.json(users))
        .catch(next);
}
