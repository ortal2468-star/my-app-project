import React, { useEffect, useState } from 'react'
import { fatchProducts } from './productsSlice'
import { calculateTotal } from './purchasesSlice'
import { useDispatch, useSelector } from 'react-redux'
import { Autocomplete, Grid, Typography, TextField } from '@mui/material'
import { Link } from 'react-router-dom'

export default function Products() {
    const dispatch = useDispatch()
    const products = useSelector((state) => state.products.products)
    const purchases = useSelector((state) => state.purchases)
    const [openRow, setOpenRow] = useState(null);

    useEffect(() => {
        dispatch(fatchProducts())
    }, [dispatch])

    return (
        <div>

            <h2>Products</h2>
            <div>Total purchases : {purchases.total}</div>

            <div>
                <Grid container spacing={2}>
                    {
                        products.map((product) => (
                            <Grid key={product.id} item xs={12} sm={6} md={4}>
                                Name: <Link to="/EditProduct">{product.title}</Link><br />
                                <Typography variant='h6'>Price: {product.price}$</Typography>
                                <Typography variant='h6'>Quantity: {product.stock}</Typography>
                                <div>Customers who purchased:
                                    {product.reviews.map((reviewer, index) =>
                                        <div key={index}>
                                            Customers Name: {reviewer.reviewerName}<br />
                                            Date of purchase: {reviewer.date}<br />
                                            <button onClick={() => {
                                                const rowId = `${product.id}-${index}`;
                                                setOpenRow(prev => prev === rowId ? null : rowId);
                                            }}>Add</button>
                                            {openRow === `${product.id}-${index}` && (
                                                <div>
                                                <Autocomplete
                                                    options={products}
                                                    getOptionLabel={(option) => option.title}
                                                    renderInput={(params) => (
                                                        <TextField
                                                            {...params}
                                                            label="Select Product"
                                                        />
                                                    )}
                                                />
                                                <button onClick={() => dispatch(calculateTotal(product.price))}>save</button>
                                                </div>
                                                )}
                                        </div>
                                    )}
                                </div>
                            </Grid>
                        ))
                    }
                </Grid>


            </div>

        </div>
    )
}
