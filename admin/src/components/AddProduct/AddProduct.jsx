import React, { useState } from 'react'
import './AddProduct.css'
import upload_area from '../../assets/upload_area.svg'

const AddProduct = () => {

    const [image, setImage] = useState(false)
    const [productDetail, setProductDetail] = useState({
        name: "",
        image: "",
        category: "women",
        new_price: "",
        old_price: "",
        description: "",
    })

    const imageHandler = (e) => {
        setImage(e.target.files[0])
    }

    const changeHandler = (e) => {
        setProductDetail({ ...productDetail, [e.target.name]: e.target.value })
    }

    const add_product = async () => {
        console.log(productDetail)
        let responseData;
        let product = productDetail;

        let formData = new FormData()
        formData.append('product', image);
        await fetch('http://localhost:4000/upload', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
            },
            body: formData
        }).then((resp) => resp.json()).then((data) => { responseData = data })

        if (responseData.success) {
            product.image = responseData.image_url
            console.log(product)
            await fetch('http://localhost:4000/api/product/addproduct', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(product),
            }).then((resp) => resp.json()).then((data) => { data.success ? alert('product added') : alert('failed') })
        }
    }
    return (
        <div className='add-product'>
            <div className="addproduct-itemfield">
                <p>Product title</p>
                <input value={productDetail.name} onChange={changeHandler} type="text" name='name' placeholder='Type here' />
            </div>
            <div className="addproduct-price">
                <div className="addproduct-itemfield">
                    <p>Price</p>
                    <input value={productDetail.old_price} onChange={changeHandler} type="text" name="old_price" placeholder='Type here' />
                </div>
                <div className="addproduct-itemfield">
                    <p>Offer Price</p>
                    <input value={productDetail.new_price} onChange={changeHandler} type="text" name="new_price" placeholder='Type here' />
                </div>
            </div>
            <div className="addproduct-itemfield">
                <p>Product Category</p>
                <select value={productDetail.category} onChange={changeHandler} name="category" className='add-product-selector'>
                    <option value="women">Women</option>
                    <option value="men">Men</option>
                    <option value="kid">Kid</option>
                </select>
            </div>
            <div className="addproduct-itemfield">
                <p>Product description</p>
                <input value={productDetail.description} onChange={changeHandler} type="text" name='description' placeholder='Type here' />
            </div>
            <div className="addproduct-itemfield">
                <label htmlFor="file-input">
                    <img src={image ? URL.createObjectURL(image) : upload_area} className='addproduct-thumnail-img' alt="" />
                </label>
                <input onChange={imageHandler} type="file" name='image' id='file-input' />
            </div>
            <button onClick={() => { add_product() }} className='addproduct-btn'>ADD</button>
        </div>
    )
}

export default AddProduct
