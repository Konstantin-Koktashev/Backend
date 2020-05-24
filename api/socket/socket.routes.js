
module.exports = connectSockets

function connectSockets(io) {

    io.on('connection', socket => {
        socket.on('doRefresh', msg=>{
            io.to(socket.boardId).emit('doRefresh', msg)
        })
        socket.on('boardViewed', boardId=>{
            console.log('i reecived boardId' , boardId)
            if (socket.boardId) {
                socket.leave(socket.boarId)
            }
            socket.join(boardId)
            socket.boardId = boardId;
        })
    })
}