import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faTiktok, faPinterest } from '@fortawesome/free-brands-svg-icons';
import './footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-columns">
          <div className="footer-column">
            <h3>Help + Info</h3>
            <ul>
              <li><Link to="/order-status">Order Status</Link></li>
              <li><Link to="/manage-subscriptions">Manage Subscriptions</Link></li>
              <li><Link to="/shipping-returns">Shipping + Returns</Link></li>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/register">Register</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
            </ul>
          </div>
          <div className="footer-column">
            <h3>Quicklinkieeezzeeezzzeeeezzz</h3>
            <ul>
              <li><Link to="/products">Category 1</Link></li>
              <li><Link to="/products">Category 2</Link></li>
              <li><Link to="/products">Category 3</Link></li>
              <li><Link to="/products">Category 4</Link></li>
              <li><Link to="/products">Category 5</Link></li>
              <li><Link to="/products">Category 6</Link></li>
            </ul>
          </div>
          <div className="footer-column">
            <h3>Featured</h3>
            <ul>
              <li><Link to="/best-sellers">Bestsellers</Link></li>
              <li><Link to="/new-products">New Arrivals</Link></li>
              <li><Link to="/gifts-under-50">Gifts Under $50</Link></li>
              <li><Link to="/products">Special Stuff</Link></li>
              <li><Link to="/products">Special Stuff</Link></li>
              <li><Link to="/products">Special Stuff</Link></li>
            </ul>
          </div>
          <div className="footer-column">
            <h3>About Us</h3>
            <ul>
              <li><Link to="/about">Our Story</Link></li>
              <li><Link to="/social-responsibility">Social Responsibility</Link></li>
              <li><Link to="/the-journey">The Journey</Link></li>
              <li><Link to="/reviews">Rave Reviews</Link></li>
              <li><Link to="/register">Join Us!</Link></li>
            </ul>
          </div>
        </div>
        <div className="footer-info">
          <p>
            <strong>HoboHippie</strong> brings you a vibrant mix of herbal treasures and unique finds! Join our laid-back wellness revolution and explore our groovy gifts and vibe supply—because at Hobo Hippie, it’s all about peace, love, and herbal healing.
          </p>
          <h4>Follow Us</h4>
          <div className="social-icons">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faFacebook} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faInstagram} />
            </a>
            <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faTiktok} />
            </a>
            <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faPinterest} />
            </a>
          </div>
        </div>
      </div>
      
      {/* Footer Stripe */}
      <div className="footer-stripe">
        <div className="footer-links">
          <Link to="/accessibility">Accessibility</Link>
          <Link to="/privacy">Privacy</Link>
          <Link to="/terms">Terms</Link>
        </div>
        <p className="footer-copyright">
          &copy; HoboHippie 2024, All Rights Reserved, United States
        </p>
      </div>
    </footer>
  );
};

export default Footer;
