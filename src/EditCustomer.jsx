import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { fetchCustomers, updateCustomer, deleteCustomer } from './customersSlice';

export default function EditCustomer() {
  const dispatch = useDispatch()
  const { customerId } = useParams();
  const customers = useSelector((state) => state.customers.customers)

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const foundCustomer = customers.find(c => c.id === Number(customerId));

  useEffect(() => {
    dispatch(fetchCustomers())
  }, [dispatch])
  useEffect(() => {
    if (foundCustomer) {
      setName(foundCustomer.name);
      setEmail(foundCustomer.email);
      setPhone(foundCustomer.phone);
    }
  }, [foundCustomer]);

  return (
    <div>
      EditCustomer:
      <div>
        Customer Name: <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)} /><br />
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
            name: name,
            email: email,
            phone: phone
          }))
        }}>Update</button>
        <button disabled={!foundCustomer} onClick={() => {
          dispatch(deleteCustomer({
            id: foundCustomer.id
          }));
        }}>Delete</button>
      </div>
      <div>
        products purchased by this customer:
        <div>
          {purchases.filter(purchase => purchase.customerId === foundCustomer?.id)
            .map(purchase => {
              <div key={purchase.id}>
                Product Name:
                <Link to={`/EditProduct/${purchase.productId}`}>
                  {products.find(p => p.id === purchase.
                    productId)?.title}
                </Link><br />
              </div>
            }
            )}
        </div>
      </div>
    </div>
  )
}
