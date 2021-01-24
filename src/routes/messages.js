const messageService = require('../services/message.service');

module.exports = function (router, apiPrefix) {
    router.get(apiPrefix + '/messages', getMessages);
};

function getMessages(req, res, next) {
    // TODO: can add pagination
    const uid1 = +req.query.uid1;
    const uid2 = +req.query.uid2;

    // future consideration use association from messages to chatrooms/conversations
    if (uid1 > 0 && uid2 > 0) {
        messageService.getConversationForUsers(uid1, uid2)
            .then(messages => res.json(messages))
            .catch(next);
    } else if (uid1 > 0) {
        messageService.getMessagesForUserId(uid1)
            .then(messages => res.json(messages))
            .catch(next);
    } else {
        messageService.getAllMessages()
            .then(messages => res.json(messages))
            .catch(next);
    }
}
