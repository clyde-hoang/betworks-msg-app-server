const messageService = require('../services/message.service');

module.exports = function (http) {
    const io = require("socket.io")(http, {
        cors: {
            origin: '*',
            methods: ["GET", "POST"]
        }
    });

    io.on('connection', (socket) => {
        console.log(`-- socket connection established for socket:${socket.id} --`);

        socket.on('new-message', (message) => {
            // listening to the topic
            // TODO: add logger
            console.log("received new message:" + JSON.stringify(message));
            if (message && +message.to > 0) {
                messageService.addNewMessage(message)
                    .then(message => {
                        // send message to recipient
                        console.log(`sending msg from:${message.from} to:${message.to}`);
                        io.emit(message.to.toString(), message);
                    })
                    .catch();
            }
            // socket.broadcast.emit('new-message', message);
        });

        socket.on('disconnect',()=>{
            // TODO: emit disconnection to users
            console.log(`-- socket id=${socket.id} disconnected --`);
        });
    });
};
