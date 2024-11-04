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
    const createPaymentIntent = async () => {
      if (!cartItems || cartItems.length === 0 || !user) {
        setClientSecret(null);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        // Get fresh token from localStorage
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('Please log in to continue');
        }

        const totalAmount = cartItems.reduce((total, item) => 
          total + (item.price * item.quantity), 0
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
            items: cartItems.map(item => ({
              id: item._id,
              quantity: item.quantity
            }))
          })
        });

        const data = await response.json();

        if (!response.ok) {
          // If token is invalid, clear it and force re-login
          if (data.message === 'Failed to authenticate token.') {
            localStorage.removeItem('token');
            throw new Error('Your session has expired. Please log in again.');
          }
          throw new Error(data.message || 'Payment setup failed');
        }

        setClientSecret(data.clientSecret);
      } catch (err) {
        console.error('Payment Intent Error:', err);
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
