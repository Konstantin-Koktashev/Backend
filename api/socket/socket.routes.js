
module.exports = connectSockets

function connectSockets(io) {

    io.on('connection', socket => {
        socket.on('doRefresh', msg => {
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






    })
}