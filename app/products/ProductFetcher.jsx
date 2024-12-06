'use client'
import {useEffect, useState} from "react";
import {FixedSizeList} from "react-window"
export default function ProductFetcher() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();
    useEffect(() => {
        const fetchProducts = async () => {
            try{
                setLoading(true);
                const response = await fetch(`http://localhost:3000/api/products`,{
                    method: 'GET',
                    headers: {'Content-Type': 'application/json',Accept: 'application/json'}

                });
                const data = await response.json();
                setProducts(data);
                console.log("Fetched products:", data);
            }catch(err){
                console.log(err);
                setError(err)
            }finally{
                setLoading(false);
            }
        }
        fetchProducts();
    },[])
    const Row = ({ index, style }) => {
        const product = products[index];
        return (
            <div style={style} key={product.id}>
                <p>{product.name}</p>
                <p>{product.category}</p>
            </div>
        );
    };
    if (loading) return <p>Loading...</p>;
    if (error) return <pre>{JSON.stringify(error, null, 2)}</pre>;
    if (products.length === 0) return null;
    return (
        <div style={{  textAlign: "center", marginTop: "20px" }}>
        <FixedSizeList
        height={window.innerHeight}
        width={window.innerWidth-50}
        itemCount={products.length}
        itemSize={200}
        >
            {Row}
        </FixedSizeList>
        </div>
    )
}