import React, { useEffect, useState } from 'react'
import './ListProduct.css'
import cross_icon from '../../assets/cross_icon.png'

const ListProduct = () => {

    const [allproducts, setAllProducts] = useState([])

    const fetchInfo = async () => {
        try {
            const response = await fetch('http://localhost:4000/api/product/allproduct');
            const result = await response.json();

            if (result.success) {
                // Access the 'data' property from the response
                setAllProducts(result.data);
            } else {
                console.error('Failed to fetch products:', result.message);
            }
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    useEffect(() => {
        fetchInfo();
    }, [])

    const remove_product = async (id) => {
        await fetch('http://localhost:4000/api/product/removeproduct', {
            method: 'POST',
            headers: {
                Accecpt: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: id })
        })
        await fetchInfo()
    }

    return (
        <>
            <div className='list-product'>
                <h1>ALL PRODUCTS ({allproducts.length})</h1>
                <div className="listproduct-format-main">
                    <p>Products</p>
                    <p>Title</p>
                    <p>Old Price</p>
                    <p>New Price</p>
                    <p>Category</p>
                    <p>Remove</p>
                </div>
                <div className='listproduct-allproducts'>
                    <hr />
                    {allproducts.length > 0 ? (
                        allproducts.map((product, index) => (
                            <div key={index} className="listproduct-format-main listproduct-format">
                                <img src={product.image} className='listproduct-product-icon' alt={product.name} />
                                <p>{product.name}</p>
                                <p>${product.old_price}</p>
                                <p>${product.new_price}</p>
                                <p>{product.category}</p>
                                <img onClick={() => { remove_product(product.id) }} src={cross_icon} className='listproduct-remove-icon' alt="Remove" />
                            </div>
                        ))
                    ) : (
                        <p>No products available.</p>
                    )}

                </div>
            </div>
        </>
    )
}

export default ListProduct
