import React, { useEffect, useState } from 'react';
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';

const CheckoutForm = ({ clientSecret }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Handle payment submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements || !clientSecret) return;

    setLoading(true); // Set loading state to true
    setError(null); // Reset any previous errors

    // Confirm the payment
    const { error: paymentError, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: 'YOUR_RETURN_URL', // Set your return URL here
      },
    });

    if (paymentError) {
      console.error(paymentError);
      setError(paymentError.message); // Set error message to display
    } else {
      // Payment succeeded
      console.log('Payment succeeded:', paymentIntent);
      // You can handle successful payment here (e.g., redirect, display a message, etc.)
    }
    
    setLoading(false); // Reset loading state
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement /> {/* Render the PaymentElement */}
      <button type="submit" disabled={!stripe || loading}>
        {loading ? 'Processing...' : 'Pay Now'}
      </button>
      {error && <div className="error">{error}</div>} {/* Display error if exists */}
    </form>
  );
};

export default CheckoutForm;
