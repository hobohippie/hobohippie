import React, { useState, useEffect } from 'react';  
import { Navigate } from 'react-router-dom';
import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { usePayment } from '../context/PaymentProvider';

function CheckoutForm() {  
  const { clientSecret, loading: paymentLoading, error: paymentError } = usePayment();
  const { cartItems } = useCart();
  const { user } = useAuth();
  const stripe = useStripe();
  const elements = useElements();

  const [submitLoading, setSubmitLoading] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  // Early returns for different states
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (cartItems.length === 0) {
    return <Navigate to="/cart" replace />;
  }

  const totalAmount = cartItems.reduce((total, item) => 
    total + item.price * item.quantity, 0
  );

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>
      
      {paymentLoading && (
        <div>Setting up payment...</div>
      )}

      {paymentError && (
        <div className="error-message">
          {paymentError}
        </div>
      )}

      {!paymentLoading && !paymentError && (
        <div>
          <div className="cart-summary">
            {cartItems.map((item) => (
              <div key={item._id} className="cart-item">
                <span>{item.name}</span>
                <span>${item.price.toFixed(2)} x {item.quantity}</span>
              </div>
            ))}
            <div className="total">
              <strong>Total: ${totalAmount.toFixed(2)}</strong>
            </div>
          </div>

          {clientSecret ? (
            <form onSubmit={handleSubmit}>
              <PaymentElement />
              <button 
                type="submit" 
                disabled={!stripe || submitLoading}
              >
                {submitLoading ? 'Processing...' : `Pay $${totalAmount.toFixed(2)}`}
              </button>
              {submitError && (
                <div className="error-message">{submitError}</div>
              )}
            </form>
          ) : (
            <div>Initializing payment form...</div>
          )}
        </div>
      )}
    </div>
  );
}

export default CheckoutForm;
