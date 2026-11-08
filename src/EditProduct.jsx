import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { fetchProducts } from './productsSlice'



export default function EditProduct() {
  const dispatch = useDispatch()
  const products = useSelector((state) => state.products.products)
  const { productId } = useParams();
  const foundProduct = products.find(p => p.id === Number(productId));

  useEffect(() => {
    dispatch(fetchProducts())
  }, [dispatch])

  return (
    <div>
      EditProduct:
      <div>

      </div>
      <div>
        Customers Name:


        <div key={foundProduct?.id}>
          {foundProduct?.reviews?.map((customer, index) => (
            <div key={index}>
            Customers Name: <Link to={`/EditCustomer/${customer.reviewerName}`}>
                {customer.reviewerName}
              </Link>
            </div>
          ))}
        </div>


      </div>

    </div>
  )
}
