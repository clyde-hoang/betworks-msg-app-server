const path = require('path');
const message_path = path.resolve(__dirname) + '/../models/json/messages.json';
const fs = require('fs');

module.exports = {
    getAllMessages,
    getMessagesForUserId,
    getConversationForUsers,
    addNewMessage
};

function getAllMessages() {
    return new Promise(function(resolve, reject) {
        fs.readFile(message_path, (err, data) => {
            if (err) reject(err);

            let messages = JSON.parse(data);
            messages = (messages && messages.length > 0)? messages : []
            resolve(messages);
        });
    });
}

async function getMessagesForUserId(uid) {
    const msgs = await getAllMessages();
    return msgs.filter(x => (x.to === uid || x.from === uid));
}

async function getConversationForUsers(uid1, uid2) {
    const msgs = await getAllMessages();
    return msgs.filter(x => (x.to === uid1 || x.from === uid1) && (x.to === uid2 || x.from === uid2));
}

// For now write message to file, setup database in the future
async function addNewMessage(message) {
    fs.readFile(message_path, (err, data) => {
        if (err) {
            throw err;
        }
        let msgs = JSON.parse(data);
        msgs.push({
            id: msgs.length+1,
            timestamp: message.timestamp,
            from: message.from,
            to: message.to,
            text: message.text
        });
        let newData = JSON.stringify(msgs, null, 1);

        fs.writeFile(message_path, newData, (err) => {
            if (err) throw err;
            console.log('Data written to file');
        });
    });
    return message;
}
