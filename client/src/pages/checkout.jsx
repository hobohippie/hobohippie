import React, { useState, useEffect } from 'react';  
import { Navigate } from 'react-router-dom';
import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/UserAuthContext';
import { usePayment } from '../context/PaymentProvider';

function CheckoutForm() {  
  const { clientSecret } = usePayment();
  const { cartItems } = useCart();
  const { user } = useAuth();


  const stripe = useStripe();
  const elements = useElements();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState('');

  const [customerInfo, setCustomerInfo] = useState({});

  if (!user) {
    return <Navigate to="/login" />
  }

  const totalAmount = cartItems.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  const parsedAmount = parseFloat(totalAmount.toFixed(2));

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements || !clientSecret) return;

    setLoading(true);
    setError(null);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: "https://hobohippie.com/payment-success",
        payment_method_data: {
          billing_details: {
            name: user.name,
            email: user.email,
            address: {
              line1: user.billingAddress.street,
              city: user.billingAddress.city,
              state: user.billingAddress.state,
              postal_code: user.billingAddress.zip,
              country: user.billingAddress.country
            }
          }
        }
      }
    });

    if (error) {
      setError('Payment failed: ' + error.message);
    }
    setLoading(false);
  };

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty!</p>
      ) : (
        <div>
          <ul>
            {cartItems.map((item, index) => (
              <li key={index}>
                {item.name} - ${item.price.toFixed(2)} x {item.quantity} = ${(
                  item.price * item.quantity
                ).toFixed(2)}
              </li>
            ))}
          </ul>
          <h3>Total: ${totalAmount.toFixed(2)}</h3>
          
          <form onSubmit={handleSubmit}>
            {clientSecret ? (
              <PaymentElement clientSecret={clientSecret} />
            ) : (
              <p>Loading payment information...</p>
            )}
            <button type="submit" disabled={!stripe || loading || !clientSecret}>
              {loading ? 'Processing...' : `Pay ${totalAmount.toFixed(2)}`}
            </button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {paymentStatus && <p>{paymentStatus}</p>}
          </form>
        </div>
      )}

    </div>

  );
}

export default CheckoutForm;
