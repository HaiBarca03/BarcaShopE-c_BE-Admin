const productModel = require('../models/ProductModel')

const addProduct = async (req, res) => {

    let products = await productModel.find({})
    let id
    if (products.length > 0) {
        let last_product_array = products.slice(-1)
        let last_product = last_product_array[0]
        id = last_product.id + 1
    } else {
        id = 1
    }

    const product = new productModel({
        id: id,
        name: req.body.name,
        image: req.body.image,
        category: req.body.category,
        new_price: req.body.new_price,
        old_price: req.body.old_price,
        description: req.body.description,
    })

    try {
        await product.save()
        console.log(product)
        res.json({
            success: true,
            name: req.body.name,
            massage: 'Product Added'
        })
    }
    catch (error) {
        console.log(error)
        res.json({ success: false, message: 'Product add error' })
    }
}

const removeProduct = async (req, res) => {
    try {
        await productModel.findOneAndDelete({
            id: req.body.id
        })
        res.json({
            success: true,
            name: req.body.name,
            message: "Product Removed"
        })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })

    }
}

const listProduct = async (req, res) => {
    try {
        const products = await productModel.find({})
        res.json({
            success: true,
            data: products
        })
    } catch (error) {
        console.log(error)
        res.json({
            success: false,
            message: 'Get list food error'
        })
    }
}

const newCollection = async (req, res) => {
    try {
        const products = await productModel.find({})
        const newCollection = products.slice(1).slice(-8)
        res.json({
            success: true,
            data: newCollection
        })
    } catch (error) {
        console.log(error)
        res.json({
            success: false,
            message: 'Get list food error'
        })
    }
}

const popularWomen = async (req, res) => {
    try {
        const products = await productModel.find({ category: 'women' })
        const popularWomen = products.slice(0, 4)
        res.json({
            success: true,
            data: popularWomen
        })
    } catch (error) {
        console.log(error)
        res.json({
            success: false,
            message: 'Get list food error'
        })
    }
}

module.exports = {
    addProduct,
    removeProduct,
    listProduct,
    newCollection,
    popularWomen
}