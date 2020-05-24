const boardService = require('./board.service')
const logger = require('../../services/logger.service')

async function getboard(req, res) {
    const board = await boardService.getById(req.params.id)
    res.send(board)
}
  
async function getboards(req, res) {
    // console.log(req.query);
    const boards = await boardService.query(req.query)
    logger.debug(boards);
    res.send(boards)
}

async function deleteboard(req, res) {
    await boardService.remove(req.params.id)
    res.end()
}

async function updateboard(req, res) {
    const board = req.body;
    await boardService.update(board)
    res.send(board)
}

async function addBoard(req ,res){
    const board = req.body;
    await boardService.add(board)
    res.send(board)
}

module.exports = {
    getboard,
    getboards,
    deleteboard,
    updateboard,
    addBoard
}
//func from service
// query,
// getById,
// getByEmail,
// remove,
// update,
// add