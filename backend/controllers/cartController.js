const userModel = require('../models/UserModel')

const getCart = async (req, res) => {
    const userData = await userModel.findOne({ _id: req.body.userId })
    res.json(userData.cartData)
}

const addToCart = async (req, res) => {
    try {
        const userData = await userModel.findOne({ _id: req.body.userId });

        if (!userData) {
            return res.status(404).send('User not found');
        }

        if (!userData.cartData[req.body.itemId]) {
            userData.cartData[req.body.itemId] = 0;
        }

        userData.cartData[req.body.itemId] += 1;

        await userModel.findOneAndUpdate(
            { _id: req.body.userId },
            { cartData: userData.cartData }
        );

        res.send('Item added to cart');
    } catch (error) {
        console.error('Error adding to cart:', error);
        res.status(500).send('Server error');
    }
}


const removeToCart = async (req, res) => {
    const userData = await userModel.findOne({ _id: req.body.userId })
    if (userData.cartData[req.body.itemId] > 0)
        userData.cartData[req.body.itemId] -= 1
    await userModel.findOneAndUpdate(
        { _id: req.body.userId },
        { cartData: userData.cartData })
    res.send('removed')
}

module.exports = {
    getCart,
    addToCart,
    removeToCart
}