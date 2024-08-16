const mongoose = require('mongoose')
const userShema = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
    },
    cartData: {
        type: Object
    },
    date: {
        type: Date,
        default: Date.now
    }
})

const userModel = mongoose.model('user', userShema);

module.exports = userModel