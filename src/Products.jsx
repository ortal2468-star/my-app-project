import axios from 'axios'
import React, { useEffect } from 'react'

export default function Products() {
    useEffect(()=>{
        (async()=> {
            const Base = await axios.get("https://fakestoreapi.com/products");
        })();

    },[])

    return (
        <div>

            <h2>Products</h2>

            <div>

            </div>
            <div>

            </div>

        </div>
    )
}
