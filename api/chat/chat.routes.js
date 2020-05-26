const express = require('express')
const { requireAuth, requireAdmin } = require('../../middlewares/requireAuth.middleware')
const { getChat, deleteChat, addMsg , updateRoomChat} = require('./chat.controller')
const router = express.Router()

// middleware that is specific to this router
// router.use(requireAuth)

// router.get('/', getboards)
router.get('/:id', getChat)
router.put('/:id', requireAuth, updateRoomChat)
router.post('/', requireAuth, addMsg)
router.delete('/:id', requireAuth, deleteChat)

module.exports = router