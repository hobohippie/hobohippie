import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaUser, FaHeart } from 'react-icons/fa';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import CartModal from '../CartModal/CartModal';
import './header.css';

const NavBar = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const { cartItems, wishlistItems, openModal } = useCart();
  const { isAuthenticated, isAdmin } = useAuth(); // Access isAdmin here

  const totalCartQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);
  const totalWishlistQuantity = wishlistItems.length;

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  const toggleCartModal = () => {
    openModal();
  };

  return (
    <>
      <header className="navbar">
        <div className="navbar-logo">
          <Link to="/">
            <img
              src="https://via.placeholder.com/150"
              alt="Hobo Hippie Logo"
              className="navbar-logo-image"
            />
          </Link>
        </div>
        <nav className={`navbar-links ${isMenuOpen ? 'open' : ''}`}>
          {isAdmin ?
            <ul className="navbar-small-links">
              <Link to="/create-product">Create Product</Link>
              <Link to="/create-supplier">Create Supplier</Link>
            </ul>
            :
            <ul className="navbar-small-links">
              <li><Link to="/products">Herbs</Link></li>
              <li><Link to="/products">Teas</Link></li>
              <li><Link to="/products">Tinctures</Link></li>
              <li><Link to="/products">Oils</Link></li>
              <li><Link to="/products">Salves</Link></li>
              <li><Link to="/products">Baths</Link></li>
              <li><Link to="/products">Candles</Link></li>
              <li><Link to="/featured">Featured</Link></li>
              <li><Link to="/new-products">New Arrivals</Link></li>
              <li><Link to="/products" className="sale-link">Sale</Link></li>
            </ul>}
        </nav>


        <div className="search-and-icons">
          <input type="text" className="search-field" placeholder="Search..." />
          <div className="icon-container">
            <div className="cart-icon-container" onClick={toggleCartModal}>
              <FaShoppingCart className="nav-icon-size" />
              {totalCartQuantity > 0 && (
                <span className="cart-badge">{totalCartQuantity}</span>
              )}
            </div>
            {/* Update user icon link based on authentication */}
            <Link to={isAuthenticated ? "/user-profile" : "/login"} className="nav-icon">
              <FaUser className="nav-icon-size" />
            </Link>
            <Link to="/wishlist" className="nav-icon">
              <FaHeart className="nav-icon-size" />
              {totalWishlistQuantity > 0 && (
                <span className="wishlist-badge">{totalWishlistQuantity}</span>
              )}
            </Link>
          </div>
        </div>

        <div className={`menu-toggle ${isMenuOpen ? 'open' : ''}`} onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </header>

      <CartModal />
    </>
  );
};

export default NavBar;
