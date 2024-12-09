'use client';
import {useEffect, useState} from "react";
import {FixedSizeList} from "react-window";
import {useRouter} from "next/navigation";
import ProductItem from "@/app/products/ProductItem";

export default function ProductFetcher({bigList,itemsPerPage}) {
    const router = useRouter();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [page, setPage] = useState(1);

    const startIndex = (page - 1) * itemsPerPage;
    const currentPageItems = bigList.slice(startIndex, startIndex + itemsPerPage);
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const response = await fetch(`http://localhost:3000/api/products`, {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json', Accept: 'application/json' }
                });
                const data = await response.json();
                setProducts(data);
                console.log("Fetched products:", data);
            } catch (err) {
                console.log(err);
                setError(err);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    const handleFormSubmit = () => {
        // Reset the selected product and refresh the product list
        setSelectedProduct(null);
        // Optionally refresh product list
        const fetchProducts = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/products`);
                const data = await response.json();
                setProducts(data);
                console.log("Last Fetched product:", data[data.length - 1]);
            } catch (err) {
                console.log(err);
            }
        };
        fetchProducts();
    };
    const handleAddProduct = () => {
        router.push("/products/form");
    };

    const Row = ({ index, style }) => {
        const product = currentPageItems[index]; //bigList or products
        return (
            <div style={style} key={product.id}>
                <p>{product.name}</p>
                <p>{product.category}</p>
                <button onClick={() => setSelectedProduct(product)}>Details</button>
            </div>
        );
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <pre>{JSON.stringify(error, null, 2)}</pre>;
    if (products.length === 0) return <p>No products found.</p>;

    return (
        <>
        {selectedProduct ? (
            <ProductItem
                product={selectedProduct}
                onSubmit={handleFormSubmit}
                goBack={() => setSelectedProduct(null)}
            />
        ) : (
            <>
            <div style={{textAlign: "center", marginTop: "20px"}}>
                <button onClick={handleAddProduct} style={{marginBottom: "20px"}}>
                    Add New Product
                </button>
                <FixedSizeList
                    height={window.innerHeight - 100}
                    width={window.innerWidth}
                    itemCount={currentPageItems.length}
                    itemSize={80}
                >
                    {Row}
                </FixedSizeList>
            </div>
            <div style={{textAlign: "center", marginBottom: "20px"}}>
        <button onClick={() => setPage((prev) => Math.max(prev - 1, 1))} disabled={page === 1}>
            Previous
        </button>
        <span style={{margin: "0 10px"}}>Page {page}</span>
        <button
            onClick={() => setPage((prev) => (prev * itemsPerPage < bigList.length ? prev + 1 : prev))}
            disabled={page * itemsPerPage >= bigList.length}
        >
            Next
        </button>
        </div>
            </>
    )
}
</>
)
    ;
}
