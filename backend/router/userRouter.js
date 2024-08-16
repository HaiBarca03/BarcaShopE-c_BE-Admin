const express = require('express')
const { signUp, loginUser, getAllUser } = require('../controllers/userController')

const userRouter = express.Router()

userRouter.get('/all', getAllUser)
userRouter.post('/login', loginUser)
userRouter.post('/signup', signUp)

module.exports = userRouter
