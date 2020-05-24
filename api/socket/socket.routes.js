
module.exports = connectSockets

function connectSockets(io) {

    io.on('connection', socket => {
        socket.on('doRefresh', msg => {
            console.log('doing refresh')

            io.to(socket.boardId).emit('doRefresh', msg)
        })
        // socket.on('boardViewed', boardId => {
        //     console.log('i reecived boardId', boardId)
        //     if (socket.boardId) {
        //         socket.leave(socket.boarId)
        //     }
        //     socket.join(boardId)
        //     socket.boardId = boardId;
        // })

        socket.on('openBoardChat', data => {


            console.log('got messege', data.msgData.text)
            console.log('Someone Joined Board chat!', data.boardChatId)
            if (socket.boardChatId) {

                socket.leave(socket.boardChatId)
            }
            socket.join(data.boardChatId)
            socket.boardChatId = data.boardChatId;
            if (data.msgData)
                socket.broadcast.emit('openBoardChat', data)
        })



        socket.on('boardChat', chatBoardId => {
            if (socket.chatBoardId) {
                socket.leave(socket.chatBoardId)
            }
            socket.join(chatBoardId)
            socket.chatBoardId = chatBoardId;
            console.log('some1 logged in')
        })



        socket.on('sendMsg', msg => {
            console.log('msg')
            socket.broadcast.emit('sendMsg', msg)
            // io.to(socket.chatBoardId).emit('sendMsg', msg)
            // socket.broadcast.to(socket.chatBoardId).emit('sendMsg', msg);
            // io.to(socket.chatBoardId).emit('newMsg', msg);
        })




    })
}