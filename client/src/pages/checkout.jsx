import React from 'react';
import { useCart } from '../context/CartContext'; // Adjust this path if necessary

const Checkout = () => {
  const { cartItems } = useCart(); // Get cart items from context

  const totalAmount = cartItems.reduce((total, item) => {
    return total + item.price * item.quantity; // Calculate total amount
  }, 0);

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty!</p>
      ) : (
        <div>
          <ul>
            {cartItems.map((item, index) => (
              <li key={index}>
                {item.name} - ${item.price.toFixed(2)} x {item.quantity} = ${(
                  item.price * item.quantity
                ).toFixed(2)}
              </li>
            ))}
          </ul>
          <h3>Total: ${totalAmount.toFixed(2)}</h3>
          {/* Include any additional checkout logic here, like payment forms */}
        </div>
      )}
    </div>
  );
};

export default Checkout;
