import React, { useState, useEffect } from 'react';
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';

function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();

  const [clientSecret, setClientSecret] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchClientSecret = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch('/api/create-payment-intent', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ amount: 1000 }) // Adjust amount as needed
        });
        if (!response.ok) {
          throw new Error('Failed to initialize payment.');
        }
        const data = await response.json();
        setClientSecret(data.clientSecret);
      } catch (err) {
        setError('Failed to set up payment. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchClientSecret();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements || !clientSecret) return;

    setLoading(true);
    setError(null);
    setPaymentStatus('');

    try {
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: "https://your-site.com/order-confirmation", // Optional redirect
        },
      });

      if (error) {
        setError('Payment failed: ' + error.message);
      } else if (paymentIntent && paymentIntent.status === 'succeeded') {
        setPaymentStatus('Payment successful! Thank you for your purchase.');
      } else {
        setPaymentStatus(`Payment status: ${paymentIntent.status}`);
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: 'auto' }}>
      {clientSecret && <PaymentElement />}
      
      <button type="submit" disabled={!stripe || loading} style={{ marginTop: '20px', padding: '10px' }}>
        {loading ? 'Processing...' : 'Pay'}
      </button>

      {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
      {paymentStatus && <p style={{ color: 'green', marginTop: '10px' }}>{paymentStatus}</p>}
    </form>
  );
}

export default CheckoutForm;
