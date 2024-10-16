import React from 'react';
import { useCart } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';
import './cartModal.css';

const CartModal = () => {
  const { isModalOpen, closeModal, cartItems, removeFromCart, addToCart, modalClosing } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate('/checkout');
    closeModal();
  };

  if (!isModalOpen && !modalClosing) return null;

  return (
    <div className={`modal-overlay ${isModalOpen ? 'show' : ''}`} onClick={closeModal}>
      <div className={`modal-content ${isModalOpen ? 'slide-in' : modalClosing ? 'slide-out' : ''}`} onClick={(e) => e.stopPropagation()}>
        <h2>Your Cart</h2>
        <div className="modal-body">
          {cartItems.length === 0 ? (
            <p>Your cart is empty!</p>
          ) : (
            <ul className="cart-items">
              {cartItems.map((item, index) => (
                <li key={index} className="cart-item">
                  <img src={item.imageUrl} alt={item.name} className="item-image" />
                  <div className="item-details">
                    <span className="item-name">{item.name}</span>
                    <span className="item-price">${item.price.toFixed(2)}</span>
                    <div className="item-quantity-control">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation(); 
                          removeFromCart(item.id);
                        }} 
                        className="quantity-btn">-</button>
                      <span className="item-quantity">{item.quantity}</span>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation(); 
                          addToCart(item);
                        }} 
                        className="quantity-btn">+</button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="modal-buttons">
          <button onClick={handleCheckout} className="btn btn-checkout">Checkout</button>
        </div>
      </div>
    </div>
  );
};

export default CartModal;
