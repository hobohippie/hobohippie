import React, { createContext, useContext, useEffect, useState } from 'react';
import { useCart } from './CartContext';
import { useAuth } from './AuthContext';

const PaymentContext = createContext();

export const usePayment = () => {
  return useContext(PaymentContext);
};

export const PaymentProvider = ({ children }) => {
  const { user, logout } = useAuth(); 
  const { cartItems } = useCart();
  const [error, setError] = useState(null);
  const [clientSecret, setClientSecret] = useState(null);
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zip: ''
  });
  const [loading, setLoading] = useState(false); // Loading state

  useEffect(() => {
    if (cartItems.length === 0 || !user) {
      setClientSecret(null);
      setCustomerInfo({
        name: '',
        email: '',
        street: '',
        city: '',
        state: '',
        zip: ''
      });
      return;
    }

    const totalAmount = cartItems.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);

    const parsedAmount = parseFloat(totalAmount.toFixed(2));

    const fetchClientSecret = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('token');
        
        console.log('Token state:', {
          exists: !!token,
          user: !!user
        });

        if (!token || !user) {
          setLoading(false);
          setError('Please log in to continue with payment');
          return;
        }

        const amountInCents = Math.round(parsedAmount * 100);
        
        console.log('Payment intent request:', {
          amount: amountInCents,
          customerInfo,
          itemCount: cartItems.length
        });

        const response = await fetch('/api/create-payment-intent', {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ 
            amount: amountInCents,
            customerInfo,
            cartItems: cartItems.map(item => ({
              productId: item._id,
              quantity: item.quantity,
              price: item.price
            }))
          })
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => null);
          
          if (errorData?.auth === false || response.status === 401 || response.status === 403) {
            localStorage.removeItem('token');
            setError('Your session has expired. Please log in again.');
            logout?.();
            return;
          }

          throw new Error(
            errorData?.message || 
            `Payment intent creation failed with status ${response.status}`
          );
        }

        const data = await response.json();
        setClientSecret(data.clientSecret);
        setError(null);
      } catch (err) {
        console.error('Payment Intent Error Details:', err);
        setError(err.message || 'Error creating payment intent');
      } finally {
        setLoading(false);
      }
    };

    fetchClientSecret();
  }, [cartItems, user, logout]);

  return (
    <PaymentContext.Provider value={{ clientSecret, error, customerInfo, loading }}>
      {children}
    </PaymentContext.Provider>
  );
};
