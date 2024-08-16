const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const validator = require('validator')
const userModel = require('../models/UserModel')

const loginUser = async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await userModel.findOne({ email })
        if (!user) {
            return res.json({ success: false, message: 'User does not exists' })
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            return res.json({
                success: false,
                message: 'Invalid information'
            })
        }

        const token = createToken(user._id)
        res.json({
            success: true,
            message: 'Login successfully',
            token
        })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: 'Error' })
    }
}


const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET)
}

const signUp = async (req, res) => {
    const { name, email, password } = req.body
    try {
        // check user exists
        const exists = await userModel.findOne({ email })
        if (exists) {
            return res.json({ success: false, message: "User already exists" })
        }

        let cart = {};
        for (let i = 0; i < 300; i++) {
            cart[i] = 0;
        }

        // check validating email format and strong password
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: 'Please enter a valid email' })
        }
        if (password.length < 8) {
            return res.json({ success: false, message: 'Please enter a strong password' })
        }

        //hashing user password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        const newUser = new userModel({
            name: name,
            email: email,
            password: hashedPassword,
            cartData: cart
        })

        const user = await newUser.save()
        const token = createToken(user._id)
        res.json({
            success: true,
            message: 'SignUp successfully',
            token
        })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: 'Error' })
    }
}

const getAllUser = async (req, res) => {
    try {
        // Chọn chỉ các trường 'name', 'email', và 'cartData'
        const users = await userModel.find({}, 'name email cartData');
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    signUp,
    loginUser,
    getAllUser
}