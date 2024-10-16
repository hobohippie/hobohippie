import React, { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]); 
  const [wishlistItems, setWishlistItems] = useState([]); 
  const [isModalOpen, setModalOpen] = useState(false); 
  const [modalClosing, setModalClosing] = useState(false); 

  const addToCart = (item) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.id === item.id);
      if (existingItem) {
        return prevItems.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prevItems, { ...item, quantity: 1 }];
    });
    openModal(); 
  };

  const removeFromCart = (itemId) => {
    setCartItems((prevItems) =>
      prevItems
        .map((item) => {
          if (item.id === itemId) {
            if (item.quantity > 1) {
              return { ...item, quantity: item.quantity - 1 }; 
            }
            return null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const addToWishlist = (item) => {
    const existingItem = wishlistItems.find((i) => i.id === item.id);
    if (!existingItem) {
      setWishlistItems((prevItems) => [...prevItems, item]);
    }
  };

  const removeFromWishlist = (itemId) => {
    setWishlistItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };

  const openModal = () => {
    setModalClosing(false);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalClosing(true); 
    setTimeout(() => {
      setModalOpen(false);
    }, 300);
  };

  useEffect(() => {
    document.body.style.overflow = isModalOpen ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isModalOpen]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        wishlistItems,
        addToWishlist,
        removeFromWishlist,
        isModalOpen,
        modalClosing, 
        openModal,
        closeModal, 
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};
