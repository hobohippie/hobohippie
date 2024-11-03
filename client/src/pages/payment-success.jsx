import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const PaymentSuccess = () => {
    const { clearCart } = useCart();
    const navigate = useNavigate();

    useEffect(() => {
        clearCart();
        // Redirect to order status after 3 seconds
        const timeout = setTimeout(() => {
            navigate('/order-status');
        }, 3000);

        return () => clearTimeout(timeout);
    }, [clearCart, navigate]);

    return (
        <div className="payment-success">
            <h1>Payment Successful!</h1>
            <p>Thank you for your order. You will be redirected to your order status page.</p>
        </div>
    );
};

export default PaymentSuccess;
