// routes/comments.js
const express = require('express');
const router = express.Router();
const commentsModel = require('../models/CommentModel');

// Lấy tất cả bình luận cho một sản phẩm
const getComment = async (req, res) => {
    try {
        const comments = await commentsModel.find({ productId: req.params.productId }).sort({ createdAt: -1 });
        res.json(comments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Thêm bình luận
const addComment = async (req, res) => {
    const { productId, author, content } = req.body;
    try {
        const newComment = new commentsModel({ productId, author, content });
        await newComment.save();
        res.status(201).json(newComment);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const deleteComment = async (req, res) => {
    try {
        await commentsModel.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Comment deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    getComment,
    addComment,
    deleteComment
};
