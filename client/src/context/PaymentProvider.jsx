import React, { createContext, useContext, useEffect, useState } from 'react';
import { useCart } from './CartContext';
import { useAuth } from './AuthContext';

const PaymentContext = createContext();

export const usePayment = () => {
  return useContext(PaymentContext);
};

export const PaymentProvider = ({ children }) => {
  const { user } = useAuth();
  const { cartItems } = useCart();
  const [error, setError] = useState(null);
  const [clientSecret, setClientSecret] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user || cartItems.length === 0) {
      setClientSecret(null);
      setError(null);
      setLoading(false);
      return;
    }

    const createPaymentIntent = async () => {
      setLoading(true);
      setError(null);

      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('Authentication required');
          return;
        }

        const totalAmount = cartItems.reduce((total, item) => 
          total + item.price * item.quantity, 0
        );
        const amountInCents = Math.round(totalAmount * 100);

        const response = await fetch('/api/create-payment-intent', {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ 
            amount: amountInCents,
            cartItems: cartItems.map(item => ({
              productId: item._id,
              quantity: item.quantity,
              price: item.price
            }))
          })
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Payment setup failed');
        }

        setClientSecret(data.clientSecret);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    createPaymentIntent();
  }, [user, cartItems]);

  return (
    <PaymentContext.Provider value={{ 
      clientSecret, 
      error, 
      loading,
      setError
    }}>
      {children}
    </PaymentContext.Provider>
  );
};
