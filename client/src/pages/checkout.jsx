import React, { useState, useEffect } from 'react';
import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useCart } from '../context/CartContext';

function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { cartItems } = useCart();

  const totalAmount = cartItems.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  useEffect(() => {
    const fetchClientSecret = async () => {
      try {
        const response = await fetch('/api/create-payment-intent', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ total:(totalAmount * 100).toFixed(0) })
        });

        console.log('Response status:', response.status); // Log response status

        if (!response.ok) {
          const errorMessage = await response.text();
          throw new Error(`Failed to create payment intent. ${errorMessage}`);
        }

        const data = await response.json();

        console.log('Data received:', data); // Log received data

        if (data.clientSecret) {
          setClientSecret(data.clientSecret);
        } else {
          throw new Error("Failed to get client secret from server.");
        }
      } catch (err) {
        setError('Error fetching client secret. Please try again.');
        console.error('Fetch client secret error:', err);
      }
    };

    fetchClientSecret();
  }, []);



  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements || !clientSecret) return;

    setLoading(true);
    setError(null);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: "https://hobohippie.com/payment-success",
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
        </div>
      )}

    </div>

  );
}

export default CheckoutForm;



// ---------------------------------CardElement--------------------------------------
// import React, { useState, useEffect } from 'react';
// import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

// function CheckoutForm() {
//   const stripe = useStripe();
//   const elements = useElements();
//   const [clientSecret, setClientSecret] = useState(null);
//   const [paymentStatus, setPaymentStatus] = useState('');
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     const fetchClientSecret = async () => {
//       const response = await fetch('api/create-payment-intent', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ amount: 1000 }) // Adjust amount as needed
//       });
//       const data = await response.json();
//       setClientSecret(data.clientSecret);
//     };

//     fetchClientSecret();
//   }, []);

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     if (!stripe || !elements || !clientSecret) return;

//     setLoading(true); // Set loading state to true

//     const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
//       payment_method: { card: elements.getElement(CardElement) },
//     });

//     setLoading(false); // Reset loading state

//     if (error) {
//       setPaymentStatus('Payment failed: ' + error.message);
//     } else if (paymentIntent && paymentIntent.status === 'succeeded') {
//       setPaymentStatus('Payment successful!');
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <CardElement />
//       <button type="submit" disabled={!stripe || loading}>
//         {loading ? 'Processing...' : 'Pay'}
//       </button>
//       <p>{paymentStatus}</p>
//     </form>
//   );
// }

// export default CheckoutForm;



//--------------------------------------Original-------------------------------------------
// import React from 'react';
// import { useCart } from '../context/CartContext'; // Adjust this path if necessary

// const Checkout = () => {
//   const { cartItems } = useCart(); // Get cart items from context

//   const totalAmount = cartItems.reduce((total, item) => {
//     return total + item.price * item.quantity; // Calculate total amount
//   }, 0);

//   return (
//     <div className="checkout-container">
//       <h2>Checkout</h2>
//       {cartItems.length === 0 ? (
//         <p>Your cart is empty!</p>
//       ) : (
//         <div>
//           <ul>
//             {cartItems.map((item, index) => (
//               <li key={index}>
//                 {item.name} - ${item.price.toFixed(2)} x {item.quantity} = ${(
//                   item.price * item.quantity
//                 ).toFixed(2)}
//               </li>
//             ))}
//           </ul>
//           <h3>Total: ${totalAmount.toFixed(2)}</h3>
//           {/* Include any additional checkout logic here, like payment forms */}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Checkout;
