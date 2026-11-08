import React, { useEffect, useState } from 'react'
import { fetchProducts } from './productsSlice'
import { calculateTotal, addPurchase } from './purchasesSlice'
import { fetchCustomers } from './customersSlice'
import { useDispatch, useSelector } from 'react-redux'
import { Autocomplete, Grid, Typography, TextField } from '@mui/material'
import { Link } from 'react-router-dom'
import { nanoid } from '@reduxjs/toolkit'

export default function Products() {
    const dispatch = useDispatch()

    const products = useSelector((state) => state.products.products)
    const purchases = useSelector((state) => state.purchases.purchases)
    const purchasesTotal = useSelector((state) => state.purchases.total)
    const customers = useSelector((state) => state.customers.customers)
    
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [openRow, setOpenRow] = useState(null);

    useEffect(() => {
        dispatch(fetchProducts())
        dispatch(fetchCustomers())
    }, [dispatch])

    return (
        <div>

            <h2>Products</h2>
            <div>Total purchases : {purchasesTotal}</div>

            <div>
                <Grid container spacing={2}>
                    {
                        products.map((product) => (
                            <Grid key={product.id} item xs={12} sm={6} md={4}>
                                Name: <Link to={`/EditProduct/${product.id}`}>{product.title}</Link><br />
                                <Typography variant='h6'>Price: {product.price}$</Typography>
                                <Typography variant='h6'>Quantity: {product.stock}</Typography>
                                <div>Customers who purchased:
                                    {purchases.filter((purchase) => purchase.productId === product.id)
                                        .map((purchase, index) => {

                                            <div key={purchase.id}>
                                                Customers Name:
                                                <Link to={`/EditCustomer/${purchase.customerId}`}>
                                                    {customers.find(c => c.id === purchase.
                                                        customerId)?.firstName}{" "}
                                                    {customers.find(c => c.id === purchase.
                                                        customerId)?.lestName}
                                                </Link><br />
                                                Date of purchase: {new Date(purchase.date).toLocaleString()} <br />
                                                <button onClick={() => {
                                                    const rowId = `${purchase.customerId}-${index}`;
                                                    setOpenRow(prev => prev === rowId ? null : rowId);
                                                }}>Add</button>
                                                {openRow === `${purchase.customerId}-${index}` && (
                                                    <div>
                                                        <Autocomplete
                                                            options={products}
                                                            getOptionLabel={(option) => option.title}
                                                            value={selectedProduct}
                                                            onChange={(event, newValue) => {
                                                                setSelectedProduct(newValue);
                                                            }}
                                                            renderInput={(params) => (
                                                                <TextField
                                                                    {...params}
                                                                    label="Select Product"
                                                                />
                                                            )}
                                                        />
                                                        <button
                                                            disabled={!selectedProduct}
                                                            onClick={() => {
                                                                dispatch(calculateTotal(selectedProduct.price))
                                                                dispatch(addPurchase({
                                                                    id: nanoid(),
                                                                    customerId: foundCustomer.id,
                                                                    productId: selectedProduct.id,
                                                                    date: new Date().toISOString(),
                                                                }))
                                                            }}>
                                                            save
                                                        </button>
                                                    </div>
                                                )}

                                            </div>

                                        })}
                                </div>
                            </Grid>
                        ))}
                </Grid>


            </div>

        </div>
    )
}
