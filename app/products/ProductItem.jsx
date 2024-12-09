'use client';
import {useState} from "react";
import ProductForm from "@/app/products/ProductForm";

export default function ProductItem({product, onSubmit, goBack}) {
    const [isEdit, setIsEdit] = useState(false);

    return (
        <div>
            {isEdit ? (
                <ProductForm
                    product={product}
                    mode={true}
                    onSubmit={onSubmit}
                />
            ) : (
                <div>
                    <h2>{product.name}</h2>
                    <p>Category: {product.category}</p>
                    <p>Amount: {product.amount}</p>
                    <p>Price: {product.unitPrice}</p>
                    <p>Supplier: {product.supplier}</p>
                    <button onClick={() => setIsEdit(true)}>Edit</button>
                    <button onClick={goBack}>Go back</button>
                </div>
            )}
        </div>
    );
}
