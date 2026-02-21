import React from 'react'
import { useSelector } from 'react-redux'
import { Package, Calendar, ShoppingCart, CheckCircle, XCircle, Hourglass , Trash2} from 'lucide-react';

function Orders() {
  const user = useSelector((state) => state.userGS.user) || [];
  const orders = user?.orders || []
  console.log(orders)
  return (

   
    <div className='unique-orders-container'>
    <h2 className='unique-title'><ShoppingCart size={24} /> Your Orders</h2>
    <div className='unique-orders-list'>
      {orders.length > 0 ? (
        orders.map((item) => (
          <div className='unique-order-card' key={item._id}>
            <h3 className='unique-order-id'><Package size={20} /> Order Id: {item.orderId}</h3>
            <p className='unique-total-amount'><span>₹{item.totalAmount}</span></p>
            <p className='unique-delivery-date'><Calendar size={20} /> Delivery Date: <span>{item.deliveryDate}</span></p>

            <p className={`unique-status ${item.status.toLowerCase()}`}>
              {item.status.toLowerCase() === 'pending' && <Hourglass size={18} />}
              {item.status.toLowerCase() === 'completed' && <CheckCircle size={18} />}
              {item.status.toLowerCase() === 'cancelled' && <XCircle size={18} />}
              Status: {item.status}
            </p>
            <div className='unique-products'>
              <h4>Products:</h4>
              {item.products.map((product, index) => (
                <div className='unique-product' key={index}>
                  <p className='unique-product-title'>{product.title}</p>
                  <p className='unique-product-price'>Price: ₹{product.price}</p>
                </div>
              ))}
            </div>
            {item.status.toLowerCase() === 'pending' && (
              <button className='unique-cancel-button' onClick={() => handleCancelOrder(item.orderId)}>
                <Trash2 size={18} /> Cancel Order
              </button>
            )}
          </div>
        ))
      ) : (
        <p className='unique-no-orders'>No orders found.</p>
      )}
    </div>
  </div>
  )
}

export default Orders
