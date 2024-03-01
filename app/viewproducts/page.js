import Link from "next/link";
import DeleteButton from "./DeleteButton";

const getProducts = async () => {
    const response = await fetch('http://localhost:3000/api/products', { cache: 'no-cache' });
    const products = await response.json();
    return products.success && products.productsList ? products.productsList : [];
};

const ViewProducts = async () => {
    const productsList = await getProducts();

    return <div className="container-column">
        <div className="container-row">Here are the list of products</div>
        <div className="products-container">
            {
                productsList.map((item, index) => {
                    return <div className="products-wrpper" key={index}>
                        <div className="products-deatails">{item.name}</div>
                        <div className="products-deatails">{item.price}</div>
                        <div className="products-deatails">{item.company}</div>
                        <div className="products-deatails">{item.color}</div>
                        <div className="products-deatails">{item.category}</div>
                        <Link className="products-deatails" href={`/editproducts/${item._id}`}>Edit</Link>
                        <DeleteButton productId={item._id} />
                    </div>
                })
            }
        </div>
        <Link className="container-row" href="/addproducts">Add Product</Link>
    </div>
};

export default ViewProducts;