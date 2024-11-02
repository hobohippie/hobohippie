import React, { createContext, useContext, useEffect, useState } from 'react';
import { useCart } from './context/CartContext'; 

const PaymentIntentContext = createContext();

export const usePaymentIntent = () => {
  return useContext(PaymentIntentContext);
};

export const PaymentIntentProvider = ({ children }) => {
  const { cartItems } = useCart();
  const [clientSecret, setClientSecret] = useState(null);

  const totalAmount = cartItems.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  useEffect(() => {
    const fetchClientSecret = async () => {
      try {
        const response = await fetch('/api/create-payment-intent', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ amount: totalAmount.toFixed(2) })
        });

        console.log('Response status:', response.status); // Log response status

        if (!response.ok) {
          const errorMessage = await response.text();
          throw new Error(`Failed to create payment intent. ${errorMessage}`);
        }

        const data = await response.json();

        console.log('Data received:', data); // Log received data

        if (data.clientSecret) {
          console.log(data.clientS)
          setClientSecret(data.clientSecret);
        } else {
          throw new Error("Failed to get client secret from server.");
        }
      } catch (err) {
        setError('Error fetching client secret. Please try again.');
        console.error('Fetch client secret error:', err);
      }
    };

    fetchClientSecret();
  }, [cartItems]);

  return (
    <PaymentIntentContext.Provider value={{ clientSecret }}>
      {children}
    </PaymentIntentContext.Provider>
  );
};
