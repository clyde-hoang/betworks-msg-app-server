const config = require('../config');
const jwt = require('jsonwebtoken');

const fs = require('fs');
let users = [];

fs.readFile('src/models/json/users.json', (err, data) => {
    if (err) throw err;
    users = JSON.parse(data);
});

module.exports = {
    authenticate,
    getAll,
    getById,
    getUserContacts
};

async function authenticate({ username, password }) {
    const user = users.find(u => u.username === username && u.password === password);

    if (!user) throw 'Username or password is incorrect';

    // create a jwt token that is valid for 30 days
    const token = jwt.sign({ sub: user.id }, config.secret, { expiresIn: '30d' });

    return {
        ...omitPassword(user),
        token
    };
}

async function getAll() {
    return users.map(u => omitPassword(u));
}

async function getById(id) {
    return omitPassword(users.find(x => x.id === +id));
}

// For now return all users that are not the current id
async function getUserContacts(id) {
    return users.filter(x => x.id !== +id).map(u => omitPassword(u));
}

// helper functions
function omitPassword(user) {
    if (user) {
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
    }
    return null;
}
