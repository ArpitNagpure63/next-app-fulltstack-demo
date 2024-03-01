'use client'

import { useRouter } from "next/navigation";
import { useState } from "react";

const AddProducts = () => {
    const router = useRouter();
    const [product, setProduct] = useState({
        name: '',
        price: '',
        company: '',
        color: '',
        category: ''
    });
    const [message, setMessage] = useState('');

    const handleInputChange = (value, type) => {
        const newProduct = { ...product, };
        newProduct[type] = value;
        setMessage('');
        setProduct(newProduct);
    };

    const handleSaveClick = async () => {
        const response = await fetch('http://localhost:3000/api/products', { method: 'POST', body: JSON.stringify({ ...product }) });
        const data = await response.json();
        console.log('data--->', data);
        setMessage(data.success ? 'Product is been added' : data.error);
    };

    return <div className="container-column">
        <div className="container-row"> Add Products</div>
        <div className="input-wrapper">
        <input
            type="text"
            onChange={(e) => handleInputChange(e.target.value, 'name')}
            className="input-field" placeholder="Enter Product Name" />
        <input
            type="text"
            onChange={(e) => handleInputChange(e.target.value, 'price')}
            className="input-field"
            placeholder="Enter Product Price" />
        <input
            type="text"
            onChange={(e) => handleInputChange(e.target.value, 'company')}
            className="input-field"
            placeholder="Enter Product Company" />
        <input
            type="text"
            onChange={(e) => handleInputChange(e.target.value, 'color')}
            className="input-field"
            placeholder="Enter Product Color" />
        <input
            type="text"
            onChange={(e) => handleInputChange(e.target.value, 'category')}
            className="input-field"
            placeholder="Enter Product Category" />
        <div className="container-row">{message}</div>
        <button className="button-cta" onClick={handleSaveClick}>Save</button>
        <button className="button-cta" onClick={() => router.push('/')}>Home Page</button>
        </div>
    </div>
};

export default AddProducts;