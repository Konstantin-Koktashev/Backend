const chatService = require('./chat.service')
const logger = require('../../services/logger.service')


async function getChat(req, res) {
    // console.log(req.query);
    const chat = await chatService.query(req.query)
    logger.debug(chat);
    res.send(chat)
}

async function deleteChat(req, res) {
    await chatService.remove(req.params.id)
    res.end()
}

async function updateChat(req, res) {
    const chat = req.body;
    await chatService.update(chat)
    res.send(chat)
}

async function addMsg(req, res) {
    console.log('add msg ', req.body)
    const msg = req.body;
    await chatService.add(msg)
    res.send(msg)
}

module.exports = { getChat, deleteChat, addMsg, updateChat }