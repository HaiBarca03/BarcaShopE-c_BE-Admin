const express = require('express')
const { getComment, addComment, deleteComment } = require('../controllers/commentController')
const authMiddleware = require('../middleware/auth')

const commentRouter = express.Router()

commentRouter.get('/:productId', getComment)
commentRouter.post('/addcomment', authMiddleware, addComment)
commentRouter.delete('/:id', authMiddleware, deleteComment)

module.exports = commentRouter
