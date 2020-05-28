const userService = require('../user/user.service')
module.exports = connectSockets
function connectSockets(io) {

    io.on('connection', socket => {
        socket.roomIdMap = {}
        socket.on('boardViewed', boardId => {
            console.log('i reecived boardId', boardId)
            if (socket.boardId) {
                socket.leave(socket.boarId)
            }
            socket.join(boardId)
            socket.boardId = boardId;
        })


        socket.on('doRefresh', msg => {
            console.log('doing refresh')

            io.to(socket.boardId).emit('doRefresh', msg)
        })
        ///////////////////////////////////////////////////////////////////// react chat /////////////////////////////////////////////

        socket.on('join_board_room', boardId => {
            console.log('some1 joining to board room')
            if (socket.roomIdMap.boardRoom) {
                socket.leave(socket.roomIdMap.boardRoom)
            }
            socket.join(boardId)
            socket.roomIdMap.boardRoom = boardId
        })

        // on 'board_room_new_msg' - broadcast msg

        socket.on('board_room_new_msg', msg => {
            console.log('hellothere')
            socket.to(socket.roomIdMap.boardRoom).emit('board_room_new_msg', msg)
        })


        ///////////////////////////////////////////////////////// Private Chat /////////////////////////////////////////////////


        socket.on('join_private_room', obj => {
            console.log('some1 joining to privar room')

            let roomKey = _getRoomById(obj)
            console.log("connectSockets -> roomKey", roomKey)
            if (socket.roomIdMap[roomKey]) {
                socket.leave(socket.roomIdMap[roomKey])
            }
            socket.join(roomKey)
            socket.roomIdMap[roomKey] = roomKey
        })

        // on 'board_room_new_msg' - broadcast msg

        socket.on('private_room_new_msg', data => {
            console.log("connectSockets -> data", data)
            let roomKey = _getRoomById(data)
            // console.log('some1 send a priv msg', msg.data.text, 'author', msg.data.author)
            socket.to(socket.roomIdMap[roomKey]).emit('private_room_new_msg', data.msg)
        })

        // ONLINE USER SOCKETS
        socket.on('login', (data) => {
            const user = data
            userService.addUserToOnlineList(user)
            let onlineUserList = userService.getOnlineUsers()
            console.log("connectSockets -> onlineUserList", onlineUserList)
        });
        socket.on('logout', (user) => {
            userService.removeUserToOnlineList(user)
        });
        socket.on('disconnect', (user) => {
            userService.removeUserToOnlineList(user)
        });
    });

}






function _getRoomById(obj) {
    let arr = [];
    arr.push(obj.id.myId)
    arr.push(obj.id.otherId)
    let roomKey = arr.sort().join('')
    return roomKey
}

