const express = require('express')
const { addProduct, removeProduct, listProduct, newCollection, popularWomen, addToCart } = require('../controllers/productController')

const productRouter = express.Router()

productRouter.post('/addproduct', addProduct)
productRouter.post('/removeproduct', removeProduct)
productRouter.get('/allproduct', listProduct)
productRouter.get('/newcollections', newCollection)
productRouter.get('/popularwomen', popularWomen)


module.exports = productRouter