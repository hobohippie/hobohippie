import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom'; 
import './loginBanner.css';

const Banner = () => {
  return (
    <div className="login-banner">
      <div className="banner-left">
        <FontAwesomeIcon icon={faUserCircle} className="profile-icon" />
        <div className="login-banner-text">
          <p className="bold-text login-banner-text">Sign in to earn rewards</p>
          <p className="login-banner-text">Don't have an account?</p>
          <Link to="/create-account" className="create-account-link">Create account</Link>
        </div>
      </div>
      <Link to="/login" className="login-banner-button">Sign in</Link>
    </div>
  );
};

export default Banner;
