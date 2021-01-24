const fs = require('fs');
let messages = [];

fs.readFile('src/models/json/messages.json', (err, data) => {
    if (err) throw err;
    messages = JSON.parse(data);
});

module.exports = {
    getAllMessages,
    getMessagesForUserId,
    getConversationForUsers,
    addNewMessage
};

async function getAllMessages() {
    return (messages && messages.length > 0)? messages : [];
}

async function getMessagesForUserId(uid) {
    const msgs = await getAllMessages();
    return msgs.filter(x => (x.to === uid || x.from === uid));
}

async function getConversationForUsers(uid1, uid2) {
    const msgs = await getAllMessages();
    return msgs.filter(x => (x.to === uid1 || x.from === uid1) && (x.to === uid2 || x.from === uid2));
}

async function addNewMessage(message) {
    return message;
}
