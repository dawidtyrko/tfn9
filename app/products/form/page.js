'use client'
import ProductForm from "@/app/products/ProductForm";
import {useRouter} from "next/navigation";

export default function FormPage() {
    const router = useRouter();

    const handleFormSubmit = ()=>{
        console.log("form submitted");
        router.push('/products');
    }
    return (
        <ProductForm mode={false} onSubmit={handleFormSubmit}/>
    )
}