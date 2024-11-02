import React, { createContext, useContext, useEffect, useState } from 'react';
import { useCart } from '../context/CartContext'; 

const PaymentContext = createContext();

export const usePayment = () => {
  return useContext(PaymentContext);
};

export const PaymentProvider = ({ children }) => {
  const { cartItems } = useCart();
  const [clientSecret, setClientSecret] = useState(null);
  const [error, setError] = useState(null);

  const totalAmount = cartItems.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  useEffect(() => {
    if (cartItems.length === 0) {
      setClientSecret(null);
      return;
    }

    const fetchClientSecret = async () => {
      try {
        const response = await fetch('/api/create-payment-intent', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ amount: totalAmount.toFixed(2) }) // Amount in cents
        });

        console.log('Response status:', response.status); // Log response status

        if (!response.ok) {
          const errorMessage = await response.text();
          throw new Error(`Failed to create payment intent. ${errorMessage}`);
        }

        const data = await response.json();

        console.log('Data received:', data); // Log received data

        if (data.clientSecret) {
          console.log(data.clientSecret); // Log clientSecret
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
  }, [cartItems, totalAmount]);

  return (
    <PaymentContext.Provider value={{ clientSecret, error }}>
      {children}
    </PaymentContext.Provider>
  );
};
