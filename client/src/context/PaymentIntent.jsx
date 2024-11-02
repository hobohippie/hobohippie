// PaymentIntentContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useCart } from './context/CartContext'; // Import your Cart context

const PaymentIntentContext = createContext();

export const usePaymentIntent = () => {
  return useContext(PaymentIntentContext);
};

export const PaymentIntentProvider = ({ children }) => {
  const { cartItems } = useCart();
  const [clientSecret, setClientSecret] = useState(null);

  useEffect(() => {
    if (cartItems.length > 0) {
      fetch("/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: cartItems })
      })
        .then(res => res.json())
        .then(data => setClientSecret(data.clientSecret))
        .catch(error => console.error("Error fetching client secret:", error));
    }
  }, [cartItems]);

  return (
    <PaymentIntentContext.Provider value={{ clientSecret }}>
      {children}
    </PaymentIntentContext.Provider>
  );
};
