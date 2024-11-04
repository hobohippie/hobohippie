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
    if (cartItems.length === 0) {
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

    if (user) {
      setCustomerInfo({
        name: user.name,
        email: user.email,
        street: user.shippingAddress?.street || '',
        city: user.shippingAddress?.city || '',
        state: user.shippingAddress?.state || '',
        zip: user.shippingAddress?.zip || ''
      });
    }

    const totalAmount = cartItems.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);

    const parsedAmount = parseFloat(totalAmount.toFixed(2));

    const fetchClientSecret = async () => {
      setLoading(true);
      try {
        const amountInCents = Math.round(parsedAmount * 100);

        const response = await fetch('/api/create-payment-intent', {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
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
          console.error('Payment Intent Error:', {
            status: response.status,
            statusText: response.statusText,
            errorData
          });
          throw new Error(
            errorData?.message || 
            `Payment intent creation failed with status ${response.status}`
          );
        }

        const data = await response.json();
        setClientSecret(data.clientSecret);
      } catch (err) {
        setError(err.message || 'Error creating payment intent');
        console.error('Payment Intent Error Details:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchClientSecret();
  }, [cartItems, user]);

  return (
    <PaymentContext.Provider value={{ clientSecret, error, customerInfo, loading }}>
      {children}
    </PaymentContext.Provider>
  );
};
