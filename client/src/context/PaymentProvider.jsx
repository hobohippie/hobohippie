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
      // Don't proceed if no items in cart
      if (!cartItems || cartItems.length === 0) {
        setClientSecret(null);
        return;
      }

      // Don't proceed if no user
      if (!user) {
        setError('Please log in to continue');
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('Authentication required');
        }

        // Calculate total amount
        const totalAmount = cartItems.reduce((total, item) => 
          total + (item.price * item.quantity), 0
        );

        // Convert to cents and ensure it's a valid number
        const amountInCents = Math.round(totalAmount * 100);
        
        if (amountInCents <= 0) {
          throw new Error('Invalid cart amount');
        }

        console.log('Creating payment intent:', {
          amount: amountInCents,
          itemCount: cartItems.length,
          hasToken: !!token
        });

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

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Payment setup failed');
        }

        const data = await response.json();
        setClientSecret(data.clientSecret);
      } catch (err) {
        console.error('Payment Intent Error:', err);
        setError(err.message);
        setClientSecret(null);
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
