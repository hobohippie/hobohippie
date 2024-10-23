import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './banner.css';

const Banner = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const closeDropdown = () => {
        setIsDropdownOpen(false);
    };

    return (
        <>
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
        </>
    );
};

export default Banner;
