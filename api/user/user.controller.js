const userService = require('./user.service')
const logger = require('../../services/logger.service')

async function getUser(req, res) {
    const user = await userService.getById(req.params.id)
    res.send(user)
}
async function getOnlineUsers(req, res) {
    const onlineUsers = userService.getOnlineUsers()
    console.log("getOnlineUsers -> onlineUsers", onlineUsers)
    logger.debug(onlineUsers);
    res.send(onlineUsers)
}

async function getUsers(req, res) {
    // console.log(req.query);
    const users = await userService.query(req.query)
    logger.debug(users);
    res.send(users)
}

async function deleteUser(req, res) {
    await userService.remove(req.params.id)
    res.end()
}

async function updateUser(req, res) {

    const user = req.body;
    console.log("updateUser -> user", user)
    await userService.update(user)
    res.send(user)
}

module.exports = {
    getUser,
    getUsers,
    deleteUser,
    updateUser,
    getOnlineUsers
}