const express = require('express')
const { getCart, addToCart, removeToCart } = require('../controllers/cartController')
const authMiddleware = require('../middleware/auth')

const cartRouter = express.Router()

cartRouter.post('/gettocart', authMiddleware, getCart)
cartRouter.post('/addtocart', authMiddleware, addToCart)
cartRouter.post('/removetocart', authMiddleware, removeToCart)

module.exports = cartRouter
