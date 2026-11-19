import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { fetchCustomers, updateCustomer, deleteCustomer } from './customersSlice';
import { fetchProducts } from './productsSlice'
import { deletePurchasesByCustomer } from './purchasesSlice'

export default function EditCustomer() {
  const dispatch = useDispatch()
  const { customerId } = useParams();
  const customers = useSelector((state) => state.customers.customers)
  const products = useSelector((state) => state.products.products)
  const purchases = useSelector((state) => state.purchases.purchases)

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const foundCustomer = customers.find(c => c.id === Number(customerId));

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
  useEffect(() => {
    if (foundCustomer) {
      setFirstName(foundCustomer.firstName);
      setLastName(foundCustomer.lastName);
      setEmail(foundCustomer.email);
      setPhone(foundCustomer.phone);
    }
  }, [foundCustomer]);

  return (
    <div>
      EditCustomer:
      <div>
        Customer  First Name: <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)} /><br />
        Customer  Last Name: <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)} /><br />
        Customer Email: <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)} /><br />
        Customer Phone: <input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)} /><br />
        <button disabled={!foundCustomer} onClick={() => {
          dispatch(updateCustomer({
            id: foundCustomer.id,
            firstName: firstName,
            lastName: lastName,
            email: email,
            phone: phone
          }))
        }}>Update</button>
        <button disabled={!foundCustomer} onClick={() => {
          dispatch(deleteCustomer({
            id: foundCustomer.id
          }));
          dispatch(deletePurchasesByCustomer({
            customerId: foundCustomer.id
          }));
        }}>Delete</button>
      </div>
      <div>
        products purchased by this customer:
        <div>
          {purchases.filter(purchase => purchase.customerId === foundCustomer?.id)
            .map(purchase => {
              return (
                <div key={purchase.id}>
                  Product Name:
                  <Link to={`/EditProduct/${purchase.productId}`}>
                    {products.find(p => p.id === purchase.
                      productId)?.title}
                  </Link><br />
                </div>
              )
            }
            )}
        </div>
      </div>
    </div>
  )
}
