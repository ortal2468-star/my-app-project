import React, { useEffect } from 'react'
import { fatchProducts } from './productsSlice'
import { useDispatch, useSelector } from 'react-redux'
import { Grid, Typography } from '@mui/material'
import { Link } from 'react-router-dom'

export default function Products() {
    const dispatch = useDispatch()
    const products = useSelector((state) => state.products.products)

    useEffect(() => {
        dispatch(fatchProducts())
    }, [dispatch])

    return (
        <div>

            <h2>Products</h2>
            <div>

            </div>
            <div>
                <Grid container spacing={2}>
                    {
                        products.map((product) => (
                            <Grid item xs={12} sm={6} md={4} key={product.id}>
                                Name: <Link to="/EditProduct">{product.title}</Link><br/>
                                <Typography variant='h6'>Price: {product.price}$</Typography>
                                <Typography variant='h6'>Quantity: {product.stock}</Typography>
                            </Grid>
                        ))
                    }
                </Grid>


            </div>

        </div>
    )
}
