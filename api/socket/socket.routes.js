
module.exports = connectSockets
let users = {}
function connectSockets(io) {

    io.on('connection', socket => {
        socket.on('doRefresh', msg => {
            console.log('doing refresh')

            io.to(socket.boardId).emit('doRefresh', msg)
        })

        socket.on('new user', function (data, callback) {
            console.log("New user");
            console.log('data from connection', data.chatWith)
            //socket.emit('select_room',data);
            if (data.chatWith in users)//if index of is not -1..i.e nickname exist
            {
                // callback(false);
            }
            else {
                console.log("here");
                // callback(true);
                socket.nickname = data.chatWith;//store nickname of each user becomes clear on disconnect
                users[socket.nickname] = socket;//key value pair as defined above
                console.log('users after added new 1 ', users[socket.nickname])
                //nicknames.push(socket.nickname);
                //io.sockets.emit('usernames',nicknames);//send usernames for display
                updateNicknames();
            }
        });
        socket.on('sendmessage', function (data, callback) {
            console.log('got Messeg data', data);
            // console.log('users', users)
            var msg = data.trim();
            console.log("MSG AFTER TRIM", msg)
            if (msg[0] == '@')//if thats whisper or private msg
            {
                msg = msg.substr(1);//start of name onwards
                var idx = msg.indexOf(' ');
                if (idx !== -1) {
                    //check the username is valid
                    var name = msg.substr(0, idx);
                    console.log('name is', name)
                    // console.log('name check if it in user array', Object.keys(users)[0])
                    let rooms = Object.keys(users)
                    rooms.forEach((room, ) => {
                        console.log('room is :', room)
                    })


                    msg = msg.substr(idx + 1);
                    if (name in users) {
                        users[name].emit('whisper', { msg: msg, nick: socket.nickname });
                        console.log('whispered');
                    }
                    else {
                        // callback('Error! Enter a valid user');
                    }
                }
                else//no actual msg part
                {
                    // callback('Error! Please enter a message for your whisper');
                }
            }
            else {
                io.sockets.emit('newmessage', { msg: msg, nick: socket.nickname });//broadcast to everyone and i too can see the msg
                //socket.broadcast.emit('newmessage',data);//broadcast to evry1 except me
            }
        });
        function updateNicknames() {
            io.sockets.emit('usernames', Object.keys(users));//sending socket does not make sense
        }
        //whenever user disconnect he/she should be removed from the list
        socket.on('disconnect', function (data) {
            if (!socket.nickname)//when the user has no nickname 
                return;
            delete users[socket.nickname];
            updateNicknames();
        });
































        // OLD 
        // socket.on('openBoardChat', data => {


        //     console.log('got messege', data.msgData.text)
        //     console.log('Someone Joined Board chat!', data.boardChatId)
        //     if (socket.boardChatId) {

        //         socket.leave(socket.boardChatId)
        //     }
        //     socket.join(data.boardChatId)
        //     socket.boardChatId = data.boardChatId;
        //     if (data.msgData)
        //         socket.broadcast.emit('openBoardChat', data)
        // })



        // socket.on('boardChat', chatBoardId => {
        //     if (socket.chatBoardId) {
        //         socket.leave(socket.chatBoardId)
        //     }
        //     socket.join(chatBoardId)
        //     socket.chatBoardId = chatBoardId;
        //     console.log('some1 logged in')
        // })



        // socket.on('sendMsg', msg => {
        //     console.log('msg')
        //     // socket.broadcast.emit('sendMsg', msg)
        //     // io.to(socket.chatBoardId).emit('sendMsg', msg)
        //     socket.to(socket.chatBoardId).emit('sendMsg', msg);
        // })




    })
}