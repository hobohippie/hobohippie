import React from 'react';
import { Link } from 'react-router-dom'; 
import './productCard.css'; 

const ProductCard = ({ product }) => {
    const baseURL = process.env.REACT_APP_BASE_URL || 'http://localhost:3000';
    
    const imageUrl = product.image 
        ? `${baseURL}/${product.image}` 
        : '/path/to/default/image.jpg'; //add default image path

    const renderStars = (rating) => {
        const totalStars = 5; 
        const filledStars = Math.round(rating); 
        const stars = [];

        for (let i = 0; i < totalStars; i++) {
            stars.push(
                <span key={i} className={i < filledStars ? 'filled' : 'empty'}>
                    {i < filledStars ? '★' : '☆'}
                </span>
            );
        }

        return stars;
    };

    return (
        <Link to={`/products/${product._id}`} className="product-card-link">
            <div className="product-card">
                <img src={imageUrl} alt={product.name} className="product-image" />
                <h4 className="product-name">{product.name}</h4>
                <p className="product-description">{product.description}</p>
                <p className="product-price">${product.price.toFixed(2)}</p>
                <div className="star-rating">
                    {renderStars(5)} 
                </div>
            </div>
        </Link>
    );
};

export default ProductCard;
