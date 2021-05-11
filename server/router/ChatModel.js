const router = require('express').Router()
const ChatController = require('../controller/ChatModel')

router.post('/create/chat/', ChatController.createChat)
router.post('/create/message/:id/', ChatController.createMessage)
router.get('/chat/:userId/', ChatController.visatChat)
router.get('/chat/chat/:id/', ChatController.visaChatId)
module.exports = router