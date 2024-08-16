const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const dbConnect = require('./config/db')

const productRouter = require('./router/productRouter')
const userRouter = require('./router/userRouter')
const cartRouter = require('./router/cartRouter')
const commentRouter = require('./router/commentRouter')

require('dotenv').config()
const app = express()
const port = 4000;


app.use('/images', express.static(path.join(__dirname, 'upload/images')));
app.use(express.json())
app.use(cors())


dbConnect()

//api
app.use('/api/product', productRouter)
app.use('/api/user', userRouter)
app.use('/api/cart', cartRouter)
app.use('/api/comment', commentRouter)

// respond with "hello world" when a GET request is made to the homepage
app.get('/', (req, res) => {
    res.send('hello world')
})


// image storage engine
const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})
const upload = multer({ storage: storage })
app.post("/upload", upload.single('product'), (req, res) => {
    res.json({
        success: 1,
        image_url: `http://localhost:${port}/images/${req.file.filename}`
    })
})


app.listen(port, () => {
    console.log(`App running on port: ${port}`)
})