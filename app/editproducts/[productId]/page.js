'use client'
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const EditProduct = ({ params }) => {
    const [product, setProduct] = useState({
        name: '',
        price: '',
        company: '',
        color: '',
        category: ''
    });
    const [message, setMessage] = useState('');
    const router = useRouter();

    const handleInputChange = (value, type) => {
        const newProduct = { ...product, };
        newProduct[type] = value;
        setMessage('');
        setProduct(newProduct);
    };

    const getProductDetail = async () => {
        const response = await fetch(`http://localhost:3000/api/products/${params.productId}`);
        const specificProductData = await response.json();
        console.log('specificProductData--->', specificProductData);
        if (specificProductData.success && specificProductData.product) {
            setProduct(specificProductData.product)
        } else {
            setMessage(specificProductData.error);
        }
    };

    const handleUpdateClick = async () => {
        const response = await fetch(`http://localhost:3000/api/products/${params.productId}`,
            { method: 'PUT', body: JSON.stringify({ ...product }) });
        const updatedProduct = await response.json();
        console.log('updatedProduct--->', updatedProduct);
        setMessage(updatedProduct.success ? 'Product has been updated' : updatedProduct.error);
    }

    useEffect(() => {
        getProductDetail();
    }, []);

    return <div className="container-column">
        <div className="container-row">Edit User</div>
        <div className="input-wrapper">
            <input
                type="text"
                value={product.name}
                onChange={(e) => handleInputChange(e.target.value, 'name')}
                className="input-field" placeholder="Enter Product Name" />
            <input
                type="text"
                value={product.price}
                onChange={(e) => handleInputChange(e.target.value, 'price')}
                className="input-field"
                placeholder="Enter Product Price" />
            <input
                type="text"
                value={product.company}
                onChange={(e) => handleInputChange(e.target.value, 'company')}
                className="input-field"
                placeholder="Enter Product Company" />
            <input
                type="text"
                value={product.color}
                onChange={(e) => handleInputChange(e.target.value, 'color')}
                className="input-field"
                placeholder="Enter Product Color" />
            <input
                type="text"
                value={product.category}
                onChange={(e) => handleInputChange(e.target.value, 'category')}
                className="input-field"
                placeholder="Enter Product Category" />
            <div className="container-row">{message}</div>
            <button className="button-cta" onClick={handleUpdateClick}>Update</button>
            <button className="button-cta" onClick={() => router.push('/')}>Home Page</button>
        </div>
    </div>
};

export default EditProduct;