import React, { createContext, useContext, useState, useCallback } from 'react';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalClosing, setModalClosing] = useState(false);

  const openModal = useCallback(() => {
    setModalClosing(false);
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setModalClosing(true);
    setTimeout(() => {
      setIsModalOpen(false);
      setModalClosing(false);
    }, 300); // Match this with your CSS transition duration
  }, []);

  const addToCart = useCallback((product) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item._id === product._id);
      if (existingItem) {
        return prev.map(item =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  }, []);

  const removeFromCart = useCallback((productId) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item._id === productId);
      if (existingItem && existingItem.quantity > 1) {
        return prev.map(item =>
          item._id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
      }
      return prev.filter(item => item._id !== productId);
    });
  }, []);

  const value = {
    cartItems,
    isModalOpen,
    modalClosing,
    openModal,
    closeModal,
    addToCart,
    removeFromCart
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};
