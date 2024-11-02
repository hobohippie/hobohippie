import React, { useState, useEffect } from 'react';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';

function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();

  const [clientSecret, setClientSecret] = useState('');
  const [paymentStatus, setPaymentStatus] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchClientSecret = async () => {
      const response = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: 1000 }) // Adjust amount as needed
      });

      // Check for response status and parse JSON
      if (!response.ok) {
        console.error('Failed to create payment intent:', response.statusText);
        return;
      }

      const data = await response.json();
      setClientSecret(data.clientSecret); // Set clientSecret in state
    };

    fetchClientSecret();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements || !clientSecret) return;

    setLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: { return_url: 'https://your-site.com/order-confirmation' }
    });

    setLoading(false);

    if (error) {
      setPaymentStatus('Payment failed: ' + error.message);
    } else {
      setPaymentStatus('Payment successful!');
    }
  };

  return clientSecret ? (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <button type="submit" disabled={!stripe || loading}>
        {loading ? 'Processing...' : 'Pay'}
      </button>
      <p>{paymentStatus}</p>
    </form>
  ) : (
    <p>Loading...</p>
  );
}

export default CheckoutForm;
