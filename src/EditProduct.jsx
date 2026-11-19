import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { deletePurchases } from './purchasesSlice'
import { fetchProducts, updateProduct, deleteProduct } from './productsSlice'

export default function EditProduct() {
  const dispatch = useDispatch()
  const { productId } = useParams();

  const products = useSelector((state) => state.products.products)
  const purchases = useSelector((state) => state.purchases.purchases)
  const customers = useSelector((state) => state.customers.customers)

  const [titel, setTitel] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');

  const isProductsLoaded = useSelector((state) => state.products.isLoaded)

  const foundProduct = products.find(p => p.id === Number(productId));

  useEffect(() => {
    if (!isProductsLoaded) {
      dispatch(fetchProducts())
    }
  }, [dispatch, isProductsLoaded])
  useEffect(() => {
    if (foundProduct) {
      setTitel(foundProduct.title);
      setPrice(foundProduct.price);
      setStock(foundProduct.stock);
    }
  }, [foundProduct]);

  return (
    <div>
      EditProduct:
      <div>
        Product Name: <input
          type="text"
          value={titel}
          onChange={(e) => setTitel(e.target.value)} /><br />
        Product Price: <input
          type="text"
          value={price}
          onChange={(e) => setPrice(e.target.value)} /><br />
        Product Quantity: <input
          type="text"
          value={stock}
          onChange={(e) => setStock(e.target.value)} /><br />
        <button disabled={!foundProduct} onClick={() => {
          dispatch(updateProduct({
            id: foundProduct.id,
            title: titel,
            price: Number(price),
            stock: Number(stock)
          }))
        }}>Update</button>
        <button disabled={!foundProduct} onClick={() => {
          dispatch(deleteProduct({
            id: foundProduct.id
          }));
          dispatch(deletePurchases({
            productId: foundProduct.id
          }));
        }}>Delete</button>

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
