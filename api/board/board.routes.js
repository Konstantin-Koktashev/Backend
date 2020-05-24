const express = require('express')
const { requireAuth, requireAdmin } = require('../../middlewares/requireAuth.middleware')
const { getboard, getboards, deleteboard, updateboard, addBoard } = require('./board.controller')
const router = express.Router()

// middleware that is specific to this router
// router.use(requireAuth)

router.get('/', getboards)
router.get('/:id', getboard)
router.put('/:id', requireAuth, updateboard)
router.post('/', requireAuth, addBoard)
router.delete('/:id', requireAuth, requireAdmin, deleteboard)

module.exports = router