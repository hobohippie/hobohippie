import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa'; // Removed unnecessary icons
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import CartModal from '../CartModal/CartModal';
import './header.css';

const NavBar = () => {
  const [isScrollingUp, setScrollingUp] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const { cartItems, openModal } = useCart();
  const { isAuthenticated, isAdmin } = useAuth();
  const totalCartQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);

  const toggleCartModal = () => {
    openModal();
  };

  const handleScroll = () => {
    const currentScrollY = window.scrollY;
    setScrollingUp(currentScrollY < lastScrollY || currentScrollY <= 0);
    setLastScrollY(currentScrollY);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <>
      {/* Top Black Banner */}
      <div className={`top-banner ${isScrollingUp ? 'show' : 'hide'}`}>
        <p className="banner-text">FREE SHIPPING ON ALL ORDERS OVER $50*</p>
      </div>

      {/* Main Navbar */}
      <header className={`navbar ${isScrollingUp ? 'show' : 'hide'}`}>
        <div className="navbar-section">
          {/* Left: SHOP button */}
          <button className="shop-button">SHOP</button>
        </div>

        {/* Middle: Logo */}
        <div className="navbar-section navbar-logo">
          <Link to="/">
            <img
              src="https://via.placeholder.com/100"
              alt="Hobo Hippie Logo"
              className="navbar-logo-image"
            />
          </Link>
        </div>

        {/* Right: Cart Icon */}
        <div className="navbar-section">
          <div className="cart-icon-container" onClick={toggleCartModal}>
            <FaShoppingCart className="nav-icon-size" />
            {totalCartQuantity > 0 && (
              <span className="cart-badge">{totalCartQuantity}</span>
            )}
          </div>
        </div>
      </header>

      {/* Admin Links: Display as Dropdown or Icon */}
      {isAdmin && (
        <div className="admin-links">
          <button className="admin-button">Admin</button>
          <ul className="admin-menu">
            <li><Link to="/create-product">Create Product</Link></li>
            <li><Link to="/create-supplier">Create Supplier</Link></li>
          </ul>
        </div>
      )}

      <CartModal />
    </>
  );
};

export default NavBar;
