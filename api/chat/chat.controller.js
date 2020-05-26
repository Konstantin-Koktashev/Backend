const chatService = require('./chat.service')
const logger = require('../../services/logger.service')



async function getChat(req, res) {
    // console.log(req.query);
    const chat = await chatService.query(req.query)
    logger.debug(chat);
    res.send(chat)
}


async function updateRoomChat(req, res) {
    const roomObj = req.body;
    await chatService.update(roomObj)
    res.send(roomObj)
}

async function deleteChat(req, res) {
    await chatService.remove(req.params.id)
    res.end()
}



async function addMsg(req ,res){
    const roomObj = req.body;
    await chatService.add(roomObj)
    res.send(roomObj)
}

module.exports = { getChat, deleteChat, addMsg , updateRoomChat}