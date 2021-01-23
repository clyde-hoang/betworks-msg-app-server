module.exports = function (http) {
    const io = require("socket.io")(http, {
        cors: {
            origin: '*',
            methods: ["GET", "POST"]
        }
    });

    io.on('connection', (socket) => {
        console.log('user connected');

        socket.on('username', (userName) => {

            /*this.users.push({
                id : socket.id,
                userName : userName
            });

            let len = this.users.length;
            len--;

            this.io.emit('userList',this.users,this.users[len].id);*/
        });

        socket.on('getMsg', (data) => {
            socket.broadcast.to(data.toid).emit('sendMsg',{
                msg:data.msg,
                name:data.name
            });
        });

        socket.on('new-message', (message) => {
            // listening to the topic
            console.log("listening:" + message);

            // sends messages to everyone on the server
            io.emit('new-message', message);
            console.log("emitting:" + message);
            socket.broadcast.emit('new-message', message);
        });

        socket.on('disconnect',()=>{
            console.log(`*****disconnected`);
            /*for(let i=0; i < this.users.length; i++){

                if(this.users[i].id === socket.id){
                    this.users.splice(i,1);
                }
            }
            this.io.emit('exit',this.users);*/
        });
    });
};
