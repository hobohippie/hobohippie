import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { usePayment } from '../context/PaymentProvider';
import Checkout from '../pages/checkout';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

const CheckoutPayment = () => {
  const { clientSecret } = usePayment();

  if (!clientSecret) {
    return <div>Loading...</div>;
  }

  return (
    <Elements stripe={stripePromise} options={{ clientSecret }}>
      <Checkout />
    </Elements>
  );
};

export default CheckoutPayment;