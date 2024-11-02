import React, { useState, useEffect } from 'react';
import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';

function CheckoutForm({ totalAmount }) {
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchClientSecret = async () => {
      if (totalAmount <= 0) {
        setError("Total amount must be greater than zero.");
        return;
      }
      try {
        const response = await fetch('/api/create-payment-intent', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ amount: totalAmount })
        });
        
        if (!response.ok) {
          throw new Error('Failed to create payment intent.');
        }
        
        const data = await response.json();
        
        if (data.clientSecret) {
          setClientSecret(data.clientSecret);
        } else {
          throw new Error("Failed to get client secret from server.");
        }
      } catch (err) {
        setError('Error fetching client secret. Please try again.');
        console.error(err);
      }
    };

    fetchClientSecret();
  }, [totalAmount]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements || !clientSecret) return;

    setLoading(true);
    setError(null);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: "https://your-website.com/order-status", // adjust to your return URL
      },
    });

    setLoading(false);

    if (error) {
      setError('Payment failed: ' + error.message);
    } else if (paymentIntent && paymentIntent.status === 'succeeded') {
      setPaymentStatus('Payment successful!');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {clientSecret ? (
        <PaymentElement />
      ) : (
        <p>Loading payment information...</p>
      )}
      <button type="submit" disabled={!stripe || loading || !clientSecret}>
        {loading ? 'Processing...' : 'Pay'}
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {paymentStatus && <p>{paymentStatus}</p>}
    </form>
  );
}

export default CheckoutForm;
