import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCustomers } from './customersSlice'
import { fetchProducts } from './productsSlice'
import { Link } from 'react-router-dom'

export default function Customers() {
    const dispatch = useDispatch()

    const customers = useSelector((state) => state.customers.customers)
    const products = useSelector((state) => state.products.products)
    const purchases = useSelector((state) => state.purchases.purchases)
    
    const isCustomersLoaded = useSelector((state) => state.customers.isLoaded)
    const isProductsLoaded = useSelector((state) => state.products.isLoaded)

    useEffect(() => {
        if (!isCustomersLoaded) {
            dispatch(fetchCustomers())
        }
        if (!isProductsLoaded) {
        dispatch(fetchProducts())
        }
    }, [dispatch, isCustomersLoaded, isProductsLoaded])

    return (
        <div>
            <h2>Customers:</h2>
            <table>
                <thead>
                    <tr>
                        <th>Customer Name:</th>
                        <th>Purchased Products:</th>
                    </tr>
                </thead>
                <tbody>
                    {customers.map((customer) => {
                        return (
                            <tr key={customer.id}>
                                <td>{customer.firstName} {customer.lastName}</td>
                                <td>{purchases.filter((purchase) => purchase.customerId === customer.id)
                                    .map((purchase) => {
                                        return (
                                            <div key={purchase.id}>
                                                Product Name:
                                                <Link to={`/EditProduct/${purchase.productId}`}>
                                                    {products.find(p => p.id === purchase.productId)?.title}
                                                </Link><br />
                                                Date of purchase: {new Date(purchase.date).toLocaleString()} <br />
                                            </div>
                                        )
                                    })}</td>
                            </tr>
                        )
                    })
                    }

                </tbody>
            </table>
        </div>
    )
}
