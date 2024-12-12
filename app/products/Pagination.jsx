import {useEffect, useState} from "react";
import ProductFetcher from "@/app/products/ProductFetcher";
import { faker } from '@faker-js/faker'

export default function Pagination() {
    const itemsPerPage = 20;
    const fixedDate = "2024-11-15";

    const bigList = [...Array(200)].map((_, index) => ({
        id: index + 1, // Incremental ID starting from 1
        name: faker.commerce.productName(), // Generate a product name
        category: faker.commerce.department(), // Generate a product category
        quantity: faker.number.int({ min: 1, max: 100 }), // Random quantity between 1 and 100
        unitPrice: faker.commerce.price({ min: 10, max: 500, dec: 2 }), // Random price between 10 and 500
        dateAdded: fixedDate, // Fixed date for all products
        supplier: faker.company.name(), // Random supplier name
        timestamp: new Date().toISOString(), // Current timestamp
        amount: faker.number.int({ min: 1000, max: 10000 }), // Random amount between 1000 and 10000
    }));
    useEffect(() => {
        let bigStorageList = JSON.parse(localStorage.getItem("products") || "[]");
        if (bigStorageList && bigStorageList.length > 0) {
            console.log("There is already array in localStorage "+ bigStorageList.length);
        }else{

            localStorage.setItem("products", JSON.stringify(bigList));
        }
    },[])



    return (
        <>
        <ProductFetcher bigList={bigList} itemsPerPage={20} />

        </>
)
}