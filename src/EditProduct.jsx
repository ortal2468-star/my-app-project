import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { fetchProducts } from './productsSlice'



export default function EditProduct() {
  const dispatch = useDispatch()
  const products = useSelector((state) => state.products.products)
  const purchases = useSelector((state) => state.purchases.purchases)
  const customers = useSelector((state) => state.customers.customers)
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
        Customers who purchased:
        <div>
          {purchases.filter((purchase) => purchase.productId === foundProduct?.id)
            .map((purchase, index) => (
              <div key={purchase.id}>
                Customers Name:
                <Link to={`/EditCustomer/${purchase.customerId}`}>
                  {customers.find(c => c.id === purchase.
                    customerId)?.firstName}{" "}
                  {customers.find(c => c.id === purchase.
                    customerId)?.lestName}
                </Link><br />
              </div>
            ))}
        </div>


      </div>

    </div>
  )
}
