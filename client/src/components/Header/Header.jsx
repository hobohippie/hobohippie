import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import CartModal from '../CartModal/CartModal';
import logo from '../../assets/images/HoboHippie_logo.png'
import roundLogo from '../../assets/images/HoboHippie_logo_round.png'
import './header.css';
import { Container } from 'react-bootstrap';



const NavBar = () => {

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const closeDropdown = () => {
        setIsDropdownOpen(false);
    };

    const [isNearTop, setIsNearTop] = useState(true);
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
            setIsNearTop(window.scrollY < 250);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY]);


    return (
        <>

            <div className={`header-container
                   ${isVisible ? 'hc-show' : 'hc-hide'}
                   ${isNearTop ? 'near-top' : ''}`}
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

                    <div className="round-logo">
                        <img
                            src={roundLogo}
                            alt="Hobo Hippie Round Logo"
                        />
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

                <div className="banner" onClick={toggleDropdown}>
                    <p>~Hobo Hippie Rewards</p>
                </div>
                {isDropdownOpen && (
                    <div className="banner-dropdown">
                        <div className="banner-content">
                            <button className="close-button" onClick={closeDropdown}>
                                ✖️
                            </button>
                            <p>
                                <span role="img" aria-label="coin">
                                    💰
                                </span>{' '}
                                <span className="dropdown-text-top">Earn 1 point for every $1 you spend</span>
                            </p>
                            <div className="join-box">
                                <Link to="/create-account" className="join-link" onClick={closeDropdown}>
                                    <div className="join-now">
                                        <span className="join-text">
                                            Join Now
                                            <br />
                                            <small>Earn 100 points</small>
                                        </span>
                                        <span className="arrow">&gt;</span>
                                    </div>
                                </Link>
                            </div>
                            <p>
                                <span className="login-prompt">Already a member? </span>
                                <Link to="/login" className="login-link" onClick={closeDropdown}>
                                    Log In
                                </Link>
                            </p>
                        </div>
                    </div>
                )}

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
            </div>
        </>
    );
};

export default NavBar;
