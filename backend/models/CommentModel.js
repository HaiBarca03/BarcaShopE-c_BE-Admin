// models/Comment.js
const mongoose = require('mongoose');
const productModel = require('../models/ProductModel')

const commentSchema = new mongoose.Schema({
    productId: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const commentsModel = mongoose.model('comments', commentSchema);

module.exports = commentsModel
