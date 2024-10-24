import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import CartModal from '../CartModal/CartModal';
import logo from '../images/HoboHippie.png'
import './header.css';

const NavBar = () => {
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    const { cartItems, openModal } = useCart();
    const { isAdmin, logout } = useAuth();
    const totalCartQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);

    const toggleCartModal = () => {
        openModal();
    };



    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            if (currentScrollY > lastScrollY) {
                setIsVisible(false); // Scrolling down
            } else {
                setIsVisible(true); // Scrolling up
            }
            setLastScrollY(currentScrollY);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY]);

    return (
        <>
            {/* Top Black Banner */}
            <div className={`top-banner ${isVisible ? 'top-show' : 'top-hide'}`}>
                <p className="banner-text">FREE SHIPPING ON ALL ORDERS OVER $50*</p>
            </div>

            {/* Main Navbar */}
            <header className={`navbar ${isVisible ? 'nav-show' : 'nav-hide'}`}>
                
                {/* Left: SHOP button */}
                <div className="navbar-section">
                    <button className="shop-button">SHOP</button>
                </div>

                {/* Middle: Logo */}
                <div className="navbar-section navbar-logo">
                    <Link to="/">
                        <img
                            src={logo}
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

            {/* Admin Links */}
            {isAdmin && (
                <div className="admin-links">
                    <button className="admin-button" onClick={logout}>Logout</button>
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
