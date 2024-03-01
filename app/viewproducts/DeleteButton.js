'use client'
import { useRouter } from "next/navigation";

const DeleteButton = ({ productId }) => {
    const router = useRouter();

    const handleDeleteClick = async () => {
        const response = await fetch(`http://localhost:3000/api/products/${productId}`, { method: 'DELETE' });
        const data = await response.json();
        alert(data.success ? 'Product Deleted' : data.error);
        router.refresh();
    };

    return <div className="products-deatails" onClick={handleDeleteClick}>Delete</div>
};

export default DeleteButton;