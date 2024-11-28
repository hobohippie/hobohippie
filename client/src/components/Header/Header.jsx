import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import { useCart } from '../../context/CartContext';
import CartModal from '../CartModal/CartModal';
import logo from '../../assets/images/HoboHippie_logo.png'
import './header.css';
import { Container } from 'react-bootstrap';



const NavBar = () => {

   
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const { cartItems, openModal } = useCart();
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

            <div className={`header-container
                   ${isVisible ? 'hc-show' : 'hc-hide'}`}
            >
                <p className="banner-text">FREE SHIPPING ON ALL ORDERS OVER $50*</p>

                {/* Main Navbar */}
                <header className="navbar">

                    {/* Left: SHOP button */}
                    <div className="navbar-section">
                        <button className="shop-button">SHOP</button>
                    </div>



                    {/* Middle: Logo */}
                    <div className="navbar-logo">
                        <Link to="/">
                            <img
                                src={logo}
                                alt="Hobo Hippie Logo"
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

                
                <CartModal />
            </div>

              
        </>
    );
};

export default NavBar;
